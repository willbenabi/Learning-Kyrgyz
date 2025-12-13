# == Schema Information
#
# Table name: grammar_exam_questions
#
#  id                    :integer          not null, primary key
#  category              :string           not null
#  correct_answer_index  :integer          not null
#  explanation           :text
#  level                 :string           not null
#  options               :text             not null
#  question_text         :text             not null
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#
# Indexes
#
#  index_grammar_exam_questions_on_category  (category)
#  index_grammar_exam_questions_on_level     (level)
#
class GrammarExamQuestion < ApplicationRecord
  validates :level, presence: true, inclusion: { in: %w[A1 A2 B1 B2 C1] }
  validates :category, presence: true, inclusion: { in: %w[syntax morphology] }
  validates :question_text, presence: true
  validates :options, presence: true
  validates :correct_answer_index, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 3 }

  serialize :options, coder: JSON

  validate :options_must_have_four_items

  scope :by_level, ->(level) { where(level: level) }
  scope :by_category, ->(category) { where(category: category) }
  scope :random_order, -> { order('RANDOM()') }

  # Generate exam questions for a specific level (35 questions)
  def self.generate_exam_questions(level)
    by_level(level).random_order.limit(35)
  end

  # Format question for exam display
  def formatted_for_exam
    {
      id: id,
      category: category,
      question: question_text,
      options: options,
      correct_index: correct_answer_index,
      explanation: explanation
    }
  end

  private

  def options_must_have_four_items
    return unless options.is_a?(Hash)

    %w[en ru].each do |lang|
      unless options[lang].is_a?(Array) && options[lang].length == 4
        errors.add(:options, "must have 4 #{lang} options")
      end
    end
  end
end
