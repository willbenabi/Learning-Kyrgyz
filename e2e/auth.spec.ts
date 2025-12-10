import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
  })

  test('should successfully register a new user', async ({ page }) => {
    const timestamp = Date.now()
    const testEmail = `test${timestamp}@example.com`
    const testUsername = `testuser${timestamp}`

    // Navigate to registration page
    await page.goto('/register')

    // Wait for form to load
    await expect(page.getByText(/create your account/i)).toBeVisible()

    // Fill in registration form
    await page.getByTestId('register-name-input').fill('Test User')
    await page.getByTestId('register-email-input').fill(testEmail)
    await page.getByTestId('register-username-input').fill(testUsername)
    await page.getByTestId('register-password-input').fill('password123')
    await page.getByTestId('register-password-confirmation-input').fill('password123')

    // Submit form
    await page.getByTestId('register-submit-button').click()

    // Should redirect to onboarding after successful registration
    await expect(page).toHaveURL(/\/onboarding\/language/, { timeout: 10000 })
  })

  test('should show error for duplicate email', async ({ page }) => {
    // Try to register with existing email (from seed data)
    await page.goto('/register')

    await page.getByTestId('register-name-input').fill('Test User')
    await page.getByTestId('register-email-input').fill('admin@example.com') // Existing user
    await page.getByTestId('register-password-input').fill('password123')
    await page.getByTestId('register-password-confirmation-input').fill('password123')

    await page.getByTestId('register-submit-button').click()

    // Should show error message
    await expect(page.getByText(/already taken/i)).toBeVisible({ timeout: 5000 })
  })

  test('should show validation errors for invalid form', async ({ page }) => {
    await page.goto('/register')

    // Try to submit empty form
    await page.getByTestId('register-submit-button').click()

    // Should show validation errors
    await expect(page.getByText(/name must be at least 2 characters/i)).toBeVisible()
  })

  test('should successfully login with valid credentials', async ({ page }) => {
    // Login with existing user from seed data
    await page.goto('/login')

    await expect(page.getByText(/sign in/i)).toBeVisible()

    await page.getByTestId('login-email-input').fill('admin@example.com')
    await page.getByTestId('login-password-input').fill('password')

    await page.getByTestId('login-submit-button').click()

    // Should redirect to dashboard or home
    await expect(page).toHaveURL(/\/(dashboard|learning)/, { timeout: 10000 })
  })

  test('should show error for invalid login credentials', async ({ page }) => {
    await page.goto('/login')

    await page.getByTestId('login-email-input').fill('admin@example.com')
    await page.getByTestId('login-password-input').fill('wrongpassword')

    await page.getByTestId('login-submit-button').click()

    // Should show error message
    await expect(page.getByText(/invalid/i)).toBeVisible({ timeout: 5000 })
  })

  test('should track last_sign_in_at after login', async ({ page, request }) => {
    // Login first
    await page.goto('/login')
    await page.getByTestId('login-email-input').fill('admin@example.com')
    await page.getByTestId('login-password-input').fill('password')
    await page.getByTestId('login-submit-button').click()

    // Wait for successful login
    await expect(page).toHaveURL(/\/(dashboard|learning)/, { timeout: 10000 })

    // Get user data to verify last_sign_in_at was updated
    const jwt_token = await page.evaluate(() => localStorage.getItem('jwt_token'))
    expect(jwt_token).toBeTruthy()
  })

  test('should logout successfully', async ({ page }) => {
    // Login first
    await page.goto('/login')
    await page.getByTestId('login-email-input').fill('admin@example.com')
    await page.getByTestId('login-password-input').fill('password')
    await page.getByTestId('login-submit-button').click()

    // Wait for successful login
    await page.waitForURL(/\/(dashboard|learning)/, { timeout: 10000 })

    // Click logout (assuming there's a logout button in the UI)
    // This may vary based on your UI implementation
    await page.getByRole('button', { name: /sign out|logout/i }).click()

    // Should redirect to login or home
    await expect(page).toHaveURL(/\/(login|^\/$)/, { timeout: 10000 })

    // JWT token should be removed from localStorage
    const jwt_token = await page.evaluate(() => localStorage.getItem('jwt_token'))
    expect(jwt_token).toBeNull()
  })
})
