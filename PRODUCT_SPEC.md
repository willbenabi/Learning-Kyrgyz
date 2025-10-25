# Product Specs

## Product Overview

A ready-to-use web application with user management, secure invitation system, and admin panel. Serves as a foundation for building custom business applications - user accounts and permissions are already built.

## Core Modules

### 1. User Management & Authentication

**User Invitations**

- Admin sends invitation emails to new users
- Users receive secure invitation link via email
- Users set their own password (admins never see passwords)
- Invitation status tracking (pending/accepted/active)
- Resend invitation capability for pending users

**User Accounts**

- Profile management (name, email, profile picture)
- Profile picture support (JPEG, PNG, GIF, WebP, max 5MB)

**Authentication**

- Email/password login
- Password reset via email
- Automatic session management

**User Roles**

- **Regular User**: Standard user with own data access
- **Admin**: Full system administration privileges

### 2. Administration

**Admin Console**

- Dashboard with system statistics
- Total users count
- Admin/regular user breakdown
- Active sessions monitoring
- Audit log access

**User Management**

- View all users with search and sorting
- Send user invitations
- Edit user information
- Track invitation status (pending/active)
- Resend invitations to pending users
- Assign admin privileges
- Delete users

**Audit Logging**

- Track all changes to users
- Record who, what, when for each change
- Browse logs with filtering
- View detailed change history

## Key User Workflows

### User Onboarding (Invitation Flow)

1. Admin goes to Manage Users → Invite User
2. Enters new user's name and email
3. System sends invitation email with secure link
4. User receives email and clicks invitation link
5. User creates their password
6. User is automatically logged in
7. User accesses the application

### Resending Invitations

1. Admin goes to Manage Users
2. Sees users with "Pending" status
3. Clicks resend invitation button
4. New invitation email sent to user

### Password Reset

1. User clicks "Forgot Password" on login page
2. Enters email address
3. Receives password reset email
4. Clicks reset link and creates new password
5. Logs in with new password

### Managing Users

**Viewing User Details:**
1. Admin goes to Manage Users
2. Finds user in the list (search by name or email)
3. Clicks view button to see full profile
4. Views user status, role, and registration date

**Editing User Information:**
1. Admin goes to Manage Users
2. Finds user in the list
3. Clicks edit button
4. Updates user name or admin status
5. Email cannot be changed after account creation

**Removing a User:**
1. Admin goes to Manage Users
2. Finds the user in the list
3. Clicks delete button
4. Confirms deletion
5. User and all their data removed

### Profile Management

**Updating Profile:**
1. User clicks Profile from user menu
2. Clicks Edit Profile
3. Updates name, email, or password
4. Uploads new profile picture if desired
5. Saves changes

## Data Access Rules

### Regular User Access

- View and edit own profile
- Upload profile picture
- Change password
- View own dashboard
- Cannot access admin console
- Cannot manage other users

### Admin Access

- All regular user permissions
- Access admin console
- View system statistics
- View and manage all users
- Send user invitations
- View user details and invitation status
- Assign admin privileges to users
- Delete users
- View audit logs of all system changes

## Current Features

**Dashboard**
- Welcome screen with user information
- Quick access to profile

**Profile Management**
- View profile with avatar and details
- Edit name, email, password
- Upload profile picture
- View account creation date

**User Management** (Admins only)
- Search users by name or email
- Sort by name, email, or creation date
- View all users with status indicators
- Create new users via invitation
- Edit existing users
- Delete users
- Resend pending invitations

**Admin Console** (Admins only)
- System statistics overview
- User count breakdowns
- Session monitoring

**Security Features**
- Secure invitation tokens
- Password reset with time-limited tokens
- Passwords never visible to admins
- Automatic session management

---

*This specification documents the current state of the Starter Base Inertia application. The foundation includes authentication, secure user invitation system, and admin panel - ready for adding custom business features.*
