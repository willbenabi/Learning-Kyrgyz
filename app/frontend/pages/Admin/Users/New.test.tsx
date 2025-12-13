import { describe, it, expect, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '@/test/utils'
import { router } from '@inertiajs/react'
import AdminUserNew from './New'

// Mock Inertia router
vi.mock('@inertiajs/react', async () => {
  const actual = await vi.importActual('@inertiajs/react')
  return {
    ...actual,
    router: {
      visit: vi.fn(),
      post: vi.fn(),
    },
  }
})

describe('Admin Users New (Form with React Hook Form + Zod)', () => {
  const mockProps = {
    auth: {
      user: {
        id: 1,
        name: 'Admin User',
        email: 'admin@example.com',
        admin: true,
      },
    },
  }

  it('renders invite user form', () => {
    render(<AdminUserNew {...mockProps} />)

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send invitation/i })).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    const user = userEvent.setup()
    render(<AdminUserNew {...mockProps} />)

    const submitButton = screen.getByRole('button', { name: /send invitation/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    render(<AdminUserNew {...mockProps} />)

    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')

    const submitButton = screen.getByRole('button', { name: /send invitation/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(router.post).toHaveBeenCalledWith('/admin/users', {
        user: {
          name: 'John Doe',
          email: 'john@example.com',
        },
      })
    })
  })

  it('navigates to users list on cancel', async () => {
    const user = userEvent.setup()
    render(<AdminUserNew {...mockProps} />)

    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    await user.click(cancelButton)

    expect(router.visit).toHaveBeenCalledWith('/admin/users')
  })

  it('disables submit button while submitting', async () => {
    const user = userEvent.setup()
    render(<AdminUserNew {...mockProps} />)

    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')

    const submitButton = screen.getByRole('button', { name: /send invitation/i })

    // Click and immediately check if button text changes
    user.click(submitButton)

    // Button should show loading state
    await waitFor(() => {
      const button = screen.getByRole('button', { name: /sending invitation/i })
      expect(button).toBeDisabled()
    })
  })
})
