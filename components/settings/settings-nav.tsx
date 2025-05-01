"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Settings,
  User,
  CreditCard,
  Bell,
  Calendar,
  Shield,
  Palette,
  MessageSquare,
  FileText,
  Clock,
  LinkIcon,
} from "lucide-react"

const settingsLinks = [
  {
    title: "Perfil",
    href: "/therapist/settings",
    icon: User,
  },
  {
    title: "Conta",
    href: "/therapist/settings/account",
    icon: Settings,
  },
  {
    title: "Pagamentos",
    href: "/therapist/settings/payments",
    icon: CreditCard,
  },
  {
    title: "Notificações",
    href: "/therapist/settings/notifications",
    icon: Bell,
  },
  {
    title: "Agendamento",
    href: "/therapist/settings/scheduling",
    icon: Calendar,
  },
  {
    title: "Privacidade",
    href: "/therapist/settings/privacy",
    icon: Shield,
  },
  {
    title: "Marca",
    href: "/therapist/settings/branding",
    icon: Palette,
  },
  {
    title: "Comunicação",
    href: "/therapist/settings/communication",
    icon: MessageSquare,
  },
  {
    title: "Documentos",
    href: "/therapist/settings/documents",
    icon: FileText,
  },
  {
    title: "Lembretes",
    href: "/therapist/settings/reminders",
    icon: Clock,
  },
  {
    title: "Integrações",
    href: "/therapist/settings/integrations",
    icon: LinkIcon,
  },
]

export function SettingsNav() {
  const pathname = usePathname()

  return (
    <nav className="grid gap-1">
      {settingsLinks.map((link) => {
        const Icon = link.icon
        const isActive =
          pathname === link.href || (link.href !== "/therapist/settings" && pathname?.startsWith(link.href))

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
              isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted",
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{link.title}</span>
          </Link>
        )
      })}
    </nav>
  )
}
