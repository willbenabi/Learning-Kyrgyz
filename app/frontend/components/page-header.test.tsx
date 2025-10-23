import { describe, it, expect } from 'vitest'
import { render } from '@/test/utils'
import { screen } from '@testing-library/react'
import { PageHeader } from './page-header'

describe('PageHeader', () => {
  it('renders single breadcrumb', () => {
    render(<PageHeader breadcrumbs={[{ label: 'Dashboard' }]} />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('renders multiple breadcrumbs with links', () => {
    render(
      <PageHeader
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
      <PageHeader
        breadcrumbs={[{ label: 'Users' }]}
        actions={<button>Invite User</button>}
      />
    )

    expect(screen.getByRole('button', { name: 'Invite User' })).toBeInTheDocument()
  })

  it('does not render actions div when no actions provided', () => {
    const { container } = render(<PageHeader breadcrumbs={[{ label: 'Dashboard' }]} />)

    // Check that ml-auto div doesn't exist when no actions
    const actionsDiv = container.querySelector('.ml-auto')
    expect(actionsDiv).not.toBeInTheDocument()
  })

  it('renders sidebar trigger', () => {
    render(<PageHeader breadcrumbs={[{ label: 'Dashboard' }]} />)

    // SidebarTrigger renders a button
    const trigger = screen.getByRole('button')
    expect(trigger).toBeInTheDocument()
  })
})
