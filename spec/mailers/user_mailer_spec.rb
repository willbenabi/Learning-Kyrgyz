require "rails_helper"

RSpec.describe UserMailer, type: :mailer do
  describe "#reset_password_instructions" do
    let(:user) { create(:user) }

    before do
      user.generate_password_reset_token
    end

    let(:mail) { UserMailer.reset_password_instructions(user) }

    it "renders the headers" do
      expect(mail.subject).to eq("Password Reset Instructions")
      expect(mail.to).to eq([ user.email ])
      expect(mail.from).to eq([ "from@example.com" ])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match(user.name)
      expect(mail.body.encoded).to match("reset")
    end

    it "includes reset password link" do
      expect(mail.body.encoded).to include(password_reset_url(token: user.reset_password_token))
    end
  end

  describe "#invitation_email" do
    let(:user) { create(:user, :invited) }
    let(:token) { user.invitation_token }
    let(:mail) { UserMailer.invitation_email(user, token) }

    it "renders the headers" do
      expect(mail.subject).to eq("You've been invited to join Starter App")
      expect(mail.to).to eq([ user.email ])
      expect(mail.from).to eq([ "from@example.com" ])
    end

    it "renders the body with user name" do
      expect(mail.body.encoded).to match(user.name)
    end

    it "includes invitation acceptance link" do
      expect(mail.body.encoded).to include(accept_invitation_url(token: token))
    end

    it "includes welcome message" do
      expect(mail.body.encoded).to match(/invited to join/i)
      expect(mail.body.encoded).to match(/Starter App/i)
    end

    it "includes instructions" do
      expect(mail.body.encoded).to match(/accept.*invitation/i)
      expect(mail.body.encoded).to match(/password/i)
    end
  end
end
