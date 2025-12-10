import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Mock Inertia (before imports)
vi.mock('@inertiajs/react', () => ({
  router: {
    visit: vi.fn(),
  },
  Link: ({ href, children }: any) => <a href={href}>{children}</a>,
}))

import Register from './Register'
import { router } from '@inertiajs/react'

// Mock fetch
global.fetch = vi.fn()

describe('Register', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(global.fetch as any).mockClear()
  })

  it('renders registration form', () => {
    render(<Register />)

    expect(screen.getByText('Create Your Account')).toBeInTheDocument()
    expect(screen.getByTestId('register-name-input')).toBeInTheDocument()
    expect(screen.getByTestId('register-email-input')).toBeInTheDocument()
    expect(screen.getByTestId('register-password-input')).toBeInTheDocument()
    expect(screen.getByTestId('register-password-confirmation-input')).toBeInTheDocument()
    expect(screen.getByTestId('register-submit-button')).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    const user = userEvent.setup()
    render(<Register />)

    const submitButton = screen.getByTestId('register-submit-button')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument()
    })
  })

  it('validates password length', async () => {
    const user = userEvent.setup()
    render(<Register />)

    const nameInput = screen.getByTestId('register-name-input')
    const emailInput = screen.getByTestId('register-email-input')
    const passwordInput = screen.getByTestId('register-password-input')
    const submitButton = screen.getByTestId('register-submit-button')

    await user.type(nameInput, 'Test User')
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'short')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument()
    })
  })

  it('validates password confirmation match', async () => {
    const user = userEvent.setup()
    render(<Register />)

    const nameInput = screen.getByTestId('register-name-input')
    const emailInput = screen.getByTestId('register-email-input')
    const passwordInput = screen.getByTestId('register-password-input')
    const confirmInput = screen.getByTestId('register-password-confirmation-input')
    const submitButton = screen.getByTestId('register-submit-button')

    await user.type(nameInput, 'Test User')
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.type(confirmInput, 'different')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/passwords don't match/i)).toBeInTheDocument()
    })
  })

  it('validates username format when provided', async () => {
    const user = userEvent.setup()
    render(<Register />)

    const nameInput = screen.getByTestId('register-name-input')
    const emailInput = screen.getByTestId('register-email-input')
    const usernameInput = screen.getByTestId('register-username-input')
    const passwordInput = screen.getByTestId('register-password-input')
    const confirmInput = screen.getByTestId('register-password-confirmation-input')
    const submitButton = screen.getByTestId('register-submit-button')

    await user.type(nameInput, 'Test User')
    await user.type(emailInput, 'test@example.com')
    await user.type(usernameInput, 'invalid@username')
    await user.type(passwordInput, 'password123')
    await user.type(confirmInput, 'password123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/username can only contain/i)).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    const mockResponse = {
      user: { id: 1, name: 'Test User', email: 'test@example.com' },
      jwt_token: 'mock_jwt_token',
      refresh_token: 'mock_refresh_token'
    }

    ;(global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    render(<Register />)

    const nameInput = screen.getByTestId('register-name-input')
    const emailInput = screen.getByTestId('register-email-input')
    const passwordInput = screen.getByTestId('register-password-input')
    const confirmInput = screen.getByTestId('register-password-confirmation-input')
    const submitButton = screen.getByTestId('register-submit-button')

    await user.type(nameInput, 'Test User')
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.type(confirmInput, 'password123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/register', expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
        body: expect.stringContaining('test@example.com'),
      }))
    })

    await waitFor(() => {
      expect(router.visit).toHaveBeenCalledWith('/onboarding/language', { replace: true })
    })
  })

  it('displays server error messages', async () => {
    const user = userEvent.setup()
    const mockError = 'Email is already taken'

    ;(global.fetch as any).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: mockError }),
    })

    render(<Register />)

    const nameInput = screen.getByTestId('register-name-input')
    const emailInput = screen.getByTestId('register-email-input')
    const passwordInput = screen.getByTestId('register-password-input')
    const confirmInput = screen.getByTestId('register-password-confirmation-input')
    const submitButton = screen.getByTestId('register-submit-button')

    await user.type(nameInput, 'Test User')
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.type(confirmInput, 'password123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(mockError)).toBeInTheDocument()
    })
  })

  it('disables submit button while submitting', async () => {
    const user = userEvent.setup()

    ;(global.fetch as any).mockImplementation(() =>
      new Promise(resolve => setTimeout(() => resolve({
        ok: true,
        json: async () => ({ user: {}, jwt_token: '', refresh_token: '' })
      }), 1000))
    )

    render(<Register />)

    const nameInput = screen.getByTestId('register-name-input')
    const emailInput = screen.getByTestId('register-email-input')
    const passwordInput = screen.getByTestId('register-password-input')
    const confirmInput = screen.getByTestId('register-password-confirmation-input')
    const submitButton = screen.getByTestId('register-submit-button')

    await user.type(nameInput, 'Test User')
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.type(confirmInput, 'password123')
    await user.click(submitButton)

    expect(submitButton).toBeDisabled()
    expect(screen.getByText('Creating account...')).toBeInTheDocument()
  })

  it('renders link to login page', () => {
    render(<Register />)

    const loginLink = screen.getByText('Sign in')
    expect(loginLink).toBeInTheDocument()
    expect(loginLink.closest('a')).toHaveAttribute('href', '/login')
  })
})
