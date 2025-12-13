namespace :daily_recommendations do
  desc "Generate AI-powered daily recommendations for all levels"
  task generate: :environment do
    puts "🤖 Generating daily recommendations..."

    date = Date.current
    count = Ai::RecommendationGenerator.generate_for_all_levels(date)

    puts "✅ Generated #{count} recommendations for #{date}"
  end

  desc "Clear old recommendations (older than 7 days)"
  task cleanup: :environment do
    cutoff_date = 7.days.ago.to_date
    deleted = DailyRecommendation.where('date < ?', cutoff_date).delete_all
    puts "🧹 Deleted #{deleted} old recommendations (before #{cutoff_date})"
  end
end
