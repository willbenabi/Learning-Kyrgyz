import { router } from '@inertiajs/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PageHeader } from '@/components/page-header'

interface User {
  id: number
  name: string
  email: string
  admin: boolean
  created_at: string
}

interface AdminUserEditProps {
  auth: {
    user: User
  }
  user: User
  errors?: {
    name?: string[]
  }
}

const userEditSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must not exceed 100 characters'),
})

type UserEditFormData = z.infer<typeof userEditSchema>

export default function AdminUserEdit({ user, errors }: AdminUserEditProps) {
  const { register, handleSubmit, formState: { errors: formErrors, isSubmitting } } = useForm<UserEditFormData>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      name: user.name,
    },
  })

  const onSubmit = (data: UserEditFormData) => {
    router.put(`/admin/users/${user.id}`, { user: data })
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Admin Panel', href: '/admin/console' },
          { label: 'Manage Users', href: '/admin/users' },
          { label: `Edit ${user.name}` },
        ]}
      />

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <Card className="from-primary/5 to-card bg-gradient-to-t shadow-xs">
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
                          value={user.email}
                          disabled
                          className="bg-muted"
                        />
                        <p className="text-xs text-muted-foreground">Email cannot be changed</p>
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
