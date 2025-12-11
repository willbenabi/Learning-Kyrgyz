class CreateDailyRecommendations < ActiveRecord::Migration[8.0]
  def change
    create_table :daily_recommendations do |t|
      t.string :level, null: false
      t.date :date, null: false
      t.string :content_type, null: false
      t.string :title, null: false
      t.text :description, null: false
      t.string :url
      t.boolean :generated_by_ai, default: true, null: false

      t.timestamps
    end

    add_index :daily_recommendations, [:level, :date]
    add_index :daily_recommendations, :date
  end
end
