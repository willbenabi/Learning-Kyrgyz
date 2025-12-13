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

import React, { useEffect } from 'react'
import { usePage, Link } from '@inertiajs/react'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { getSidebarState } from '@/lib/sidebar-state'
import { ThemeProvider } from '@/components/theme-provider'
import { Separator } from '@/components/ui/separator'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ProfileDropdown from '@/components/shadcn-studio/blocks/dropdown-profile'

interface FlashMessages {
  success?: string
  error?: string
  notice?: string
  alert?: string
}

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageProps {
  flash?: FlashMessages
  breadcrumbs?: BreadcrumbItem[]
  [key: string]: any
}

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const { props } = usePage<PageProps>()
  const flash = props.flash
  const auth = (props as any).auth
  const breadcrumbs = props.breadcrumbs || [{ label: 'Dashboard', href: '/dashboard' }]

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

  // Regular users (non-admin) - simple layout without sidebar
  if (!auth.user.admin) {
    return (
      <ThemeProvider>
        <Toaster position="top-right" />
        <div className="flex min-h-dvh w-full flex-col bg-background">
          <header className="bg-card sticky top-0 z-50 border-b">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6">
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/vector-1740629145639-51b2768eb3ca?q=80&w=72&auto=format&fit=crop"
                      alt="Berkut Logo"
                      className="size-9 object-cover"
                    />
                  </div>
                  <span className="font-black text-lg hidden sm:inline tracking-tight">BERKUT</span>
                </Link>
                <Separator orientation="vertical" className="hidden !h-4 sm:block" />
                <Breadcrumb>
                  <BreadcrumbList>
                    {breadcrumbs.map((crumb, index) => (
                      <React.Fragment key={index}>
                        {index > 0 && <BreadcrumbSeparator />}
                        <BreadcrumbItem>
                          {crumb.href ? (
                            <BreadcrumbLink asChild>
                              <Link href={crumb.href}>{crumb.label}</Link>
                            </BreadcrumbLink>
                          ) : (
                            <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                          )}
                        </BreadcrumbItem>
                      </React.Fragment>
                    ))}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="flex items-center gap-1.5">
                <ProfileDropdown
                  user={auth.user}
                  trigger={
                    <Button variant="ghost" size="icon" className="size-9.5">
                      <Avatar className="size-9.5 rounded-md">
                        <AvatarImage src={auth.user.avatar_url || undefined} alt={auth.user.name} />
                        <AvatarFallback>{auth.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  }
                />
              </div>
            </div>
          </header>
          <main className="mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
            {children}
          </main>
        </div>
      </ThemeProvider>
    )
  }

  // Admin users - layout with sidebar
  return (
    <ThemeProvider>
      <Toaster position="top-right" />
            <div className="flex min-h-dvh w-full bg-background">
        <SidebarProvider
          defaultOpen={getSidebarState()}
        >
          <AppSidebar user={auth.user} />
          <div className="flex flex-1 flex-col min-w-0 bg-background">
            <header className="bg-card sticky top-0 z-50 border-b">
              <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6">
                <div className="flex items-center gap-4">
                  <SidebarTrigger className="[&_svg]:!size-5" />
                  <Separator orientation="vertical" className="hidden !h-4 sm:block" />
                  <Breadcrumb className="hidden sm:block">
                    <BreadcrumbList>
                      {breadcrumbs.map((crumb, index) => (
                        <React.Fragment key={index}>
                          {index > 0 && <BreadcrumbSeparator />}
                          <BreadcrumbItem>
                            {crumb.href ? (
                              <BreadcrumbLink asChild>
                                <Link href={crumb.href}>{crumb.label}</Link>
                              </BreadcrumbLink>
                            ) : (
                              <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                            )}
                          </BreadcrumbItem>
                        </React.Fragment>
                      ))}
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
                <div className="flex items-center gap-1.5">
                  <ProfileDropdown
                    user={auth.user}
                    trigger={
                      <Button variant="ghost" size="icon" className="size-9.5" data-testid="user-menu-button">
                        <Avatar className="size-9.5 rounded-md">
                          <AvatarImage src={auth.user.avatar_url || undefined} alt={auth.user.name} />
                          <AvatarFallback>{auth.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </Button>
                    }
                  />
                </div>
              </div>
            </header>
            <main className="mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6 min-w-0">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  )
}
