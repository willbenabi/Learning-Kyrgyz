# frozen_string_literal: true

module Admin
  class BaseController < ApplicationController
    before_action :authenticate_user!
    before_action :require_admin!

    # Handle unauthorized access in admin area
    rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

    private

    def require_admin!
      unless current_user&.admin?
        user_not_authorized
      end
    end

    def user_not_authorized
      # Distinguish between initial page loads and Inertia XHR requests
      if request.headers["X-Inertia"]
        # Inertia XHR request: Return 403 JSON (frontend handles redirect)
        render json: { error: "You are not authorized to perform this action." }, status: :forbidden
      else
        # Initial page load: Redirect to dashboard
        redirect_to root_path, alert: "You are not authorized to perform this action."
      end
    end
  end
end
