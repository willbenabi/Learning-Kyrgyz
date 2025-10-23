# End-to-End Testing with Playwright

This directory contains smoke tests that verify critical user flows are working correctly.

## Setup

1. **Install Playwright browsers** (one-time setup):
   ```bash
   npx playwright install chromium
   ```

2. **Prepare test database**:
   ```bash
   # Create test database if it doesn't exist
   RAILS_ENV=test bundle exec rails db:create

   # Run migrations
   RAILS_ENV=test bundle exec rails db:migrate

   # Load seed data (IMPORTANT: tests depend on seed users)
   RAILS_ENV=test bundle exec rails db:seed
   ```

## Running Tests

**Good news**: The server auto-starts/stops when you run e2e tests! No need to manually run `bin/dev`.

### Local Development

```bash
npm run test:e2e                # Run all tests (headless, server auto-starts)
npm run test:e2e:ui             # Run with Playwright UI (best for debugging)
npm run test:e2e:headed         # Run with visible browser
npm run test:e2e:debug          # Run with debugger
```

### Testing Deployed Apps (Digital Ocean VPS, Staging, Production)

To test your deployed application instead of localhost:

```bash
BASE_URL=https://your-domain.com npm run test:e2e
```

This is useful for:
- Testing staging environment before production deploy
- Smoke tests after production deployment
- Testing on your Digital Ocean VPS

### Run All Tests Together

To run unit tests + integration tests + e2e tests:

```bash
npm run test:all                # Runs Vitest + RSpec + Playwright
```

## Test Coverage

The smoke tests in `smoke.spec.ts` verify:

### Authentication & Navigation
- ✅ Admin login
- ✅ Invalid credentials handling
- ✅ Unauthenticated redirect
- ✅ Dashboard access
- ✅ Sidebar navigation
- ✅ Logout

### Admin Features
- ✅ Admin console access
- ✅ Users list
- ✅ Create new user (invitation)
- ✅ View user details
- ✅ Authorization (regular user cannot access admin pages)

### User Profile
- ✅ View profile
- ✅ Edit profile

## Writing New E2E Tests

### Using Auth Fixtures

Use the provided fixtures for authenticated tests:

```typescript
import { test as authTest, expect } from './fixtures/auth'

authTest('my test', async ({ adminPage }) => {
  // adminPage is already logged in as admin@example.com
  await adminPage.goto('/admin/console')
  await expect(adminPage).toHaveURL('/admin/console')
})

authTest('another test', async ({ authenticatedPage }) => {
  // authenticatedPage is logged in as user1@example.com (regular user)
  await authenticatedPage.goto('/dashboard')
  await expect(authenticatedPage).toHaveURL('/dashboard')
})
```

### Test Structure

Follow this pattern:

```typescript
authTest.describe('Feature Name', () => {
  authTest('should do something', async ({ adminPage }) => {
    // 1. Navigate to page
    await adminPage.goto('/path')

    // 2. Interact with page
    await adminPage.fill('#field', 'value')
    await adminPage.click('button[type="submit"]')

    // 3. Assert results
    await expect(adminPage).toHaveURL('/expected-path')
    await expect(adminPage.locator('text=Success')).toBeVisible()
  })
})
```

## Troubleshooting

### Server fails to start
- Check if port 3000 is already in use: `lsof -i :3000`
- Kill existing process: `kill -9 $(lsof -t -i:3000)`
- Or use `reuseExistingServer: true` in config (already enabled)

### Tests fail with "user not found"
- Run `RAILS_ENV=test bundle exec rails db:seed` to create test users
- Default credentials: `admin@example.com / password123`

### "Target closed" or timeout errors
- Increase timeout in `playwright.config.ts` if your machine is slow
- Use `npm run test:e2e:headed` to see what's happening in the browser

### Slow tests
- Use `npm run test:e2e:ui` to run specific tests instead of the entire suite
- Check if the development server is running slowly

## Best Practices

1. **Keep tests fast**: Smoke tests should complete in < 5 minutes
2. **Test critical paths only**: Don't test every edge case in e2e tests
3. **Use fixtures**: Always use auth fixtures instead of logging in manually
4. **Selectors priority**:
   - Use `#id` selectors when available
   - Use `text=` for user-visible text
   - Avoid CSS class selectors (they change often)
5. **Timeouts**: Add explicit timeouts for slow operations
6. **Cleanup**: Tests should be independent and not rely on each other
