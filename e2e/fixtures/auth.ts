import { test as base, expect, Page } from '@playwright/test'

/**
 * Authentication Helper for E2E Tests
 *
 * Provides authenticated page fixtures for testing protected routes.
 * Uses the actual login flow to obtain JWT tokens.
 */

interface AuthFixtures {
  authenticatedPage: Page
  adminPage: Page
}

/**
 * Login helper that performs actual authentication
 */
async function login(page: Page, email: string, password: string): Promise<void> {
  await page.goto('/login')
  await page.fill('#email', email)
  await page.fill('#password', password)
  await page.click('button[type="submit"]')

  // Wait for redirect to dashboard after successful login (allow trailing slash or query params)
  await page.waitForURL(/\/dashboard/, { timeout: 15000 })
}

/**
 * Logout helper
 */
async function logout(page: Page): Promise<void> {
  // Click the user menu trigger in sidebar (contains user email)
  await page.getByRole('button', { name: /@example\.com/i }).click()

  // Wait for menu to open and click logout
  await page.getByText('Log out').click()

  // Wait for redirect to login page (allow query params)
  await page.waitForURL(/\/login/, { timeout: 10000 })
}

/**
 * Extended test with authenticated fixtures
 *
 * Usage:
 * ```typescript
 * test('admin can view console', async ({ adminPage }) => {
 *   await adminPage.goto('/admin/console')
 *   await expect(adminPage).toHaveTitle(/Console/)
 * })
 * ```
 */
export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    // This fixture provides a page authenticated as a regular user
    // Matches seed data: user1@example.com / password123
    await login(page, 'user1@example.com', 'password123')
    await use(page)
  },

  adminPage: async ({ page }, use) => {
    // This fixture provides a page authenticated as an admin
    // Matches seed data: admin@example.com / password123
    await login(page, 'admin@example.com', 'password123')
    await use(page)
  },
})

export { expect, login, logout }
