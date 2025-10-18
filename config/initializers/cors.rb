# CORS configuration for API endpoints
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # In development, allow localhost. In production, use ENV variable
    if Rails.env.production?
      origins ENV['ALLOWED_ORIGINS']&.split(',') || []
    else
      origins 'http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5173'
    end

    resource '/session*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true,
      expose: ['Authorization']

    resource '/password*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true

    resource '/api/*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true,
      expose: ['Authorization']
  end
end
