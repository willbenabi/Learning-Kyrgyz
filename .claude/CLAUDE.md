# Starter Base Inertia - Project Guidelines

> **This file contains project-specific guidelines for this Inertia.js + React application.**
> **Universal standards are in `~/.claude/CLAUDE.md` - read that file first!**

---

## Tech Stack

- **Backend**: Rails 8.0.2.1 + Ruby 3.3.6
- **Frontend**: Vite + Inertia.js + React + TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Shadcn Studio Premium)
- **Database**: SQLite
- **Testing**: RSpec (backend), no frontend tests yet
- **Services**: ActiveInteraction
- **Pagination**: pagy
- **Authorization**: Pundit

---

## Key Architecture Notes

### Rails Patterns

**Service Objects (ActiveInteraction)**:
- All business logic in `app/services/` using ActiveInteraction
- Namespace: `Services::`
- Always specify class for object filters: `object :user, class: User`
- Use `string` for dates (not `date` filter - forms send strings)
- See `app/services/invitations/` for complete examples

**Authorization (Pundit)**:
- All resources require policies in `app/policies/`
- Controllers must call `authorize @resource` before actions
- Use `policy_scope(Resource)` for index actions
- See `app/policies/user_policy.rb` for reference

**Active Record**:
- Integer-backed enums: `enum :status, { pending: 0, active: 1 }`
- Validate at both model AND database levels

### Authentication & Authorization
- **JWT-based** (not cookies) - tokens in localStorage for iframe compatibility
- **Auto-refresh** every 30 days
- **Authenticatable concern** in ApplicationController provides `current_user`
- See `app/controllers/sessions_controller.rb` and `app/controllers/concerns/authenticatable.rb`

### Inertia.js
- Controller responses use `render inertia:` for pages
- Shared props auto-injected: `auth`, `flash`, `errors`
- JSON responses for API-style endpoints (see `InvitationsController`)
- Create `_props` helper methods for consistent serialization

### Frontend Stack
- **React + TypeScript** with Inertia.js
- **Forms**: React Hook Form + Zod validation
- **UI**: Shadcn UI Premium (`@ss-components` > `@ss-themes` > `@ss-blocks` > `@shadcn`)
- **Navigation**: Inertia router (not browser navigation)

### Shadcn UI
**Adding components**:
```bash
npx shadcn@latest add @ss-components/button --yes --overwrite
```

---

## Reference Examples

**Study these files before building similar features:**

### Complete Feature Examples

1. **User Management (Admin)**
   - Controller: `app/controllers/admin/users_controller.rb`
   - Policy: `app/policies/user_policy.rb`
   - Services: `app/services/invitations/` (SendInvitation, AcceptInvitation, ResendInvitation)
   - Pages: `app/frontend/pages/Admin/Users/` (Index, Show, New, Edit)
   - Shows complete CRUD with authorization, service objects, and Inertia

2. **Invitation System**
   - Controller: `app/controllers/invitations_controller.rb` (public controller)
   - Services: `app/services/invitations/` (complete invitation flow)
   - Mailer: `app/mailers/user_mailer.rb` (invitation_email method)
   - Page: `app/frontend/pages/Invitations/Accept.tsx` (public page with form)
   - Shows API-style JSON responses, email sending, public pages

3. **Profile Management**
   - Controller: `app/controllers/profiles_controller.rb`
   - Pages: `app/frontend/pages/Profile/` (Show, Edit)
   - Shows file uploads with Active Storage, form handling

4. **Dashboard**
   - Controller: `app/controllers/dashboard_controller.rb`
   - Page: `app/frontend/pages/Dashboard.tsx`
   - Shows simple authenticated page

### Component Examples

1. **Sidebar Navigation**
   - Component: `app/frontend/components/app-sidebar.tsx`
   - Shows shadcn sidebar with navigation, user menu

2. **Delete Confirmation Dialog**
   - Component: `app/frontend/components/delete-confirmation-dialog.tsx`
   - Shows reusable dialog component

3. **UI Components**
   - All in: `app/frontend/components/ui/`
   - Study existing components before adding new ones

---

## Testing

- Models, services, policies, request specs
- See `spec/` directory for complete examples
- Study `spec/requests/admin/users_spec.rb` and `spec/requests/invitations_spec.rb`

---

## File Structure

```
app/
├── controllers/
│   ├── application_controller.rb
│   ├── admin/
│   │   └── users_controller.rb
│   ├── dashboard_controller.rb
│   ├── invitations_controller.rb
│   ├── profiles_controller.rb
│   └── sessions_controller.rb
├── frontend/
│   ├── components/
│   │   ├── ui/              # shadcn components
│   │   ├── app-sidebar.tsx
│   │   └── delete-confirmation-dialog.tsx
│   ├── pages/
│   │   ├── Admin/
│   │   │   └── Users/
│   │   ├── Dashboard.tsx
│   │   ├── Invitations/
│   │   ├── Login.tsx
│   │   └── Profile/
│   └── lib/
│       ├── auth-service.ts
│       └── utils.ts
├── models/
│   ├── user.rb
│   ├── refresh_token.rb
│   └── user_preference.rb
├── policies/
│   └── user_policy.rb
└── services/
    └── invitations/
        ├── send_invitation.rb
        ├── accept_invitation.rb
        └── resend_invitation.rb
```

---

## Common Patterns Checklist

Before implementing a new feature, check:

- [ ] **Authentication**: Does it need JWT authentication?
- [ ] **Authorization**: Create Pundit policy and write tests
- [ ] **Service Objects**: Use ActiveInteraction for business logic
- [ ] **Props**: Create consistent `_props` helper methods
- [ ] **TypeScript**: Define interfaces for all props
- [ ] **Forms**: Use React Hook Form + Zod validation
- [ ] **UI**: Use shadcn premium components
- [ ] **Styling**: Follow existing patterns
- [ ] **Navigation**: Use Inertia router, not browser navigation
- [ ] **Errors**: Handle both service errors and form validation
- [ ] **Tests**: Write complete backend specs (models, services, policies, requests)

---

*This file contains patterns specific to this Inertia.js + React project. Universal Rails standards are in `~/.claude/CLAUDE.md`.*
