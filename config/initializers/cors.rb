# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # Allow requests from localhost for development
    origins "http://localhost:3000"

    resource "*",
      headers: :any,
      methods: [ :get, :post, :put, :patch, :delete, :options, :head ],
      expose: [ "Authorization" ],
      credentials: true
  end

  # For production, configure your domain
  if Rails.env.production?
    allow do
      # TODO: Replace with your production domain(s)
      origins "https://yourdomain.com"

      resource "/session*",
        headers: :any,
        methods: [ :get, :post, :delete, :options ],
        credentials: true

      resource "/api/*",
        headers: :any,
        methods: [ :get, :post, :put, :patch, :delete, :options, :head ],
        credentials: true
    end
  end
end
