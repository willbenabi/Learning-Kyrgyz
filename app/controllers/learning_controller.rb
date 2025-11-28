class LearningController < ApplicationController
  # Public controller for Level 1 - no authentication required

  # GET /learning/dashboard
  def dashboard
    render inertia: "Learning/Dashboard"
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
