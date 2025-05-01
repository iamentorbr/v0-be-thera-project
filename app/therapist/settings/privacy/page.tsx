import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PrivacySettings } from "@/components/settings/privacy-settings"

export default function PrivacySettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações de Privacidade</CardTitle>
        <CardDescription>Controle sua privacidade e compartilhamento de dados</CardDescription>
      </CardHeader>
      <CardContent>
        <PrivacySettings />
      </CardContent>
    </Card>
  )
}
