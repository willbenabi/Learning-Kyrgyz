FactoryBot.define do
  factory :user_progress do
    association :user
    level { 'A1' }
    days_active { 1 }
    lessons_completed { 0 }
    vocabulary_count { 0 }
    current_streak { 0 }
    longest_streak { 0 }
    last_activity_date { Date.current }
  end
end
