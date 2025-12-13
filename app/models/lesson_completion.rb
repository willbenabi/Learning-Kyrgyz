# == Schema Information
#
# Table name: lesson_completions
#
#  id           :integer          not null, primary key
#  completed_at :datetime         not null
#  lesson_id    :string           not null
#  module_type  :string           not null
#  score        :integer
#  time_spent   :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :integer          not null
#
# Indexes
#
#  index_lesson_completions_on_completed_at                  (completed_at)
#  index_lesson_completions_on_user_id                       (user_id)
#  index_lesson_completions_unique                           (user_id,module_type,lesson_id) UNIQUE
#
class LessonCompletion < ApplicationRecord
  belongs_to :user

  validates :module_type, presence: true, inclusion: { in: %w[grammar reading writing vocabulary] }
  validates :lesson_id, presence: true
  validates :completed_at, presence: true
  validates :score, numericality: { only_integer: true, greater_than_or_equal_to: 0, allow_nil: true }
  validates :time_spent, numericality: { only_integer: true, greater_than_or_equal_to: 0, allow_nil: true }

  scope :recent, -> { order(completed_at: :desc) }
  scope :by_module, ->(module_type) { where(module_type: module_type) }
  scope :completed_today, -> { where('DATE(completed_at) = ?', Date.current) }
  scope :completed_this_week, -> { where('completed_at >= ?', 7.days.ago) }
  scope :completed_this_month, -> { where('completed_at >= ?', 30.days.ago) }

  # Group completions by module type and count
  def self.stats_by_module
    group(:module_type).count
  end

  # Get completion rate for a specific module
  def self.completion_rate_for_module(module_type, total_lessons)
    completed_count = by_module(module_type).count
    return 0 if total_lessons.zero?

    (completed_count.to_f / total_lessons * 100).round(1)
  end
end
