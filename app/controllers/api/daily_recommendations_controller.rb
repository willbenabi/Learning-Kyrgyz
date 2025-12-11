class Api::DailyRecommendationsController < ApplicationController
  # No authentication required - public endpoint

  def index
    # Get user level from params or default to A1
    level = params[:level].presence || 'A1'
    
    # Validate level
    unless VideoRecommendation::LEVELS.include?(level)
      return render json: { error: "Invalid level. Must be one of: #{VideoRecommendation::LEVELS.join(', ')}" }, 
                    status: :unprocessable_entity
    end

    # Get count from params (default 5, max 10)
    count = [params[:count].to_i, 1].max
    count = [count, 10].min

    # Get recommendations
    recommendations = VideoRecommendation.daily_recommendations(level: level, count: count)

    # Format response in requested JSON structure
    render json: {
      level: level,
      date: Date.current.to_s,
      recommendations: recommendations.map do |rec|
        {
          id: rec.id,
          title: rec.title,
          description: rec.description,
          video_url: rec.video_url,
          thumbnail_url: rec.thumbnail_url,
          category: rec.category
        }
      end
    }
  end
end
