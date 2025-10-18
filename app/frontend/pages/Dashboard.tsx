import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'

interface DashboardProps {
  auth: {
    user: {
      id: number
      name: string
      email: string
      role: string
      super_admin: boolean
    }
  }
  preferences: {
    sidebar_variant: 'sidebar' | 'floating' | 'inset'
  }
  stats: {
    users_count: number
    active_sessions: number
  }
}

export default function Dashboard({ auth, preferences, stats }: DashboardProps) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar user={auth.user} variant={preferences.sidebar_variant} />
      <SidebarInset>
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
          <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
            <h1 className="text-base font-medium">Dashboard</h1>
          </div>
        </header>

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
                <Card className="@container/card">
                  <CardHeader>
                    <CardDescription>Welcome</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                      {auth.user.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-col items-start gap-1.5 text-sm">
                    <div className="text-muted-foreground">
                      Email: {auth.user.email}
                    </div>
                    <div className="text-muted-foreground">
                      Role: {auth.user.role}{auth.user.super_admin && ' (Super Admin)'}
                    </div>
                  </CardContent>
                </Card>

                <Card className="@container/card">
                  <CardHeader>
                    <CardDescription>Total Users</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                      {stats.users_count}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-col items-start gap-1.5 text-sm">
                    <div className="text-muted-foreground">
                      Registered users in the system
                    </div>
                  </CardContent>
                </Card>

                <Card className="@container/card">
                  <CardHeader>
                    <CardDescription>Active Sessions</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                      {stats.active_sessions}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-col items-start gap-1.5 text-sm">
                    <div className="text-muted-foreground">
                      Current active refresh tokens
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
