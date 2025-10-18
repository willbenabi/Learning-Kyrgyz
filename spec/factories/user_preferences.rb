FactoryBot.define do
  factory :user_preference do
    association :user
    preferences { { 'sidebar_variant' => 'inset' } }
  end
end
