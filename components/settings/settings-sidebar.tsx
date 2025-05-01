"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  User,
  Settings,
  CreditCard,
  Bell,
  Lock,
  Calendar,
  Palette,
  Link2,
  MessageSquare,
  FileText,
  Clock,
} from "lucide-react"

const items = [
  {
    title: "Perfil",
    href: "/therapist/settings",
    icon: <User className="h-4 w-4" />,
  },
  {
    title: "Conta",
    href: "/therapist/settings/account",
    icon: <Settings className="h-4 w-4" />,
  },
  {
    title: "Pagamentos",
    href: "/therapist/settings/payments",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    title: "Notificações",
    href: "/therapist/settings/notifications",
    icon: <Bell className="h-4 w-4" />,
  },
  {
    title: "Agendamento",
    href: "/therapist/settings/scheduling",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    title: "Privacidade",
    href: "/therapist/settings/privacy",
    icon: <Lock className="h-4 w-4" />,
  },
  {
    title: "Personalização",
    href: "/therapist/settings/branding",
    icon: <Palette className="h-4 w-4" />,
  },
  {
    title: "Integrações",
    href: "/therapist/settings/integrations",
    icon: <Link2 className="h-4 w-4" />,
  },
  {
    title: "Comunicação",
    href: "/therapist/settings/communication",
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    title: "Documentos",
    href: "/therapist/settings/documents",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    title: "Lembretes",
    href: "/therapist/settings/reminders",
    icon: <Clock className="h-4 w-4" />,
  },
]

export function SettingsSidebar() {
  const pathname = usePathname()

  return (
    <div className="sticky top-20">
      <nav className="grid gap-1 p-2 rounded-lg border">
        {items.map((item) => {
          // Check if the current path starts with the item's href
          // This ensures that sub-pages are also highlighted
          const isActive =
            pathname === item.href || (item.href !== "/therapist/settings" && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground font-medium"
                  : "hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
