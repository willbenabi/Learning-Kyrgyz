class LearningController < ApplicationController
  skip_before_action :authenticate_user!, only: [:dashboard]

  # GET /learning/dashboard
  def dashboard
    render inertia: "Learning/Dashboard"
  end

  # Additional module pages will be added in Level 2
  # GET /learning/grammar
  # GET /learning/reading
  # GET /learning/writing
  # GET /learning/vocabulary
end
