module Ai
  class RecommendationGenerator
    LEVEL_PROMPTS = {
      'A1' => 'Порекомендуй 5-6 простых материалов на кыргызском языке для начинающих (уровень A1) из этого списка проверенных РАБОЧИХ ссылок. ОБЯЗАТЕЛЬНО используй только эти ссылки, не придумывай свои:

1. https://www.youtube.com/watch?v=ijK0fOrCQfQ - Аудио сказки на кыргызском языке (идеально для начинающих, можно слушать перед сном)
2. https://www.youtube.com/watch?v=qWRJ59G7a0s - Кыргызский алфавит в песне (запоминающаяся мелодия для изучения букв)
3. https://www.youtube.com/watch?v=BuqbhMco6cU - Мультфильм "Манас" на кыргызском (только для русскоязычных, простые диалоги)
4. https://www.youtube.com/playlist?list=PL7SUs-CR73bA6ZxAz4D6p9LkRmyUouoy2 - Сериал "Козулар" (забавные истории, простой язык)
5. https://www.youtube.com/playlist?list=PLxaYXv_lS6skxGMdPWRxbIGguSIpf__jl - Загадки на кыргызском (развивает логику и словарный запас)
6. https://www.youtube.com/watch?v=jnHyVHr3c8Y - Урок фонетики (правильное произношение звуков)
7. https://www.youtube.com/watch?v=-w2bm3-6BFQ - Изучение алфавита (визуальное запоминание букв)
8. https://www.youtube.com/watch?v=4T1h5A_vapQ - Цвета на кыргызском (базовая лексика с примерами)
9. https://www.youtube.com/watch?v=gDFzZ_5zgPk - Числа на кыргызском (счет от 1 до 100)

ВАЖНО: Выбери 5-6 материалов из этого списка СЛУЧАЙНЫМ образом. Добавь краткое описание (1-2 предложения), которое заинтересует пользователя. Используй ТОЛЬКО эти ссылки, они все проверены и работают!',
      'A2' => 'Порекомендуй 5-6 материалов на кыргызском языке для элементарного уровня (A2) из этого списка проверенных РАБОЧИХ ссылок. ОБЯЗАТЕЛЬНО используй только эти ссылки, не придумывай свои:

1. https://www.youtube.com/watch?v=p1DiDyel_MU - Кыргызские народные сказки (простая лексика, увлекательный сюжет)
2. https://www.youtube.com/watch?v=Pbv2gSRK_SI - Пословицы и скороговорки (тренировка произношения)
3. https://www.50languages.com/em/learn/phrasebook-lessons/162/ky# - Полезный сайт для изучения слов (интерактивный разговорник)
4. https://www.youtube.com/playlist?list=PL735lKtYrX1Viacq5CDOi8Sanz9HVjyLK - Грамматика плейлист (систематическое изучение правил)
5. https://kyrgyz-audio.com/kichinekej-zhalbyrak-zhonyyndo-zhomok/ - Сказка для чтения (текст + аудио)
6. https://kyrgyz-audio.com/eski-yrlar/ - Старинные кыргызские песни (классическая музыка)
7. https://www.youtube.com/watch?v=sakI9YmvBpc - Современная кыргызская музыка (популярные песни)
8. https://www.youtube.com/watch?v=HpKnW_qCm_s&list=RDHpKnW_qCm_s&start_radio=1 - Песня "Эне тил" (о родном языке)
9. https://www.youtube.com/watch?v=7arLLmRZ3HE - Грамматика: члены предложения (синтаксис)
10. https://www.youtube.com/watch?v=G8sSCUqMfqw - Здоровый образ жизни (актуальная тематика)

ВАЖНО: Выбери 5-6 материалов из этого списка СЛУЧАЙНЫМ образом. Добавь краткое описание (1-2 предложения), которое заинтересует пользователя. Используй ТОЛЬКО эти ссылки, они все проверены и работают!',
      'B1' => 'Порекомендуй 5-6 материалов на кыргызском языке для среднего уровня (B1) из этого списка проверенных РАБОЧИХ ссылок. ОБЯЗАТЕЛЬНО используй только эти ссылки, не придумывай свои:

1. https://kyrgyz-audio.com/kyrgyz-el-zhomoktoru/ - Кыргызские народные сказки (аудио + текст)
2. https://www.youtube.com/watch?v=uktTDHfspfY - Видео "Как найти друга и как его сберечь?" (социальная тема)
3. https://www.youtube.com/watch?v=0NjBtUJ0dc0 - Грамматика: однородные члены предложения (синтаксис)
4. https://www.youtube.com/watch?v=rN2Nr_Vt_PE - Видео на тему "Описание" (описательная лексика)
5. https://www.youtube.com/watch?v=7ALPIons9NU&list=RD7ALPIons9NU&start_radio=1 - Песня "Мурас" (культурное наследие)
6. https://www.youtube.com/watch?v=ZLrdXAnzzXM&list=RDZLrdXAnzzXM&start_radio=1 - Гимн Кыргызстана (государственная символика)
7. https://www.youtube.com/watch?v=DUWr3QxGgWo&list=RDDUWr3QxGgWo&start_radio=1 - Песня "Молмолум" (современная музыка)
8. https://nazarnews.org/posts/djn-zhnnd-50-kyizyiktuu-faktyilar - 50 интересных фактов о Кыргызстане (познавательная статья)
9. https://new.bizdin.kg/media/books/Kyrgyz-El-Zhomoktor-zhyinagy.pdf - Народные сказки PDF (классическая литература)

ВАЖНО: Выбери 5-6 материалов из этого списка СЛУЧАЙНЫМ образом. Добавь краткое описание (1-2 предложения), которое заинтересует пользователя. Используй ТОЛЬКО эти ссылки, они все проверены и работают!',
      'B2' => 'Порекомендуй 5-6 материалов на кыргызском языке для продвинутого среднего уровня (B2) из этого списка проверенных РАБОЧИХ ссылок. ОБЯЗАТЕЛЬНО используй только эти ссылки, не придумывай свои:

1. https://sputnik.kg/news/ - Новости Кыргызстана (актуальные события)
2. https://www.youtube.com/playlist?list=PLKaleKo5i2XSNhuuZomz-sLzr_gIr4BO6 - Сериал "Мурас" (семейные традиции)
3. https://www.youtube.com/watch?v=50TJffdMlLE - Сериал "Контора" (комедия)
4. https://www.youtube.com/watch?v=xxEZPQ42P_A - Фильм "Полчан"
5. https://www.youtube.com/watch?v=UylgevQs8q0 - Фильм "Полчан 2"
6. https://www.youtube.com/watch?v=T0fL8C52Kpw - Фильм "Ханбийке" (исторический)
7. https://www.youtube.com/playlist?list=PL1qZ9EkahwvvxqKp6yiYZpSNlokw6F-iM - Сериал "Келинка"
8. https://www.youtube.com/watch?v=ecY2_Piw6zM - Сериал "Шерине"
9. https://loveread.ec/books.php?id_author=34 - Произведения Чынгыза Айтматова
10. https://eposmanas.ru/manas_kg/-446/-465/ - Эпос "Манас"
11. https://vostoka.ucoz.com/publ/1-1-0-2993 - Стихи Алыкула Осмонова
12. https://www.youtube.com/watch?v=xf8nAVyheis - Фильм "Буйиш"
13. https://www.okuma.kg/ - Электронная библиотека книг

ВАЖНО: Выбери 5-6 материалов из этого списка СЛУЧАЙНЫМ образом. Добавь краткое описание (1-2 предложения), которое заинтересует пользователя. Используй ТОЛЬКО эти ссылки, они все проверены и работают!',
      'C1' => 'Порекомендуй 5-6 сложных материалов на кыргызском языке для продвинутого уровня (C1) из этого списка проверенных РАБОЧИХ ссылок. ОБЯЗАТЕЛЬНО используй только эти ссылки, не придумывай свои:

1. https://sputnik.kg/news/ - Новости Кыргызстана (аналитические статьи)
2. https://www.youtube.com/playlist?list=PLKaleKo5i2XSNhuuZomz-sLzr_gIr4BO6 - Сериал "Мурас" (культурное наследие)
3. https://www.youtube.com/watch?v=50TJffdMlLE - Сериал "Контора" (современный язык)
4. https://www.youtube.com/watch?v=xxEZPQ42P_A - Фильм "Полчан"
5. https://www.youtube.com/watch?v=UylgevQs8q0 - Фильм "Полчан 2"
6. https://www.youtube.com/watch?v=T0fL8C52Kpw - Фильм "Ханбийке" (исторический контекст)
7. https://www.youtube.com/playlist?list=PL1qZ9EkahwvvxqKp6yiYZpSNlokw6F-iM - Сериал "Келинка"
8. https://www.youtube.com/watch?v=ecY2_Piw6zM - Сериал "Шерине"
9. https://loveread.ec/books.php?id_author=34 - Произведения Чынгыза Айтматова (классическая литература)
10. https://eposmanas.ru/manas_kg/-446/-465/ - Эпос "Манас" (национальный эпос)
11. https://vostoka.ucoz.com/publ/1-1-0-2993 - Стихи Алыкула Осмонова (поэзия)
12. https://www.youtube.com/watch?v=xf8nAVyheis - Фильм "Буйиш" (семейные ценности)
13. https://www.okuma.kg/ - Электронная библиотека книг (полная коллекция)

ВАЖНО: Выбери 5-6 материалов из этого списка СЛУЧАЙНЫМ образом. Добавь краткое описание (1-2 предложения), которое заинтересует пользователя. Используй ТОЛЬКО эти ссылки, они все проверены и работают!'
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
