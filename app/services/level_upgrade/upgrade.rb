module LevelUpgrade
  class Upgrade < ActiveInteraction::Base
    object :user, class: User
    string :to_level

    validates :to_level, inclusion: { in: %w[A2 B1 B2 C1] }

    def execute
      current_level = user.user_progress&.level || 'A1'

      # Validate level progression
      unless valid_progression?(current_level, to_level)
        errors.add(:base, "Invalid level progression from #{current_level} to #{to_level}")
        return
      end

      # Check eligibility
      eligibility = LevelUpgrade::CheckEligibility.run!(user: user, level: current_level)

      unless eligibility[:eligible]
        errors.add(:base, "User has not completed all requirements for #{current_level} level")
        return
      end

      # Perform upgrade
      user_progress = user.user_progress || user.create_user_progress!
      user_progress.update_level!(to_level)

      # Award achievement
      achievement = Achievement.award!(user, "level_upgrade_#{to_level.downcase}")

      {
        success: true,
        new_level: to_level,
        previous_level: current_level,
        achievement: format_achievement(achievement)
      }
    end

    private

    def valid_progression?(from_level, to_level)
      valid_progressions = {
        'A1' => 'A2',
        'A2' => 'B1',
        'B1' => 'B2',
        'B2' => 'C1'
      }

      valid_progressions[from_level] == to_level
    end

    def format_achievement(achievement)
      return nil unless achievement

      {
        id: achievement.id,
        type: achievement.achievement_type,
        title: achievement.title,
        description: achievement.description,
        earned_at: achievement.earned_at,
        icon: achievement.metadata['icon']
      }
    end
  end
end
