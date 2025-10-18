module Authenticatable
  extend ActiveSupport::Concern

  included do
    before_action :set_current_user
  end

  private

  def set_current_user
    @current_user = nil
    token = request.headers['Authorization']&.split(' ')&.last

    return unless token

    decoded = Services::Auth::JwtService.decode(token)
    return unless decoded

    @current_user = User.find_by(id: decoded['user_id'])
  end

  def current_user
    @current_user
  end

  def authenticate_user!
    unless current_user
      render_unauthorized
    end
  end

  def current_user?(user)
    current_user == user
  end

  def render_unauthorized(message = 'Unauthorized')
    respond_to do |format|
      format.json { render json: { error: message }, status: :unauthorized }
      format.html do
        # Store the original URL they were trying to access
        return_to = request.fullpath unless request.fullpath == login_path
        redirect_to login_path(return_to: return_to)
      end
    end
  end
end
