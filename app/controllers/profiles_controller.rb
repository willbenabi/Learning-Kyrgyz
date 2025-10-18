class ProfilesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:update]
  before_action :authenticate_user!

  # GET /profile
  def show
    render inertia: 'Profile/Show', props: {
      user: user_props(current_user)
    }
  end

  # GET /profile/edit
  def edit
    render inertia: 'Profile/Edit', props: {
      user: user_props(current_user)
    }
  end

  # PATCH /profile
  def update
    if current_user.update(profile_params)
      render json: { message: 'Profile updated successfully', user: user_props(current_user) }
    else
      render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def profile_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

  def user_props(user)
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      super_admin: user.super_admin?,
      created_at: user.created_at
    }
  end
end
