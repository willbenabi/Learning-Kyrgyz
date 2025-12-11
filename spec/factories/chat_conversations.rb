FactoryBot.define do
  factory :chat_conversation do
    association :user
    title { nil }
    last_message_at { Time.current }
  end
end
