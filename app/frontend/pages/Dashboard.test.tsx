import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '@/test/utils'
import Dashboard from './Dashboard'

describe('Dashboard', () => {
  const mockProps = {
    auth: {
      user: {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        admin: false,
      },
    },
  }

  it('renders welcome message with user name', () => {
    render(<Dashboard {...mockProps} />)
    expect(screen.getByText('Welcome, John Doe!')).toBeInTheDocument()
  })

  it('displays dashboard description', () => {
    render(<Dashboard {...mockProps} />)
    expect(screen.getByText('This is your dashboard. Start building your application here.')).toBeInTheDocument()
  })

  it('renders correctly for different user names', () => {
    const propsWithDifferentUser = {
      auth: {
        user: {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          admin: true,
        },
      },
    }

    render(<Dashboard {...propsWithDifferentUser} />)
    expect(screen.getByText('Welcome, Jane Smith!')).toBeInTheDocument()
  })
})
