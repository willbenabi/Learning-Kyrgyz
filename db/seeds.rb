# Clear existing data
puts "Clearing existing data..."
RefreshToken.destroy_all
User.destroy_all

# Create Admin
puts "Creating admin..."
admin = User.create!(
  email: "admin@example.com",
  name: "Admin",
  password: "lsPhBr5tvOdR1ijG",
  password_confirmation: "lsPhBr5tvOdR1ijG",
  admin: true
)

# Create regular users
puts "Creating regular users..."
5.times do |i|
  User.create!(
    email: "user#{i + 1}@example.com",
    name: "User #{i + 1}",
    password: "lsPhBr5tvOdR1ijG",
    password_confirmation: "lsPhBr5tvOdR1ijG",
    admin: false
  )
end

# Load video recommendations
load Rails.root.join('db', 'seeds', 'video_recommendations.rb')

puts "\n✅ Seed data created successfully!"
puts "\nLogin credentials:"
puts "  Admin: admin@example.com / password123"
puts "  Regular Users: user1@example.com - user5@example.com / password123"
puts "\nTotal users created: #{User.count}"
puts "Total video recommendations: #{VideoRecommendation.count}"
