# Clear existing data
puts "Clearing existing data..."
RefreshToken.destroy_all
User.destroy_all

# Create Super Admin
puts "Creating super admin..."
super_admin = User.create!(
  email: "admin@example.com",
  name: "Super Admin",
  password: "password123",
  password_confirmation: "password123",
  super_admin: true,
  role: "admin"
)

# Create Admin user
puts "Creating admin user..."
admin_user = User.create!(
  email: "admin.user@example.com",
  name: "Admin User",
  password: "password123",
  password_confirmation: "password123",
  super_admin: false,
  role: "admin"
)

# Create regular users
puts "Creating regular users..."
5.times do |i|
  User.create!(
    email: "user#{i + 1}@example.com",
    name: "User #{i + 1}",
    password: "password123",
    password_confirmation: "password123",
    super_admin: false,
    role: "user"
  )
end

puts "\n✅ Seed data created successfully!"
puts "\nLogin credentials:"
puts "  Super Admin: admin@example.com / password123"
puts "  Admin User: admin.user@example.com / password123"
puts "  Regular Users: user1@example.com - user5@example.com / password123"
puts "\nTotal users created: #{User.count}"
