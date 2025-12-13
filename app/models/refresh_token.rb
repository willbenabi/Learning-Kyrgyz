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
class RefreshToken < ApplicationRecord
  belongs_to :user

  # Validations
  validates :token_digest, presence: true
  validates :expires_at, presence: true

  # Scopes
  scope :active, -> { where(revoked_at: nil).where("expires_at > ?", Time.current) }

  # Virtual attribute for the plain token
  attr_accessor :token

  # Generate and store token
  def generate_token
    self.token = SecureRandom.urlsafe_base64(32)
    self.token_digest = BCrypt::Password.create(token)
    self
  end

  # Check if token is active
  def active?
    revoked_at.nil? && expires_at > Time.current
  end

  # Revoke token
  def revoke!
    update!(revoked_at: Time.current)
  end
end
