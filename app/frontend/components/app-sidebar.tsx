import * as React from "react"
import {
  LayoutDashboardIcon,
  Users,
  ScrollText,
  MessageSquare,
} from "lucide-react"
import { Link } from "@inertiajs/react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface User {
  id: number
  name: string
  email: string
  admin: boolean
  unread_support_messages_count?: number
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: User
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const navMain: Array<{
    title: string
    url: string
    icon: typeof LayoutDashboardIcon
    activePattern?: string
    badge?: string | number
  }> = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
  ]

  // Add admin menu items if user is admin
  if (user.admin) {
    navMain.push(
      {
        title: "Users",
        url: "/admin/users",
        icon: Users,
        activePattern: "/admin/users",
      },
      {
        title: "Support",
        url: "/admin/support_messages",
        icon: MessageSquare,
        activePattern: "/admin/support_messages",
        badge: user.unread_support_messages_count && user.unread_support_messages_count > 0
          ? user.unread_support_messages_count
          : undefined
      },
      {
        title: "Audit Logs",
        url: "/admin/audit_logs",
        icon: ScrollText,
        activePattern: "/admin/audit_logs",
      }
    )
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-10 items-center justify-center rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/vector-1740629145639-51b2768eb3ca?q=80&w=80&auto=format&fit=crop"
                    alt="Berkut Logo"
                    className="size-10 object-cover"
                  />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-black text-base tracking-tight">BERKUT</span>
                  <span className="text-xs text-muted-foreground font-medium">Language Learning</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
    </Sidebar>
  )
}
