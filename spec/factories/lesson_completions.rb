FactoryBot.define do
  factory :lesson_completion do
    association :user
    module_type { 'grammar' }
    sequence(:lesson_id) { |n| "a1_syntax_#{n}" }
    completed_at { Time.current }
    score { nil }
    time_spent { nil }
  end
end
