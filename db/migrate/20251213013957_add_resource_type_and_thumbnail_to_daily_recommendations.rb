class AddResourceTypeAndThumbnailToDailyRecommendations < ActiveRecord::Migration[8.0]
  def change
    add_column :daily_recommendations, :resource_type, :string
    add_column :daily_recommendations, :thumbnail_url, :string
  end
end
