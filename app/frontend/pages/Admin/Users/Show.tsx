import { router } from '@inertiajs/react'
import { CrownIcon, MailIcon, ShieldCheckIcon, UserRoundIcon, CalendarIcon } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface User {
  id: number
  name: string
  email: string
  role: string
  super_admin: boolean
  created_at: string
}

interface AdminUserShowProps {
  auth: {
    user: User
  }
  user: User
}

export default function AdminUserShow({ auth, user }: AdminUserShowProps) {
  const getRoleInfo = () => {
    if (user.super_admin) {
      return {
        label: 'Super Admin',
        icon: <CrownIcon className="size-4" />,
        variant: 'default' as const,
        color: 'text-amber-600 dark:text-amber-400',
      }
    }
    if (user.role === 'admin') {
      return {
        label: 'Admin',
        icon: <ShieldCheckIcon className="size-4" />,
        variant: 'secondary' as const,
        color: 'text-green-600 dark:text-green-400',
      }
    }
    return {
      label: 'User',
      icon: <UserRoundIcon className="size-4" />,
      variant: 'outline' as const,
      color: 'text-blue-600 dark:text-blue-400',
    }
  }

  const getUserInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/)
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  const roleInfo = getRoleInfo()

  return (
    <>
      <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
          <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin/console">Super Admin Panel</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin/users">Manage Users</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{user.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => router.visit('/admin/users')}>
                Back to Users
              </Button>
              <Button size="sm" onClick={() => router.visit(`/admin/users/${user.id}/edit`)}>
                Edit User
              </Button>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <Card className="from-primary/5 to-card bg-gradient-to-t shadow-xs">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="size-16">
                          <AvatarImage src="" alt={user.name} />
                          <AvatarFallback className="text-lg">{getUserInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-2xl">{user.name}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-2">
                            <Badge variant={roleInfo.variant} className="flex items-center gap-1">
                              {roleInfo.icon}
                              {roleInfo.label}
                            </Badge>
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium text-muted-foreground">Email Address</div>
                        <div className="flex items-center gap-2">
                          <MailIcon className="size-4 text-muted-foreground" />
                          <span className="text-sm">{user.email}</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium text-muted-foreground">Account Created</div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="size-4 text-muted-foreground" />
                          <span className="text-sm">{new Date(user.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
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
