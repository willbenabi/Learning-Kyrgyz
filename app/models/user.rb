class User < ApplicationRecord
  has_secure_password

  # Audit trail for tracking changes
  audited

  # Associations
  has_many :refresh_tokens, dependent: :destroy
  has_one :user_preference, dependent: :destroy
  has_one_attached :avatar

  # Validations
  validates :email, presence: true,
                    uniqueness: { case_sensitive: false },
                    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :name, presence: true, length: { minimum: 2, maximum: 100 }
  validates :password, length: { minimum: 8 }, if: :password_digest_changed?
  validates :role, inclusion: { in: %w[user admin super_admin] }
  validates :avatar, content_type: { in: %w[image/png image/jpg image/jpeg image/gif],
                                     message: "must be a PNG, JPG, or GIF image" },
                     size: { less_than: 5.megabytes, message: "must be less than 5MB" },
                     if: -> { avatar.attached? }

  # Callbacks
  before_save :normalize_email

  # Role constants
  ROLES = %w[user admin super_admin].freeze

  # Ransack configuration - only allow searching on safe attributes
  def self.ransackable_attributes(auth_object = nil)
    %w[id name email role super_admin created_at updated_at]
  end

  # Ransack associations - empty for now, add as needed
  def self.ransackable_associations(auth_object = nil)
    []
  end

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
    role == "admin" || role == "super_admin"
  end

  private

  def normalize_email
    self.email = email.downcase.strip if email.present?
  end
end
