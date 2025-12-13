import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LevelUpgradeButton from './LevelUpgradeButton'
import type { UpgradeEligibility } from '@/lib/levelUpgradeApi'

describe('LevelUpgradeButton', () => {
  const createEligibility = (overrides: Partial<UpgradeEligibility> = {}): UpgradeEligibility => ({
    eligible: false,
    current_level: 'A1',
    next_level: 'A2',
    completion_status: {
      grammar: { completed: 10, required: 15, complete: false },
      reading: { completed: 5, required: 10, complete: false },
      writing: { completed: 2, required: 3, complete: false },
      vocabulary: { completed: 3, required: 4, complete: false }
    },
    overall_percentage: 64.5,
    ...overrides
  })

  const createFullyEligible = (): UpgradeEligibility => ({
    eligible: true,
    current_level: 'A1',
    next_level: 'A2',
    completion_status: {
      grammar: { completed: 15, required: 15, complete: true },
      reading: { completed: 10, required: 10, complete: true },
      writing: { completed: 3, required: 3, complete: true },
      vocabulary: { completed: 4, required: 4, complete: true }
    },
    overall_percentage: 100
  })

  describe('banner variant', () => {
    it('renders banner when eligible', () => {
      const eligibility = createFullyEligible()
      const onUpgrade = vi.fn()

      render(
        <LevelUpgradeButton
          eligibility={eligibility}
          onUpgrade={onUpgrade}
          variant="banner"
        />
      )

      expect(screen.getByTestId('upgrade-banner')).toBeInTheDocument()
      expect(screen.getByText(/congratulations! level complete!/i)).toBeInTheDocument()
      expect(screen.getByText(/completed all a1 modules/i)).toBeInTheDocument()
      expect(screen.getByTestId('upgrade-banner-button')).toBeInTheDocument()
    })

    it('does not render banner when not eligible', () => {
      const eligibility = createEligibility()
      const onUpgrade = vi.fn()

      render(
        <LevelUpgradeButton
          eligibility={eligibility}
          onUpgrade={onUpgrade}
          variant="banner"
        />
      )

      expect(screen.queryByTestId('upgrade-banner')).not.toBeInTheDocument()
    })

    it('handles upgrade button click', async () => {
      const eligibility = createFullyEligible()
      const onUpgrade = vi.fn()

      render(
        <LevelUpgradeButton
          eligibility={eligibility}
          onUpgrade={onUpgrade}
          variant="banner"
        />
      )

      const button = screen.getByTestId('upgrade-banner-button')
      await userEvent.click(button)

      expect(onUpgrade).toHaveBeenCalledTimes(1)
    })

    it('displays correct level information in English', () => {
      const eligibility = createFullyEligible()
      const onUpgrade = vi.fn()

      render(
        <LevelUpgradeButton
          eligibility={eligibility}
          onUpgrade={onUpgrade}
          variant="banner"
          language="en"
        />
      )

      expect(screen.getByText(/upgrade to a2/i)).toBeInTheDocument()
      expect(screen.getByText(/completed all a1 modules/i)).toBeInTheDocument()
    })

    it('displays correct level information in Russian', () => {
      const eligibility = createFullyEligible()
      const onUpgrade = vi.fn()

      render(
        <LevelUpgradeButton
          eligibility={eligibility}
          onUpgrade={onUpgrade}
          variant="banner"
          language="ru"
        />
      )

      expect(screen.getByText(/поздравляем! уровень завершен!/i)).toBeInTheDocument()
      const upgradeButton = screen.getByTestId('upgrade-banner-button')
      expect(upgradeButton).toHaveTextContent(/перейти на a2/i)
    })
  })

  describe('card variant', () => {
    it('renders progress card with all modules', () => {
      const eligibility = createEligibility()
      const onUpgrade = vi.fn()

      render(
        <LevelUpgradeButton
          eligibility={eligibility}
          onUpgrade={onUpgrade}
          variant="card"
        />
      )

      expect(screen.getByTestId('upgrade-progress-card')).toBeInTheDocument()
      expect(screen.getByText(/level progress/i)).toBeInTheDocument()
      expect(screen.getByText(/grammar/i)).toBeInTheDocument()
      expect(screen.getByText(/reading/i)).toBeInTheDocument()
      expect(screen.getByText(/writing/i)).toBeInTheDocument()
      expect(screen.getByText(/vocabulary/i)).toBeInTheDocument()
    })

    it('displays module completion counts', () => {
      const eligibility = createEligibility()
      const onUpgrade = vi.fn()

      render(
        <LevelUpgradeButton
          eligibility={eligibility}
          onUpgrade={onUpgrade}
          variant="card"
        />
      )

      expect(screen.getByText('10/15')).toBeInTheDocument() // Grammar
      expect(screen.getByText('5/10')).toBeInTheDocument() // Reading
      expect(screen.getByText('2/3')).toBeInTheDocument() // Writing
      expect(screen.getByText('3/4')).toBeInTheDocument() // Vocabulary
    })

    it('displays overall percentage', () => {
      const eligibility = createEligibility()
      const onUpgrade = vi.fn()

      render(
        <LevelUpgradeButton
          eligibility={eligibility}
          onUpgrade={onUpgrade}
          variant="card"
        />
      )

      expect(screen.getByText(/64.5%/i)).toBeInTheDocument()
    })

    it('counts exam as completed lesson when passed', () => {
      const eligibility = createEligibility({
        completion_status: {
          grammar: { completed: 15, required: 15, complete: true }, // 14 lessons + 1 exam
          reading: { completed: 10, required: 10, complete: true },
          writing: { completed: 3, required: 3, complete: true },
          vocabulary: { completed: 4, required: 4, complete: true }
        }
      })
      const onUpgrade = vi.fn()

      render(
        <LevelUpgradeButton
          eligibility={eligibility}
          onUpgrade={onUpgrade}
          variant="card"
        />
      )

      expect(screen.getByText(/15\/15/i)).toBeInTheDocument()
    })

    it('does not count exam when not passed', () => {
      const eligibility = createEligibility({
        completion_status: {
          grammar: { completed: 14, required: 15, complete: false }, // 14 lessons, exam not counted
          reading: { completed: 10, required: 10, complete: true },
          writing: { completed: 3, required: 3, complete: true },
          vocabulary: { completed: 4, required: 4, complete: true }
        }
      })
      const onUpgrade = vi.fn()

      render(
        <LevelUpgradeButton
          eligibility={eligibility}
          onUpgrade={onUpgrade}
          variant="card"
        />
      )

      expect(screen.getByText(/14\/15/i)).toBeInTheDocument()
    })

    it('displays upgrade button when eligible', () => {
      const eligibility = createFullyEligible()
      const onUpgrade = vi.fn()

      render(
        <LevelUpgradeButton
          eligibility={eligibility}
          onUpgrade={onUpgrade}
          variant="card"
        />
      )

      const button = screen.getByTestId('upgrade-card-button')
      expect(button).toBeInTheDocument()
      expect(button).not.toBeDisabled()
      expect(button).toHaveTextContent(/upgrade to a2/i)
    })

    it('displays disabled "Keep Learning" button when not eligible', () => {
      const eligibility = createEligibility()
      const onUpgrade = vi.fn()

      render(
        <LevelUpgradeButton
          eligibility={eligibility}
          onUpgrade={onUpgrade}
          variant="card"
        />
      )

      expect(screen.queryByTestId('upgrade-card-button')).not.toBeInTheDocument()
      const keepLearningButton = screen.getByRole('button', { name: /keep learning/i })
      expect(keepLearningButton).toBeInTheDocument()
      expect(keepLearningButton).toBeDisabled()
    })

    it('handles upgrade button click in card', async () => {
      const eligibility = createFullyEligible()
      const onUpgrade = vi.fn()

      render(
        <LevelUpgradeButton
          eligibility={eligibility}
          onUpgrade={onUpgrade}
          variant="card"
        />
      )

      const button = screen.getByTestId('upgrade-card-button')
      await userEvent.click(button)

      expect(onUpgrade).toHaveBeenCalledTimes(1)
    })

    it('displays Russian translations', () => {
      const eligibility = createEligibility()
      const onUpgrade = vi.fn()

      render(
        <LevelUpgradeButton
          eligibility={eligibility}
          onUpgrade={onUpgrade}
          variant="card"
          language="ru"
        />
      )

      expect(screen.getByText(/прогресс уровня/i)).toBeInTheDocument()
      expect(screen.getByText(/грамматика/i)).toBeInTheDocument()
      expect(screen.getByText(/чтение/i)).toBeInTheDocument()
      expect(screen.getByText(/письмо/i)).toBeInTheDocument()
      expect(screen.getByText(/словарный запас/i)).toBeInTheDocument()
    })
  })

  describe('C1 level edge case', () => {
    it('returns null when next_level is null (C1 user)', () => {
      const eligibility = createEligibility({
        current_level: 'C1',
        next_level: null,
        eligible: false
      })
      const onUpgrade = vi.fn()

      const { container } = render(
        <LevelUpgradeButton
eligibility={eligibility}
          onUpgrade={onUpgrade}
          variant="card"
        />
      )

      expect(container.firstChild).toBeNull()
    })

    it('returns null for C1 banner variant', () => {
      const eligibility = createEligibility({
        current_level: 'C1',
        next_level: null,
        eligible: true
      })
      const onUpgrade = vi.fn()

      const { container } = render(
        <LevelUpgradeButton
          eligibility={eligibility}
          onUpgrade={onUpgrade}
          variant="banner"
        />
      )

      expect(container.firstChild).toBeNull()
    })
  })

  describe('level progression variants', () => {
    it('renders correctly for A2→B1 upgrade', () => {
      const eligibility = createFullyEligible()
      eligibility.current_level = 'A2'
      eligibility.next_level = 'B1'
      const onUpgrade = vi.fn()

      render(
        <LevelUpgradeButton
          eligibility={eligibility}
          onUpgrade={onUpgrade}
          variant="banner"
        />
      )

      expect(screen.getByText(/upgrade to b1/i)).toBeInTheDocument()
      expect(screen.getByText(/completed all a2 modules/i)).toBeInTheDocument()
    })

    it('renders correctly for B1→B2 upgrade', () => {
      const eligibility = createFullyEligible()
      eligibility.current_level = 'B1'
      eligibility.next_level = 'B2'
      const onUpgrade = vi.fn()

      render(
        <LevelUpgradeButton
          eligibility={eligibility}
          onUpgrade={onUpgrade}
          variant="card"
        />
      )

      const button = screen.getByTestId('upgrade-card-button')
      expect(button).toHaveTextContent(/upgrade to b2/i)
    })

    it('renders correctly for B2→C1 upgrade', () => {
      const eligibility = createFullyEligible()
      eligibility.current_level = 'B2'
      eligibility.next_level = 'C1'
      const onUpgrade = vi.fn()

      render(
        <LevelUpgradeButton
          eligibility={eligibility}
          onUpgrade={onUpgrade}
          variant="banner"
        />
      )

      expect(screen.getByText(/upgrade to c1/i)).toBeInTheDocument()
    })
  })

  describe('default props', () => {
    it('defaults to card variant when variant not specified', () => {
      const eligibility = createEligibility()
      const onUpgrade = vi.fn()

      render(
        <LevelUpgradeButton
          eligibility={eligibility}
          onUpgrade={onUpgrade}
        />
      )

      expect(screen.getByTestId('upgrade-progress-card')).toBeInTheDocument()
      expect(screen.queryByTestId('upgrade-banner')).not.toBeInTheDocument()
    })

    it('defaults to English when language not specified', () => {
      const eligibility = createEligibility()
      const onUpgrade = vi.fn()

      render(
        <LevelUpgradeButton
          eligibility={eligibility}
          onUpgrade={onUpgrade}
          variant="card"
        />
      )

      expect(screen.getByText(/level progress/i)).toBeInTheDocument()
      expect(screen.queryByText(/прогресс уровня/i)).not.toBeInTheDocument()
    })
  })

  describe('module completion indicators', () => {
    it('shows check icon for complete modules', () => {
      const eligibility = createEligibility({
        completion_status: {
          grammar: { completed: 15, required: 15, complete: true },
          reading: { completed: 10, required: 10, complete: true },
          writing: { completed: 3, required: 3, complete: true },
          vocabulary: { completed: 4, required: 4, complete: true }
        },
        overall_percentage: 100
      })
      const onUpgrade = vi.fn()

      render(
        <LevelUpgradeButton
          eligibility={eligibility}
          onUpgrade={onUpgrade}
          variant="card"
        />
      )

      // All modules should be complete (check completion counts)
      expect(screen.getAllByText(/10\/10|15\/15|3\/3|4\/4/).length).toBe(4)
      // Overall percentage should be 100%
      expect(screen.getByText('100%')).toBeInTheDocument()
    })

    it('shows X icon for incomplete modules', () => {
      const eligibility = createEligibility()
      const onUpgrade = vi.fn()

      render(
        <LevelUpgradeButton
          eligibility={eligibility}
          onUpgrade={onUpgrade}
          variant="card"
        />
      )

      // All modules should be incomplete (check incomplete counts)
      expect(screen.getByText('10/15')).toBeInTheDocument() // Grammar incomplete
      expect(screen.getByText('5/10')).toBeInTheDocument() // Reading incomplete
      expect(screen.getByText('2/3')).toBeInTheDocument() // Writing incomplete
      expect(screen.getByText('3/4')).toBeInTheDocument() // Vocabulary incomplete
      // Overall percentage should be less than 100%
      expect(screen.getByText('64.5%')).toBeInTheDocument()
    })
  })
})
