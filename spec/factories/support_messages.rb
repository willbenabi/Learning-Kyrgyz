FactoryBot.define do
  factory :support_message do
    association :user
    subject { "Technical Issue: #{Faker::Lorem.sentence}" }
    message { Faker::Lorem.paragraph(sentence_count: 5) }
    status { 'unread' }
    read_at { nil }

    trait :read do
      status { 'read' }
      read_at { Time.current }
    end

    trait :unread do
      status { 'unread' }
      read_at { nil }
    end
  end
end
