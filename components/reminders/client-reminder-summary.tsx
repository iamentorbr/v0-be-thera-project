import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Calendar, Clock, Mail, MessageSquare, Phone } from "lucide-react"

interface ClientReminderSummaryProps {
  clientId: string
  clientName: string
  preferences: {
    enabled: boolean
    preferredChannel: string
    reminderTimes: string[]
    sessionReminders: boolean
    exerciseReminders: boolean
    paymentReminders: boolean
    contentReminders: boolean
  }
}

export function ClientReminderSummary({ clientId, clientName, preferences }: ClientReminderSummaryProps) {
  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "sms":
        return <Phone className="h-4 w-4" />
      case "whatsapp":
        return <MessageSquare className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getChannelLabel = (channel: string) => {
    switch (channel) {
      case "email":
        return "Email"
      case "sms":
        return "SMS"
      case "whatsapp":
        return "WhatsApp"
      case "all":
        return "Todos os canais"
      default:
        return "Desconhecido"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Preferências de Lembretes</CardTitle>
        <CardDescription>Resumo das configurações de lembretes</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Status</span>
          </div>
          <Badge variant={preferences.enabled ? "default" : "outline"}>
            {preferences.enabled ? "Ativado" : "Desativado"}
          </Badge>
        </div>

        {preferences.enabled && (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getChannelIcon(preferences.preferredChannel)}
                <span className="text-sm">Canal Preferido</span>
              </div>
              <span className="text-sm font-medium">{getChannelLabel(preferences.preferredChannel)}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Horários</span>
              </div>
              <div className="flex flex-wrap gap-1 justify-end">
                {preferences.reminderTimes.map((time) => (
                  <Badge key={time} variant="outline" className="text-xs">
                    {time}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Tipos de Lembretes</span>
              </div>
              <div className="flex flex-wrap gap-1 justify-end">
                {preferences.sessionReminders && (
                  <Badge variant="secondary" className="text-xs">
                    Sessões
                  </Badge>
                )}
                {preferences.exerciseReminders && (
                  <Badge variant="secondary" className="text-xs">
                    Exercícios
                  </Badge>
                )}
                {preferences.paymentReminders && (
                  <Badge variant="secondary" className="text-xs">
                    Pagamentos
                  </Badge>
                )}
                {preferences.contentReminders && (
                  <Badge variant="secondary" className="text-xs">
                    Conteúdo
                  </Badge>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
