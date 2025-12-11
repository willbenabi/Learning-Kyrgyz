FactoryBot.define do
  factory :chat_message do
    chat_conversation { nil }
    role { "MyString" }
    content { "MyText" }
  end
end
