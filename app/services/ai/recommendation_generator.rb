module Ai
  class RecommendationGenerator
    LEVEL_PROMPTS = {
      'A1' => 'Порекомендуй 5-6 простых материалов на кыргызском языке для начинающих (уровень A1): детские сказки, простые песни, мультфильмы. КРИТИЧЕСКИ ВАЖНО: давай только ПРЯМЫЕ рабочие ссылки на КОНКРЕТНЫЙ контент! Для YouTube - полная ссылка на конкретное видео (https://www.youtube.com/watch?v=...), для статей - прямая ссылка на статью, для книг - прямая ссылка на книгу с возможностью чтения. НЕ давай ссылки на главные страницы сайтов!',
      'A2' => 'Порекомендуй 5-6 материалов на кыргызском языке для элементарного уровня (A2): народные сказки, простые рассказы, детские передачи, простые новости. КРИТИЧЕСКИ ВАЖНО: только ПРЯМЫЕ ссылки на КОНКРЕТНЫЙ контент! YouTube - конкретное видео, не канал. Статьи - конкретная статья с полным URL. Книги - прямая ссылка на читаемый текст. Проверь, что каждая ссылка ведет к конкретному материалу!',
      'B1' => 'Порекомендуй 5-6 материалов на кыргызском языке для среднего уровня (B1): короткие рассказы, новости, документальные фильмы, подкасты. КРИТИЧЕСКИ ВАЖНО: только ПРЯМЫЕ ссылки! Для видео - youtube.com/watch?v=ID, для статей - полный URL статьи на 24.kg или Kaktus.media, для книг - okuma.kg/read/название или kitep.kg с конкретной книгой. НЕ давай общие ссылки на сайты!',
      'B2' => 'Порекомендуй 5-6 материалов на кыргызском языке для продвинутого среднего уровня (B2): повести, аналитические статьи, художественные фильмы, радиопередачи. КРИТИЧЕСКИ ВАЖНО: каждая ссылка должна вести к КОНКРЕТНОМУ материалу, который можно сразу читать/смотреть/слушать. Проверь формат: youtube.com/watch?v= для видео, полный URL статьи для чтения, прямая ссылка на книгу.',
      'C1' => 'Порекомендуй 5-6 сложных материалов на кыргызском языке для продвинутого уровня (C1): классическая литература (Айтматов, Манас), академические лекции, театральные постановки, серьезные документальные фильмы. КРИТИЧЕСКИ ВАЖНО: только ПРЯМЫЕ работающие ссылки на конкретный контент! Для книг Айтматова - okuma.kg/read/название-книги, для видео - youtube.com/watch?v=ID. Каждая ссылка должна открывать конкретный материал!'
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

          КРИТИЧЕСКИ ВАЖНО:
          - Возвращай только валидный JSON, без дополнительного текста
          - Давай ТОЛЬКО прямые ссылки на КОНКРЕТНЫЙ контент, не на главные страницы
          - Для YouTube: используй формат https://www.youtube.com/watch?v=VIDEO_ID (конкретное видео)
          - Для статей: полный URL конкретной статьи (например: https://24.kg/obschestvo/12345/название)
          - Для книг: прямая ссылка на читаемый текст (okuma.kg/read/название, kitep.kg/reader/...)
          - НЕ давай ссылки типа youtube.com/channel/..., kaktus.media/, azattyk.org/ без конкретной статьи
          - Проверь каждую ссылку: она должна открывать КОНКРЕТНЫЙ материал, готовый к просмотру/чтению
          - url никогда не должен быть null - всегда указывай конкретную рабочую ссылку
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
