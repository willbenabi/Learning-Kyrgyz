class OnboardingController < ApplicationController
  # Public controller - no authentication required

  # GET /onboarding/language
  def language
    render inertia: "Onboarding/LanguageSelection"
  end

  # POST /onboarding/language
  def set_language
    # Level 1: Store in session/localStorage
    # In Level 2, this will update user record
    language = params[:language]

    if %w[en ru].include?(language)
      # Mock response - in Level 2, update user.language_preference
      render json: { success: true, language: language }
    else
      render json: { error: "Invalid language" }, status: :unprocessable_entity
    end
  end

  # GET /onboarding/level-choice
  def level_choice
    render inertia: "Onboarding/LevelAssessmentChoice"
  end

  # GET /onboarding/placement-test
  def placement_test
    render inertia: "Onboarding/PlacementTest"
  end

  # POST /onboarding/placement-test/results
  def submit_test
    # Level 1: Mock test submission
    # In Level 2, save results to database
    level = params[:level]
    score = params[:score]
    total = params[:total]
    answers = params[:answers]

    # Validate level
    unless %w[A1 A2 B1 B2 C1].include?(level)
      render json: { error: "Invalid level" }, status: :unprocessable_entity
      return
    end

    # Mock response
    render json: {
      success: true,
      level: level,
      score: score,
      total: total
    }
  end

  # GET /onboarding/diagnostics
  def diagnostics
    render inertia: "Onboarding/Diagnostics"
  end
end
