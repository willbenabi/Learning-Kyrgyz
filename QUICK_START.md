# Quick Start Guide

## 🚀 Getting Started

### 1. Install Dependencies
```bash
bundle install
npm install
```

### 2. Setup Database
```bash
bundle exec rails db:create
bundle exec rails db:migrate
bundle exec rails db:seed
```

### 3. Start the Development Server
```bash
bin/dev
```

This will start both:
- Rails server on http://localhost:3000
- Vite dev server with HMR

### 4. Access the Application

Open your browser and navigate to: **http://localhost:3000**

You'll be redirected to the login page at **http://localhost:3000/login**

## 🔑 Login Credentials

After running `db:seed`, use these credentials:

### Super Admin
- **Email:** admin@example.com
- **Password:** password123
- **Access:** Full admin panel, user management, dashboard

### Admin
- **Email:** admin.user@example.com
- **Password:** password123
- **Access:** Dashboard, profile management

### Regular Users
- **Email:** user1@example.com (through user5@example.com)
- **Password:** password123
- **Access:** Dashboard, profile management

## 📱 Application Flow

1. **Login** at `/login`
   - Enter email and password
   - JWT token is stored in localStorage
   - Redirected to `/dashboard`

2. **Dashboard** at `/dashboard`
   - View your profile info
   - See system stats
   - Access admin panel (if super admin)

3. **Admin Panel** at `/admin/dashboard` (Super Admin only)
   - View user statistics
   - Manage users at `/admin/users`
   - Create, edit, delete users

4. **Profile** at `/profile`
   - View your profile details
   - Edit profile at `/profile/edit`

5. **Logout**
   - Click logout button
   - Tokens are cleared
   - Redirected to login

## 🔐 Authentication

The app uses **JWT authentication** with:
- **Access Token** (24 hours) - Sent with every request
- **Refresh Token** (30 days) - Used to get new access tokens
- **Automatic Refresh** - Tokens refresh every 20 hours automatically

### How It Works

1. Login sends credentials to `/session`
2. Backend validates and returns JWT + refresh token
3. Frontend stores both tokens in localStorage
4. All Inertia requests automatically include JWT in Authorization header
5. Every 20 hours, frontend automatically refreshes the token

## 🧪 Running Tests

```bash
# Run all tests
bundle exec rspec

# Run specific test files
bundle exec rspec spec/models
bundle exec rspec spec/services
bundle exec rspec spec/requests

# Run with documentation format
bundle exec rspec --format documentation
```

## 📝 API Endpoints

### Authentication
- `GET /login` - Show login page
- `POST /session` - Login (returns JWT + refresh token)
- `DELETE /session` - Logout
- `POST /session/refresh` - Refresh JWT token

### Dashboard
- `GET /dashboard` - Main dashboard

### Profile
- `GET /profile` - View profile
- `GET /profile/edit` - Edit profile form
- `PATCH /profile` - Update profile

### Admin (Super Admin only)
- `GET /admin/dashboard` - Admin dashboard
- `GET /admin/users` - List all users
- `POST /admin/users` - Create user
- `GET /admin/users/:id` - View user
- `PATCH /admin/users/:id` - Update user
- `DELETE /admin/users/:id` - Delete user

### Password Reset
- `POST /password/forgot` - Request password reset
- `GET /password/reset?token=xyz` - Reset password form
- `PUT /password/reset` - Update password

## 🎨 UI Components

The app uses **shadcn/ui** components. To add more:

```bash
# Add individual components
npx shadcn@latest add [component-name]

# Example: add dialog component
npx shadcn@latest add dialog

# Example: add toast notifications
npx shadcn@latest add toast
```

## 🔧 Development Tips

### Hot Module Replacement (HMR)
Vite provides instant updates when you edit:
- React components (.tsx files)
- CSS/Tailwind styles
- TypeScript code

Changes appear immediately without page refresh!

### Debugging

**Backend (Rails):**
```ruby
# In controllers or services
byebug  # Add this line to pause execution
```

**Frontend (React):**
```typescript
console.log('Debug info:', variable)
debugger  // Browser will pause here
```

### Database

**Reset database:**
```bash
bundle exec rails db:drop db:create db:migrate db:seed
```

**Check migrations:**
```bash
bundle exec rails db:migrate:status
```

**Rails console:**
```bash
bundle exec rails console
# Then you can run: User.count, User.first, etc.
```

## 📦 Production Deployment

1. **Set environment variables:**
   ```env
   RAILS_ENV=production
   SECRET_KEY_BASE=<generate with: rails secret>
   ALLOWED_ORIGINS=https://yourdomain.com
   ```

2. **Build assets:**
   ```bash
   npm run build
   ```

3. **Run migrations:**
   ```bash
   RAILS_ENV=production bundle exec rails db:migrate
   ```

4. **Create admin user:**
   ```bash
   RAILS_ENV=production bundle exec rails db:seed
   ```

5. **Start server:**
   ```bash
   RAILS_ENV=production bundle exec rails server
   ```

## ❓ Troubleshooting

### "Cannot find module" errors
```bash
npm install
```

### "Database does not exist"
```bash
bundle exec rails db:create db:migrate db:seed
```

### "Port already in use"
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Vite not starting
```bash
# Reinstall node modules
rm -rf node_modules
npm install
```

### Tests failing
```bash
# Reset test database
RAILS_ENV=test bundle exec rails db:drop db:create db:migrate
bundle exec rspec
```

## 🎯 Next Steps

Now that the app is running, you can:

1. **Customize the UI** - Edit React components in `app/frontend/pages`
2. **Add new features** - Create models, services, controllers
3. **Add more pages** - Create new Inertia pages
4. **Modify roles** - Update User model for custom roles
5. **Add email** - Configure ActionMailer for password reset emails
6. **Deploy** - Deploy to your hosting platform

## 📚 Learn More

- [Inertia.js Docs](https://inertiajs.com)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Rails Guides](https://guides.rubyonrails.org)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)

---

**Happy coding! 🚀**
