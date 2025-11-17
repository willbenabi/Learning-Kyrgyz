import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { router } from '@inertiajs/react'

interface User {
  id: number
  name: string
  email: string
  admin: boolean
}

interface AdminConsoleProps {
  auth: {
    user: User
  }
  stats: {
    total_users: number
    admins: number
    regular_users: number
    active_sessions: number
  }
}

export default function AdminConsole({ stats }: AdminConsoleProps) {
  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button size="sm" onClick={() => router.visit('/admin/users')}>
          Manage Users
        </Button>
        <Button size="sm" variant="outline" onClick={() => router.visit('/admin/audit_logs')}>
          Audit Logs
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">
              {stats.total_users}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">
              All registered users
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Admins</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">
              {stats.admins}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">
              Full system access
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Regular Users</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">
              {stats.regular_users}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">
              Standard accounts
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Activity */}
      <Card>
        <CardHeader>
          <CardDescription>System Activity</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">Active Sessions</CardTitle>
        </CardHeader>
        <CardContent className="flex-col items-start gap-1.5 text-sm">
          <div className="text-3xl font-bold tabular-nums">{stats.active_sessions}</div>
          <div className="text-muted-foreground">Valid refresh tokens</div>
        </CardContent>
      </Card>
    </div>
  )
}
