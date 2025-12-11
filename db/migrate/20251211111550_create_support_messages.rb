class CreateSupportMessages < ActiveRecord::Migration[8.0]
  def change
    create_table :support_messages do |t|
      t.references :user, null: false, foreign_key: true
      t.string :subject, null: false
      t.text :message, null: false
      t.string :status, null: false, default: 'unread'
      t.datetime :read_at

      t.timestamps
    end

    add_index :support_messages, :status
    add_index :support_messages, :read_at
  end
end
