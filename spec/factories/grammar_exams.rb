FactoryBot.define do
  factory :grammar_exam do
    association :user
    level { 'A1' }
    score { 75 }
    attempted_at { Time.current }
    time_spent_seconds { 1800 } # 30 minutes
    answers do
      [
        {
          'question_id' => 1,
          'category' => 'syntax',
          'selected_index' => 0,
          'correct_index' => 0,
          'correct' => true
        },
        {
          'question_id' => 2,
          'category' => 'morphology',
          'selected_index' => 1,
          'correct_index' => 2,
          'correct' => false
        }
      ]
    end

    trait :passing do
      score { 85 }
    end

    trait :failing do
      score { 65 }
    end

    trait :perfect do
      score { 100 }
    end

    trait :a2_level do
      level { 'A2' }
    end

    trait :b1_level do
      level { 'B1' }
    end
  end

  factory :grammar_exam_question do
    level { 'A1' }
    category { 'syntax' }
    question_text { 'Мен ___ бараам.' }
    options do
      {
        'en' => ['to school', 'to home', 'to work', 'to store'],
        'ru' => ['в школу', 'домой', 'на работу', 'в магазин']
      }
    end
    correct_answer_index { 0 }
    explanation { 'This tests basic sentence structure with direction.' }

    trait :morphology do
      category { 'morphology' }
      question_text { 'Китептер___ окуйм.' }
      explanation { 'This tests plural noun formation.' }
    end

    trait :a2_level do
      level { 'A2' }
    end

    trait :b1_level do
      level { 'B1' }
    end

    trait :no_explanation do
      explanation { nil }
    end
  end
end
