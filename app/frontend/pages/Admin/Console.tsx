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
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            {/* Welcome Card */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Berkut Mascot Image */}
                  <div className="relative w-48 h-48 md:w-56 md:h-56 shrink-0">
                    <img
                      src="https://images.unsplash.com/vector-1740629145639-51b2768eb3ca?q=80&w=400&auto=format&fit=crop"
                      alt="Berkut Mascot"
                      className="w-full h-full object-contain drop-shadow-2xl"
                    />
                  </div>

                  {/* Welcome Text */}
                  <div className="flex-1 text-center md:text-left space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black text-foreground">
                      Welcome, Admin!
                    </h1>
                    <p className="text-xl text-muted-foreground">
                      Ready to start your language learning journey? 🚀
                    </p>
                    <p className="text-base text-muted-foreground">
                      Your personalized dashboard is here to track your progress and keep you motivated!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-2 mb-6">
              <Button size="sm" onClick={() => router.visit('/admin/users')}>
                Manage Users
              </Button>
              <Button size="sm" variant="outline" onClick={() => router.visit('/admin/audit_logs')}>
                Audit Logs
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
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
        </div>
      </div>
    </div>
  )
}
