class SettingsController < ApplicationController
  before_action :authenticate_user!

  # GET /settings
  def index
    render inertia: 'Settings/Index'
  end

  # PATCH /settings
  def update
    preference = current_user.user_preference || current_user.build_user_preference

    if update_preference(preference)
      redirect_to settings_path, notice: 'Settings updated successfully'
    else
      render inertia: 'Settings/Index', props: {
        errors: preference.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

  def update_preference(preference)
    # Set the sidebar variant using the custom setter
    preference.sidebar_variant = preference_params[:sidebar_variant] if preference_params[:sidebar_variant].present?
    # Set the theme using the custom setter
    preference.theme = preference_params[:theme] if preference_params[:theme].present?
    preference.save
  end

  def preference_params
    params.require(:user_preference).permit(:sidebar_variant, :theme)
  end
end
