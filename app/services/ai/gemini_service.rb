module Ai
  class GeminiService
    BASE_URL = "https://generativelanguage.googleapis.com/v1beta"

    class << self
      def chat_completion(messages:, model: "gemini-1.5-flash-latest", temperature: 0.7)
        # Convert OpenAI-style messages to Gemini format
        gemini_contents = convert_messages_to_gemini_format(messages)

        response = connection.post("models/#{model}:generateContent") do |req|
          req.params["key"] = api_key
          req.body = {
            contents: gemini_contents,
            generationConfig: {
              temperature: temperature,
              maxOutputTokens: 1000
            }
          }.to_json
        end

        if response.success?
          parse_gemini_response(response.body)
        else
          Rails.logger.error("Gemini API Error: #{response.status} - #{response.body}")
          { error: "Failed to get response from AI", status: response.status }
        end
      rescue StandardError => e
        Rails.logger.error("Gemini Service Error: #{e.message}")
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
        ENV["GOOGLE_GEMINI_API_KEY"] || ENV["GEMINI_API_KEY"] || "AQ.Ab8RN6L2A0MHJgcD_oA7Vphl6Y2IKNYbceBxuDAuxp1xXo6IBA" || Rails.application.credentials.dig(:gemini, :api_key)
      end

      # Convert OpenAI message format to Gemini format
      # OpenAI: [{ role: "user", content: "text" }]
      # Gemini: [{ role: "user", parts: [{ text: "text" }] }]
      def convert_messages_to_gemini_format(messages)
        # Gemini uses "user" and "model" roles (not "assistant")
        # System messages are prepended to first user message
        system_content = []
        conversation = []

        messages.each do |msg|
          role = msg["role"] || msg[:role]
          content = msg["content"] || msg[:content]

          case role
          when "system"
            system_content << content
          when "user"
            # If we have system content, prepend it to first user message
            if system_content.any?
              combined_content = system_content.join("\n\n") + "\n\n" + content
              conversation << { role: "user", parts: [{ text: combined_content }] }
              system_content = [] # Clear after using
            else
              conversation << { role: "user", parts: [{ text: content }] }
            end
          when "assistant"
            conversation << { role: "model", parts: [{ text: content }] }
          end
        end

        conversation
      end

      # Parse Gemini response to match OpenAI format
      def parse_gemini_response(body)
        data = JSON.parse(body) if body.is_a?(String)
        data = body unless body.is_a?(String)

        # Gemini response structure:
        # { candidates: [{ content: { parts: [{ text: "..." }] } }] }
        text = data.dig("candidates", 0, "content", "parts", 0, "text")

        # Raise error if text is nil (invalid response structure)
        raise "Invalid response structure: missing text content" if text.nil?

        # Return in OpenAI-compatible format
        {
"choices" => [
            {
              "message" => {
                "role" => "assistant",
                "content" => text
              }
            }
          ],
          "usage" => {
            "prompt_tokens" => data.dig("usageMetadata", "promptTokenCount") || 0,
            "completion_tokens" => data.dig("usageMetadata", "candidatesTokenCount") || 0,
            "total_tokens" => data.dig("usageMetadata", "totalTokenCount") || 0
          }
        }
      rescue StandardError => e
        Rails.logger.error("Gemini Response Parse Error: #{e.message}")
        { error: "Failed to parse AI response" }
      end
    end
  end
end
