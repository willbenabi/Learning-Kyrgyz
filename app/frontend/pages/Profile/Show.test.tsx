import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProfileShow from './Show'

// Mock Inertia
vi.mock('@inertiajs/react', () => ({
  router: {
    visit: vi.fn(),
  },
}))

describe('ProfileShow', () => {
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
    const { router } = await import('@inertiajs/react')
    mockVisit = router.visit as ReturnType<typeof vi.fn>
  })

  it('renders user information', () => {
    render(<ProfileShow user={mockUser} auth={{ user: mockUser }} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })

  it('shows admin badge for admin users', () => {
    const adminUser = { ...mockUser, admin: true }
    render(<ProfileShow user={adminUser} auth={{ user: adminUser }} />)

    expect(screen.getByText('Admin')).toBeInTheDocument()
  })

  it('does not show admin badge for regular users', () => {
    render(<ProfileShow user={mockUser} auth={{ user: mockUser }} />)

    expect(screen.queryByText('Admin')).not.toBeInTheDocument()
  })

  it('has Back to Dashboard button', () => {
    render(<ProfileShow user={mockUser} auth={{ user: mockUser }} />)

    const backButton = screen.getByRole('button', { name: /back to dashboard/i })
    expect(backButton).toBeInTheDocument()
  })

  it('navigates to dashboard when Back button clicked', async () => {
    const user = userEvent.setup()
    render(<ProfileShow user={mockUser} auth={{ user: mockUser }} />)

    const backButton = screen.getByRole('button', { name: /back to dashboard/i })
    await user.click(backButton)

    expect(mockVisit).toHaveBeenCalledWith('/learning/dashboard')
  })

  it('has Edit Profile button', () => {
    render(<ProfileShow user={mockUser} auth={{ user: mockUser }} />)

    const editButton = screen.getByRole('button', { name: /edit profile/i })
    expect(editButton).toBeInTheDocument()
  })

  it('navigates to edit page when Edit Profile clicked', async () => {
    const user = userEvent.setup()
    render(<ProfileShow user={mockUser} auth={{ user: mockUser }} />)

    const editButton = screen.getByRole('button', { name: /edit profile/i })
    await user.click(editButton)

    expect(mockVisit).toHaveBeenCalledWith('/profile/edit')
  })

  it('displays user initials in avatar', () => {
    render(<ProfileShow user={mockUser} auth={{ user: mockUser }} />)

    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('displays member since date', () => {
    render(<ProfileShow user={mockUser} auth={{ user: mockUser }} />)

    expect(screen.getByText('Member Since')).toBeInTheDocument()
    expect(screen.getByText('1/1/2024')).toBeInTheDocument()
  })
})
