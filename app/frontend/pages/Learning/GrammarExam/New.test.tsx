import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import GrammarExamNew from './New'

// Mock Inertia
vi.mock('@inertiajs/react', () => ({
  router: {
    visit: vi.fn()
  }
}))

// Mock auth service
vi.mock('@/lib/auth', () => ({
  default: {
    getToken: vi.fn(() => 'fake-token')
  }
}))

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value },
    clear: () => { store = {} }
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('GrammarExamNew', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.clear()
    localStorageMock.setItem('interface_language', 'en')
  })

  const mockProps = {
    level: 'A1',
    bestScore: 0,
    attemptCount: 0,
    previousAttempts: []
  }

  describe('Start Screen', () => {
    it('renders exam introduction correctly', () => {
      render(<GrammarExamNew {...mockProps} />)

      expect(screen.getByText('Grammar Comprehensive Exam')).toBeInTheDocument()
      expect(screen.getByText(/Test your knowledge/)).toBeInTheDocument()
      expect(screen.getByText('Level: A1')).toBeInTheDocument()
      expect(screen.getByText(/35 questions/)).toBeInTheDocument()
    })

    it('shows start exam button', () => {
      render(<GrammarExamNew {...mockProps} />)

      const startButton = screen.getByRole('button', { name: /Start Exam/i })
      expect(startButton).toBeInTheDocument()
      expect(startButton).not.toBeDisabled()
    })

    it('shows best score when user has previous attempts', () => {
      const propsWithAttempts = {
        ...mockProps,
        bestScore: 85,
        attemptCount: 3
      }

      render(<GrammarExamNew {...propsWithAttempts} />)

      expect(screen.getByText('Best Score:')).toBeInTheDocument()
      expect(screen.getByText('85%')).toBeInTheDocument()
      expect(screen.getByText('Attempts: 3')).toBeInTheDocument()
    })

    it('shows previous attempts list', () => {
      const propsWithAttempts = {
        ...mockProps,
        previousAttempts: [
          { id: 1, score: 85, attempted_at: '2025-01-01T12:00:00Z', time_spent: 1800, passed: true },
          { id: 2, score: 65, attempted_at: '2024-12-30T10:00:00Z', time_spent: 2100, passed: false }
        ]
      }

      render(<GrammarExamNew {...propsWithAttempts} />)

      expect(screen.getByText('Previous Attempts')).toBeInTheDocument()
      expect(screen.getByText('85% (Passed)')).toBeInTheDocument()
      expect(screen.getByText('65% (Failed)')).toBeInTheDocument()
    })
  })

  describe('Exam Generation', () => {
    it('starts exam when button clicked', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          questions: [
            {
              id: 1,
              category: 'syntax',
              question: 'Test question?',
              options: {
                en: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
                ru: ['Вариант 1', 'Вариант 2', 'Вариант 3', 'Вариант 4']
              }
            }
          ]
        })
      })

      const user = userEvent.setup()
      render(<GrammarExamNew {...mockProps} />)

      const startButton = screen.getByRole('button', { name: /Start Exam/i })
      await user.click(startButton)

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          '/grammar_exams/generate',
          expect.objectContaining({
            method: 'POST'
          })
        )
      })
    })

    it('shows error when exam generation fails', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ error: 'Not enough questions' })
      })

      const user = userEvent.setup()
      render(<GrammarExamNew {...mockProps} />)

      const startButton = screen.getByRole('button', { name: /Start Exam/i })
      await user.click(startButton)

      await waitFor(() => {
        expect(screen.getByText('Not enough questions')).toBeInTheDocument()
      })
    })
  })

  describe('Exam Taking Interface', () => {
    beforeEach(() => {
      const questions = Array.from({ length: 35 }, (_, i) => ({
        id: i + 1,
        category: i < 20 ? 'syntax' : 'morphology',
        question: `Question ${i + 1}?`,
        options: {
          en: ['Option A', 'Option B', 'Option C', 'Option D'],
          ru: ['Вариант А', 'Вариант Б', 'Вариант В', 'Вариант Г']
        }
      }))

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ questions })
      })
    })

    it('displays question correctly after starting', async () => {
      const user = userEvent.setup()
      render(<GrammarExamNew {...mockProps} />)

      await user.click(screen.getByRole('button', { name: /Start Exam/i }))

      await waitFor(() => {
        expect(screen.getByText('Question 1?')).toBeInTheDocument()
      })
    })

    it('allows selecting answer', async () => {
      const user = userEvent.setup()
      render(<GrammarExamNew {...mockProps} />)

      await user.click(screen.getByRole('button', { name: /Start Exam/i }))

      await waitFor(() => screen.getByText('Question 1?'))

      const option = screen.getByText('Option A')
      await user.click(option)

      // Answer should be selected
      expect(option.closest('div[data-testid="answer-option-0"]')).toHaveClass('border-blue-500')
    })

    it('shows progress correctly', async () => {
      const user = userEvent.setup()
      render(<GrammarExamNew {...mockProps} />)

      await user.click(screen.getByRole('button', { name: /Start Exam/i }))

      await waitFor(() => {
        expect(screen.getByText('Question 1 of 35')).toBeInTheDocument()
        expect(screen.getByText('Answered: 0/35')).toBeInTheDocument()
      })
    })

    it('navigates between questions', async () => {
      const user = userEvent.setup()
      render(<GrammarExamNew {...mockProps} />)

      await user.click(screen.getByRole('button', { name: /Start Exam/i }))

      await waitFor(() => screen.getByText('Question 1?'))

      // Go to next question
      await user.click(screen.getByRole('button', { name: /Next/i }))

      expect(screen.getByText('Question 2?')).toBeInTheDocument()

      // Go back
      await user.click(screen.getByRole('button', { name: /Previous/i }))

      expect(screen.getByText('Question 1?')).toBeInTheDocument()
    })

    it('shows submit button on last question', async () => {
      const user = userEvent.setup()
      render(<GrammarExamNew {...mockProps} />)

      await user.click(screen.getByRole('button', { name: /Start Exam/i }))

      await waitFor(() => screen.getByText('Question 1?'))

      // Navigate to last question (35)
      for (let i = 0; i < 34; i++) {
        await user.click(screen.getByRole('button', { name: /Next/i }))
      }

      expect(screen.getByRole('button', { name: /Submit Exam/i })).toBeInTheDocument()
    })
  })

  describe('Exam Submission', () => {
    beforeEach(() => {
      const questions = Array.from({ length: 35 }, (_, i) => ({
        id: i + 1,
        category: 'syntax',
        question: `Question ${i + 1}?`,
        options: {
          en: ['Option A', 'Option B', 'Option C', 'Option D'],
          ru: ['Вариант А', 'Вариант Б', 'Вариант В', 'Вариант Г']
        }
      }))

      global.fetch = vi.fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ questions })
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            success: true,
            results: { exam_id: 1, score: 100 }
          })
        })
    })

    it('confirms submission with unanswered questions', async () => {
      window.confirm = vi.fn(() => false)

      const user = userEvent.setup()
      render(<GrammarExamNew {...mockProps} />)

      await user.click(screen.getByRole('button', { name: /Start Exam/i }))
      await waitFor(() => screen.getByText('Question 1?'))

      // Navigate to last question without answering
      for (let i = 0; i < 34; i++) {
        await user.click(screen.getByRole('button', { name: /Next/i }))
      }

      await user.click(screen.getByRole('button', { name: /Submit Exam/i }))

      expect(window.confirm).toHaveBeenCalled()
    })
  })
})
