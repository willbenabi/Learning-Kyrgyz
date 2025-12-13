# == Schema Information
#
# Table name: user_progresses
#
#  id                 :integer          not null, primary key
#  current_streak     :integer          default(0), not null
#  days_active        :integer          default(0), not null
#  last_activity_date :date
#  lessons_completed  :integer          default(0), not null
#  level              :string           default("A1"), not null
#  longest_streak     :integer          default(0), not null
#  vocabulary_count   :integer          default(0), not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  user_id            :integer          not null
#
# Indexes
#
#  index_user_progresses_on_user_id  (user_id) UNIQUE
#
class UserProgress < ApplicationRecord
  belongs_to :user

  validates :level, presence: true, inclusion: { in: %w[A1 A2 B1 B2 C1] }
  validates :days_active, :lessons_completed, :vocabulary_count, :current_streak, :longest_streak,
            numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  # Update activity and streak tracking
  def record_activity!
    today = Date.current

    if last_activity_date.nil?
      # First activity ever
      self.days_active = 1
      self.current_streak = 1
      self.longest_streak = 1
      self.last_activity_date = today
    elsif last_activity_date == today
      # Already recorded activity today, do nothing
      return
    elsif last_activity_date == today - 1.day
      # Consecutive day - continue streak
      self.days_active += 1
      self.current_streak += 1
      self.longest_streak = [longest_streak, current_streak].max
      self.last_activity_date = today
    else
      # Streak broken
      self.days_active += 1
      self.current_streak = 1
      self.last_activity_date = today
    end

    save!
  end

  # Record lesson completion
  def complete_lesson!(module_type, lesson_id, score: nil, time_spent: nil)
    transaction do
      # Create lesson completion record
      LessonCompletion.find_or_create_by!(
        user: user,
        module_type: module_type,
        lesson_id: lesson_id
      ) do |completion|
        completion.completed_at = Time.current
        completion.score = score
        completion.time_spent = time_spent
      end

      # Update progress stats
      self.lessons_completed = user.lesson_completions.count
      record_activity!
    end
  end

  # Add vocabulary words
  def add_vocabulary!(count)
    increment!(:vocabulary_count, count)
    record_activity!
  end

  # Update user level (from placement test or progression)
  def update_level!(new_level)
    update!(level: new_level)
  end
end
