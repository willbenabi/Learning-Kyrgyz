require 'rails_helper'

RSpec.describe Auth::Register, type: :service do
  describe '#execute' do
    let(:valid_params) do
      {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        password_confirmation: 'password123'
      }
    end

    context 'with valid parameters' do
      it 'creates a new user' do
        expect {
          Auth::Register.run!(valid_params)
        }.to change(User, :count).by(1)
      end

      it 'returns user, jwt_token, and refresh_token' do
        result = Auth::Register.run!(valid_params)

        expect(result[:user]).to be_a(User)
        expect(result[:jwt_token]).to be_present
        expect(result[:refresh_token]).to be_present
      end

      it 'creates user with correct attributes' do
        result = Auth::Register.run!(valid_params)
        user = result[:user]

        expect(user.name).to eq('Test User')
        expect(user.email).to eq('test@example.com')
        expect(user.admin).to be false
      end

      it 'encrypts the password' do
        result = Auth::Register.run!(valid_params)
        user = result[:user]

        expect(user.password_digest).to be_present
        expect(user.authenticate('password123')).to eq(user)
      end

      it 'creates a refresh token for the user' do
        result = Auth::Register.run!(valid_params)
        user = result[:user]

        expect(user.refresh_tokens.count).to eq(1)
        expect(user.refresh_tokens.first.expires_at).to be > Time.current
      end

      it 'initializes user progress' do
        result = Auth::Register.run!(valid_params)
        user = result[:user]

        expect(user.user_progress).to be_present
        expect(user.user_progress.level).to eq('A1')
      end
    end

    context 'with invalid parameters' do
      it 'fails when passwords do not match' do
        params = valid_params.merge(password_confirmation: 'different')
        outcome = Auth::Register.run(params)

        expect(outcome).not_to be_valid
        expect(outcome.errors.full_messages).to include("Password confirmation doesn't match password")
      end

      it 'fails when email is already taken' do
        create(:user, email: 'test@example.com')
        outcome = Auth::Register.run(valid_params)

        expect(outcome).not_to be_valid
        expect(outcome.errors.full_messages).to include('Email is already taken')
      end

      it 'fails when email is invalid' do
        params = valid_params.merge(email: 'invalid_email')
        outcome = Auth::Register.run(params)

        expect(outcome).not_to be_valid
      end

      it 'fails when password is too short' do
        params = valid_params.merge(password: 'short', password_confirmation: 'short')
        outcome = Auth::Register.run(params)

        expect(outcome).not_to be_valid
      end

      it 'fails when name is blank' do
        params = valid_params.merge(name: '')
        outcome = Auth::Register.run(params)

        expect(outcome).not_to be_valid
      end
    end
  end
end
