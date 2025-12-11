module Ai
  class WritingEvaluationsController < ApplicationController
    before_action :authenticate_user!

    def create
      text = params[:text]
      prompt_title = params[:prompt_title]
      level = params[:level]
      language = params[:language] || 'en'

      if text.blank?
        return render json: { error: 'Text is required' }, status: :unprocessable_entity
      end

      evaluation = Ai::WritingEvaluator.evaluate(
        text: text,
        prompt_title: prompt_title,
        level: level,
        language: language
      )

      if evaluation[:error]
        render json: { error: evaluation[:error] }, status: :unprocessable_entity
      else
        render json: { evaluation: evaluation }
      end
    end
  end
end
