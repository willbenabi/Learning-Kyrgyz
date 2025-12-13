class CreateGrammarExams < ActiveRecord::Migration[8.0]
  def change
    create_table :grammar_exams do |t|
      t.references :user, null: false, foreign_key: true
      t.string :level, null: false
      t.integer :score, null: false
      t.datetime :attempted_at, null: false
      t.integer :time_spent_seconds
      t.text :answers, null: false

      t.timestamps
    end

    add_index :grammar_exams, [:user_id, :level]
    add_index :grammar_exams, :attempted_at
  end
end
