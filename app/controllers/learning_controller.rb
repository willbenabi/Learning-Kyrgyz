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

  # Additional module pages will be added in Level 2
  # GET /learning/writing
  # GET /learning/vocabulary
end
