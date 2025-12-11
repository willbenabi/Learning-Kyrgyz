FactoryBot.define do
  factory :daily_recommendation do
    level { "MyString" }
    date { "2025-12-11" }
    content_type { "MyString" }
    title { "MyString" }
    description { "MyText" }
    url { "MyString" }
    generated_by_ai { false }
  end
end
