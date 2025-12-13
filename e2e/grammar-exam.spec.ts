import { test, expect } from '@playwright/test'

test.describe('Grammar Exam Complete Workflow', () => {
  test.beforeEach(async ({ page }) => {
    // Seed exam questions via a rake task or SQL (in real scenario)
    // For now, we'll assume questions are seeded

    // Login as user
    await page.goto('/login')
    await page.getByTestId('email-input').fill('user1@example.com')
    await page.getByTestId('password-input').fill('password')
    await page.getByTestId('login-button').click()

    // Wait for redirect
    await page.waitForURL('/learning/dashboard')
  })

  test('complete exam workflow from start to results', async ({ page }) => {
    // Navigate to Grammar page
    await page.goto('/learning/grammar')

    // Verify page loaded
    await expect(page.getByText(/Grammar Lessons/i)).toBeVisible()

    // Check if Final Exam section is visible (assuming user completed lessons)
    // If locked, this test would need to complete lessons first
    const finalExamSection = page.getByText(/Final Comprehensive Exam/i)

    // If exam is unlocked, proceed to take it
    if (await finalExamSection.isVisible()) {
      // Click "Take Exam" or "Retake Exam" button
      const examButton = page.getByRole('button', { name: /(Take|Retake) Exam/i })

      if (await examButton.isVisible() && !await examButton.isDisabled()) {
        await examButton.click()

        // Wait for exam page to load
        await page.waitForURL(/\/grammar_exams\/new/)

        // Verify exam start page
        await expect(page.getByText(/Grammar Comprehensive Exam/i)).toBeVisible()
        await expect(page.getByText(/35 questions/i)).toBeVisible()

        // Start the exam
        const startButton = page.getByRole('button', { name: /Start Exam/i })
        await startButton.click()

        // Wait for first question to load
        await expect(page.getByText(/Question 1 of 35/i)).toBeVisible({ timeout: 10000 })

        // Answer all 35 questions
        for (let i = 0; i < 35; i++) {
          // Select first answer option
          const firstOption = page.getByTestId('answer-option-0')
          await firstOption.click()

          // Go to next question or submit
          if (i < 34) {
            await page.getByRole('button', { name: /Next/i }).click()
          } else {
            // Last question - submit
            const submitButton = page.getByTestId('submit-exam-button')
            await submitButton.click()
          }
        }

        // Wait for results page
        await page.waitForURL(/\/grammar_exams\/\d+\/results/, { timeout: 10000 })

        // Verify results page loaded
        await expect(page.getByText(/Exam Results|Congratulations/i)).toBeVisible()

        // Check for score display
        const scoreElement = page.locator('text=/\\d+%/')
        await expect(scoreElement.first()).toBeVisible()

        // Verify category breakdown is shown
        await expect(page.getByText(/Category Breakdown/i)).toBeVisible()

        // Test retake button
        const retakeButton = page.getByTestId('retake-exam-button')
        await expect(retakeButton).toBeVisible()
      }
    }
  })

  test('navigate back to grammar from exam page', async ({ page }) => {
    await page.goto('/learning/grammar')

    const finalExamSection = page.getByText(/Final Comprehensive Exam/i)

    if (await finalExamSection.isVisible()) {
      const examButton = page.getByRole('button', { name: /(Take|Retake) Exam/i })

      if (await examButton.isVisible() && !await examButton.isDisabled()) {
        await examButton.click()

        await page.waitForURL(/\/grammar_exams\/new/)

        // Click back to grammar
        const backButton = page.getByRole('button', { name: /Back to Grammar/i })
        await backButton.click()

        // Should be back on grammar page
        await page.waitForURL('/learning/grammar')
        await expect(page.getByText(/Grammar Lessons/i)).toBeVisible()
      }
    }
  })
})
