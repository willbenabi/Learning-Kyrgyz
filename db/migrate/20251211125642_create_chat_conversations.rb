class CreateChatConversations < ActiveRecord::Migration[8.0]
  def change
    create_table :chat_conversations do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title
      t.datetime :last_message_at

      t.timestamps
    end

    add_index :chat_conversations, [:user_id, :last_message_at]
  end
end
