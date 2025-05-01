import type { Metadata } from "next"
import { ProfileSettings } from "@/components/settings/profile-settings"

export const metadata: Metadata = {
  title: "Perfil | Configurações | BeTHERA",
  description: "Gerencie suas informações de perfil.",
}

export default function ProfileSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Perfil</h3>
        <p className="text-sm text-muted-foreground">
          Gerencie suas informações de perfil e como elas são exibidas para seus clientes.
        </p>
      </div>
      <ProfileSettings />
    </div>
  )
}
