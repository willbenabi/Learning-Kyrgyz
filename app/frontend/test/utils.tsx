import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { SidebarProvider } from '@/components/ui/sidebar'

interface AllProvidersProps {
  children: React.ReactNode
}

/**
 * Wrapper component that provides all necessary providers for testing
 */
function AllProviders({ children }: AllProvidersProps) {
  return (
    <SidebarProvider>
      {children}
    </SidebarProvider>
  )
}

/**
 * Custom render function that wraps components with all necessary providers
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: AllProviders, ...options })
}

// Re-export everything from testing-library
export * from '@testing-library/react'
export { renderWithProviders as render }
