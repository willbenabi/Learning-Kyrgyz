import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DeleteConfirmationDialog } from './delete-confirmation-dialog'

describe('DeleteConfirmationDialog (Event Handlers & User Interaction)', () => {
  const defaultProps = {
    open: true,
    onOpenChange: vi.fn(),
    onConfirm: vi.fn(),
  }

  it('renders with default title and description', () => {
    render(<DeleteConfirmationDialog {...defaultProps} />)

    expect(screen.getByText('Are you absolutely sure?')).toBeInTheDocument()
    expect(screen.getByText(/this action cannot be undone/i)).toBeInTheDocument()
  })

  it('renders with custom title and description', () => {
    render(
      <DeleteConfirmationDialog
        {...defaultProps}
        title="Delete User?"
        description="This will permanently delete the user account."
      />
    )

    expect(screen.getByText('Delete User?')).toBeInTheDocument()
    expect(screen.getByText('This will permanently delete the user account.')).toBeInTheDocument()
  })

  it('calls onOpenChange when cancel is clicked', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()

    render(<DeleteConfirmationDialog {...defaultProps} onOpenChange={onOpenChange} />)

    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    await user.click(cancelButton)

    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('calls onConfirm and onOpenChange when delete is clicked', async () => {
    const user = userEvent.setup()
    const onConfirm = vi.fn()
    const onOpenChange = vi.fn()

    render(
      <DeleteConfirmationDialog
        {...defaultProps}
        onConfirm={onConfirm}
        onOpenChange={onOpenChange}
      />
    )

    const deleteButton = screen.getByRole('button', { name: /delete/i })
    await user.click(deleteButton)

    expect(onConfirm).toHaveBeenCalledTimes(1)
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('does not render when open is false', () => {
    render(<DeleteConfirmationDialog {...defaultProps} open={false} />)

    expect(screen.queryByText('Are you absolutely sure?')).not.toBeInTheDocument()
  })

  it('renders warning icon', () => {
    render(<DeleteConfirmationDialog {...defaultProps} />)

    // Alert icon should be present
    const icon = document.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('closes dialog after confirming', async () => {
    const user = userEvent.setup()
    const onConfirm = vi.fn()
    const onOpenChange = vi.fn()

    render(
      <DeleteConfirmationDialog
        {...defaultProps}
        onConfirm={onConfirm}
        onOpenChange={onOpenChange}
      />
    )

    const deleteButton = screen.getByRole('button', { name: /delete/i })
    await user.click(deleteButton)

    // Should close dialog after confirming
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })
})
