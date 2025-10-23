import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/page-header'

interface DashboardProps {
  auth: {
    user: {
      id: number
      name: string
      email: string
      admin: boolean
    }
  }
}

export default function Dashboard({ auth }: DashboardProps) {
  return (
    <>
      <PageHeader breadcrumbs={[{ label: 'Dashboard' }]} />

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <Card className="from-primary/5 to-card bg-gradient-to-t shadow-xs">
                  <CardHeader>
                    <CardDescription>Welcome</CardDescription>
                    <CardTitle className="text-2xl font-semibold">
                      {auth.user.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-col items-start gap-1.5 text-sm">
                    <div className="text-muted-foreground">
                      Email: {auth.user.email}
                    </div>
                    {auth.user.admin && (
                      <div className="text-muted-foreground">
                        Admin
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}
