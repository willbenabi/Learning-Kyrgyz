import { router } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'
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
  avatar_url?: string | null
}

interface ProfileShowProps {
  auth: {
    user: User
  }
  user: User
}

export default function ProfileShow({ user }: ProfileShowProps) {
  const getUserInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/)
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.visit('/learning/dashboard')}
          className="gap-2"
        >
          <ArrowLeft className="size-4" />
          Back to Dashboard
        </Button>
        <Button size="sm" onClick={() => router.visit('/profile/edit')}>
          Edit Profile
        </Button>
      </div>
      <Card>
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
                    {user.admin && (
                      <div>
                        <Badge variant="default">Admin</Badge>
                      </div>
                    )}

                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Member Since</div>
                      <div className="text-sm">{new Date(user.created_at).toLocaleDateString()}</div>
                    </div>
                  </CardContent>
                </Card>
    </div>
  )
}
