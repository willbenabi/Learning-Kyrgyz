module GrammarExams
  class GenerateExam < ActiveInteraction::Base
    string :level

    validates :level, inclusion: { in: %w[A1 A2 B1 B2 C1] }

    def execute
      questions = GrammarExamQuestion.generate_exam_questions(level)

      if questions.count < 35
        errors.add(:base, "Not enough questions available for #{level} level")
        return
      end

      # Format questions for frontend (without correct answers)
      questions.map do |q|
        {
          id: q.id,
          category: q.category,
          question: q.question_text,
          options: q.options
        }
      end
    end
  end
end
