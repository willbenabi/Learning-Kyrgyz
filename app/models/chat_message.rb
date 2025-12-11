class ChatMessage < ApplicationRecord
  belongs_to :chat_conversation

  validates :role, presence: true, inclusion: { in: %w[user assistant system] }
  validates :content, presence: true

  scope :chronological, -> { order(created_at: :asc) }

  after_create :update_conversation_timestamp

  private

  def update_conversation_timestamp
    chat_conversation.update_last_message_time!
  end
end
