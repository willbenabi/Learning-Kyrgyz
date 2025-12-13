module GrammarExams
  class SubmitExam < ActiveInteraction::Base
    object :user, class: User
    string :level
    array :answers do
      hash strip: false do
        integer :question_id
        integer :selected_index
      end
    end
    integer :time_spent_seconds, default: nil

    validates :level, inclusion: { in: %w[A1 A2 B1 B2 C1] }
    validates :answers, length: { is: 35, message: 'must contain exactly 35 answers' }

    def execute
      # Get all questions
      question_ids = answers.map { |a| a[:question_id] }
      questions = GrammarExamQuestion.where(id: question_ids).index_by(&:id)

      # Grade each answer
      graded_answers = answers.map do |answer|
        question = questions[answer[:question_id]]
        next nil unless question

        is_correct = question.correct_answer_index == answer[:selected_index]

        {
          question_id: question.id,
          category: question.category,
          question_text: question.question_text,
          selected_index: answer[:selected_index],
          correct_index: question.correct_answer_index,
          options: question.options,
          explanation: question.explanation,
          correct: is_correct
        }
      end.compact

      # Calculate score
      correct_count = graded_answers.count { |a| a[:correct] }
      score_percentage = ((correct_count.to_f / 35) * 100).round

      # Save exam attempt
      exam = user.grammar_exams.create!(
        level: level,
        score: score_percentage,
        attempted_at: Time.current,
        time_spent_seconds: time_spent_seconds,
        answers: graded_answers
      )

      # Return results
      {
        exam_id: exam.id,
        score: score_percentage,
        correct_count: correct_count,
        total_questions: 35,
        passed: score_percentage >= 70,
        category_breakdown: exam.category_breakdown,
        graded_answers: graded_answers,
        time_spent: time_spent_seconds
      }
    end
  end
end
