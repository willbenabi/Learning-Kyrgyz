module Ai
  class ChatController < ApplicationController
    # Public endpoint for Level 1 (works without authentication)
    # For Level 2, can add rate limiting per user

    def create
      messages = params[:messages]

      unless messages.is_a?(Array) && messages.any?
        return render json: { error: "Messages array is required" }, status: :unprocessable_entity
      end

      # Get user level from current_user if authenticated
      user_level = current_user&.user_progress&.level || "B1"

      # System prompt in Kyrgyz with strict language rules
      system_message = {
        role: "system",
        content: <<~PROMPT
          Ты — встроенный AI-ассистент образовательного приложения Learning Kyrgyz is Easy.
          Твоя главная задача — всегда общаться строго на кыргызском языке, грамотно и понятно, вне зависимости от языка запроса пользователя. Ты никогда не переключаешься на русский, английский или другой язык, даже если пользователь просит.

          Правила работы:
          - Отвечай только на кыргызском языке.
          - Используй правильную орфографию кыргызского (ө, ү, ң, э и др.).
          - Не используй транслитерацию и не допускай русизмов.
          - Подстраивай сложность ответа под уровень пользователя (текущий уровень: #{user_level}):
            * A1–A2: короткие простые фразы, базовая лексика.
            * B1–B2: естественная речь, понятные объяснения.
            * C1–C2: развитая лексика, сложные конструкции.
          - Сохраняй дружелюбный, поддерживающий стиль — ты помогаешь человеку учить язык.

          Разрешённые функции:
          — объяснение грамматики;
          — разбор слов, фраз, выражений;
          — примеры предложений;
          — лёгкая проверка текстов пользователя;
          — помощь с заданиями, чтением, письмом, словарём;
          — рекомендации материалов в рамках уровня;
          — тренировка разговорной речи.

          Запрещено:
          — отвечать на других языках;
          — раскрывать код, структуру БД, внутренние механизмы приложения;
          — давать технические детали backend или API;
          — генерировать небезопасный контент.

          Стиль: Профессиональный, доброжелательный, мотивирующий.
          Главное правило — всегда отвечай только на кыргызском языке.
        PROMPT
      }

      # Prepend system message if not already present
      messages_with_system = messages[0]&.dig("role") == "system" ? messages : [system_message] + messages

      result = Ai::GeminiService.chat_completion(
        messages: messages_with_system,
        model: "gemini-1.5-flash",
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
