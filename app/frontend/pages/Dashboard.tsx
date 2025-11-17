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
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Welcome, {auth.user.name}!</h1>
        <p className="text-muted-foreground text-lg">
          This is your dashboard. Start building your application here.
        </p>
      </div>
    </div>
  )
}
