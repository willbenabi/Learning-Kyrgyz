class SupportMessage < ApplicationRecord
  audited

  belongs_to :user

  validates :subject, presence: true, length: { maximum: 255 }
  validates :message, presence: true
  validates :status, presence: true, inclusion: { in: %w[unread read] }

  scope :unread, -> { where(status: 'unread') }
  scope :read, -> { where(status: 'read') }
  scope :recent, -> { order(created_at: :desc) }

  def mark_as_read!
    update!(status: 'read', read_at: Time.current)
  end

  def unread?
    status == 'unread'
  end

  def read?
    status == 'read'
  end

  def self.ransackable_attributes(auth_object = nil)
    %w[id subject message status created_at updated_at user_id]
  end

  def self.ransackable_associations(auth_object = nil)
    %w[user]
  end
end
