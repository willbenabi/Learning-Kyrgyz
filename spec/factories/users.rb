FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    sequence(:email) { |n| "user#{n}@example.com" }
    password { "password123" }
    password_confirmation { "password123" }
    role { "user" }
    super_admin { false }

    trait :admin do
      role { "admin" }
    end

    trait :super_admin do
      role { "super_admin" }
      super_admin { true }
    end
  end
end
