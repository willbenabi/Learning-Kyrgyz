class RegistrationsController < ApplicationController
  # Public controller - no authentication required

  # GET /register
  def new
    render inertia: "Auth/Register"
  end

  # POST /register
  def create
    # Level 1: Mock registration - simulate user creation
    # In Level 2, this will create actual database records

    # Mock validation
    if params[:email].blank? || params[:password].blank? || params[:name].blank?
      render json: { error: "All required fields must be filled" }, status: :unprocessable_entity
      return
    end

    if params[:password].length < 8
      render json: { error: "Password must be at least 8 characters" }, status: :unprocessable_entity
      return
    end

    if params[:password] != params[:password_confirmation]
      render json: { error: "Passwords don't match" }, status: :unprocessable_entity
      return
    end

    # Mock user data
    mock_user = {
      id: rand(1000..9999),
      name: params[:name],
      email: params[:email],
      admin: false,
      country: params[:country],
      language_preference: nil, # Will be set in language selection
      kyrgyz_level: nil, # Will be determined by placement test
      avatar_url: nil
    }

    # Generate mock JWT tokens
    jwt_token = Auth::JwtService.encode(user_id: mock_user[:id])
    refresh_token = SecureRandom.urlsafe_base64(32)

    render json: {
      user: mock_user,
      jwt_token: jwt_token,
      refresh_token: refresh_token
    }, status: :created
  end
end
