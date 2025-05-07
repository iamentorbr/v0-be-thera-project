"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Settings, LogOut, CreditCard, FileAudio, BookOpen, Video, Home, FileText } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MoonStar } from "lucide-react"
import { ComingSoonBadge } from "@/components/ui/coming-soon-badge"

export function ClientSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <MoonStar className="h-6 w-6" />
          <span className="font-bold">BETHERA</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/client/dashboard"}>
              <Link href="/client/dashboard">
                <Home className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/client/sessions"}>
              <Link href="/client/sessions">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Sessões</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/client/payments"}>
              <Link href="/client/payments">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Pagamentos</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Funcionalidades que serão lançadas posteriormente */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild disabled className="opacity-60">
              <div className="flex items-center">
                <Video className="mr-2 h-4 w-4" />
                <span>Videoconferência</span>
                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                  <ComingSoonBadge size="sm" />
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild disabled className="opacity-60">
              <div className="flex items-center">
                <FileAudio className="mr-2 h-4 w-4" />
                <span>Conteúdo</span>
                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                  <ComingSoonBadge size="sm" />
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild disabled className="opacity-60">
              <div className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                <span>Exercícios</span>
                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                  <ComingSoonBadge size="sm" />
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild disabled className="opacity-60">
              <div className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                <span>Minha Jornada</span>
                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                  <ComingSoonBadge size="sm" />
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/client/settings"}>
              <Link href="/client/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="Usuário" />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Maria Santos</p>
              <p className="text-xs text-muted-foreground">Cliente</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
