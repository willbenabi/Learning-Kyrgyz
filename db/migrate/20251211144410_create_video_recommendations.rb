class CreateVideoRecommendations < ActiveRecord::Migration[8.0]
  def change
    create_table :video_recommendations do |t|
      t.string :level, null: false
      t.string :title, null: false
      t.text :description, null: false
      t.string :video_url, null: false
      t.string :thumbnail_url, null: false
      t.string :category
      t.boolean :active, default: true, null: false
      t.datetime :last_shown_at

      t.timestamps
    end

    add_index :video_recommendations, :level
    add_index :video_recommendations, :active
    add_index :video_recommendations, :last_shown_at
  end
end
