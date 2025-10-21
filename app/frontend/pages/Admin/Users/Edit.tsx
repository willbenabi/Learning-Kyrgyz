import { router } from '@inertiajs/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  owner: boolean
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
  }
}

const userEditSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must not exceed 100 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().optional(),
  password_confirmation: z.string().optional(),
}).refine((data) => {
  // If password is provided, it must be at least 8 characters
  if (data.password && data.password.length > 0 && data.password.length < 8) {
    return false
  }
  return true
}, {
  message: "Password must be at least 8 characters",
  path: ['password'],
}).refine((data) => {
  // If password is provided, confirmation must match
  if (data.password && data.password.length > 0) {
    return data.password === data.password_confirmation
  }
  return true
}, {
  message: "Passwords don't match",
  path: ['password_confirmation'],
})

type UserEditFormData = z.infer<typeof userEditSchema>

export default function AdminUserEdit({ auth, user, errors }: AdminUserEditProps) {
  const { register, handleSubmit, formState: { errors: formErrors, isSubmitting } } = useForm<UserEditFormData>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      password: '',
      password_confirmation: '',
    },
  })

  const onSubmit = (data: UserEditFormData) => {
    // Remove empty password fields
    const submitData = { ...data }
    if (!submitData.password || submitData.password.length === 0) {
      delete submitData.password
      delete submitData.password_confirmation
    }
    router.put(`/admin/users/${user.id}`, { user: submitData })
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
                  <BreadcrumbLink href="/admin/console">Owner Panel</BreadcrumbLink>
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
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          type="text"
                          {...register('name')}
                        />
                        {formErrors.name && (
                          <p className="text-sm text-destructive">{formErrors.name.message}</p>
                        )}
                        {errors?.name && (
                          <p className="text-sm text-destructive">{errors.name[0]}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                        />
                        {formErrors.email && (
                          <p className="text-sm text-destructive">{formErrors.email.message}</p>
                        )}
                        {errors?.email && (
                          <p className="text-sm text-destructive">{errors.email[0]}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Password (leave blank to keep current)</Label>
                        <Input
                          id="password"
                          type="password"
                          {...register('password')}
                        />
                        {formErrors.password && (
                          <p className="text-sm text-destructive">{formErrors.password.message}</p>
                        )}
                        {errors?.password && (
                          <p className="text-sm text-destructive">{errors.password[0]}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                        <Input
                          id="password_confirmation"
                          type="password"
                          {...register('password_confirmation')}
                        />
                        {formErrors.password_confirmation && (
                          <p className="text-sm text-destructive">{formErrors.password_confirmation.message}</p>
                        )}
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
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? 'Updating...' : 'Update User'}
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
