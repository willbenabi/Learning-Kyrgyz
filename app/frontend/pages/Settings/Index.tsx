import { router } from '@inertiajs/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTheme } from '@/components/theme-provider'

interface User {
  id: number
  name: string
  email: string
  role: string
  super_admin: boolean
  created_at: string
}

interface Preferences {
  sidebar_variant: 'sidebar' | 'floating' | 'inset'
  theme: 'light' | 'dark' | 'system'
}

interface SettingsIndexProps {
  auth: {
    user: User
  }
  preferences?: Preferences
  errors?: string[]
}

export default function SettingsIndex({ auth, preferences = { sidebar_variant: 'inset', theme: 'system' }, errors }: SettingsIndexProps) {
  const { setTheme } = useTheme()

  // Auto-save theme when changed
  const handleThemeChange = (newTheme: string) => {
    // Update theme immediately for instant preview
    setTheme(newTheme as 'light' | 'dark' | 'system')

    // Auto-save to database
    router.patch('/settings', {
      user_preference: {
        theme: newTheme
      }
    }, {
      preserveScroll: true,
      only: ['preferences', 'flash'],
    })
  }

  // Auto-save sidebar variant when changed
  const handleSidebarVariantChange = (newVariant: string) => {
    // Auto-save to database (AppLayout will update body background via useEffect)
    router.patch('/settings', {
      user_preference: {
        sidebar_variant: newVariant
      }
    }, {
      preserveScroll: true,
      only: ['preferences', 'flash'],
    })
  }

  // Get display name for sidebar variant
  const getSidebarVariantLabel = (value: string) => {
    const labels: Record<string, string> = {
      sidebar: 'Sidebar',
      floating: 'Floating',
      inset: 'Inset'
    }
    return labels[value] || value
  }

  return (
    <>
      <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
          <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Settings</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <Card className="max-w-2xl from-primary/5 to-card bg-gradient-to-t shadow-xs">
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize how your application looks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {errors && errors.length > 0 && (
                      <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                        {errors.map((error, index) => (
                          <div key={index}>{error}</div>
                        ))}
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme</Label>
                      <Select value={preferences.theme} onValueChange={handleThemeChange}>
                        <SelectTrigger id="theme">
                          <SelectValue placeholder="Select a theme" />
                        </SelectTrigger>
                        <SelectContent align="start">
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Changes are saved automatically
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sidebar-variant">Sidebar Variant</Label>
                      <Select value={preferences.sidebar_variant} onValueChange={handleSidebarVariantChange}>
                        <SelectTrigger id="sidebar-variant">
                          <SelectValue placeholder="Select a variant">
                            {getSidebarVariantLabel(preferences.sidebar_variant)}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent align="start">
                          <SelectItem value="sidebar">
                            <div className="flex flex-col">
                              <span className="font-medium">Sidebar</span>
                              <span className="text-xs text-muted-foreground">
                                Full-width sidebar with sharp edges
                              </span>
                            </div>
                          </SelectItem>
                          <SelectItem value="floating">
                            <div className="flex flex-col">
                              <span className="font-medium">Floating</span>
                              <span className="text-xs text-muted-foreground">
                                Floating sidebar with rounded corners
                              </span>
                            </div>
                          </SelectItem>
                          <SelectItem value="inset">
                            <div className="flex flex-col">
                              <span className="font-medium">Inset</span>
                              <span className="text-xs text-muted-foreground">
                                Inset sidebar with padding and rounded corners
                              </span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Changes are saved automatically
                      </p>
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
