module Learning
  class ProgressController < ApplicationController
    before_action :authenticate!

    def index
      progress = current_user.user_progress || current_user.create_user_progress!

      render inertia: 'Learning/Progress', props: progress_props(progress)
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
