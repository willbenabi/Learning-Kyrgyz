class SessionsController < ApplicationController
  skip_before_action :set_current_user, only: [ :new ]

  # GET /login
  def new
    render inertia: "Auth/Login", props: {
      return_to: params[:return_to]
    }
  end

  # POST /session
  def create
    outcome = Services::Auth::Login.run(
      email: params[:email],
      password: params[:password]
    )

    if outcome.valid?
      render json: {
        user: user_json(outcome.result[:user]),
        jwt_token: outcome.result[:jwt_token],
        refresh_token: outcome.result[:refresh_token]
      }
    else
      render json: { error: outcome.errors.full_messages.join(", ") }, status: :unauthorized
    end
  end

  # DELETE /session
  def destroy
    if current_user
      # Revoke all active refresh tokens for this user
      current_user.refresh_tokens.active.each(&:revoke!)
    end

    render json: { message: "Logged out successfully" }
  end

  # POST /session/refresh
  def refresh
    outcome = Services::Auth::RefreshTokenService.run(
      refresh_token: params[:refresh_token]
    )

    if outcome.valid?
      render json: {
        user: user_json(outcome.result[:user]),
        jwt_token: outcome.result[:jwt_token],
        refresh_token: outcome.result[:refresh_token]
      }
    else
      render json: { error: outcome.errors.full_messages.join(", ") }, status: :unauthorized
    end
  end

  private

  def user_json(user)
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      super_admin: user.super_admin?
    }
  end
end
