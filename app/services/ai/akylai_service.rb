module Ai
  class AkylaiService
    BASE_URL = "https://api.akylai.kg/v1"

    class << self
      def chat_completion(messages:, model: "gpt-4", temperature: 0.7, max_tokens: 1000)
        response = connection.post("chat/completions") do |req|
          req.headers["Authorization"] = "Bearer #{api_key}"
          req.body = {
            model: model,
            messages: messages,
            temperature: temperature,
            max_tokens: max_tokens
          }.to_json
        end

        if response.success?
          parse_response(response.body)
        else
          Rails.logger.error("AkylAI API Error: #{response.status} - #{response.body}")
          { error: "Failed to get response from AI", status: response.status }
        end
      rescue StandardError => e
        Rails.logger.error("AkylAI Service Error: #{e.message}")
        { error: e.message }
      end

      private

      def connection
        @connection ||= Faraday.new(url: BASE_URL) do |faraday|
          faraday.request :json
          faraday.response :json
          faraday.headers["Content-Type"] = "application/json"
          faraday.adapter Faraday.default_adapter
        end
      end

      def api_key
        ENV["AKYLAI_API_KEY"] || "AQ.Ab8RN6L2A0MHJgcD_oA7Vphl6Y2IKNYbceBxuDAuxp1xXo6IBA"
      end

      # Parse AkylAI response (OpenAI-compatible format)
      def parse_response(body)
        data = JSON.parse(body) if body.is_a?(String)
        data = body unless body.is_a?(String)

        # Validate response structure
        choices = data["choices"]
        raise "Invalid response structure: missing choices" if choices.nil? || choices.empty?

        message = choices[0]["message"]
        raise "Invalid response structure: missing message" if message.nil?

        # Return in standard format
        {
          "choices" => [
            {
              "message" => {
                "role" => message["role"] || "assistant",
                "content" => message["content"]
              }
            }
          ],
          "usage" => data["usage"] || {
            "prompt_tokens" => 0,
            "completion_tokens" => 0,
            "total_tokens" => 0
          }
        }
      rescue StandardError => e
        Rails.logger.error("AkylAI Response Parse Error: #{e.message}")
        { error: "Failed to parse AI response" }
      end
    end
  end
end
