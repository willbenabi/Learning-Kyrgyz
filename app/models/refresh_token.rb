class RefreshToken < ApplicationRecord
  belongs_to :user

  # Validations
  validates :token_digest, presence: true
  validates :expires_at, presence: true

  # Scopes
  scope :active, -> { where(revoked_at: nil).where('expires_at > ?', Time.current) }

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
