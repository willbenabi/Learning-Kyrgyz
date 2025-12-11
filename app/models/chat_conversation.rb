class ChatConversation < ApplicationRecord
  belongs_to :user
  has_many :chat_messages, dependent: :destroy

  validates :user, presence: true

  scope :recent, -> { order(last_message_at: :desc) }
  scope :for_user, ->(user) { where(user: user) }

  def update_last_message_time!
    update!(last_message_at: Time.current)
  end

  def generate_title_from_first_message
    first_message = chat_messages.where(role: 'user').first
    return 'New Conversation' unless first_message

    # Take first 50 characters of first user message as title
    first_message.content.truncate(50, omission: '...')
  end
end
