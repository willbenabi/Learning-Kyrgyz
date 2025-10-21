/**
 * App Layout - Persistent Layout Component
 *
 * This is the recommended Inertia.js pattern for handling flash messages.
 * The layout persists across page navigations and has access to usePage().
 *
 * Benefits:
 * - More React-like (uses hooks instead of events)
 * - Cleaner separation of concerns
 * - Standard Inertia.js pattern used in official docs
 */

import { useEffect } from 'react'
import { usePage } from '@inertiajs/react'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { getSidebarState } from '@/lib/sidebar-state'
import { ThemeProvider } from '@/components/theme-provider'

interface FlashMessages {
  success?: string
  error?: string
  notice?: string
  alert?: string
}

interface PageProps {
  flash?: FlashMessages
  [key: string]: any
}

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const { props } = usePage<PageProps>()
  const flash = props.flash
  const auth = (props as any).auth

  // Show toast notifications when flash messages change
  useEffect(() => {
    if (!flash) return

    // Success toast (soft green styling)
    if (flash.success) {
      toast.success(flash.success, {
        style: {
          '--normal-bg':
            'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
          '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
          '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
        } as React.CSSProperties
      })
    }

    // Notice toast (same as success)
    if (flash.notice) {
      toast.success(flash.notice, {
        style: {
          '--normal-bg':
            'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
          '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
          '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
        } as React.CSSProperties
      })
    }

    // Error/alert toast (soft red styling)
    if (flash.error || flash.alert) {
      const message = flash.error || flash.alert
      toast.error(message, {
        style: {
          '--normal-bg':
            'color-mix(in oklab, light-dark(var(--color-red-600), var(--color-red-400)) 10%, var(--background))',
          '--normal-text': 'light-dark(var(--color-red-600), var(--color-red-400))',
          '--normal-border': 'light-dark(var(--color-red-600), var(--color-red-400))'
        } as React.CSSProperties
      })
    }
  }, [flash])

  // If user is not authenticated (login page, etc.), render without sidebar
  if (!auth?.user) {
    return (
      <ThemeProvider>
        <Toaster position="top-right" />
        {children}
      </ThemeProvider>
    )
  }

  // Authenticated pages with sidebar
  return (
    <ThemeProvider>
      <Toaster position="top-right" />
      <SidebarProvider
        defaultOpen={getSidebarState()}
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 72)',
            '--header-height': 'calc(var(--spacing) * 12)',
          } as React.CSSProperties
        }
      >
        <AppSidebar user={auth.user} />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}
