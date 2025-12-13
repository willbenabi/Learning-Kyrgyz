namespace :admin do
  desc "Create admin user with specified credentials"
  task create: :environment do
    email = 'zamankulovaazar@gmail.com'

    if User.exists?(email: email)
      puts "Admin user already exists: #{email}"
    else
      user = User.create!(
        name: 'Azar Zamankulova',
        email: email,
        password: 'nabinabi',
        password_confirmation: 'nabinabi',
        admin: true
      )
      puts "Admin user created successfully: #{user.email}"
    end
  end
end
