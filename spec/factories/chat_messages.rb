FactoryBot.define do
  factory :chat_message do
    association :chat_conversation
    role { "user" }
    content { "Test message content" }

    trait :assistant do
      role { "assistant" }
    end

    trait :system do
      role { "system" }
    end
  end
end
