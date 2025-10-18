require 'rails_helper'

RSpec.describe "Sessions", type: :request do
  let(:user) { create(:user, email: 'user@example.com', password: 'password123') }

  describe "POST /session" do
    context "with valid credentials" do
      it "returns JWT token and refresh token" do
        post '/session', params: { email: user.email, password: 'password123' }

        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json['jwt_token']).to be_present
        expect(json['refresh_token']).to be_present
        expect(json['user']['id']).to eq(user.id)
      end
    end

    context "with invalid credentials" do
      it "returns unauthorized" do
        post '/session', params: { email: user.email, password: 'wrongpassword' }

        expect(response).to have_http_status(:unauthorized)
        json = JSON.parse(response.body)
        expect(json['error']).to be_present
      end
    end
  end

  describe "DELETE /session" do
    it "logs out successfully" do
      delete '/session', headers: auth_headers(user)

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json['message']).to eq('Logged out successfully')
    end
  end

  describe "POST /session/refresh" do
    let(:refresh_token_data) { Services::Auth::JwtService.generate_refresh_token(user) }
    let(:refresh_token_string) { refresh_token_data[:token] }

    context "with valid refresh token" do
      it "returns new JWT token and refresh token" do
        post '/session/refresh', params: { refresh_token: refresh_token_string }

        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json['jwt_token']).to be_present
        expect(json['refresh_token']).to be_present
      end
    end

    context "with invalid refresh token" do
      it "returns unauthorized" do
        post '/session/refresh', params: { refresh_token: 'invalid' }

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
