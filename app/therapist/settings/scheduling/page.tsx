import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SchedulingSettings } from "@/components/settings/scheduling-settings"

export default function SchedulingSettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações de Agendamento</CardTitle>
        <CardDescription>Defina sua disponibilidade e preferências de agendamento</CardDescription>
      </CardHeader>
      <CardContent>
        <SchedulingSettings />
      </CardContent>
    </Card>
  )
}
