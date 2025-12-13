import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { router } from '@inertiajs/react'
import GrammarExamResults from './Results'

vi.mock('@inertiajs/react', () => ({
  router: {
    visit: vi.fn()
  }
}))

const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value },
    clear: () => { store = {} }
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('GrammarExamResults', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.clear()
    localStorageMock.setItem('interface_language', 'en')
  })

  const passingExam = {
    id: 1,
    level: 'A1',
    score: 85,
    passed: true,
    attempted_at: '2025-01-01T12:00:00Z',
    time_spent: 1800,
    category_breakdown: {
      syntax: { correct: 18, total: 20 },
      morphology: { correct: 12, total: 15 }
    },
    incorrect_answers: [
      {
        question_id: 1,
        category: 'syntax',
        selected_index: 1,
        correct_index: 0,
        options: {
          en: ['Correct', 'Wrong', 'Wrong 2', 'Wrong 3'],
          ru: ['Правильно', 'Неправильно', 'Неправильно 2', 'Неправильно 3']
        },
        explanation: 'This is the explanation',
        correct: false
      }
    ]
  }

  const failingExam = {
    ...passingExam,
    score: 65,
    passed: false,
    category_breakdown: {
      syntax: { correct: 12, total: 20 },
      morphology: { correct: 11, total: 15 }
    }
  }

  describe('Passing Exam', () => {
    it('shows congratulations message for passing exam', () => {
      render(<GrammarExamResults exam={passingExam} bestScore={85} />)

      expect(screen.getByText('Congratulations!')).toBeInTheDocument()
      expect(screen.getByText(/You passed the exam/)).toBeInTheDocument()
    })

    it('displays score prominently', () => {
      render(<GrammarExamResults exam={passingExam} bestScore={85} />)

      const scores = screen.getAllByText('85%')
      expect(scores.length).toBeGreaterThan(0)
    })

    it('shows level and time spent', () => {
      render(<GrammarExamResults exam={passingExam} bestScore={85} />)

      expect(screen.getByText('A1')).toBeInTheDocument()
      expect(screen.getByText(/30 minutes/)).toBeInTheDocument()
    })

    it('shows best score', () => {
      render(<GrammarExamResults exam={passingExam} bestScore={92} />)

      expect(screen.getByText(/Best Score/)).toBeInTheDocument()
      expect(screen.getByText('92%')).toBeInTheDocument()
    })

    it('shows new best score badge when applicable', () => {
      render(<GrammarExamResults exam={passingExam} bestScore={85} />)

      expect(screen.getByText('New Best Score!')).toBeInTheDocument()
    })
  })

  describe('Failing Exam', () => {
    it('shows encouragement message for failing exam', () => {
      render(<GrammarExamResults exam={failingExam} bestScore={70} />)

      expect(screen.getByText('Exam Results')).toBeInTheDocument()
      expect(screen.getByText(/Keep practicing/)).toBeInTheDocument()
    })

    it('displays failing score', () => {
      render(<GrammarExamResults exam={failingExam} bestScore={70} />)

      expect(screen.getByText('65%')).toBeInTheDocument()
    })

    it('does not show new best score badge for failing score', () => {
      render(<GrammarExamResults exam={failingExam} bestScore={70} />)

      expect(screen.queryByText('New Best Score!')).not.toBeInTheDocument()
    })
  })

  describe('Category Breakdown', () => {
    it('displays category breakdown with percentages', () => {
      render(<GrammarExamResults exam={passingExam} bestScore={85} />)

      expect(screen.getByText('Category Breakdown')).toBeInTheDocument()
      expect(screen.getAllByText('Syntax')[0]).toBeInTheDocument()
      expect(screen.getAllByText('Morphology')[0]).toBeInTheDocument()
      expect(screen.getByText('18/20')).toBeInTheDocument()
      expect(screen.getByText('12/15')).toBeInTheDocument()
    })

    it('shows percentage for each category', () => {
      render(<GrammarExamResults exam={passingExam} bestScore={85} />)

      // Syntax: 18/20 = 90%
      const ninetyPercent = screen.getAllByText('90%')
      expect(ninetyPercent.length).toBeGreaterThan(0)
      // Morphology: 12/15 = 80%
      const eightyPercent = screen.getAllByText('80%')
      expect(eightyPercent.length).toBeGreaterThan(0)
    })
  })

  describe('Incorrect Answers Review', () => {
    it('displays incorrect answers section', () => {
      render(<GrammarExamResults exam={passingExam} bestScore={85} />)

      expect(screen.getByText('Questions to Review')).toBeInTheDocument()
      expect(screen.getByText('1 question(s)')).toBeInTheDocument()
    })

    it('shows user answer and correct answer', () => {
      render(<GrammarExamResults exam={passingExam} bestScore={85} />)

      expect(screen.getByText('Your Answer:')).toBeInTheDocument()
      expect(screen.getByText('Wrong')).toBeInTheDocument()
      expect(screen.getByText('Correct Answer:')).toBeInTheDocument()
      expect(screen.getByText('Correct')).toBeInTheDocument()
    })

    it('shows explanation for incorrect answers', () => {
      render(<GrammarExamResults exam={passingExam} bestScore={85} />)

      expect(screen.getByText('Explanation:')).toBeInTheDocument()
      expect(screen.getByText('This is the explanation')).toBeInTheDocument()
    })

    it('does not show incorrect answers section when all correct', () => {
      const perfectExam = {
        ...passingExam,
        score: 100,
        incorrect_answers: []
      }

      render(<GrammarExamResults exam={perfectExam} bestScore={100} />)

      expect(screen.queryByText('Questions to Review')).not.toBeInTheDocument()
    })
  })

  describe('Actions', () => {
    it('has back to grammar button', () => {
      render(<GrammarExamResults exam={passingExam} bestScore={85} />)

      const backButtons = screen.getAllByRole('button', { name: /Back to Grammar/i })
      expect(backButtons).toHaveLength(2) // One in top button area, one in action buttons
    })

    it('has retake exam button', async () => {
      const user = userEvent.setup()
      render(<GrammarExamResults exam={passingExam} bestScore={85} />)

      const retakeButton = screen.getByRole('button', { name: /Retake Exam/i })
      expect(retakeButton).toBeInTheDocument()

      await user.click(retakeButton)

      expect(router.visit).toHaveBeenCalledWith('/grammar_exams/new?level=A1')
    })

    it('navigates back to grammar when back button clicked', async () => {
      const user = userEvent.setup()
      render(<GrammarExamResults exam={passingExam} bestScore={85} />)

      const backButtons = screen.getAllByRole('button', { name: /Back to Grammar/i })
      await user.click(backButtons[0])

      expect(router.visit).toHaveBeenCalledWith('/learning/grammar')
    })
  })

  describe('Localization', () => {
    it('displays in Russian when language is set to Russian', () => {
      localStorageMock.setItem('interface_language', 'ru')

      render(<GrammarExamResults exam={passingExam} bestScore={85} />)

      expect(screen.getByText('Поздравляем!')).toBeInTheDocument()
      expect(screen.getAllByText('Синтаксис')[0]).toBeInTheDocument()
      expect(screen.getAllByText('Морфология')[0]).toBeInTheDocument()
    })
  })
})
