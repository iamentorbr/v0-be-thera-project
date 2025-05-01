import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ReminderSettings } from "@/components/settings/reminder-settings"

export default function ReminderSettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações de Lembretes</CardTitle>
        <CardDescription>Personalize como e quando lembretes são enviados aos clientes</CardDescription>
      </CardHeader>
      <CardContent>
        <ReminderSettings />
      </CardContent>
    </Card>
  )
}
