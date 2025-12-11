module Ai
  class WritingEvaluator
    def self.evaluate(text:, prompt_title:, level:, language:)
      system_message = {
        role: 'system',
        content: build_system_prompt(language)
      }

      user_message = {
        role: 'user',
        content: build_user_prompt(text, prompt_title, level, language)
      }

      result = Ai::GeminiService.chat_completion(
        messages: [system_message, user_message],
        model: 'gemini-2.0-flash',
        temperature: 0.3
      )

      if result[:error]
        Rails.logger.error("AI Writing Evaluation Error: #{result[:error]}")
        return { error: result[:error] }
      end

      response_text = result.dig('choices', 0, 'message', 'content')
      parse_evaluation(response_text, language)
    rescue StandardError => e
      Rails.logger.error("Writing Evaluator Error: #{e.message}")
      { error: e.message }
    end

    private

    def self.build_system_prompt(language)
      if language == 'ru'
        <<~PROMPT
          Ты эксперт по кыргызскому языку. Твоя задача - оценить письменный текст на кыргызском языке и дать конструктивную обратную связь.

          Формат ответа должен быть строго JSON с такой структурой:
          {
            "grammar_score": 0-100,
            "topic_relevance_score": 0-100,
            "vocabulary_score": 0-100,
            "structure_score": 0-100,
            "overall_feedback": "Общая оценка текста (2-3 предложения)",
            "grammar_errors": [
              {
                "error": "Ошибочное слово или фраза",
                "correction": "Правильный вариант",
                "explanation": "Почему это ошибка и как правильно"
              }
            ],
            "suggestions": [
              "Рекомендация 1 по улучшению",
              "Рекомендация 2 по улучшению"
            ]
          }

          КРИТИЧЕСКИ ВАЖНО:
          - Возвращай только валидный JSON, без дополнительного текста
          - Все тексты (overall_feedback, explanation, suggestions) должны быть на русском языке
          - Будь конструктивным и поддерживающим
          - Указывай только реальные ошибки
          - Давай конкретные примеры в рекомендациях
        PROMPT
      else
        <<~PROMPT
          You are an expert in the Kyrgyz language. Your task is to evaluate written text in Kyrgyz and provide constructive feedback.

          The response format must be strictly JSON with this structure:
          {
            "grammar_score": 0-100,
            "topic_relevance_score": 0-100,
            "vocabulary_score": 0-100,
            "structure_score": 0-100,
            "overall_feedback": "Overall text evaluation (2-3 sentences)",
            "grammar_errors": [
              {
                "error": "Incorrect word or phrase",
                "correction": "Correct version",
                "explanation": "Why this is an error and how to fix it"
              }
            ],
            "suggestions": [
              "Recommendation 1 for improvement",
              "Recommendation 2 for improvement"
            ]
          }

          CRITICALLY IMPORTANT:
          - Return only valid JSON, without additional text
          - All texts (overall_feedback, explanation, suggestions) must be in English
          - Be constructive and supportive
          - Point out only real errors
          - Give specific examples in recommendations
        PROMPT
      end
    end

    def self.build_user_prompt(text, prompt_title, level, language)
      if language == 'ru'
        <<~PROMPT
          Оцени следующий текст на кыргызском языке:

          Задание: #{prompt_title}
          Уровень ученика: #{level}

          Текст:
          #{text}

          Оцени текст по следующим критериям:
          1. Грамматика (0-100): правильность грамматических конструкций
          2. Соответствие теме (0-100): насколько текст отвечает на задание
          3. Словарный запас (0-100): разнообразие и уместность слов
          4. Структура (0-100): организация и связность текста

          Укажи конкретные грамматические ошибки (если есть) с исправлениями.
          Дай 2-3 рекомендации по улучшению текста.
        PROMPT
      else
        <<~PROMPT
          Evaluate the following text in Kyrgyz:

          Task: #{prompt_title}
          Student level: #{level}

          Text:
          #{text}

          Evaluate the text according to these criteria:
          1. Grammar (0-100): correctness of grammatical constructions
          2. Topic relevance (0-100): how well the text addresses the task
          3. Vocabulary (0-100): diversity and appropriateness of words
          4. Structure (0-100): organization and coherence of the text

          Point out specific grammar errors (if any) with corrections.
          Give 2-3 recommendations for improving the text.
        PROMPT
      end
    end

    def self.parse_evaluation(response_text, language)
      # Try to extract JSON from response
      json_match = response_text.match(/\{.*\}/m)
      return default_error(language) unless json_match

      json_text = json_match[0]
      parsed = JSON.parse(json_text, symbolize_names: true)

      # Validate and return
      {
        grammar_score: parsed[:grammar_score].to_i,
        topic_relevance_score: parsed[:topic_relevance_score].to_i,
        vocabulary_score: parsed[:vocabulary_score].to_i,
        structure_score: parsed[:structure_score].to_i,
        overall_feedback: parsed[:overall_feedback].to_s,
        grammar_errors: parsed[:grammar_errors] || [],
        suggestions: parsed[:suggestions] || []
      }
    rescue JSON::ParserError => e
      Rails.logger.error("Failed to parse AI evaluation response: #{e.message}")
      default_error(language)
    end

    def self.default_error(language)
      if language == 'ru'
        {
          error: 'Не удалось получить оценку от AI. Попробуйте еще раз.'
        }
      else
        {
          error: 'Failed to get evaluation from AI. Please try again.'
        }
      end
    end
  end
end
