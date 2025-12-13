module Ai
  class OpenaiService
    BASE_URL = "https://api.openai.com/v1"

    class << self
      def chat_completion(messages:, model: "gpt-4o-mini", temperature: 0.7)
        response = connection.post("chat/completions") do |req|
          req.body = {
            model: model,
            messages: messages,
            temperature: temperature,
            max_tokens: 1000
          }.to_json
        end

        if response.success?
          response.body
        else
          Rails.logger.error("OpenAI API Error: #{response.status} - #{response.body}")
          { error: "Failed to get response from AI", status: response.status }
        end
      rescue StandardError => e
        Rails.logger.error("OpenAI Service Error: #{e.message}")
        { error: e.message }
      end

      private

      def connection
        @connection ||= Faraday.new(url: BASE_URL) do |faraday|
          faraday.request :json
          faraday.response :json
          faraday.headers["Authorization"] = "Bearer #{api_key}"
          faraday.headers["OpenAI-Organization"] = organization_id if organization_id.present?
          faraday.headers["OpenAI-Project"] = project_id if project_id.present?
          faraday.headers["Content-Type"] = "application/json"
          faraday.adapter Faraday.default_adapter
        end
      end

      def api_key
        ENV["OPENAI_API_KEY"] || Rails.application.credentials.dig(:openai, :api_key)
      end

      def organization_id
        ENV["OPENAI_ORGANIZATION_ID"] || Rails.application.credentials.dig(:openai, :organization_id)
      end

      def project_id
        ENV["OPENAI_PROJECT_ID"] || Rails.application.credentials.dig(:openai, :project_id)
      end
    end
  end
end
