# == Schema Information
#
# Table name: refresh_tokens
#
#  id           :integer          not null, primary key
#  expires_at   :datetime         not null
#  revoked_at   :datetime
#  token_digest :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :integer          not null
#
# Indexes
#
#  index_refresh_tokens_on_token_digest  (token_digest)
#  index_refresh_tokens_on_user_id       (user_id)
#
# Foreign Keys
#
#  user_id  (user_id => users.id)
#
FactoryBot.define do
  factory :refresh_token do
    association :user
    token_digest { BCrypt::Password.create(SecureRandom.urlsafe_base64) }
    expires_at { 30.days.from_now }
    revoked_at { nil }
  end
end
