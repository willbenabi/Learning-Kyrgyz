# == Schema Information
#
# Table name: achievements
#
#  id               :integer          not null, primary key
#  achievement_type :string           not null
#  description      :text
#  earned_at        :datetime         not null
#  metadata         :json
#  title            :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  user_id          :integer          not null
#
# Indexes
#
#  index_achievements_on_earned_at                    (earned_at)
#  index_achievements_on_user_id                      (user_id)
#  index_achievements_on_user_id_and_achievement_type (user_id,achievement_type) UNIQUE
#
class Achievement < ApplicationRecord
  belongs_to :user

  validates :achievement_type, presence: true
  validates :title, presence: true
  validates :earned_at, presence: true

  scope :recent, -> { order(earned_at: :desc) }
  scope :by_type, ->(type) { where(achievement_type: type) }

  # Achievement types
  ACHIEVEMENT_TYPES = {
    # Streak achievements
    'streak_3' => { title: { en: '3-Day Streak', ru: '3-дневная серия' }, description: { en: 'Completed lessons for 3 consecutive days', ru: 'Завершили уроки 3 дня подряд' }, icon: '🔥' },
    'streak_7' => { title: { en: '7-Day Streak', ru: '7-дневная серия' }, description: { en: 'Completed lessons for 7 consecutive days', ru: 'Завершили уроки 7 дней подряд' }, icon: '🔥' },
    'streak_14' => { title: { en: '14-Day Streak', ru: '14-дневная серия' }, description: { en: 'Completed lessons for 14 consecutive days', ru: 'Завершили уроки 14 дней подряд' }, icon: '🔥' },
    'streak_30' => { title: { en: '30-Day Streak', ru: '30-дневная серия' }, description: { en: 'Completed lessons for 30 consecutive days', ru: 'Завершили уроки 30 дней подряд' }, icon: '🔥' },
    'streak_100' => { title: { en: '100-Day Streak', ru: '100-дневная серия' }, description: { en: 'Completed lessons for 100 consecutive days', ru: 'Завершили уроки 100 дней подряд' }, icon: '🔥' },

    # Lesson completion achievements
    'lessons_10' => { title: { en: 'First 10 Lessons', ru: 'Первые 10 уроков' }, description: { en: 'Completed 10 lessons', ru: 'Завершили 10 уроков' }, icon: '📚' },
    'lessons_50' => { title: { en: '50 Lessons Master', ru: 'Мастер 50 уроков' }, description: { en: 'Completed 50 lessons', ru: 'Завершили 50 уроков' }, icon: '📚' },
    'lessons_100' => { title: { en: '100 Lessons Expert', ru: 'Эксперт 100 уроков' }, description: { en: 'Completed 100 lessons', ru: 'Завершили 100 уроков' }, icon: '📚' },
    'lessons_200' => { title: { en: '200 Lessons Legend', ru: 'Легенда 200 уроков' }, description: { en: 'Completed 200 lessons', ru: 'Завершили 200 уроков' }, icon: '📚' },

    # Module completion achievements
    'grammar_a1_complete' => { title: { en: 'A1 Grammar Master', ru: 'Мастер грамматики A1' }, description: { en: 'Completed all A1 grammar lessons', ru: 'Завершили все уроки грамматики A1' }, icon: '✅' },
    'grammar_complete' => { title: { en: 'Grammar Expert', ru: 'Эксперт грамматики' }, description: { en: 'Completed all grammar lessons', ru: 'Завершили все уроки грамматики' }, icon: '🎓' },
    'reading_a1_complete' => { title: { en: 'A1 Reading Master', ru: 'Мастер чтения A1' }, description: { en: 'Completed all A1 reading texts', ru: 'Завершили все тексты для чтения A1' }, icon: '📖' },
    'reading_complete' => { title: { en: 'Reading Expert', ru: 'Эксперт чтения' }, description: { en: 'Completed all reading texts', ru: 'Завершили все тексты для чтения' }, icon: '📚' },

    # Vocabulary achievements
    'vocab_100' => { title: { en: '100 Words Learned', ru: 'Изучено 100 слов' }, description: { en: 'Learned 100 vocabulary words', ru: 'Выучили 100 слов' }, icon: '💬' },
    'vocab_500' => { title: { en: '500 Words Learned', ru: 'Изучено 500 слов' }, description: { en: 'Learned 500 vocabulary words', ru: 'Выучили 500 слов' }, icon: '💬' },
    'vocab_1000' => { title: { en: '1000 Words Learned', ru: 'Изучено 1000 слов' }, description: { en: 'Learned 1000 vocabulary words', ru: 'Выучили 1000 слов' }, icon: '💬' },

    # Perfect score achievements
    'perfect_score_10' => { title: { en: '10 Perfect Scores', ru: '10 идеальных результатов' }, description: { en: 'Achieved perfect score in 10 lessons', ru: 'Получили идеальный результат в 10 уроках' }, icon: '⭐' },
    'perfect_score_50' => { title: { en: '50 Perfect Scores', ru: '50 идеальных результатов' }, description: { en: 'Achieved perfect score in 50 lessons', ru: 'Получили идеальный результат в 50 уроках' }, icon: '⭐' },

    # Level achievements
    'level_a2' => { title: { en: 'A2 Level Achieved', ru: 'Достигнут уровень A2' }, description: { en: 'Advanced to A2 level', ru: 'Продвинулись на уровень A2' }, icon: '🎯' },
    'level_b1' => { title: { en: 'B1 Level Achieved', ru: 'Достигнут уровень B1' }, description: { en: 'Advanced to B1 level', ru: 'Продвинулись на уровень B1' }, icon: '🎯' },
    'level_b2' => { title: { en: 'B2 Level Achieved', ru: 'Достигнут уровень B2' }, description: { en: 'Advanced to B2 level', ru: 'Продвинулись на уровень B2' }, icon: '🎯' },
    'level_c1' => { title: { en: 'C1 Level Achieved', ru: 'Достигнут уровень C1' }, description: { en: 'Advanced to C1 level', ru: 'Продвинулись на уровень C1' }, icon: '🎯' },

    # Level upgrade achievements
    'level_upgrade_a2' => { title: { en: 'Upgraded to A2!', ru: 'Повышение до A2!' }, description: { en: 'Successfully completed all A1 modules and advanced to A2', ru: 'Успешно завершили все модули A1 и продвинулись на A2' }, icon: '🏆' },
    'level_upgrade_b1' => { title: { en: 'Upgraded to B1!', ru: 'Повышение до B1!' }, description: { en: 'Successfully completed all A2 modules and advanced to B1', ru: 'Успешно завершили все модули A2 и продвинулись на B1' }, icon: '🏆' },
    'level_upgrade_b2' => { title: { en: 'Upgraded to B2!', ru: 'Повышение до B2!' }, description: { en: 'Successfully completed all B1 modules and advanced to B2', ru: 'Успешно завершили все модули B1 и продвинулись на B2' }, icon: '🏆' },
    'level_upgrade_c1' => { title: { en: 'Upgraded to C1!', ru: 'Повышение до C1!' }, description: { en: 'Successfully completed all B2 modules and advanced to C1', ru: 'Успешно завершили все модули B2 и продвинулись на C1' }, icon: '🏆' },

    # Special achievements
    'first_lesson' => { title: { en: 'First Lesson', ru: 'Первый урок' }, description: { en: 'Completed your first lesson', ru: 'Завершили первый урок' }, icon: '🌱' },
    'early_bird' => { title: { en: 'Early Bird', ru: 'Ранняя пташка' }, description: { en: 'Completed a lesson before 8 AM', ru: 'Завершили урок до 8 утра' }, icon: '🌅' },
    'night_owl' => { title: { en: 'Night Owl', ru: 'Сова' }, description: { en: 'Completed a lesson after 10 PM', ru: 'Завершили урок после 10 вечера' }, icon: '🦉' }
  }.freeze

  # Award achievement to user
  def self.award!(user, achievement_type)
    return if exists?(user: user, achievement_type: achievement_type)

    achievement_data = ACHIEVEMENT_TYPES[achievement_type]
    return unless achievement_data

    language = 'en' # Default language, could be user preference
    create!(
      user: user,
      achievement_type: achievement_type,
      title: achievement_data[:title][language.to_sym],
      description: achievement_data[:description][language.to_sym],
      earned_at: Time.current,
      metadata: { icon: achievement_data[:icon] }
    )
  end

  # Check and award achievements based on progress
  def self.check_and_award_achievements(user)
    progress = user.user_progress
    return unless progress

    # Streak achievements
    award!(user, 'streak_3') if progress.current_streak >= 3
    award!(user, 'streak_7') if progress.current_streak >= 7
    award!(user, 'streak_14') if progress.current_streak >= 14
    award!(user, 'streak_30') if progress.current_streak >= 30
    award!(user, 'streak_100') if progress.current_streak >= 100

    # Lesson completion achievements
    award!(user, 'first_lesson') if progress.lessons_completed >= 1
    award!(user, 'lessons_10') if progress.lessons_completed >= 10
    award!(user, 'lessons_50') if progress.lessons_completed >= 50
    award!(user, 'lessons_100') if progress.lessons_completed >= 100
    award!(user, 'lessons_200') if progress.lessons_completed >= 200

    # Vocabulary achievements
    award!(user, 'vocab_100') if progress.vocabulary_count >= 100
    award!(user, 'vocab_500') if progress.vocabulary_count >= 500
    award!(user, 'vocab_1000') if progress.vocabulary_count >= 1000
  end
end
