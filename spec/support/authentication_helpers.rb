module AuthenticationHelpers
  def auth_headers(user)
    token = Services::Auth::JwtService.encode(user_id: user.id)
    { 'Authorization' => "Bearer #{token}" }
  end

  def json_response
    JSON.parse(response.body)
  end
end

RSpec.configure do |config|
  config.include AuthenticationHelpers, type: :request
end
