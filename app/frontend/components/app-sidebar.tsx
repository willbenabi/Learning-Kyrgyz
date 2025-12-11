import * as React from "react"
import {
  LayoutDashboardIcon,
  Users,
  ScrollText,
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
        title: "Audit Logs",
        url: "/admin/audit_logs",
        icon: ScrollText,
        activePattern: "/admin/audit_logs",
      }
    )
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
    </Sidebar>
  )
}
