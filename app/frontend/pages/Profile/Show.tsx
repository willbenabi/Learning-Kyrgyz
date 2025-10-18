import React from 'react'
import { router } from '@inertiajs/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'

interface User {
  id: number
  name: string
  email: string
  role: string
  super_admin: boolean
  created_at: string
}

interface ProfileShowProps {
  auth: {
    user: User
  }
  preferences: {
    sidebar_variant: 'sidebar' | 'floating' | 'inset'
  }
  user: User
}

export default function ProfileShow({ auth, preferences, user }: ProfileShowProps) {
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
            <h1 className="text-base font-medium">Profile</h1>
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" onClick={() => router.visit('/profile/edit')}>
                Edit Profile
              </Button>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <Card className="max-w-2xl from-primary/5 to-card bg-gradient-to-t shadow-xs">
                  <CardHeader>
                    <CardTitle>{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Role</div>
                      <Badge variant={user.super_admin ? 'default' : 'secondary'}>
                        {user.super_admin ? 'Super Admin' : user.role}
                      </Badge>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Member Since</div>
                      <div className="text-sm">{new Date(user.created_at).toLocaleDateString()}</div>
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
