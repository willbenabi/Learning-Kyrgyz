module Learning
  class ProgressController < ApplicationController
    # Public for Level 1, but supports authenticated users for Level 2

    def index
      # Level 1: Use localStorage data (mock)
      # Level 2: Use real user progress from database
      if current_user
        progress = current_user.user_progress || current_user.create_user_progress!
        render inertia: 'Learning/Progress', props: progress_props(progress)
      else
        # Level 1 fallback: Show page with mock data
        render inertia: 'Learning/Progress', props: mock_progress_props
      end
    end

    def show
      progress = current_user.user_progress || current_user.create_user_progress!

      render json: progress_props(progress)
    end

    def complete_lesson
      module_type = params[:module_type]
      lesson_id = params[:lesson_id]
      score = params[:score]
      time_spent = params[:time_spent]

      progress = current_user.user_progress || current_user.create_user_progress!

      progress.complete_lesson!(module_type, lesson_id, score: score, time_spent: time_spent)

      # Check and award achievements
      Achievement.check_and_award_achievements(current_user)

      render json: {
        success: true,
        progress: progress_props(progress),
        new_achievements: current_user.achievements.where('earned_at > ?', 5.seconds.ago)
      }
    end

    def add_vocabulary
      count = params[:count].to_i
      return render json: { error: 'Invalid count' }, status: :unprocessable_entity if count <= 0

      progress = current_user.user_progress || current_user.create_user_progress!
      progress.add_vocabulary!(count)

      # Check and award achievements
      Achievement.check_and_award_achievements(current_user)

      render json: {
        success: true,
        progress: progress_props(progress)
      }
    end

    def update_level
      new_level = params[:level]
      unless %w[A1 A2 B1 B2 C1].include?(new_level)
        return render json: { error: 'Invalid level' }, status: :unprocessable_entity
      end

      progress = current_user.user_progress || current_user.create_user_progress!
      progress.update_level!(new_level)

      # Award level achievement
      Achievement.award!(current_user, "level_#{new_level.downcase}")

      render json: {
        success: true,
        progress: progress_props(progress)
      }
    end

    private

    def mock_progress_props
      # Level 1: Return placeholder structure - data will be populated from localStorage on frontend
      {
        level: 'A1',
        daysActive: 0,
        lessonsCompleted: 0,
        vocabularyCount: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastActivityDate: nil,
        achievements: [],
        lessonsByModule: {
          grammar: 0,
          reading: 0,
          writing: 0,
          vocabulary: 0
        },
        recentLessons: [],
        stats: {
          today: 0,
          thisWeek: 0,
          thisMonth: 0
        },
        useLocalStorage: true # Signal to frontend to use localStorage data
      }
    end

    def progress_props(progress)
      {
        level: progress.level,
        daysActive: progress.days_active,
        lessonsCompleted: progress.lessons_completed,
        vocabularyCount: progress.vocabulary_count,
        currentStreak: progress.current_streak,
        longestStreak: progress.longest_streak,
        lastActivityDate: progress.last_activity_date,
        achievements: current_user.achievements.recent.limit(50).map { |a|
          {
            id: a.id,
            type: a.achievement_type,
            title: a.title,
            description: a.description,
            earnedAt: a.earned_at,
            icon: a.metadata['icon']
          }
        },
        lessonsByModule: current_user.lesson_completions.stats_by_module,
        recentLessons: current_user.lesson_completions.recent.limit(10).map { |lc|
          {
            id: lc.id,
            moduleType: lc.module_type,
            lessonId: lc.lesson_id,
            completedAt: lc.completed_at,
            score: lc.score,
            timeSpent: lc.time_spent
          }
        },
        stats: {
          today: current_user.lesson_completions.completed_today.count,
          thisWeek: current_user.lesson_completions.completed_this_week.count,
          thisMonth: current_user.lesson_completions.completed_this_month.count
        }
      }
    end
  end
end
