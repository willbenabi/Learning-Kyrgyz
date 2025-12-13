require 'rails_helper'

RSpec.describe Auth::RequestPasswordReset, type: :service do
  let(:user) { create(:user, email: 'user@example.com') }

  describe '#execute' do
    context 'with valid email' do
      subject(:outcome) { described_class.run(email: user.email) }

      it 'is successful' do
        expect(outcome).to be_valid
      end

      it 'generates reset token for user' do
        expect {
          outcome
        }.to change { user.reload.reset_password_token }.from(nil).to(be_present)
      end

      it 'sets reset_password_sent_at' do
        outcome
        expect(user.reload.reset_password_sent_at).to be_within(1.second).of(Time.current)
      end

      it 'returns the user' do
        expect(outcome.result[:user]).to eq(user)
      end
    end

    context 'with non-existent email' do
      subject(:outcome) { described_class.run(email: 'nonexistent@example.com') }

      # For security, we don't reveal if email exists
      it 'is successful' do
        expect(outcome).to be_valid
      end

      it 'returns nil user' do
        expect(outcome.result[:user]).to be_nil
      end
    end

    context 'with invalid email format' do
      subject(:outcome) { described_class.run(email: 'invalid-email') }

      it 'is invalid' do
        expect(outcome).to be_invalid
      end
    end
  end
end
