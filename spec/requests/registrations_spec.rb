require 'rails_helper'

RSpec.describe 'Registrations', type: :request do
  describe 'GET /register' do
    it 'renders the registration page' do
      get register_path
      expect(response).to have_http_status(:success)
    end
  end

  describe 'POST /register' do
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
          post register_path, params: valid_params, as: :json
        }.to change(User, :count).by(1)
      end

      it 'returns success status' do
        post register_path, params: valid_params, as: :json
        expect(response).to have_http_status(:created)
      end

      it 'returns user data with jwt and refresh tokens' do
        post register_path, params: valid_params, as: :json
        json = JSON.parse(response.body)

        expect(json['user']).to be_present
        expect(json['user']['email']).to eq('test@example.com')
        expect(json['jwt_token']).to be_present
        expect(json['refresh_token']).to be_present
      end

      it 'does not expose password' do
        post register_path, params: valid_params, as: :json
        json = JSON.parse(response.body)

        expect(json['user']).not_to have_key('password')
        expect(json['user']).not_to have_key('password_digest')
      end
    end

    context 'with invalid parameters' do
      it 'fails when passwords do not match' do
        params = valid_params.merge(password_confirmation: 'different')
        post register_path, params: params, as: :json

        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json['error']).to include("doesn't match")
      end

      it 'fails when email is already taken' do
        create(:user, email: 'test@example.com')
        post register_path, params: valid_params, as: :json

        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json['error']).to include('already taken')
      end

      it 'fails when email is invalid' do
        params = valid_params.merge(email: 'invalid')
        post register_path, params: params, as: :json

        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'fails when password is too short' do
        params = valid_params.merge(password: 'short', password_confirmation: 'short')
        post register_path, params: params, as: :json

        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'fails when name is missing' do
        params = valid_params.except(:name)
        post register_path, params: params, as: :json

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
