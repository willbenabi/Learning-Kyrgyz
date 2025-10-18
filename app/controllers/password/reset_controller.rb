class Password::ResetController < ApplicationController
  skip_before_action :verify_authenticity_token

  # POST /password/forgot
  def forgot
    outcome = Services::Auth::RequestPasswordReset.run(email: params[:email])

    if outcome.valid?
      # In production, would send email here
      render json: { message: 'If that email exists, password reset instructions have been sent' }
    else
      render json: { error: outcome.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  # GET /password/reset?token=xyz
  def show
    render inertia: 'Auth/ResetPassword', props: { token: params[:token] }
  end

  # PUT /password/reset
  def update
    outcome = Services::Auth::ResetPassword.run(
      token: params[:token],
      password: params[:password],
      password_confirmation: params[:password_confirmation]
    )

    if outcome.valid?
      render json: { message: 'Password has been reset successfully' }
    else
      render json: { error: outcome.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end
end
