import { test, expect } from '@playwright/test'

/**
 * Token Refresh E2E Tests
 *
 * These tests verify that JWT tokens are stored and managed correctly
 * during user sessions, and that invalid tokens redirect to login.
 *
 * Scenarios covered:
 * 1. Valid tokens persist across page reloads
 * 2. Invalid/corrupted tokens redirect to login
 * 3. Missing refresh token redirects to login
 * 4. Tokens remain valid during active navigation
 */

test.describe('Token Refresh', () => {
  test('tokens persist across page reloads during valid session', async ({ page }) => {
    // Login normally
    await page.goto('/login')
    await page.fill('#email', 'admin@example.com')
    await page.fill('#password', 'password123')
    await page.click('button[type="submit"]')
    await page.waitForURL(/\/dashboard/, { timeout: 10000 })

    // Get initial tokens
    const initialToken = await page.evaluate(() => localStorage.getItem('auth_token'))
    const initialRefreshToken = await page.evaluate(() => localStorage.getItem('refresh_token'))
    expect(initialToken).toBeTruthy()
    expect(initialRefreshToken).toBeTruthy()

    // Reload the page - should stay authenticated
    await page.reload()
    await page.waitForURL(/\/dashboard/, { timeout: 10000 })

    // Verify still authenticated (sidebar visible)
    await expect(page.locator('[data-sidebar="sidebar"]')).toBeVisible()
    const currentToken = await page.evaluate(() => localStorage.getItem('auth_token'))
    const currentRefreshToken = await page.evaluate(() => localStorage.getItem('refresh_token'))
    expect(currentToken).toBeTruthy()
    expect(currentRefreshToken).toBeTruthy()
  })

  test('invalid auth token redirects to login', async ({ page }) => {
    // Login normally
    await page.goto('/login')
    await page.fill('#email', 'admin@example.com')
    await page.fill('#password', 'password123')
    await page.click('button[type="submit"]')
    await page.waitForURL(/\/dashboard/, { timeout: 10000 })

    // Replace auth token with invalid one and remove refresh token
    // (to simulate a scenario where both are invalid/missing)
    await page.evaluate(() => {
      localStorage.setItem('auth_token', 'invalid.token.here')
      localStorage.removeItem('refresh_token')
    })

    // Try to navigate - should redirect to login with 401
    await page.goto('/admin/users')

    // Wait for redirect to login
    await page.waitForURL(/\/login/, { timeout: 10000 })

    // Verify we're at login page
    await expect(page).toHaveURL(/\/login/)
    // Wait for login form to appear (Login page tries to refresh token first, then shows form)
    await expect(page.locator('input[id="email"]')).toBeVisible({ timeout: 10000 })
  })

  test('missing refresh token with invalid auth token redirects to login', async ({ page }) => {
    // Login normally
    await page.goto('/login')
    await page.fill('#email', 'admin@example.com')
    await page.fill('#password', 'password123')
    await page.click('button[type="submit"]')
    await page.waitForURL(/\/dashboard/, { timeout: 10000 })

    // Remove refresh token and corrupt auth token
    await page.evaluate(() => {
      localStorage.setItem('auth_token', 'corrupted.token')
      localStorage.removeItem('refresh_token')
    })

    // Reload page - should redirect to login (can't refresh without refresh token)
    await page.reload()

    // Wait for redirect to login
    await page.waitForURL(/\/login/, { timeout: 10000 })

    // Verify we're at login page
    await expect(page).toHaveURL(/\/login/)
  })

  test('tokens remain valid during active navigation', async ({ page }) => {
    // Login normally
    await page.goto('/login')
    await page.fill('#email', 'admin@example.com')
    await page.fill('#password', 'password123')
    await page.click('button[type="submit"]')
    await page.waitForURL(/\/dashboard/, { timeout: 10000 })

    // Get initial token
    const initialToken = await page.evaluate(() => localStorage.getItem('auth_token'))
    expect(initialToken).toBeTruthy()

    // Navigate to profile page
    await page.goto('/profile')
    await page.waitForURL(/\/profile/, { timeout: 10000 })

    // Navigate back to dashboard
    await page.goto('/dashboard')
    await page.waitForURL(/\/dashboard/, { timeout: 10000 })

    // Navigate to admin console (as admin)
    await page.goto('/admin/console')
    await page.waitForURL(/\/admin\/console/, { timeout: 10000 })

    // Verify still authenticated after multiple navigations (sidebar visible)
    await expect(page.locator('[data-sidebar="sidebar"]')).toBeVisible()

    // Token should still be valid
    const currentToken = await page.evaluate(() => localStorage.getItem('auth_token'))
    expect(currentToken).toBeTruthy()
    expect(currentToken).toBe(initialToken) // Should be same token (not expired yet)
  })

  test('cleared tokens redirect to login on protected page access', async ({ page }) => {
    // Login normally
    await page.goto('/login')
    await page.fill('#email', 'admin@example.com')
    await page.fill('#password', 'password123')
    await page.click('button[type="submit"]')
    await page.waitForURL(/\/dashboard/, { timeout: 10000 })

    // Clear all tokens (simulating manual logout or token clearing)
    await page.evaluate(() => {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('refresh_token')
    })

    // Try to access protected page
    await page.goto('/admin/users')

    // Should redirect to login
    await page.waitForURL(/\/login/, { timeout: 10000 })
    await expect(page).toHaveURL(/\/login/)
  })
})
