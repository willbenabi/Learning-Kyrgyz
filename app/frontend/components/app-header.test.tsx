import { describe, it, expect } from 'vitest'
import { render } from '@/test/utils'
import { screen } from '@testing-library/react'
import { AppHeader } from './app-header'

describe('AppHeader', () => {
  it('renders single breadcrumb', () => {
    render(<AppHeader breadcrumbs={[{ label: 'Dashboard' }]} />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('renders multiple breadcrumbs with links', () => {
    render(
      <AppHeader
        breadcrumbs={[
          { label: 'Admin Panel', href: '/admin/console' },
          { label: 'Manage Users' },
        ]}
      />
    )

    const adminLink = screen.getByRole('link', { name: 'Admin Panel' })
    expect(adminLink).toHaveAttribute('href', '/admin/console')
    expect(screen.getByText('Manage Users')).toBeInTheDocument()
  })

  it('renders actions when provided', () => {
    render(
      <AppHeader
        breadcrumbs={[{ label: 'Users' }]}
        actions={<button>Invite User</button>}
      />
    )

    expect(screen.getByRole('button', { name: 'Invite User' })).toBeInTheDocument()
  })

  it('does not render actions div when no actions provided', () => {
    const { container } = render(<AppHeader breadcrumbs={[{ label: 'Dashboard' }]} />)

    // Check that ml-auto div doesn't exist when no actions
    const actionsDiv = container.querySelector('.ml-auto')
    expect(actionsDiv).not.toBeInTheDocument()
  })

  it('renders sidebar trigger', () => {
    render(<AppHeader breadcrumbs={[{ label: 'Dashboard' }]} />)

    // SidebarTrigger renders a button
    const trigger = screen.getByRole('button')
    expect(trigger).toBeInTheDocument()
  })
})
