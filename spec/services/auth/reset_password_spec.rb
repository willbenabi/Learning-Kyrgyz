require 'rails_helper'

RSpec.describe Auth::ResetPassword, type: :service do
  let(:user) { create(:user) }
  let(:token) { user.generate_password_reset_token }

  describe '#execute' do
    context 'with valid token and password' do
      subject(:outcome) do
        described_class.run(
          token: token,
          password: 'newpassword123',
          password_confirmation: 'newpassword123'
        )
      end

      it 'is successful' do
        expect(outcome).to be_valid
      end

      it 'updates the user password' do
        outcome
        expect(user.reload.authenticate('newpassword123')).to eq(user)
      end

      it 'clears password reset fields' do
        outcome
        user.reload

        expect(user.reset_password_token).to be_nil
        expect(user.reset_password_digest).to be_nil
        expect(user.reset_password_sent_at).to be_nil
      end

      it 'returns the user' do
        expect(outcome.result[:user]).to eq(user)
      end
    end

    context 'with invalid token' do
      subject(:outcome) do
        described_class.run(
          token: 'invalid_token',
          password: 'newpassword123',
          password_confirmation: 'newpassword123'
        )
      end

      it 'is invalid' do
        expect(outcome).to be_invalid
      end

      it 'has error message' do
        expect(outcome.errors[:base]).to include('Invalid or expired password reset token')
      end
    end

    context 'with expired token' do
      let(:expired_token) do
        tok = user.generate_password_reset_token
        user.update_column(:reset_password_sent_at, 3.hours.ago)
        tok
      end

      subject(:outcome) do
        described_class.run(
          token: expired_token,
          password: 'newpassword123',
          password_confirmation: 'newpassword123'
        )
      end

      it 'is invalid' do
        expect(outcome).to be_invalid
      end
    end

    context 'with mismatched passwords' do
      subject(:outcome) do
        described_class.run(
          token: token,
          password: 'newpassword123',
          password_confirmation: 'different123'
        )
      end

      it 'is invalid' do
        expect(outcome).to be_invalid
      end
    end

    context 'with weak password' do
      subject(:outcome) do
        described_class.run(
          token: token,
          password: 'weak',
          password_confirmation: 'weak'
        )
      end

      it 'is invalid' do
        expect(outcome).to be_invalid
      end
    end
  end
end
