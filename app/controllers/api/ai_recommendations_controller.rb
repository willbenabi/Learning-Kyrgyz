class Api::AiRecommendationsController < ApplicationController
  # Public endpoint - no authentication required

  def index
    level = params[:level]
    date = params[:date].present? ? Date.parse(params[:date]) : Date.current

    unless DailyRecommendation::LEVELS.include?(level)
      return render json: { error: "Invalid level. Must be one of: #{DailyRecommendation::LEVELS.join(', ')}" },
                    status: :unprocessable_entity
    end

    recommendations = DailyRecommendation.for_level_and_date(level, date)

    render json: {
      level: level,
      date: date,
      count: recommendations.count,
      recommendations: recommendations.map do |rec|
        {
          id: rec.id,
          type: rec.content_type,
          resource_type: rec.resource_type,
          title: rec.title,
          description: rec.description,
          url: rec.url,
          thumbnail_url: rec.thumbnail_url,
          generated_at: rec.created_at
        }
      end
    }
  rescue Date::Error
    render json: { error: "Invalid date format" }, status: :unprocessable_entity
  end
end
