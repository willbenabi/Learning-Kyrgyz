module Ai
  class RecommendationGenerator
    LEVEL_PROMPTS = {
      'A1' => 'Порекомендуй 5-6 простых материалов на кыргызском языке для начинающих (уровень A1): детские сказки, простые песни, мультфильмы. Для каждого материала укажи: тип (reading/listening/watching), название, краткое описание (1-2 предложения), и если возможно - ссылку на ресурс.',
      'A2' => 'Порекомендуй 5-6 материалов на кыргызском языке для элементарного уровня (A2): народные сказки, простые рассказы, детские передачи, простые новости. Для каждого материала укажи: тип (reading/listening/watching), название, краткое описание (1-2 предложения), и если возможно - ссылку на ресурс.',
      'B1' => 'Порекомендуй 5-6 материалов на кыргызском языке для среднего уровня (B1): короткие рассказы, новости, документальные фильмы, подкасты. Для каждого материала укажи: тип (reading/listening/watching), название, краткое описание (1-2 предложения), и если возможно - ссылку на ресурс.',
      'B2' => 'Порекомендуй 5-6 материалов на кыргызском языке для продвинутого среднего уровня (B2): повести, аналитические статьи, художественные фильмы, радиопередачи. Для каждого материала укажи: тип (reading/listening/watching), название, краткое описание (1-2 предложения), и если возможно - ссылку на ресурс.',
      'C1' => 'Порекомендуй 5-6 сложных материалов на кыргызском языке для продвинутого уровня (C1): классическая литература (Айтматов, Манас), академические лекции, театральные постановки, серьезные документальные фильмы. Для каждого материала укажи: тип (reading/listening/watching), название, краткое описание (1-2 предложения), и если возможно - ссылку на ресурс.'
    }.freeze

    def self.generate_for_level(level)
      prompt = LEVEL_PROMPTS[level]
      return [] unless prompt

      system_message = {
        role: 'system',
        content: <<~PROMPT
          Ты эксперт по кыргызскому языку и культуре. Твоя задача - рекомендовать качественные материалы на кыргызском языке для изучения.

          Формат ответа должен быть строго JSON массивом с такой структурой:
          [
            {
              "type": "reading" или "listening" или "watching",
              "title": "Название материала",
              "description": "Краткое описание (1-2 предложения)",
              "url": "Ссылка (если есть) или null"
            }
          ]

          Важно:
          - Возвращай только валидный JSON, без дополнительного текста
          - Давай реальные, существующие материалы
          - Если ссылки нет - ставь null
          - Описание должно быть кратким и понятным
        PROMPT
      }

      user_message = {
        role: 'user',
        content: prompt
      }

      result = Ai::GeminiService.chat_completion(
        messages: [system_message, user_message],
        model: 'gemini-2.0-flash',
        temperature: 0.8
      )

      if result[:error]
        Rails.logger.error("AI Recommendation Generation Error: #{result[:error]}")
        return []
      end

      response_text = result.dig('choices', 0, 'message', 'content')
      parse_recommendations(response_text, level)
    rescue StandardError => e
      Rails.logger.error("Recommendation Generator Error: #{e.message}")
      []
    end

    def self.generate_for_all_levels(date = Date.current)
      recommendations_created = 0

      DailyRecommendation::LEVELS.each do |level|
        # Skip if recommendations already exist for this level and date
        next if DailyRecommendation.for_level_and_date(level, date).exists?

        recommendations = generate_for_level(level)

        recommendations.each do |rec|
          DailyRecommendation.create!(
            level: level,
            date: date,
            content_type: rec[:type],
            title: rec[:title],
            description: rec[:description],
            url: rec[:url],
            generated_by_ai: true
          )
          recommendations_created += 1
        end

        # Small delay to avoid rate limiting
        sleep(2)
      end

      Rails.logger.info("Generated #{recommendations_created} recommendations for #{date}")
      recommendations_created
    end

    private

    def self.parse_recommendations(response_text, level)
      # Try to extract JSON from response
      json_match = response_text.match(/\[.*\]/m)
      return [] unless json_match

      json_text = json_match[0]
      parsed = JSON.parse(json_text, symbolize_names: true)

      # Validate and normalize
      parsed.map do |rec|
        {
          type: normalize_type(rec[:type]),
          title: rec[:title].to_s.strip,
          description: rec[:description].to_s.strip,
          url: rec[:url]&.strip.presence
        }
      end.select { |rec| rec[:type] && rec[:title].present? && rec[:description].present? }
    rescue JSON::ParserError => e
      Rails.logger.error("Failed to parse AI response as JSON: #{e.message}")
      []
    end

    def self.normalize_type(type)
      type = type.to_s.downcase
      return 'reading' if type.include?('read')
      return 'listening' if type.include?('listen')
      return 'watching' if type.include?('watch')
      nil
    end
  end
end
