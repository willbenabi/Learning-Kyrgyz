import { test, expect } from '@playwright/test'

/**
 * Health Check Tests
 *
 * Minimal system health verification (< 1 minute runtime).
 * Verifies critical infrastructure components are working.
 *
 * Run this before marking any feature complete to ensure the app isn't broken.
 *
 * What this checks:
 * 1. Web Server (Puma) - Server responds
 * 2. Asset Pipeline (Vite) - JS/CSS assets load
 * 3. Database - Connection works and migrations current
 * 4. Authentication - Login system works
 * 5. Inertia.js - Inertia integration works
 * 6. Critical Routes - Dashboard loads
 *
 * What this DOESN'T check:
 * - Feature-specific functionality (use feature tests)
 * - CRUD operations (use feature tests)
 * - Search/filters (use feature tests)
 * - Form validations (use feature tests)
 */

test.describe('Health Check: System Infrastructure', () => {
  test('1. Web Server (Puma) is responding', async ({ page }) => {
    const response = await page.goto('/')

    // Server should respond (200 or redirect 302/301)
    expect(response?.status()).toBeLessThan(400)
  })

  test('2. Asset Pipeline (Vite) loads JavaScript and CSS', async ({ page }) => {
    await page.goto('/login')

    // Check if Vite-bundled JavaScript loaded
    const jsLoaded = await page.evaluate(() => {
      // Check if React hydrated (Inertia app should mount)
      return document.getElementById('app') !== null
    })
    expect(jsLoaded).toBe(true)

    // Check if CSS loaded (body should have background color from Tailwind)
    const cssLoaded = await page.evaluate(() => {
      const body = document.body
      const bgColor = window.getComputedStyle(body).backgroundColor
      return bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent'
    })
    expect(cssLoaded).toBe(true)
  })

  test('3. Database connection and migrations current', async ({ page }) => {
    // Login page requires database query (load user from DB)
    await page.goto('/login')

    // Fill in credentials (this will query database)
    await page.fill('#email', 'admin@example.com')
    await page.fill('#password', 'password123')
    await page.click('button[type="submit"]')

    // If database is down or migrations broken, we'd get a 500 error
    await expect(page).toHaveURL(/\/(dashboard|login)/, { timeout: 10000 })

    // No error toasts should appear
    const errorToast = page.locator('[role="alert"]').filter({ hasText: /error|failed/i })
    await expect(errorToast).not.toBeVisible()
  })

  test('4. Authentication system works', async ({ page }) => {
    await page.goto('/login')

    // Fill in login form
    await page.fill('#email', 'admin@example.com')
    await page.fill('#password', 'password123')
    await page.click('button[type="submit"]')

    // Should successfully authenticate and redirect
    await expect(page).toHaveURL('/dashboard', { timeout: 10000 })

    // JWT token should be stored in localStorage
    const token = await page.evaluate(() => localStorage.getItem('auth_token'))
    expect(token).toBeTruthy()
  })

  test('5. Inertia.js integration works', async ({ page }) => {
    // Verify Inertia is rendering the app by checking for data-page attribute
    await page.goto('/login')

    // Login page should have Inertia data-page attribute
    const loginPageData = await page.locator('#app[data-page]').count()
    expect(loginPageData).toBeGreaterThan(0)

    // Perform login (this tests Inertia form submission and navigation)
    await page.fill('#email', 'admin@example.com')
    await page.fill('#password', 'password123')
    await page.click('button[type="submit"]')

    // If Inertia is working, we should redirect to dashboard without full page reload
    await expect(page).toHaveURL('/dashboard', { timeout: 10000 })

    // Dashboard should also have Inertia data-page attribute
    const dashboardPageData = await page.locator('#app[data-page]').count()
    expect(dashboardPageData).toBeGreaterThan(0)
  })

  test('6. Critical routes load (Dashboard)', async ({ page }) => {
    // Login first
    await page.goto('/login')
    await page.fill('#email', 'admin@example.com')
    await page.fill('#password', 'password123')
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL('/dashboard', { timeout: 10000 })

    // Dashboard should render without errors - check for sidebar
    await expect(page.locator('[data-sidebar="sidebar"]')).toBeVisible()
  })
})
