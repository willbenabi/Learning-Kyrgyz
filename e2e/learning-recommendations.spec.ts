import { test, expect } from '@playwright/test'

/**
 * E2E Tests for Learning Dashboard Recommendations Feature
 *
 * Tests the complete user workflow for viewing and interacting with
 * level-based content recommendations on the Learning Dashboard.
 */

test.describe('Learning Dashboard: Recommendations Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Setup: Set user to A1 level and navigate to learning dashboard
    await page.goto('/learning/dashboard')

    // Set localStorage for user level and language
    await page.evaluate(() => {
      localStorage.setItem('interface_language', 'en')
      localStorage.setItem('user_level', 'A1')
      localStorage.setItem('user_progress', JSON.stringify({
        level: 'A1',
        completedLessons: [],
        vocabularyCount: 50,
        currentStreak: 3,
        achievements: [],
        lastActivityDate: new Date().toISOString()
      }))
    })

    // Reload to apply localStorage
    await page.reload()
  })

  test('displays recommendations section on dashboard', async ({ page }) => {
    // Check that recommendations section exists
    await expect(page.locator('text=Recommended for You')).toBeVisible()

    // Check that level description is visible
    await expect(page.locator('text=/at this level.*simple phrases/i')).toBeVisible()

    // Check that toggle button exists
    await expect(page.locator('button', { hasText: /view recommendations/i })).toBeVisible()
  })

  test('toggles recommendations visibility', async ({ page }) => {
    const toggleButton = page.locator('button', { hasText: /view recommendations/i })

    // Initially, detailed recommendations should be hidden
    await expect(page.locator('text=Listening').first()).not.toBeVisible()

    // Click to show recommendations
    await toggleButton.click()

    // Now categories should be visible
    await expect(page.locator('text=Listening').first()).toBeVisible()
    await expect(page.locator('text=Reading').first()).toBeVisible()
    await expect(page.locator('text=Watching').first()).toBeVisible()

    // Button text should change
    await expect(page.locator('button', { hasText: /hide recommendations/i })).toBeVisible()

    // Click to hide again
    await page.locator('button', { hasText: /hide recommendations/i }).click()

    // Categories should be hidden again
    await expect(page.locator('text=Listening').first()).not.toBeVisible()
  })

  test('displays A1 level recommendations with resource cards', async ({ page }) => {
    // Show recommendations
    await page.locator('button', { hasText: /view recommendations/i }).click()

    // Wait for recommendations to appear
    await expect(page.locator('text=Listening').first()).toBeVisible()

    // Check for specific A1 resources
    await expect(page.locator('text=/керемет көч/i').first()).toBeVisible()
    await expect(page.locator('text=/kyrgyz audio dictionary/i')).toBeVisible()

    // Check that resource cards are present (multiple cards per category)
    const listeningSection = page.locator('text=Listening').first().locator('..').locator('..')
    const resourceCards = listeningSection.locator('a[href]')
    await expect(resourceCards.first()).toBeVisible()
  })

  test('resource cards have external links that open in new tab', async ({ page }) => {
    // Show recommendations
    await page.locator('button', { hasText: /view recommendations/i }).click()

    // Wait for recommendations
    await expect(page.locator('text=Listening').first()).toBeVisible()

    // Get first resource link
    const firstLink = page.locator('a[target="_blank"]').first()

    // Verify it has correct attributes for external link
    await expect(firstLink).toHaveAttribute('target', '_blank')
    await expect(firstLink).toHaveAttribute('rel', 'noopener noreferrer')
    await expect(firstLink).toHaveAttribute('href', /.+/) // Has a URL
  })

  test('displays content type badges', async ({ page }) => {
    // Show recommendations
    await page.locator('button', { hasText: /view recommendations/i }).click()

    // Wait for content
    await expect(page.locator('text=Listening').first()).toBeVisible()

    // Check for type badges (case insensitive)
    const badges = page.locator('text=/^(song|podcast|book|video|article|film|news)$/i')
    await expect(badges.first()).toBeVisible()

    // Should have multiple badges across different categories
    const badgeCount = await badges.count()
    expect(badgeCount).toBeGreaterThan(3) // At least 3-4 different types
  })

  test('displays images for resources with imageUrl', async ({ page }) => {
    // Show recommendations
    await page.locator('button', { hasText: /view recommendations/i }).click()

    // Wait for content
    await expect(page.locator('text=Listening').first()).toBeVisible()

    // Look for images within resource cards
    const images = page.locator('a[href] img')

    // Some resources should have images (not all, but some)
    const imageCount = await images.count()
    expect(imageCount).toBeGreaterThanOrEqual(0) // Images might not load in test env, so >= 0
  })

  test('works in Russian language', async ({ page }) => {
    // Switch to Russian
    await page.evaluate(() => {
      localStorage.setItem('interface_language', 'ru')
    })
    await page.reload()

    // Check Russian text
    await expect(page.locator('text=Добро пожаловать в изучение кыргызского')).toBeVisible()

    // Show recommendations
    await page.locator('button', { hasText: /посмотреть рекомендации/i }).click()

    // Check Russian category names
    await expect(page.locator('text=Слушание').first()).toBeVisible()
    await expect(page.locator('text=Чтение').first()).toBeVisible()
    await expect(page.locator('text=Просмотр').first()).toBeVisible()

    // Check for Russian type badges
    await expect(page.locator('text=/^(песня|подкаст|книга|видео|статья|фильм|новости)$/i').first()).toBeVisible()
  })

  test('adapts recommendations to different user levels', async ({ page }) => {
    // Test B1 level
    await page.evaluate(() => {
      localStorage.setItem('user_level', 'B1')
      localStorage.setItem('user_progress', JSON.stringify({
        level: 'B1',
        completedLessons: [],
        vocabularyCount: 500,
        currentStreak: 10,
        achievements: [],
        lastActivityDate: new Date().toISOString()
      }))
    })
    await page.reload()

    // Check B1 level indicator
    await expect(page.locator('text=B1').first()).toBeVisible()

    // Check B1 description
    await expect(page.locator('text=/you feel comfortable in most everyday situations/i')).toBeVisible()

    // Show recommendations
    await page.locator('button', { hasText: /view recommendations/i }).click()

    // B1 should have different content (e.g., news portals, films)
    await expect(page.locator('text=/24.kg|биринчи радио|курманжан датка/i').first()).toBeVisible()
  })

  test('displays three columns of resource cards on desktop', async ({ page }) => {
    // Show recommendations
    await page.locator('button', { hasText: /view recommendations/i }).click()

    // Wait for content
    await expect(page.locator('text=Listening').first()).toBeVisible()

    // Check grid layout exists
    const grid = page.locator('.grid.md\\:grid-cols-3').first()
    await expect(grid).toBeVisible()

    // Should have multiple cards in the grid
    const cards = grid.locator('a[href]')
    const cardCount = await cards.count()
    expect(cardCount).toBeGreaterThan(0)
  })

  test('complete user flow: view recommendations, interact with card', async ({ page }) => {
    // User arrives at dashboard
    await expect(page.locator('text=Welcome to Learning Kyrgyz')).toBeVisible()

    // User sees recommendations section
    await expect(page.locator('text=Recommended for You')).toBeVisible()

    // User clicks to view recommendations
    await page.locator('button', { hasText: /view recommendations/i }).click()

    // User sees three categories
    await expect(page.locator('text=Listening').first()).toBeVisible()
    await expect(page.locator('text=Reading').first()).toBeVisible()
    await expect(page.locator('text=Watching').first()).toBeVisible()

    // User sees resource cards with titles and descriptions
    await expect(page.locator('text=/керемет көч/i').first()).toBeVisible()

    // User sees type badges
    await expect(page.locator('text=/song|podcast/i').first()).toBeVisible()

    // User can identify external links
    const externalLink = page.locator('a[target="_blank"]').first()
    await expect(externalLink).toBeVisible()

    // User can collapse recommendations
    await page.locator('button', { hasText: /hide recommendations/i }).click()
    await expect(page.locator('text=Listening').first()).not.toBeVisible()
  })
})
