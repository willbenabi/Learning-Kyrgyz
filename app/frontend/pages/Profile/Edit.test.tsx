import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProfileEdit from './Edit'

// Mock Inertia
vi.mock('@inertiajs/react', () => ({
  router: {
    visit: vi.fn(),
  },
}))

// Mock fetch
global.fetch = vi.fn()

describe('ProfileEdit', () => {
  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    admin: false,
    created_at: '2024-01-01T00:00:00.000Z',
    avatar_url: null,
  }

  let mockVisit: ReturnType<typeof vi.fn>

  beforeEach(async () => {
    vi.clearAllMocks()
    localStorage.clear()
    localStorage.setItem('auth_token', 'fake-token')
    const { router } = await import('@inertiajs/react')
    mockVisit = router.visit as ReturnType<typeof vi.fn>
  })

  it('renders edit form with user data', () => {
    render(<ProfileEdit user={mockUser} auth={{ user: mockUser }} />)

    expect(screen.getByLabelText(/name/i)).toHaveValue('John Doe')
    expect(screen.getByLabelText(/^email/i)).toHaveValue('john@example.com')
  })

  it('has Back to Dashboard button', () => {
    render(<ProfileEdit user={mockUser} auth={{ user: mockUser }} />)

    const backButton = screen.getByRole('button', { name: /back to dashboard/i })
    expect(backButton).toBeInTheDocument()
  })

  it('navigates to dashboard when Back button clicked', async () => {
    const user = userEvent.setup()
    render(<ProfileEdit user={mockUser} auth={{ user: mockUser }} />)

    const backButton = screen.getByRole('button', { name: /back to dashboard/i })
    await user.click(backButton)

    expect(mockVisit).toHaveBeenCalledWith('/learning/dashboard')
  })

  it('has Cancel button', () => {
    render(<ProfileEdit user={mockUser} auth={{ user: mockUser }} />)

    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    expect(cancelButton).toBeInTheDocument()
  })

  it('navigates to profile when Cancel clicked', async () => {
    const user = userEvent.setup()
    render(<ProfileEdit user={mockUser} auth={{ user: mockUser }} />)

    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    await user.click(cancelButton)

    expect(mockVisit).toHaveBeenCalledWith('/profile')
  })

  it('has Save Changes button', () => {
    render(<ProfileEdit user={mockUser} auth={{ user: mockUser }} />)

    const saveButton = screen.getByRole('button', { name: /save changes/i })
    expect(saveButton).toBeInTheDocument()
  })

  it('has password fields', () => {
    render(<ProfileEdit user={mockUser} auth={{ user: mockUser }} />)

    expect(document.getElementById('password')).toBeInTheDocument()
    expect(document.getElementById('password_confirmation')).toBeInTheDocument()
  })

  it('has avatar upload', () => {
    render(<ProfileEdit user={mockUser} auth={{ user: mockUser }} />)

    expect(screen.getByText(/upload avatar/i)).toBeInTheDocument()
  })

  it('validates name is required', async () => {
    const user = userEvent.setup()
    render(<ProfileEdit user={mockUser} auth={{ user: mockUser }} />)

    const nameInput = screen.getByLabelText(/name/i)
    await user.clear(nameInput)

    const saveButton = screen.getByRole('button', { name: /save changes/i })
    await user.click(saveButton)

    expect(await screen.findByText(/name must be at least 2 characters/i)).toBeInTheDocument()
  })

  it('validates email format', async () => {
    const user = userEvent.setup()
    render(<ProfileEdit user={mockUser} auth={{ user: mockUser }} />)

    const emailInput = screen.getByLabelText(/^email/i)
    await user.clear(emailInput)
    await user.type(emailInput, 'invalid-email')
    await user.tab() // Trigger blur for react-hook-form validation

    const saveButton = screen.getByRole('button', { name: /save changes/i })
    await user.click(saveButton)

    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('validates password minimum length', async () => {
    const user = userEvent.setup()
    render(<ProfileEdit user={mockUser} auth={{ user: mockUser }} />)

    const passwordInput = document.getElementById('password')!
    await user.type(passwordInput, 'short')

    const saveButton = screen.getByRole('button', { name: /save changes/i })
    await user.click(saveButton)

    await waitFor(() => {
      expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument()
    })
  })

  it('validates password confirmation match', async () => {
    const user = userEvent.setup()
    render(<ProfileEdit user={mockUser} auth={{ user: mockUser }} />)

    const passwordInput = document.getElementById('password')!
    const confirmInput = document.getElementById('password_confirmation')!

    await user.type(passwordInput, 'password123')
    await user.type(confirmInput, 'different')

    const saveButton = screen.getByRole('button', { name: /save changes/i })
    await user.click(saveButton)

    expect(await screen.findByText(/passwords don't match/i)).toBeInTheDocument()
  })
})
