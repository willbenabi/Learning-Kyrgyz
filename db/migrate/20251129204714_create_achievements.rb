class CreateAchievements < ActiveRecord::Migration[8.0]
  def change
    create_table :achievements do |t|
      t.references :user, null: false, foreign_key: true
      t.string :achievement_type, null: false
      t.string :title, null: false
      t.text :description
      t.datetime :earned_at, null: false
      t.json :metadata, default: {}

      t.timestamps
    end

    add_index :achievements, [:user_id, :achievement_type], unique: true
    add_index :achievements, :earned_at
  end
end
