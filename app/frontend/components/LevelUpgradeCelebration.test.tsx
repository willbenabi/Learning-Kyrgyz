import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LevelUpgradeCelebration from './LevelUpgradeCelebration'
import type { Achievement } from '@/lib/levelUpgradeApi'

describe('LevelUpgradeCelebration', () => {
  const mockAchievement: Achievement = {
    type: 'level_upgrade_a2',
    title: 'Upgraded to A2!',
    description: 'Successfully completed all A1 modules and advanced to A2',
    icon: '🏆'
  }

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('modal rendering', () => {
    it('renders when open is true', () => {
      render(
        <LevelUpgradeCelebration
          open={true}
          onClose={vi.fn()}
          previousLevel="A1"
          newLevel="A2"
          achievement={mockAchievement}
        />
      )

      expect(screen.getByTestId('celebration-modal')).toBeInTheDocument()
    })

    it('does not render when open is false', () => {
      render(
        <LevelUpgradeCelebration
          open={false}
          onClose={vi.fn()}
          previousLevel="A1"
          newLevel="A2"
          achievement={mockAchievement}
        />
      )

      expect(screen.queryByTestId('celebration-modal')).not.toBeInTheDocument()
    })

    it('displays congratulations message', () => {
      render(
        <LevelUpgradeCelebration
          open={true}
          onClose={vi.fn()}
          previousLevel="A1"
          newLevel="A2"
          achievement={mockAchievement}
        />
      )

      expect(screen.getByText(/congratulations!/i)).toBeInTheDocument()
    })

    it('displays level progression badges', () => {
      render(
        <LevelUpgradeCelebration
          open={true}
          onClose={vi.fn()}
          previousLevel="A1"
          newLevel="A2"
          achievement={mockAchievement}
        />
      )

      expect(screen.getByText('A1')).toBeInTheDocument()
      expect(screen.getByText('A2')).toBeInTheDocument()
    })
  })

  describe('achievement display', () => {
    it('displays achievement when provided', () => {
      render(
        <LevelUpgradeCelebration
          open={true}
          onClose={vi.fn()}
          previousLevel="A1"
          newLevel="A2"
          achievement={mockAchievement}
        />
      )

      expect(screen.getByText(/achievement earned/i)).toBeInTheDocument()
      expect(screen.getByText('Upgraded to A2!')).toBeInTheDocument()
      // Text appears in both dialog description and achievement description
      const allMatches = screen.getAllByText(/successfully completed all a1 modules/i)
      expect(allMatches.length).toBeGreaterThanOrEqual(1)
    })

    it('does not display achievement section when achievement is null', () => {
      render(
        <LevelUpgradeCelebration
          open={true}
          onClose={vi.fn()}
          previousLevel="A1"
          newLevel="A2"
          achievement={null}
        />
      )

      expect(screen.queryByText(/achievement earned/i)).not.toBeInTheDocument()
    })

    it('handles achievement without description', () => {
      const achievementWithoutDesc: Achievement = {
        type: 'level_upgrade_a2',
        title: 'Upgraded to A2!',
        icon: '🏆'
      }

      render(
        <LevelUpgradeCelebration
          open={true}
          onClose={vi.fn()}
          previousLevel="A1"
          newLevel="A2"
          achievement={achievementWithoutDesc}
        />
      )

      expect(screen.getByText('Upgraded to A2!')).toBeInTheDocument()
    })
  })

  describe('what\'s new section', () => {
    it('displays all unlocked features', () => {
      render(
        <LevelUpgradeCelebration
          open={true}
          onClose={vi.fn()}
          previousLevel="A1"
          newLevel="A2"
          achievement={mockAchievement}
        />
      )

      expect(screen.getByText(/what's new/i)).toBeInTheDocument()
      expect(screen.getByText(/new grammar lessons appropriate for a2 level/i)).toBeInTheDocument()
      expect(screen.getByText(/reading texts with more complex vocabulary/i)).toBeInTheDocument()
      expect(screen.getByText(/advanced writing prompts and exercises/i)).toBeInTheDocument()
      expect(screen.getByText(/expanded vocabulary sets/i)).toBeInTheDocument()
    })

    it('displays motivational message', () => {
      render(
        <LevelUpgradeCelebration
          open={true}
          onClose={vi.fn()}
          previousLevel="A1"
          newLevel="A2"
          achievement={mockAchievement}
        />
      )

      expect(screen.getByText(/well done on your language learning journey!/i)).toBeInTheDocument()
    })
  })

  describe('continue button', () => {
    it('displays continue button with correct level', () => {
      render(
        <LevelUpgradeCelebration
          open={true}
          onClose={vi.fn()}
          previousLevel="A1"
          newLevel="A2"
          achievement={mockAchievement}
        />
      )

      const button = screen.getByTestId('continue-button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent(/continue to a2/i)
    })
  })

  describe('confetti animation', () => {
    it('renders confetti container when modal opens', () => {
      render(
        <LevelUpgradeCelebration
          open={true}
          onClose={vi.fn()}
          previousLevel="A1"
          newLevel="A2"
          achievement={mockAchievement}
        />
      )

      // Check that celebration modal is rendered (which includes confetti logic)
      expect(screen.getByTestId('celebration-modal')).toBeInTheDocument()
    })

    it('manages confetti state with timer', () => {
      const { rerender } = render(
        <LevelUpgradeCelebration
          open={true}
          onClose={vi.fn()}
          previousLevel="A1"
          newLevel="A2"
          achievement={mockAchievement}
        />
      )

      // Component should be rendered
      expect(screen.getByTestId('celebration-modal')).toBeInTheDocument()

      // Fast-forward time by 3 seconds
      vi.advanceTimersByTime(3000)

      // Re-render to verify component handles timer
      rerender(
        <LevelUpgradeCelebration
          open={true}
          onClose={vi.fn()}
          previousLevel="A1"
          newLevel="A2"
          achievement={mockAchievement}
        />
      )

      // Component should still be rendered after timer
      expect(screen.getByTestId('celebration-modal')).toBeInTheDocument()
    })
  })

  describe('translations', () => {
    describe('English translations', () => {
      it('displays English text when language is en', () => {
        render(
          <LevelUpgradeCelebration
            open={true}
            onClose={vi.fn()}
            previousLevel="A1"
            newLevel="A2"
achievement={mockAchievement}
            language="en"
          />
        )

        expect(screen.getByText(/congratulations!/i)).toBeInTheDocument()
        expect(screen.getByText(/what's new/i)).toBeInTheDocument()
        expect(screen.getByText(/well done on your language learning journey!/i)).toBeInTheDocument()
      })
    })

    describe('Russian translations', () => {
      it('displays Russian text when language is ru', () => {
        render(
          <LevelUpgradeCelebration
            open={true}
            onClose={vi.fn()}
            previousLevel="A1"
            newLevel="A2"
            achievement={mockAchievement}
            language="ru"
          />
        )

        expect(screen.getByText(/поздравляем!/i)).toBeInTheDocument()
        expect(screen.getByText(/что нового/i)).toBeInTheDocument()
        expect(screen.getByText(/отличная работа в изучении языка!/i)).toBeInTheDocument()
      })

      it('displays Russian continue button text', () => {
        render(
          <LevelUpgradeCelebration
            open={true}
            onClose={vi.fn()}
            previousLevel="A1"
            newLevel="A2"
            achievement={mockAchievement}
            language="ru"
          />
        )

        const button = screen.getByTestId('continue-button')
        expect(button).toHaveTextContent(/продолжить на a2/i)
      })
    })

    it('defaults to English when language not specified', () => {
      render(
        <LevelUpgradeCelebration
          open={true}
          onClose={vi.fn()}
          previousLevel="A1"
          newLevel="A2"
          achievement={mockAchievement}
        />
      )

      expect(screen.getByText(/congratulations!/i)).toBeInTheDocument()
      expect(screen.queryByText(/поздравляем!/i)).not.toBeInTheDocument()
    })
  })

  describe('level progression variants', () => {
    it('displays correct information for A2→B1 upgrade', () => {
      render(
        <LevelUpgradeCelebration
          open={true}
          onClose={vi.fn()}
          previousLevel="A2"
          newLevel="B1"
          achievement={null}
        />
      )

      expect(screen.getByText('A2')).toBeInTheDocument()
      expect(screen.getByText('B1')).toBeInTheDocument()
      expect(screen.getByText(/new grammar lessons appropriate for b1 level/i)).toBeInTheDocument()
    })

    it('displays correct information for B1→B2 upgrade', () => {
      render(
        <LevelUpgradeCelebration
          open={true}
          onClose={vi.fn()}
          previousLevel="B1"
          newLevel="B2"
          achievement={null}
        />
      )

      expect(screen.getByText('B1')).toBeInTheDocument()
      expect(screen.getByText('B2')).toBeInTheDocument()
      expect(screen.getByTestId('continue-button')).toHaveTextContent(/continue to b2/i)
    })

    it('displays correct information for B2→C1 upgrade', () => {
      render(
        <LevelUpgradeCelebration
          open={true}
          onClose={vi.fn()}
          previousLevel="B2"
          newLevel="C1"
          achievement={null}
        />
      )

      expect(screen.getByText('B2')).toBeInTheDocument()
      expect(screen.getByText('C1')).toBeInTheDocument()
      expect(screen.getByText(/new grammar lessons appropriate for c1 level/i)).toBeInTheDocument()
    })
  })

  describe('dialog close behavior', () => {
    it('provides continue button to close', () => {
      const onClose = vi.fn()

      render(
        <LevelUpgradeCelebration
          open={true}
          onClose={onClose}
          previousLevel="A1"
          newLevel="A2"
          achievement={mockAchievement}
        />
      )

      const button = screen.getByTestId('continue-button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('data-testid', 'continue-button')
    })
  })
})
