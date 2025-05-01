import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CommunicationSettings } from "@/components/settings/communication-settings"

export default function CommunicationSettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações de Comunicação</CardTitle>
        <CardDescription>Personalize suas preferências de comunicação com clientes</CardDescription>
      </CardHeader>
      <CardContent>
        <CommunicationSettings />
      </CardContent>
    </Card>
  )
}
