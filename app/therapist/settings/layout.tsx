import type React from "react"
import type { Metadata } from "next"
import { SettingsNav } from "@/components/settings/settings-nav"

export const metadata: Metadata = {
  title: "Configurações | BeTHERA",
  description: "Gerencie suas configurações de conta, pagamentos, notificações e mais.",
}

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="container py-6 space-y-6 md:space-y-8">
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">Gerencie suas configurações de conta, pagamentos, notificações e mais.</p>
      </div>
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SettingsNav />
        </aside>
        <div className="flex-1 lg:max-w-3xl">{children}</div>
      </div>
    </div>
  )
}
