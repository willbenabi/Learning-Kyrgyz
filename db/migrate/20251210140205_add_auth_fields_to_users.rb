class AddAuthFieldsToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :username, :string
    add_column :users, :interface_language, :string, default: 'en'
    add_column :users, :last_sign_in_at, :datetime

    add_index :users, :username, unique: true
  end
end
