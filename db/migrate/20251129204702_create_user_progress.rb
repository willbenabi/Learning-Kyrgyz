class CreateUserProgress < ActiveRecord::Migration[8.0]
  def change
    create_table :user_progresses do |t|
      t.references :user, null: false, foreign_key: true, index: { unique: true }
      t.string :level, null: false, default: 'A1'
      t.integer :days_active, null: false, default: 0
      t.integer :lessons_completed, null: false, default: 0
      t.integer :vocabulary_count, null: false, default: 0
      t.integer :current_streak, null: false, default: 0
      t.integer :longest_streak, null: false, default: 0
      t.date :last_activity_date

      t.timestamps
    end
  end
end
