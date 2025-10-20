import { router, useForm } from '@inertiajs/react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

interface User {
  id: number
  name: string
  email: string
  role: string
  super_admin: boolean
  created_at: string
}

interface AdminUserEditProps {
  auth: {
    user: User
  }
  user: User
  errors?: {
    name?: string[]
    email?: string[]
    password?: string[]
    password_confirmation?: string[]
    role?: string[]
  }
}

export default function AdminUserEdit({ auth, user, errors }: AdminUserEditProps) {
  const { data, setData, put, processing } = useForm({
    name: user.name,
    email: user.email,
    password: '',
    password_confirmation: '',
    role: user.role,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    put(`/admin/users/${user.id}`)
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
                  <BreadcrumbLink href="/admin/console">Super Admin Panel</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin/users">Manage Users</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Edit {user.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <Card className="from-primary/5 to-card bg-gradient-to-t shadow-xs max-w-2xl">
                  <CardHeader>
                    <CardTitle>Edit User</CardTitle>
                    <CardDescription>Update user information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          type="text"
                          value={data.name}
                          onChange={(e) => setData('name', e.target.value)}
                          required
                        />
                        {errors?.name && (
                          <p className="text-sm text-destructive">{errors.name[0]}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={data.email}
                          onChange={(e) => setData('email', e.target.value)}
                          required
                        />
                        {errors?.email && (
                          <p className="text-sm text-destructive">{errors.email[0]}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select value={data.role} onValueChange={(value) => setData('role', value)}>
                          <SelectTrigger id="role">
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors?.role && (
                          <p className="text-sm text-destructive">{errors.role[0]}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Password (leave blank to keep current)</Label>
                        <Input
                          id="password"
                          type="password"
                          value={data.password}
                          onChange={(e) => setData('password', e.target.value)}
                        />
                        {errors?.password && (
                          <p className="text-sm text-destructive">{errors.password[0]}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                        <Input
                          id="password_confirmation"
                          type="password"
                          value={data.password_confirmation}
                          onChange={(e) => setData('password_confirmation', e.target.value)}
                        />
                        {errors?.password_confirmation && (
                          <p className="text-sm text-destructive">{errors.password_confirmation[0]}</p>
                        )}
                      </div>

                      <div className="flex justify-end gap-2 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => router.visit('/admin/users')}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                          {processing ? 'Updating...' : 'Update User'}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}
