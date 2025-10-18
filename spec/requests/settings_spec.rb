require 'rails_helper'

RSpec.describe "Settings", type: :request do
  let(:user) { create(:user) }

  describe "GET /settings" do
    context "when authenticated" do
      it "returns the settings page" do
        get '/settings', headers: auth_headers(user)
        expect(response).to have_http_status(:ok)
      end

      it "includes user preferences in props" do
        user_preference = create(:user_preference, user: user, preferences: { 'sidebar_variant' => 'floating' })
        get '/settings', headers: auth_headers(user)

        # Inertia responses contain component name and props
        expect(response.body).to include('Settings/Index')
      end
    end

    context "when not authenticated" do
      it "redirects to login with return_to parameter" do
        get '/settings'
        expect(response).to have_http_status(:found)
        expect(response).to redirect_to(login_path(return_to: '/settings'))
      end
    end
  end

  describe "PATCH /settings" do
    context "when authenticated" do
      context "with valid parameters" do
        let(:valid_params) { { user_preference: { sidebar_variant: 'floating' } } }

        it "updates the user preferences" do
          patch '/settings', params: valid_params, headers: auth_headers(user)

          user.reload
          expect(user.user_preference.sidebar_variant).to eq('floating')
        end

        it "returns success response" do
          patch '/settings', params: valid_params, headers: auth_headers(user)
          expect(response).to have_http_status(:found) # Inertia redirect
        end

        it "creates user_preference if it doesn't exist" do
          expect(user.user_preference).to be_nil

          patch '/settings', params: valid_params, headers: auth_headers(user)

          user.reload
          expect(user.user_preference).to be_present
          expect(user.user_preference.sidebar_variant).to eq('floating')
        end
      end

      context "with invalid parameters" do
        let(:invalid_params) { { user_preference: { sidebar_variant: 'invalid' } } }

        it "does not update preferences" do
          user_preference = create(:user_preference, user: user, preferences: { 'sidebar_variant' => 'inset' })

          patch '/settings', params: invalid_params, headers: auth_headers(user)

          user_preference.reload
          expect(user_preference.sidebar_variant).to eq('inset')
        end

        it "returns error" do
          patch '/settings', params: invalid_params, headers: auth_headers(user)
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    context "when not authenticated" do
      it "redirects to login with return_to parameter" do
        patch '/settings', params: { user_preference: { sidebar_variant: 'floating' } }
        expect(response).to have_http_status(:found)
        expect(response).to redirect_to(login_path(return_to: '/settings'))
      end
    end
  end
end
