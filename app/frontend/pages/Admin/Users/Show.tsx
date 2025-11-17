import { router } from '@inertiajs/react'
import { CrownIcon, MailIcon, UserRoundIcon } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface User {
  id: number
  name: string
  email: string
  admin: boolean
  created_at: string
  invitation_pending: boolean
  invitation_accepted: boolean
  active: boolean
}

interface AdminUserShowProps {
  auth: {
    user: User
  }
  user: User
}

export default function AdminUserShow({ user }: AdminUserShowProps) {
  const getRoleInfo = () => {
    if (user.admin) {
      return {
        label: 'Admin',
        icon: <CrownIcon className="size-4" />,
        variant: 'default' as const,
        color: 'text-amber-600 dark:text-amber-400',
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
    <div className="space-y-6">
      <div className="flex justify-end gap-2">
        <Button size="sm" variant="outline" onClick={() => router.visit('/admin/users')}>
          Back to Users
        </Button>
        <Button size="sm" onClick={() => router.visit(`/admin/users/${user.id}/edit`)}>
          Edit User
        </Button>
      </div>
      <Card>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar className="size-20">
                        <AvatarImage src="" alt={user.name} />
                        <AvatarFallback className="text-xl">{getUserInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-2xl">{user.name}</CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant={roleInfo.variant} className="flex items-center gap-1">
                        {roleInfo.icon}
                        {roleInfo.label}
                      </Badge>
                      {user.active ? (
                        <Badge variant="default" className="bg-green-600 hover:bg-green-700">Active</Badge>
                      ) : user.invitation_pending ? (
                        <Badge variant="secondary">Pending</Badge>
                      ) : (
                        <Badge variant="outline">Inactive</Badge>
                      )}
                    </div>

                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Member Since</div>
                      <div className="text-sm">{new Date(user.created_at).toLocaleDateString()}</div>
                    </div>

                    {user.invitation_pending && (
                      <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950 p-4">
                        <div className="flex items-start gap-3">
                          <MailIcon className="size-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                              Invitation Pending
                            </p>
                            <p className="text-xs text-amber-700 dark:text-amber-300">
                              This user hasn't accepted their invitation yet.
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => router.post(`/admin/users/${user.id}/resend_invitation`)}
                          >
                            Resend Invitation
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
    </div>
  )
}
