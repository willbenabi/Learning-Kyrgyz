require "rails_helper"

RSpec.describe Invitations::AcceptInvitation, type: :service do
  let(:invited_user) { create(:user, :invited) }
  let(:token) { invited_user.invitation_token }

  describe "#execute" do
    context "with valid parameters" do
      let(:valid_params) do
        {
          invitation_token: token,
          password: "password123",
          password_confirmation: "password123"
        }
      end

      it "sets the password" do
        outcome = described_class.run(valid_params)
        user = outcome.result

        expect(user.authenticate("password123")).to eq(user)
      end

      it "sets invitation_accepted_at" do
        outcome = described_class.run(valid_params)
        user = outcome.result

        expect(user.invitation_accepted_at).to be_present
        expect(user.invitation_pending?).to be false
      end

      it "clears invitation_token" do
        outcome = described_class.run(valid_params)
        user = outcome.result

        expect(user.invitation_token).to be_nil
      end

      it "marks user as active" do
        outcome = described_class.run(valid_params)
        user = outcome.result

        expect(user.active?).to be true
      end

      it "returns the user" do
        outcome = described_class.run(valid_params)

        expect(outcome).to be_valid
        expect(outcome.result).to be_a(User)
        expect(outcome.result.id).to eq(invited_user.id)
      end
    end

    context "with invalid parameters" do
      it "fails when invitation_token is blank" do
        outcome = described_class.run(
          invitation_token: "",
          password: "password123",
          password_confirmation: "password123"
        )

        expect(outcome).not_to be_valid
        expect(outcome.errors[:invitation_token]).to be_present
      end

      it "fails when password is blank" do
        outcome = described_class.run(
          invitation_token: token,
          password: "",
          password_confirmation: "password123"
        )

        expect(outcome).not_to be_valid
        expect(outcome.errors[:password]).to be_present
      end

      it "fails when password is too short" do
        outcome = described_class.run(
          invitation_token: token,
          password: "short",
          password_confirmation: "short"
        )

        expect(outcome).not_to be_valid
        expect(outcome.errors[:password]).to include("is too short (minimum is 8 characters)")
      end

      it "fails when password_confirmation is blank" do
        outcome = described_class.run(
          invitation_token: token,
          password: "password123",
          password_confirmation: ""
        )

        expect(outcome).not_to be_valid
        expect(outcome.errors[:password_confirmation]).to be_present
      end

      it "fails when passwords don't match" do
        outcome = described_class.run(
          invitation_token: token,
          password: "password123",
          password_confirmation: "different123"
        )

        expect(outcome).not_to be_valid
        expect(outcome.errors[:password_confirmation]).to include("doesn't match password")
      end
    end

    context "invalid invitation token" do
      it "fails when token doesn't exist" do
        outcome = described_class.run(
          invitation_token: "nonexistent-token",
          password: "password123",
          password_confirmation: "password123"
        )

        expect(outcome).not_to be_valid
        expect(outcome.errors[:invitation_token]).to include("is invalid")
      end

      it "fails when invitation is already accepted" do
        accepted_user = create(:user, :invitation_accepted)

        outcome = described_class.run(
          invitation_token: "any-token",
          password: "password123",
          password_confirmation: "password123"
        )

        expect(outcome).not_to be_valid
      end
    end

    context "user without pending invitation" do
      let(:active_user) { create(:user) }

      before do
        active_user.update_columns(
          invitation_token: "some-token",
          invitation_sent_at: 1.day.ago,
          invitation_accepted_at: Time.current
        )
      end

      it "fails when invitation is not pending" do
        outcome = described_class.run(
          invitation_token: "some-token",
          password: "password123",
          password_confirmation: "password123"
        )

        expect(outcome).not_to be_valid
        expect(outcome.errors[:invitation_token]).to include("has already been accepted or is invalid")
      end
    end
  end
end
