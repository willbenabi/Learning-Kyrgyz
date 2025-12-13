class CreateGrammarExamQuestions < ActiveRecord::Migration[8.0]
  def change
    create_table :grammar_exam_questions do |t|
      t.string :level, null: false
      t.string :category, null: false
      t.text :question_text, null: false
      t.text :options, null: false
      t.integer :correct_answer_index, null: false
      t.text :explanation

      t.timestamps
    end

    add_index :grammar_exam_questions, :level
    add_index :grammar_exam_questions, :category
  end
end
