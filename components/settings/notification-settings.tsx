"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function NotificationSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [notifications, setNotifications] = useState({
    email: {
      newSession: true,
      sessionReminder: true,
      paymentReceived: true,
      clientMessage: true,
      platformUpdates: false,
      marketingEmails: false,
    },
    push: {
      newSession: true,
      sessionReminder: true,
      paymentReceived: true,
      clientMessage: true,
      platformUpdates: true,
    },
    sms: {
      sessionReminder: false,
      paymentReceived: false,
    },
  })

  function updateNotification(category: keyof typeof notifications, key: string, value: boolean) {
    setNotifications((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }))
  }

  function saveNotificationSettings() {
    setIsLoading(true)

    // Simulação de envio para API
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Configurações de notificação atualizadas",
        description: "Suas preferências de notificação foram salvas com sucesso.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notificações por email</CardTitle>
          <CardDescription>Configure quais emails você deseja receber</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="email-new-session"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Novas sessões agendadas
              </label>
              <p className="text-sm text-muted-foreground">
                Receba um email quando um cliente agendar uma nova sessão.
              </p>
            </div>
            <Switch
              id="email-new-session"
              checked={notifications.email.newSession}
              onCheckedChange={(checked) => updateNotification("email", "newSession", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="email-session-reminder"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Lembretes de sessão
              </label>
              <p className="text-sm text-muted-foreground">
                Receba lembretes por email antes das suas sessões agendadas.
              </p>
            </div>
            <Switch
              id="email-session-reminder"
              checked={notifications.email.sessionReminder}
              onCheckedChange={(checked) => updateNotification("email", "sessionReminder", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="email-payment-received"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Pagamentos recebidos
              </label>
              <p className="text-sm text-muted-foreground">Receba um email quando um pagamento for processado.</p>
            </div>
            <Switch
              id="email-payment-received"
              checked={notifications.email.paymentReceived}
              onCheckedChange={(checked) => updateNotification("email", "paymentReceived", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="email-client-message"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Mensagens de clientes
              </label>
              <p className="text-sm text-muted-foreground">Receba um email quando um cliente enviar uma mensagem.</p>
            </div>
            <Switch
              id="email-client-message"
              checked={notifications.email.clientMessage}
              onCheckedChange={(checked) => updateNotification("email", "clientMessage", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="email-platform-updates"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Atualizações da plataforma
              </label>
              <p className="text-sm text-muted-foreground">Receba emails sobre novas funcionalidades e atualizações.</p>
            </div>
            <Switch
              id="email-platform-updates"
              checked={notifications.email.platformUpdates}
              onCheckedChange={(checked) => updateNotification("email", "platformUpdates", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="email-marketing"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Emails de marketing
              </label>
              <p className="text-sm text-muted-foreground">Receba dicas, promoções e conteúdo exclusivo.</p>
            </div>
            <Switch
              id="email-marketing"
              checked={notifications.email.marketingEmails}
              onCheckedChange={(checked) => updateNotification("email", "marketingEmails", checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notificações push</CardTitle>
          <CardDescription>Configure quais notificações push você deseja receber</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="push-new-session"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Novas sessões agendadas
              </label>
              <p className="text-sm text-muted-foreground">
                Receba uma notificação quando um cliente agendar uma nova sessão.
              </p>
            </div>
            <Switch
              id="push-new-session"
              checked={notifications.push.newSession}
              onCheckedChange={(checked) => updateNotification("push", "newSession", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="push-session-reminder"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Lembretes de sessão
              </label>
              <p className="text-sm text-muted-foreground">Receba lembretes antes das suas sessões agendadas.</p>
            </div>
            <Switch
              id="push-session-reminder"
              checked={notifications.push.sessionReminder}
              onCheckedChange={(checked) => updateNotification("push", "sessionReminder", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="push-payment-received"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Pagamentos recebidos
              </label>
              <p className="text-sm text-muted-foreground">
                Receba uma notificação quando um pagamento for processado.
              </p>
            </div>
            <Switch
              id="push-payment-received"
              checked={notifications.push.paymentReceived}
              onCheckedChange={(checked) => updateNotification("push", "paymentReceived", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="push-client-message"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Mensagens de clientes
              </label>
              <p className="text-sm text-muted-foreground">
                Receba uma notificação quando um cliente enviar uma mensagem.
              </p>
            </div>
            <Switch
              id="push-client-message"
              checked={notifications.push.clientMessage}
              onCheckedChange={(checked) => updateNotification("push", "clientMessage", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="push-platform-updates"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Atualizações da plataforma
              </label>
              <p className="text-sm text-muted-foreground">
                Receba notificações sobre novas funcionalidades e atualizações.
              </p>
            </div>
            <Switch
              id="push-platform-updates"
              checked={notifications.push.platformUpdates}
              onCheckedChange={(checked) => updateNotification("push", "platformUpdates", checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notificações por SMS</CardTitle>
          <CardDescription>Configure quais notificações SMS você deseja receber</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="sms-session-reminder"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Lembretes de sessão
              </label>
              <p className="text-sm text-muted-foreground">
                Receba lembretes por SMS antes das suas sessões agendadas.
              </p>
            </div>
            <Switch
              id="sms-session-reminder"
              checked={notifications.sms.sessionReminder}
              onCheckedChange={(checked) => updateNotification("sms", "sessionReminder", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="sms-payment-received"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Pagamentos recebidos
              </label>
              <p className="text-sm text-muted-foreground">Receba um SMS quando um pagamento for processado.</p>
            </div>
            <Switch
              id="sms-payment-received"
              checked={notifications.sms.paymentReceived}
              onCheckedChange={(checked) => updateNotification("sms", "paymentReceived", checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequência de resumos</CardTitle>
          <CardDescription>Configure a frequência dos emails de resumo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex flex-col space-y-1.5">
              <h3 className="text-sm font-medium leading-none">Resumo de atividades</h3>
              <Select defaultValue="weekly">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione a frequência" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Diário</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                  <SelectItem value="monthly">Mensal</SelectItem>
                  <SelectItem value="never">Nunca</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <h3 className="text-sm font-medium leading-none">Resumo financeiro</h3>
              <Select defaultValue="monthly">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione a frequência" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Semanal</SelectItem>
                  <SelectItem value="monthly">Mensal</SelectItem>
                  <SelectItem value="quarterly">Trimestral</SelectItem>
                  <SelectItem value="never">Nunca</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={saveNotificationSettings} disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar preferências"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
