import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Textarea } from './textarea'

describe('Textarea', () => {
  it('renders with placeholder', () => {
    render(<Textarea placeholder="Enter description..." />)
    const textarea = screen.getByPlaceholderText(/enter description/i)
    expect(textarea).toBeInTheDocument()
  })

  it('renders with value', () => {
    render(<Textarea value="Test content" readOnly />)
    const textarea = screen.getByDisplayValue(/test content/i)
    expect(textarea).toBeInTheDocument()
  })

  it('handles user input', async () => {
    render(<Textarea placeholder="Type here..." />)
    const textarea = screen.getByPlaceholderText(/type here/i)

    await userEvent.type(textarea, 'Hello World')
    expect(textarea).toHaveValue('Hello World')
  })

  it('can be disabled', () => {
    render(<Textarea disabled placeholder="Disabled textarea" />)
    const textarea = screen.getByPlaceholderText(/disabled textarea/i)
    expect(textarea).toBeDisabled()
  })

  it('does not accept input when disabled', async () => {
    render(<Textarea disabled placeholder="Disabled textarea" />)
    const textarea = screen.getByPlaceholderText(/disabled textarea/i)

    await userEvent.type(textarea, 'Should not work')
    expect(textarea).toHaveValue('')
  })

  it('applies custom className', () => {
    render(<Textarea className="custom-class" placeholder="Custom" />)
    const textarea = screen.getByPlaceholderText(/custom/i)
    expect(textarea).toHaveClass('custom-class')
  })

  it('has data-slot attribute', () => {
    render(<Textarea placeholder="Test" />)
    const textarea = screen.getByPlaceholderText(/test/i)
    expect(textarea).toHaveAttribute('data-slot', 'textarea')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null as HTMLTextAreaElement | null }
    render(<Textarea ref={ref} placeholder="Ref test" />)
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
  })

  it('handles onChange event', async () => {
    let value = ''
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      value = e.target.value
    }

    render(<Textarea onChange={handleChange} placeholder="Change test" />)
    const textarea = screen.getByPlaceholderText(/change test/i)

    await userEvent.type(textarea, 'New value')
    expect(value).toBe('New value')
  })

  it('supports aria-invalid attribute', () => {
    render(<Textarea aria-invalid="true" placeholder="Invalid" />)
    const textarea = screen.getByPlaceholderText(/invalid/i)
    expect(textarea).toHaveAttribute('aria-invalid', 'true')
  })
})
