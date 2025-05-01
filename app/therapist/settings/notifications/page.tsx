import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NotificationSettings } from "@/components/settings/notification-settings"

export default function NotificationSettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações de Notificações</CardTitle>
        <CardDescription>Personalize como e quando você recebe notificações</CardDescription>
      </CardHeader>
      <CardContent>
        <NotificationSettings />
      </CardContent>
    </Card>
  )
}
