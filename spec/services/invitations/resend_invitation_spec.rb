require "rails_helper"

RSpec.describe Invitations::ResendInvitation, type: :service do
  include ActiveSupport::Testing::TimeHelpers

  let(:admin_user) { create(:user, admin: true) }
  let(:regular_user) { create(:user, admin: false) }
  let(:invited_user) { create(:user, :invited) }

  describe "#execute" do
    context "with valid parameters" do
      let(:valid_params) do
        {
          current_user: admin_user,
          user_id: invited_user.id
        }
      end

      it "generates a new invitation token" do
        old_token = invited_user.invitation_token

        outcome = described_class.run(valid_params)
        invited_user.reload

        expect(invited_user.invitation_token).to be_present
        expect(invited_user.invitation_token).not_to eq(old_token)
      end

      it "updates invitation_sent_at timestamp" do
        old_timestamp = invited_user.invitation_sent_at

        travel_to 1.hour.from_now do
          outcome = described_class.run(valid_params)
          invited_user.reload

          expect(invited_user.invitation_sent_at).to be > old_timestamp
        end
      end

      it "keeps invitation_accepted_at as nil" do
        outcome = described_class.run(valid_params)
        invited_user.reload

        expect(invited_user.invitation_accepted_at).to be_nil
        expect(invited_user.invitation_pending?).to be true
      end

      it "sends invitation email" do
        expect {
          described_class.run(valid_params)
        }.to have_enqueued_job(ActionMailer::MailDeliveryJob)
          .with("UserMailer", "invitation_email", "deliver_now", { args: [ an_instance_of(User), an_instance_of(String) ] })
      end

      it "returns the user" do
        outcome = described_class.run(valid_params)

        expect(outcome).to be_valid
        expect(outcome.result).to be_a(User)
        expect(outcome.result.id).to eq(invited_user.id)
      end
    end

    context "with invalid parameters" do
      it "fails when user_id is blank" do
        outcome = described_class.run(
          current_user: admin_user,
          user_id: nil
        )

        expect(outcome).not_to be_valid
        expect(outcome.errors[:user_id]).to be_present
      end

      it "fails when user_id doesn't exist" do
        outcome = described_class.run(
          current_user: admin_user,
          user_id: 99999
        )

        expect(outcome).not_to be_valid
        expect(outcome.errors[:user_id]).to include("user not found")
      end
    end

    context "authorization" do
      it "fails when current_user is not an admin" do
        outcome = described_class.run(
          current_user: regular_user,
          user_id: invited_user.id
        )

        expect(outcome).not_to be_valid
        expect(outcome.errors[:current_user]).to include("must be an admin")
      end
    end

    context "invitation state" do
      let(:active_user) { create(:user, :invitation_accepted) }

      it "fails when user doesn't have pending invitation" do
        outcome = described_class.run(
          current_user: admin_user,
          user_id: active_user.id
        )

        expect(outcome).not_to be_valid
        expect(outcome.errors[:base]).to include("user has already accepted invitation or was not invited")
      end

      it "fails when invitation is already accepted" do
        invited_user.update_columns(invitation_accepted_at: Time.current)

        outcome = described_class.run(
          current_user: admin_user,
          user_id: invited_user.id
        )

        expect(outcome).not_to be_valid
        expect(outcome.errors[:base]).to include("user has already accepted invitation or was not invited")
      end
    end
  end
end
