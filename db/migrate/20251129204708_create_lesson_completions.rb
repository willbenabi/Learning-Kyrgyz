class CreateLessonCompletions < ActiveRecord::Migration[8.0]
  def change
    create_table :lesson_completions do |t|
      t.references :user, null: false, foreign_key: true
      t.string :module_type, null: false
      t.string :lesson_id, null: false
      t.datetime :completed_at, null: false
      t.integer :score
      t.integer :time_spent

      t.timestamps
    end

    add_index :lesson_completions, [:user_id, :module_type, :lesson_id], unique: true, name: 'index_lesson_completions_unique'
    add_index :lesson_completions, :completed_at
  end
end
