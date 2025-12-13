class GrammarExamsController < ApplicationController
  before_action :authenticate_user!

  # GET /grammar_exams/new?level=A1
  def new
    level = params[:level]

    unless %w[A1 A2 B1 B2 C1].include?(level)
      return render json: { error: 'Invalid level' }, status: :unprocessable_entity
    end

    # Get previous attempts
    previous_attempts = current_user.grammar_exams.by_level(level).recent.limit(5)
    best_score = GrammarExam.best_score_for_user(current_user.id, level)
    attempt_count = current_user.grammar_exams.by_level(level).count
    can_take_exam = user_completed_level?(level)

    # Support both JSON (for AJAX checks) and Inertia (for page rendering)
    respond_to do |format|
      format.json do
        render json: {
          can_take_exam: can_take_exam,
          best_score: best_score,
          attempt_count: attempt_count
        }
      end

      format.html do
        unless can_take_exam
          redirect_to learning_grammar_path, alert: 'Complete all lessons before taking the exam'
          return
        end

        render inertia: 'Learning/GrammarExam/New', props: {
          level: level,
          bestScore: best_score,
          attemptCount: attempt_count,
          previousAttempts: previous_attempts.map { |exam|
            {
              id: exam.id,
              score: exam.score,
              attempted_at: exam.attempted_at,
              time_spent: exam.time_spent_seconds,
              passed: exam.passed?
            }
          }
        }
      end
    end
  end

  # POST /grammar_exams/generate
  def generate
    level = params[:level]

    outcome = GrammarExams::GenerateExam.run(level: level)

    if outcome.valid?
      render json: { questions: outcome.result }
    else
      render json: { error: outcome.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  # POST /grammar_exams/submit
  def submit
    outcome = GrammarExams::SubmitExam.run(
      user: current_user,
      level: params[:level],
      answers: submit_params[:answers],
      time_spent_seconds: params[:time_spent_seconds]
    )

    if outcome.valid?
      # Track as lesson completion for progress
      current_user.user_progress&.complete_lesson!(
        'grammar',
        "#{params[:level]}_final_exam",
        score: outcome.result[:score]
      )

      render json: { success: true, results: outcome.result }
    else
      render json: { error: outcome.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  # GET /grammar_exams/:id/results
  def results
    exam = current_user.grammar_exams.find(params[:id])

    render inertia: 'Learning/GrammarExam/Results', props: {
      exam: {
        id: exam.id,
        level: exam.level,
        score: exam.score,
        passed: exam.passed?,
        attempted_at: exam.attempted_at,
        time_spent: exam.time_spent_seconds,
        category_breakdown: exam.category_breakdown,
        incorrect_answers: exam.incorrect_answers
      },
      bestScore: GrammarExam.best_score_for_user(current_user.id, exam.level)
    }
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Exam not found' }, status: :not_found
  end

  private

  def user_completed_level?(level)
    # Get all lesson IDs for this level from frontend data
    # For now, assume user has completed if they have at least some progress
    # In production, this would check completion of all lessons for the level
    completed_lessons = current_user.lesson_completions
      .by_module('grammar')
      .pluck(:lesson_id)

    # Check based on level-specific lesson counts (from PRODUCT_SPEC.md)
    level_lesson_counts = {
      'A1' => 15, # 14 lessons + 1 final test
      'A2' => 12, # 11 lessons + 1 final test
      'B1' => 12, # 11 lessons + 1 final test
      'B2' => 9,  # 8 lessons + 1 final test
      'C1' => 9   # 8 lessons + 1 final test
    }

    # Count lessons for this level (lessons starting with level prefix)
    level_completions = completed_lessons.count { |id| id.start_with?(level.downcase) }

    # User needs to complete at least the lessons (not counting the final test)
    required = level_lesson_counts[level] - 1
    level_completions >= required
  end

  def submit_params
    params.permit(answers: [:question_id, :selected_index])
  end
end
