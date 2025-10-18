class User < ApplicationRecord
  has_secure_password

  # Associations
  has_many :refresh_tokens, dependent: :destroy
  has_one :user_preference, dependent: :destroy

  # Validations
  validates :email, presence: true,
                    uniqueness: { case_sensitive: false },
                    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :name, presence: true, length: { minimum: 2, maximum: 100 }
  validates :password, length: { minimum: 8 }, if: :password_digest_changed?
  validates :role, inclusion: { in: %w[user admin super_admin] }

  # Callbacks
  before_save :normalize_email

  # Role constants
  ROLES = %w[user admin super_admin].freeze

  # Password reset methods
  def generate_password_reset_token
    self.reset_password_token = SecureRandom.urlsafe_base64
    self.reset_password_digest = BCrypt::Password.create(reset_password_token)
    self.reset_password_sent_at = Time.current
    save!
    reset_password_token
  end

  def password_reset_expired?
    return true if reset_password_sent_at.nil?

    reset_password_sent_at < 2.hours.ago
  end

  def clear_password_reset
    self.reset_password_token = nil
    self.reset_password_digest = nil
    self.reset_password_sent_at = nil
    save!
  end

  # Role helper methods
  def admin_or_super_admin?
    role == 'admin' || role == 'super_admin'
  end

  private

  def normalize_email
    self.email = email.downcase.strip if email.present?
  end
end
