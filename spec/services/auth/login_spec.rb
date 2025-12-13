require 'rails_helper'

RSpec.describe Auth::Login, type: :service do
  let(:user) { create(:user, email: 'user@example.com', password: 'password123') }

  describe '#execute' do
    context 'with valid credentials' do
      subject(:outcome) { described_class.run(email: user.email, password: 'password123') }

      it 'is successful' do
        expect(outcome).to be_valid
      end

      it 'returns user, jwt_token, and refresh_token' do
        result = outcome.result

        expect(result[:user]).to eq(user)
        expect(result[:jwt_token]).to be_present
        expect(result[:refresh_token]).to be_present
      end

      it 'creates a refresh token' do
        expect {
          outcome
        }.to change { user.refresh_tokens.count }.by(1)
      end
    end

    context 'with invalid email' do
      subject(:outcome) { described_class.run(email: 'wrong@example.com', password: 'password123') }

      it 'is invalid' do
        expect(outcome).to be_invalid
      end

      it 'has authentication error' do
        expect(outcome.errors[:base]).to include('Invalid email or password')
      end
    end

    context 'with invalid password' do
      subject(:outcome) { described_class.run(email: user.email, password: 'wrongpassword') }

      it 'is invalid' do
        expect(outcome).to be_invalid
      end

      it 'has authentication error' do
        expect(outcome.errors[:base]).to include('Invalid email or password')
      end
    end

    context 'with missing credentials' do
      it 'requires email' do
        outcome = described_class.run(password: 'password123')
        expect(outcome).to be_invalid
        expect(outcome.errors[:email]).to be_present
      end

      it 'requires password' do
        outcome = described_class.run(email: user.email)
        expect(outcome).to be_invalid
        expect(outcome.errors[:password]).to be_present
      end
    end
  end
end
