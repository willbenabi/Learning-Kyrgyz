require 'rails_helper'

RSpec.describe Auth::RefreshTokenService, type: :service do
  let(:user) { create(:user) }
  let(:refresh_token_data) { Auth::JwtService.generate_refresh_token(user) }
  let(:refresh_token_string) { refresh_token_data[:token] }

  describe '#execute' do
    context 'with valid refresh token' do
      subject(:outcome) { described_class.run(refresh_token: refresh_token_string) }

      it 'is successful' do
        expect(outcome).to be_valid
      end

      it 'returns new jwt_token and refresh_token' do
        result = outcome.result

        expect(result[:user]).to eq(user)
        expect(result[:jwt_token]).to be_present
        expect(result[:refresh_token]).to be_present
      end

      it 'revokes the old refresh token' do
        old_token = refresh_token_data[:refresh_token]
        outcome

        expect(old_token.reload.revoked_at).to be_present
      end

      it 'maintains one active refresh token (revokes old, creates new)' do
        refresh_token_string # ensure token is created
        initial_total = user.refresh_tokens.count

        outcome

        expect(user.refresh_tokens.count).to eq(initial_total + 1)
        expect(user.refresh_tokens.active.count).to eq(1)
      end
    end

    context 'with invalid refresh token' do
      subject(:outcome) { described_class.run(refresh_token: 'invalid_token') }

      it 'is invalid' do
        expect(outcome).to be_invalid
      end

      it 'has error message' do
        expect(outcome.errors[:base]).to include('Invalid or expired refresh token')
      end
    end

    context 'with expired refresh token' do
      before do
        refresh_token_data[:refresh_token].update(expires_at: 1.day.ago)
      end

      subject(:outcome) { described_class.run(refresh_token: refresh_token_string) }

      it 'is invalid' do
        expect(outcome).to be_invalid
      end
    end

    context 'with revoked refresh token' do
      before do
        refresh_token_data[:refresh_token].revoke!
      end

      subject(:outcome) { described_class.run(refresh_token: refresh_token_string) }

      it 'is invalid' do
        expect(outcome).to be_invalid
      end
    end
  end
end
