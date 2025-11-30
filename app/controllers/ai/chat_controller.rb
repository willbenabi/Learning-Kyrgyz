module Ai
  class ChatController < ApplicationController
    # Public endpoint for Level 1 (works without authentication)
    # For Level 2, can add rate limiting per user

    def create
      messages = params[:messages]

      unless messages.is_a?(Array) && messages.any?
        return render json: { error: "Messages array is required" }, status: :unprocessable_entity
      end

      # Add system prompt for Kyrgyz language learning context
      system_message = {
        role: "system",
        content: "You are a helpful Kyrgyz language learning assistant. You help students practice Kyrgyz, answer grammar questions, explain vocabulary, and have conversations in Kyrgyz. Be encouraging and patient. Provide translations and explanations in both English and Russian when needed."
      }

      # Prepend system message if not already present
      messages_with_system = messages[0]&.dig("role") == "system" ? messages : [system_message] + messages

      result = Ai::OpenaiService.chat_completion(
        messages: messages_with_system,
        model: "gpt-4o-mini",
        temperature: 0.7
      )

      if result[:error]
        render json: { error: result[:error] }, status: :service_unavailable
      else
        render json: {
          message: result.dig("choices", 0, "message", "content"),
          usage: result["usage"]
        }
      end
    rescue StandardError => e
      Rails.logger.error("Chat Controller Error: #{e.message}")
      render json: { error: "An error occurred while processing your request" }, status: :internal_server_error
    end
  end
end
