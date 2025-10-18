class ApplicationController < ActionController::Base
  include Authenticatable
  include Pagy::Backend

  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  # Inertia configuration
  inertia_share do
    {
      auth: {
        user: current_user ? {
          id: current_user.id,
          name: current_user.name,
          email: current_user.email,
          role: current_user.role,
          super_admin: current_user.super_admin?
        } : nil
      },
      preferences: current_user ? current_user_preferences : nil,
      flash: {
        success: flash[:success],
        error: flash[:error],
        notice: flash[:notice]
      }
    }
  end

  private

  def current_user_preferences
    preference = current_user.user_preference || current_user.build_user_preference
    {
      sidebar_variant: preference.sidebar_variant,
      theme: preference.theme
    }
  end
end
