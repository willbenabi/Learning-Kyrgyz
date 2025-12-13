class LearningController < ApplicationController
  # Public controller for Level 1 - no authentication required

  # GET /learning/dashboard
  def dashboard
    # Get user progress if available (for authenticated users)
    progress_data = nil
    if current_user
      progress = current_user.user_progress
      if progress
        progress_data = {
          level: progress.level,
          daysActive: progress.days_active,
          lessonsCompleted: progress.lessons_completed,
          vocabularyCount: progress.vocabulary_count,
          currentStreak: progress.current_streak,
          longestStreak: progress.longest_streak,
          badges: current_user.achievements.count
        }
      end
    end

    render inertia: "Learning/Dashboard", props: { userProgress: progress_data }
  end

  # GET /learning/grammar
  def grammar
    render inertia: "Learning/Grammar"
  end

  # GET /learning/reading
  def reading
    render inertia: "Learning/Reading"
  end

  # GET /learning/writing
  def writing
    render inertia: "Learning/Writing"
  end

  # GET /learning/vocabulary
  def vocabulary
    render inertia: "Learning/Vocabulary"
  end
end
