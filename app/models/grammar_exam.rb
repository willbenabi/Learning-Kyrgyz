# == Schema Information
#
# Table name: grammar_exams
#
#  id                  :integer          not null, primary key
#  answers             :text             not null
#  attempted_at        :datetime         not null
#  level               :string           not null
#  score               :integer          not null
#  time_spent_seconds  :integer
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  user_id             :integer          not null
#
# Indexes
#
#  index_grammar_exams_on_attempted_at       (attempted_at)
#  index_grammar_exams_on_user_id            (user_id)
#  index_grammar_exams_on_user_id_and_level  (user_id,level)
#
class GrammarExam < ApplicationRecord
  belongs_to :user

  validates :level, presence: true, inclusion: { in: %w[A1 A2 B1 B2 C1] }
  validates :score, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 100 }
  validates :attempted_at, presence: true
  validates :answers, presence: true
  validates :time_spent_seconds, numericality: { only_integer: true, greater_than_or_equal_to: 0, allow_nil: true }

  serialize :answers, coder: JSON

  scope :recent, -> { order(attempted_at: :desc) }
  scope :by_level, ->(level) { where(level: level) }
  scope :passing, -> { where('score >= ?', 70) }

  # Get best score for a user at a specific level
  def self.best_score_for_user(user_id, level)
    where(user_id: user_id, level: level).maximum(:score) || 0
  end

  # Get attempt count for a user at a specific level
  def self.attempt_count_for_user(user_id, level)
    where(user_id: user_id, level: level).count
  end

  # Check if exam was passed (>= 70%)
  def passed?
    score >= 70
  end

  # Get category breakdown from answers
  def category_breakdown
    return {} unless answers.is_a?(Array)

    breakdown = {}
    answers.each do |answer|
      category = answer['category']
      breakdown[category] ||= { correct: 0, total: 0 }
      breakdown[category][:total] += 1
      breakdown[category][:correct] += 1 if answer['correct']
    end
    breakdown
  end

  # Get incorrect answers
  def incorrect_answers
    return [] unless answers.is_a?(Array)
    answers.select { |answer| !answer['correct'] }
  end
end
