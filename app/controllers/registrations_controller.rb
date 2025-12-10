class RegistrationsController < ApplicationController
  # Public controller - no authentication required

  # GET /register
  def new
    render inertia: "Auth/Register"
  end

  # POST /register
  def create
    outcome = Auth::Register.run(
      name: params[:name],
      email: params[:email],
      password: params[:password],
      password_confirmation: params[:password_confirmation],
      username: params[:username],
      interface_language: params[:interface_language] || 'en'
    )

    if outcome.valid?
      render json: {
        user: user_json(outcome.result[:user]),
        jwt_token: outcome.result[:jwt_token],
        refresh_token: outcome.result[:refresh_token]
      }, status: :created
    else
      render json: { error: outcome.errors.full_messages.join(", ") }, status: :unprocessable_entity
    end
  end

  private

  def user_json(user)
    {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      interface_language: user.interface_language,
      admin: user.admin?,
      current_level: user.current_level,
      created_at: user.created_at
    }
  end
end
