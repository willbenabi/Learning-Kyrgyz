import { router } from '@inertiajs/react'
import { useState, useEffect } from 'react'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CrownIcon,
  EyeIcon,
  MailIcon,
  PencilLineIcon,
  SearchIcon,
  Trash2Icon,
  XIcon,
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '@/components/ui/pagination'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { DeleteConfirmationDialog } from '@/components/delete-confirmation-dialog'

interface User {
  id: number
  name: string
  email: string
  owner: boolean
  created_at: string
  invitation_pending: boolean
  invitation_accepted: boolean
  active: boolean
}

interface Pagination {
  page: number
  pages: number
  count: number
  from: number
  to: number
  prev: number | null
  next: number | null
}

interface Filters {
  search?: string | null
  sort?: string
  direction?: string
}

interface AdminUsersIndexProps {
  auth: {
    user: User
  }
  users: User[]
  pagination: Pagination
  filters: Filters
}

export default function AdminUsersIndex({ auth, users, pagination, filters }: AdminUsersIndexProps) {
  const [searchTerm, setSearchTerm] = useState(filters.search || '')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)

  // Debounced search with 300ms delay
  // IMPORTANT: Uses 'only' parameter to prevent shared props from updating,
  // which maintains input focus during typing. See inertia.tsx for details.
  useEffect(() => {
    const timer = setTimeout(() => {
      // Normalize comparison: treat null/undefined as empty string
      const currentFilter = filters.search || ''
      if (searchTerm !== currentFilter) {
        handleSearch(searchTerm)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm])

  const handleSearch = (search: string) => {
    router.get('/admin/users', {
      search: search || undefined,
      sort: filters.sort,
      direction: filters.direction,
    }, {
      preserveState: true,
      preserveScroll: true,
      only: ['users', 'pagination', 'filters'],
    })
  }

  const handleSort = (column: string) => {
    const direction = filters.sort === column && filters.direction === 'asc' ? 'desc' : 'asc'
    router.get('/admin/users', {
      ...filters,
      sort: column,
      direction,
    }, {
      preserveState: true,
      preserveScroll: true,
      only: ['users', 'pagination', 'filters'],
    })
  }

  const handlePageChange = (page: number) => {
    router.get('/admin/users', {
      ...filters,
      page,
    }, {
      preserveState: true,
      preserveScroll: true,
      only: ['users', 'pagination', 'filters'],
    })
  }

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      router.delete(`/admin/users/${userToDelete.id}`)
      setUserToDelete(null)
    }
  }

  const handleResendInvitation = (userId: number) => {
    router.post(`/admin/users/${userId}/resend_invitation`, {}, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  const getSortIcon = (column: string) => {
    if (filters.sort === column) {
      return filters.direction === 'asc' ? (
        <ChevronUpIcon className="size-4" />
      ) : (
        <ChevronDownIcon className="size-4" />
      )
    }
    return <ChevronUpIcon className="size-4 opacity-50" />
  }

  const getUserInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/)
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  const renderPagination = () => {
    if (pagination.pages <= 1) return null

    const pages = []
    const maxPagesToShow = 5
    let startPage = Math.max(1, pagination.page - Math.floor(maxPagesToShow / 2))
    let endPage = Math.min(pagination.pages, startPage + maxPagesToShow - 1)

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              className="disabled:pointer-events-none disabled:opacity-50"
              variant="ghost"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={!pagination.prev}
              aria-label="Go to previous page"
            >
              <ChevronLeftIcon size={16} aria-hidden="true" />
              Previous
            </Button>
          </PaginationItem>

          {startPage > 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {pages.map((page) => {
            const isActive = page === pagination.page

            return (
              <PaginationItem key={page}>
                <Button
                  size="icon"
                  className={`${!isActive && 'bg-primary/10 text-primary hover:bg-primary/20'}`}
                  onClick={() => handlePageChange(page)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {page}
                </Button>
              </PaginationItem>
            )
          })}

          {endPage < pagination.pages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <Button
              className="disabled:pointer-events-none disabled:opacity-50"
              variant="ghost"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={!pagination.next}
              aria-label="Go to next page"
            >
              Next
              <ChevronRightIcon size={16} aria-hidden="true" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
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
                  <BreadcrumbPage>Manage Users</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" onClick={() => router.visit('/admin/users/new')}>
                Invite User
              </Button>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <Card className="from-primary/5 to-card bg-gradient-to-t shadow-xs">
                  <CardHeader>
                    <CardTitle>All Users ({pagination.count})</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="w-full">
                      <div className="border-b">
                        <div className="flex flex-col gap-4 p-6">
                          <span className="text-xl font-semibold">Filter Users</span>
                          <div className="w-full space-y-2">
                            <Label htmlFor="search">Search by Name or Email</Label>
                            <div className="relative">
                              <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                              <Input
                                id="search"
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 pr-9"
                              />
                              {searchTerm && (
                                <button
                                  type="button"
                                  onClick={() => setSearchTerm('')}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                  <XIcon className="size-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        <Table>
                          <TableHeader>
                            <TableRow className="h-14 border-t">
                              <TableHead className="text-muted-foreground first:pl-4">
                                <button
                                  onClick={() => handleSort('name')}
                                  className="flex items-center gap-1 hover:text-foreground"
                                >
                                  User
                                  {getSortIcon('name')}
                                </button>
                              </TableHead>
                              <TableHead className="text-muted-foreground">
                                <button
                                  onClick={() => handleSort('email')}
                                  className="flex items-center gap-1 hover:text-foreground"
                                >
                                  Email
                                  {getSortIcon('email')}
                                </button>
                              </TableHead>
                              <TableHead className="text-muted-foreground">Status</TableHead>
                              <TableHead className="text-muted-foreground">
                                <button
                                  onClick={() => handleSort('created_at')}
                                  className="flex items-center gap-1 hover:text-foreground"
                                >
                                  Created
                                  {getSortIcon('created_at')}
                                </button>
                              </TableHead>
                              <TableHead className="text-muted-foreground last:px-4 last:text-center">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {users.length > 0 ? (
                              users.map((user) => {
                                const isCurrentUser = user.id === auth.user.id

                                return (
                                  <TableRow key={user.id} className="hover:bg-transparent">
                                    <TableCell className="h-14 first:pl-4">
                                      <div className="flex items-center gap-2">
                                        <Avatar className="size-9">
                                          <AvatarImage src="" alt={user.name} />
                                          <AvatarFallback className="text-xs">{getUserInitials(user.name)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                          <div className="flex items-center gap-2">
                                            <span className="font-medium">{user.name}</span>
                                            {user.owner && (
                                              <CrownIcon className="size-3.5 text-amber-600 dark:text-amber-400" />
                                            )}
                                          </div>
                                          <span className="text-muted-foreground text-xs">{user.email}</span>
                                        </div>
                                      </div>
                                    </TableCell>
                                    <TableCell className="h-14">
                                      <span className="text-muted-foreground">{user.email}</span>
                                    </TableCell>
                                    <TableCell className="h-14">
                                      {user.active ? (
                                        <Badge variant="default" className="bg-green-600 hover:bg-green-700">Active</Badge>
                                      ) : user.invitation_pending ? (
                                        <Badge variant="secondary">Pending</Badge>
                                      ) : (
                                        <Badge variant="outline">Inactive</Badge>
                                      )}
                                    </TableCell>
                                    <TableCell className="h-14">
                                      <span className="text-muted-foreground">
                                        {new Date(user.created_at).toLocaleDateString()}
                                      </span>
                                    </TableCell>
                                    <TableCell className="h-14 last:w-29 last:px-4">
                                      <div className="flex items-center justify-center gap-1">
                                        {user.invitation_pending && (
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            aria-label="Resend invitation"
                                            onClick={() => handleResendInvitation(user.id)}
                                          >
                                            <MailIcon className="size-4.5" />
                                          </Button>
                                        )}
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          aria-label="View user"
                                          onClick={() => router.visit(`/admin/users/${user.id}`)}
                                        >
                                          <EyeIcon className="size-4.5" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          aria-label="Edit user"
                                          onClick={() => router.visit(`/admin/users/${user.id}/edit`)}
                                        >
                                          <PencilLineIcon className="size-4.5" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          aria-label="Delete user"
                                          disabled={isCurrentUser}
                                          onClick={() => !isCurrentUser && handleDeleteClick(user)}
                                        >
                                          <Trash2Icon className="size-4.5" />
                                        </Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                )
                              })
                            ) : (
                              <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                  No users found.
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>

                      <div className="flex items-center justify-between gap-3 px-6 py-4 max-sm:flex-col md:max-lg:flex-col">
                        <p className="text-muted-foreground text-sm whitespace-nowrap" aria-live="polite">
                          Showing <span>{pagination.from || 0}</span> to <span>{pagination.to || 0}</span> of{' '}
                          <span>{pagination.count} users</span>
                        </p>

                        <div>{renderPagination()}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete User"
        description={`Are you sure you want to delete ${userToDelete?.name}? This action cannot be undone and will permanently remove the user and all their data from the system.`}
      />
    </>
  )
}
