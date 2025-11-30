import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '@/test/utils'
import { router } from '@inertiajs/react'
import LearningDashboard from './Dashboard'

// Mock Inertia router
vi.mock('@inertiajs/react', async () => {
  const actual = await vi.importActual('@inertiajs/react')
  return {
    ...actual,
    router: {
      visit: vi.fn(),
    },
  }
})

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    clear: () => {
      store = {}
    },
    removeItem: (key: string) => {
      delete store[key]
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('Learning Dashboard', () => {
  const mockUserProgress = {
    level: 'A1' as const,
    daysActive: 5,
    lessonsCompleted: 10,
    vocabularyCount: 50,
    currentStreak: 3,
    longestStreak: 5,
    badges: 2,
  }

  beforeEach(() => {
    localStorageMock.clear()
    localStorageMock.setItem('interface_language', 'en')
    localStorageMock.setItem('user_level', 'A1')
    localStorageMock.setItem(
      'user_progress',
      JSON.stringify({
        level: 'A1',
        completedLessons: [],
        vocabularyCount: 50,
        currentStreak: 3,
        achievements: [],
        lastActivityDate: new Date().toISOString(),
      })
    )
    vi.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders welcome message and subtitle', () => {
      render(<LearningDashboard userProgress={mockUserProgress} />)

      expect(screen.getByText('Welcome to Learning Kyrgyz')).toBeInTheDocument()
      expect(screen.getByText('Start your journey to mastery')).toBeInTheDocument()
    })

    it('renders all four learning modules', () => {
      render(<LearningDashboard userProgress={mockUserProgress} />)

      expect(screen.getByText('Grammar')).toBeInTheDocument()
      expect(screen.getByText('Reading & Comprehension')).toBeInTheDocument()
      expect(screen.getByText('Writing')).toBeInTheDocument()
      expect(screen.getByText('Vocabulary Builder')).toBeInTheDocument()
    })

    it('renders progress stats', () => {
      render(<LearningDashboard userProgress={mockUserProgress} />)

      expect(screen.getByText('Your Progress')).toBeInTheDocument()
      expect(screen.getByText('A1')).toBeInTheDocument()
      expect(screen.getByText('Days Active')).toBeInTheDocument()
      expect(screen.getByText('Lessons Completed')).toBeInTheDocument()
      expect(screen.getByText('Words Learned')).toBeInTheDocument()
      expect(screen.getByText('Current Streak')).toBeInTheDocument()
      expect(screen.getByText('Badges Earned')).toBeInTheDocument()
    })

    it('renders support features', () => {
      render(<LearningDashboard userProgress={mockUserProgress} />)

      expect(screen.getByText('AI Assistant')).toBeInTheDocument()
      expect(screen.getByText('Technical Support')).toBeInTheDocument()
    })
  })

  describe('Recommendations Feature', () => {
    it('renders recommendations section with toggle button', () => {
      render(<LearningDashboard userProgress={mockUserProgress} />)

      expect(screen.getByText('Recommended for You')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /view recommendations/i })).toBeInTheDocument()
    })

    it('shows level description', () => {
      render(<LearningDashboard userProgress={mockUserProgress} />)

      expect(
        screen.getByText(/at this level, you understand simple phrases/i)
      ).toBeInTheDocument()
    })

    it('toggles recommendations visibility when button is clicked', async () => {
      const user = userEvent.setup()
      render(<LearningDashboard userProgress={mockUserProgress} />)

      const toggleButton = screen.getByRole('button', { name: /view recommendations/i })

      // Initially hidden
      expect(screen.queryByText('Listening')).not.toBeInTheDocument()

      // Click to show
      await user.click(toggleButton)

      await waitFor(() => {
        expect(screen.getByText('Listening')).toBeInTheDocument()
        expect(screen.getByText('Reading')).toBeInTheDocument()
        expect(screen.getByText('Watching')).toBeInTheDocument()
      })

      // Button text changes
      expect(screen.getByRole('button', { name: /hide recommendations/i })).toBeInTheDocument()

      // Click to hide
      await user.click(screen.getByRole('button', { name: /hide recommendations/i }))

      await waitFor(() => {
        expect(screen.queryByText('Listening')).not.toBeInTheDocument()
      })
    })

    it('displays A1 level recommendations when expanded', async () => {
      const user = userEvent.setup()
      render(<LearningDashboard userProgress={mockUserProgress} />)

      const toggleButton = screen.getByRole('button', { name: /view recommendations/i })
      await user.click(toggleButton)

      await waitFor(() => {
        // Check for A1 specific content (resource titles) - use getAllByText since there might be duplicates
        const keremet = screen.getAllByText(/керемет көч/i)
        expect(keremet.length).toBeGreaterThan(0)
        expect(screen.getByText(/kyrgyz audio dictionary/i)).toBeInTheDocument()
      })
    })

    it('displays resource cards with images and links', async () => {
      const user = userEvent.setup()
      render(<LearningDashboard userProgress={mockUserProgress} />)

      const toggleButton = screen.getByRole('button', { name: /view recommendations/i })
      await user.click(toggleButton)

      await waitFor(() => {
        // Check for external links
        const links = screen.getAllByRole('link')
        expect(links.length).toBeGreaterThan(0)

        // Check that links open in new tab
        links.forEach((link) => {
          expect(link).toHaveAttribute('target', '_blank')
          expect(link).toHaveAttribute('rel', 'noopener noreferrer')
        })
      })
    })

    it('displays content type badges', async () => {
      const user = userEvent.setup()
      render(<LearningDashboard userProgress={mockUserProgress} />)

      const toggleButton = screen.getByRole('button', { name: /view recommendations/i })
      await user.click(toggleButton)

      await waitFor(() => {
        // Check for type badges (case insensitive)
        const badges = screen.getAllByText(/song|podcast|book|video|article/i)
        expect(badges.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Russian Language Support', () => {
    beforeEach(() => {
      localStorageMock.setItem('interface_language', 'ru')
    })

    it('renders in Russian when language is set to ru', () => {
      render(<LearningDashboard userProgress={mockUserProgress} />)

      expect(screen.getByText('Добро пожаловать в изучение кыргызского')).toBeInTheDocument()
      expect(screen.getByText('Начните свой путь к мастерству')).toBeInTheDocument()
      expect(screen.getByText('Грамматика')).toBeInTheDocument()
    })

    it('shows Russian recommendations text', async () => {
      const user = userEvent.setup()
      render(<LearningDashboard userProgress={mockUserProgress} />)

      const toggleButton = screen.getByRole('button', { name: /посмотреть рекомендации/i })
      await user.click(toggleButton)

      await waitFor(() => {
        expect(screen.getByText('Слушание')).toBeInTheDocument()
        expect(screen.getByText('Чтение')).toBeInTheDocument()
        expect(screen.getByText('Просмотр')).toBeInTheDocument()
      })
    })
  })

  describe('Navigation', () => {
    it('navigates to grammar module when clicked', async () => {
      const user = userEvent.setup()
      render(<LearningDashboard userProgress={mockUserProgress} />)

      const grammarCard = screen.getByTestId('module-grammar')
      await user.click(grammarCard)

      expect(router.visit).toHaveBeenCalledWith('/learning/grammar')
    })

    it('navigates to reading module when clicked', async () => {
      const user = userEvent.setup()
      render(<LearningDashboard userProgress={mockUserProgress} />)

      const readingCard = screen.getByTestId('module-reading-&-comprehension')
      await user.click(readingCard)

      expect(router.visit).toHaveBeenCalledWith('/learning/reading')
    })

    it('navigates to writing module when clicked', async () => {
      const user = userEvent.setup()
      render(<LearningDashboard userProgress={mockUserProgress} />)

      const writingCard = screen.getByTestId('module-writing')
      await user.click(writingCard)

      expect(router.visit).toHaveBeenCalledWith('/learning/writing')
    })

    it('navigates to vocabulary module when clicked', async () => {
      const user = userEvent.setup()
      render(<LearningDashboard userProgress={mockUserProgress} />)

      const vocabCard = screen.getByTestId('module-vocabulary-builder')
      await user.click(vocabCard)

      expect(router.visit).toHaveBeenCalledWith('/learning/vocabulary')
    })

    it('navigates to progress page when view details is clicked', async () => {
      const user = userEvent.setup()
      render(<LearningDashboard userProgress={mockUserProgress} />)

      const viewDetailsButton = screen.getByRole('button', { name: /view details/i })
      await user.click(viewDetailsButton)

      expect(router.visit).toHaveBeenCalledWith('/learning/progress')
    })
  })

  describe('Modal Interactions', () => {
    it('opens AI Assistant modal when card is clicked', async () => {
      const user = userEvent.setup()
      render(<LearningDashboard userProgress={mockUserProgress} />)

      const aiCard = screen.getByTestId('ai-assistant-card')
      await user.click(aiCard)

      // Modal should be visible (checking for modal content)
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
    })

    it('opens Tech Support modal when card is clicked', async () => {
      const user = userEvent.setup()
      render(<LearningDashboard userProgress={mockUserProgress} />)

      const supportCard = screen.getByTestId('support-card')
      await user.click(supportCard)

      // Modal should be visible
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
    })
  })

  describe('Different User Levels', () => {
    it('displays B1 level recommendations correctly', async () => {
      const user = userEvent.setup()
      const b1Progress = { ...mockUserProgress, level: 'B1' as const }
      localStorageMock.setItem('user_level', 'B1')
      localStorageMock.setItem(
        'user_progress',
        JSON.stringify({
          level: 'B1',
          completedLessons: [],
          vocabularyCount: 50,
          currentStreak: 3,
          achievements: [],
          lastActivityDate: new Date().toISOString(),
        })
      )

      render(<LearningDashboard userProgress={b1Progress} />)

      // Wait for component to load with B1 level
      await waitFor(() => {
        expect(screen.getByText('B1')).toBeInTheDocument()
      })

      const toggleButton = screen.getByRole('button', { name: /view recommendations/i })
      await user.click(toggleButton)

      await waitFor(() => {
        expect(
          screen.getByText(/you feel comfortable in most everyday situations/i)
        ).toBeInTheDocument()
      })
    })

    it('displays C1 level recommendations correctly', async () => {
      const user = userEvent.setup()
      const c1Progress = { ...mockUserProgress, level: 'C1' as const }
      localStorageMock.setItem('user_level', 'C1')
      localStorageMock.setItem(
        'user_progress',
        JSON.stringify({
          level: 'C1',
          completedLessons: [],
          vocabularyCount: 50,
          currentStreak: 3,
          achievements: [],
          lastActivityDate: new Date().toISOString(),
        })
      )

      render(<LearningDashboard userProgress={c1Progress} />)

      // Wait for component to load with C1 level
      await waitFor(() => {
        expect(screen.getByText('C1')).toBeInTheDocument()
      })

      const toggleButton = screen.getByRole('button', { name: /view recommendations/i })
      await user.click(toggleButton)

      await waitFor(() => {
        expect(
          screen.getByText(/you easily understand long complex texts/i)
        ).toBeInTheDocument()
      })
    })
  })

  describe('Loading State', () => {
    it('loads progress from localStorage when userProgress prop is null', async () => {
      // Setup localStorage with progress data
      localStorageMock.clear()
      localStorageMock.setItem('interface_language', 'en')
      localStorageMock.setItem('user_level', 'A1')
      localStorageMock.setItem(
        'user_progress',
        JSON.stringify({
          level: 'A1',
          completedLessons: [{ moduleType: 'grammar', lessonId: 'test', completedAt: new Date().toISOString() }],
          vocabularyCount: 100,
          currentStreak: 5,
          achievements: [],
          lastActivityDate: new Date().toISOString(),
        })
      )

      render(<LearningDashboard userProgress={null} />)

      // After useEffect runs, it should load progress from localStorage and show content
      await waitFor(() => {
        expect(screen.getByText('Welcome to Learning Kyrgyz')).toBeInTheDocument()
        expect(screen.getByText('A1')).toBeInTheDocument()
      })
    })
  })
})
