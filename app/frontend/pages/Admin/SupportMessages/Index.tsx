import { router } from '@inertiajs/react'
import { useState } from 'react'
import {
  MessageSquare,
  Check,
  Trash2Icon,
  Mail,
  MailOpen,
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from '@/components/ui/pagination'
import { Badge } from '@/components/ui/badge'
import { DeleteConfirmationDialog } from '@/components/delete-confirmation-dialog'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface User {
  id: number
  name: string
  email: string
}

interface SupportMessage {
  id: number
  subject: string
  message: string
  status: 'unread' | 'read'
  read_at: string | null
  created_at: string
  user: User
}

interface PaginationData {
  page: number
  pages: number
  count: number
  from: number
  to: number
  prev: number | null
  next: number | null
}

interface Stats {
  total: number
  unread: number
  read: number
}

interface AdminSupportMessagesIndexProps {
  support_messages: SupportMessage[]
  pagination: PaginationData
  unread_count: number
  stats: Stats
}

export default function AdminSupportMessagesIndex({
  support_messages,
  pagination,
  unread_count,
  stats
}: AdminSupportMessagesIndexProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [messageToDelete, setMessageToDelete] = useState<SupportMessage | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<SupportMessage | null>(null)

  const handleDelete = async () => {
    if (!messageToDelete) return

    router.delete(`/admin/support_messages/${messageToDelete.id}`, {
      preserveScroll: true,
      onSuccess: () => {
        setDeleteDialogOpen(false)
        setMessageToDelete(null)
      }
    })
  }

  const handleMarkAsRead = async (message: SupportMessage) => {
    if (message.status === 'read') return

    router.patch(`/admin/support_messages/${message.id}/mark_as_read`, {}, {
      preserveScroll: true,
      preserveState: true,
    })
  }

  const handleViewMessage = (message: SupportMessage) => {
    setSelectedMessage(message)
    setViewDialogOpen(true)

    // Mark as read when viewing
    if (message.status === 'unread') {
      handleMarkAsRead(message)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const openDeleteDialog = (message: SupportMessage) => {
    setMessageToDelete(message)
    setDeleteDialogOpen(true)
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Support Messages</h1>
                <p className="text-muted-foreground">
                  Manage and respond to user support requests
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Unread</CardTitle>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{stats.unread}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Read</CardTitle>
                  <MailOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.read}</div>
                </CardContent>
              </Card>
            </div>

            {/* Messages Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="min-w-0 overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Status</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>From</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="w-[180px] text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {support_messages.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                            No support messages yet
                          </TableCell>
                        </TableRow>
                      ) : (
                        support_messages.map((message) => (
                          <TableRow
                            key={message.id}
                            className={message.status === 'unread' ? 'bg-orange-50 dark:bg-orange-950/20' : ''}
                          >
                            <TableCell>
                              {message.status === 'unread' ? (
                                <Badge variant="destructive" className="gap-1">
                                  <Mail className="h-3 w-3" />
                                  Unread
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="gap-1">
                                  <MailOpen className="h-3 w-3" />
                                  Read
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="font-medium">
                              <button
                                onClick={() => handleViewMessage(message)}
                                className="text-left hover:underline"
                              >
                                {message.subject}
                              </button>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{message.user.name}</div>
                                <div className="text-sm text-muted-foreground">{message.user.email}</div>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {formatDate(message.created_at)}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleViewMessage(message)}
                                >
                                  View
                                </Button>
                                {message.status === 'unread' && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleMarkAsRead(message)}
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => openDeleteDialog(message)}
                                >
                                  <Trash2Icon className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Showing {pagination.from} to {pagination.to} of {pagination.count} messages
                    </div>
                    <Pagination>
                      <PaginationContent>
                        {pagination.prev && (
                          <PaginationItem>
                            <PaginationPrevious
                              href={`/admin/support_messages?page=${pagination.prev}`}
                              onClick={(e) => {
                                e.preventDefault()
                                router.get(`/admin/support_messages?page=${pagination.prev}`, {}, {
                                  preserveScroll: true,
                                })
                              }}
                            />
                          </PaginationItem>
                        )}
                        {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href={`/admin/support_messages?page=${page}`}
                              isActive={page === pagination.page}
                              onClick={(e) => {
                                e.preventDefault()
                                router.get(`/admin/support_messages?page=${page}`, {}, {
                                  preserveScroll: true,
                                })
                              }}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        {pagination.next && (
                          <PaginationItem>
                            <PaginationNext
                              href={`/admin/support_messages?page=${pagination.next}`}
                              onClick={(e) => {
                                e.preventDefault()
                                router.get(`/admin/support_messages?page=${pagination.next}`, {}, {
                                  preserveScroll: true,
                                })
                              }}
                            />
                          </PaginationItem>
                        )}
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* View Message Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedMessage && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedMessage.subject}</DialogTitle>
                <DialogDescription>
                  From: {selectedMessage.user.name} ({selectedMessage.user.email})
                  <br />
                  Sent: {formatDate(selectedMessage.created_at)}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="rounded-lg bg-muted p-4 whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Support Message"
        description={
          messageToDelete
            ? `Are you sure you want to delete this message from ${messageToDelete.user.name}? This action cannot be undone.`
            : ''
        }
      />
    </div>
  )
}
