require "rails_helper"

RSpec.describe Invitations::SendInvitation, type: :service do
  let!(:admin_user) { create(:user, admin: true) }
  let!(:regular_user) { create(:user, admin: false) }

  describe "#execute" do
    context "with valid parameters" do
      let(:valid_params) do
        {
          current_user: admin_user,
          email: "newuser@example.com",
          name: "New User"
        }
      end

      it "creates a new user" do
        expect {
          described_class.run(valid_params)
        }.to change(User, :count).by(1)
      end

      it "sets invitation fields" do
        outcome = described_class.run(valid_params)
        user = outcome.result

        expect(user.invitation_token).to be_present
        expect(user.invitation_sent_at).to be_present
        expect(user.invitation_accepted_at).to be_nil
        expect(user.invitation_pending?).to be true
      end

      it "downcases and strips the email" do
        outcome = described_class.run(valid_params.merge(email: "  NewUser@EXAMPLE.com  "))
        expect(outcome.result.email).to eq("newuser@example.com")
      end

      it "sets admin to false" do
        outcome = described_class.run(valid_params)
        expect(outcome.result.admin).to be false
      end

      it "sends invitation email" do
        expect {
          described_class.run(valid_params)
        }.to have_enqueued_job(ActionMailer::MailDeliveryJob)
          .with("UserMailer", "invitation_email", "deliver_now", { args: [ an_instance_of(User), an_instance_of(String) ] })
      end

      it "returns the created user" do
        outcome = described_class.run(valid_params)
        expect(outcome).to be_valid
        expect(outcome.result).to be_a(User)
        expect(outcome.result.email).to eq("newuser@example.com")
      end
    end

    context "with invalid parameters" do
      it "fails when email is blank" do
        outcome = described_class.run(
          current_user: admin_user,
          email: "",
          name: "New User"
        )

        expect(outcome).not_to be_valid
        expect(outcome.errors[:email]).to include("is invalid")
      end

      it "fails when email format is invalid" do
        outcome = described_class.run(
          current_user: admin_user,
          email: "invalid-email",
          name: "New User"
        )

        expect(outcome).not_to be_valid
        expect(outcome.errors[:email]).to include("is invalid")
      end

      it "fails when name is blank" do
        outcome = described_class.run(
          current_user: admin_user,
          email: "newuser@example.com",
          name: ""
        )

        expect(outcome).not_to be_valid
        expect(outcome.errors[:name]).to be_present
      end

      it "fails when name is too short" do
        outcome = described_class.run(
          current_user: admin_user,
          email: "newuser@example.com",
          name: "A"
        )

        expect(outcome).not_to be_valid
        expect(outcome.errors[:name]).to be_present
      end

      it "fails when name is too long" do
        outcome = described_class.run(
          current_user: admin_user,
          email: "newuser@example.com",
          name: "A" * 101
        )

        expect(outcome).not_to be_valid
        expect(outcome.errors[:name]).to be_present
      end
    end

    context "authorization" do
      it "fails when current_user is not an admin" do
        outcome = described_class.run(
          current_user: regular_user,
          email: "newuser@example.com",
          name: "New User"
        )

        expect(outcome).not_to be_valid
        expect(outcome.errors[:current_user]).to include("must be an admin")
      end
    end

    context "duplicate email" do
      before do
        create(:user, email: "existing@example.com")
      end

      it "fails when email already exists" do
        outcome = described_class.run(
          current_user: admin_user,
          email: "existing@example.com",
          name: "New User"
        )

        expect(outcome).not_to be_valid
        expect(outcome.errors[:email]).to include("already exists")
      end

      it "fails when email already exists with different case" do
        outcome = described_class.run(
          current_user: admin_user,
          email: "EXISTING@example.com",
          name: "New User"
        )

        expect(outcome).not_to be_valid
        expect(outcome.errors[:email]).to include("already exists")
      end
    end
  end
end
