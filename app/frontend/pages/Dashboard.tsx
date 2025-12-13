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
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      {/* Decorative illustration */}
      <div className="relative w-full max-w-md">
        <img
          src="/ui-decoration.png"
          alt="Welcome illustration"
          className="w-full h-auto rounded-3xl shadow-2xl"
        />
      </div>

      {/* Welcome content */}
      <div className="text-center space-y-4 max-w-2xl px-4">
        <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          Welcome, {auth.user.name}!
        </h1>
        <p className="text-muted-foreground text-xl font-semibold">
          Ready to start your language learning journey? 🚀
        </p>
        <p className="text-muted-foreground text-base">
          Your personalized dashboard is here to track your progress and keep you motivated!
        </p>
      </div>
    </div>
  )
}
