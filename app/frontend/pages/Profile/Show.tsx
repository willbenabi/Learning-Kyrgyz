import React from 'react'
import { router } from '@inertiajs/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
  avatar_url?: string | null
}

interface ProfileShowProps {
  auth: {
    user: User
  }
  user: User
}

export default function ProfileShow({ auth, user }: ProfileShowProps) {
  const getUserInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/)
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  return (
    <>
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
                    <div className="flex items-center gap-4">
                      <Avatar className="size-20">
                        <AvatarImage src={user.avatar_url || undefined} alt={user.name} />
                        <AvatarFallback className="text-xl">{getUserInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-2xl">{user.name}</CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                      </div>
                    </div>
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
    </>
  )
}
