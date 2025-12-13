FactoryBot.define do
  factory :daily_recommendation do
    level { 'A1' }
    date { Date.current }
    content_type { 'watching' }
    resource_type { 'Video' }
    title { 'Test Recommendation' }
    description { 'Test description for recommendation' }
    url { 'https://www.youtube.com/watch?v=test123' }
    thumbnail_url { 'https://i.ytimg.com/vi/test123/mqdefault.jpg' }
    generated_by_ai { false }
  end
end
