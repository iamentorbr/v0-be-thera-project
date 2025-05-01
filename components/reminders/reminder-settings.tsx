"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Mail, MessageSquare, Clock } from "lucide-react"

export function ReminderSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    enabled: true,
    therapistReminders: {
      email: true,
      push: true,
      sms: false,
      timing: [
        { value: "1440", enabled: true }, // 24 hours before
        { value: "60", enabled: true }, // 1 hour before
      ],
    },
    clientReminders: {
      email: true,
      sms: true,
      timing: [
        { value: "1440", enabled: true }, // 24 hours before
        { value: "60", enabled: true }, // 1 hour before
      ],
      template: "default",
    },
    missedSessions: {
      enabled: true,
      sendAfter: "15", // minutes
      template: "missed-session",
    },
    cancelledSessions: {
      enabled: true,
      template: "cancelled-session",
    },
  })

  const updateSetting = (path: string[], value: any) => {
    setSettings((prev) => {
      const newSettings = { ...prev }
      let current = newSettings
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i] as keyof typeof current] as any
      }
      current[path[path.length - 1] as keyof typeof current] = value
      return newSettings
    })
  }

  const updateTimingSetting = (category: "therapistReminders" | "clientReminders", index: number, enabled: boolean) => {
    setSettings((prev) => {
      const newSettings = { ...prev }
      newSettings[category].timing[index].enabled = enabled
      return newSettings
    })
  }

  const saveSettings = () => {
    setIsLoading(true)

    // Simulação de envio para API
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Configurações salvas",
        description: "Suas configurações de lembretes foram atualizadas com sucesso.",
      })
    }, 1000)
  }

  const formatTimingValue = (value: string) => {
    const minutes = Number.parseInt(value)
    if (minutes === 1440) return "24 horas antes"
    if (minutes === 720) return "12 horas antes"
    if (minutes === 180) return "3 horas antes"
    if (minutes === 60) return "1 hora antes"
    if (minutes === 30) return "30 minutos antes"
    if (minutes === 15) return "15 minutos antes"
    return `${minutes} minutos antes`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="enable-reminders" className="text-base">
            Ativar lembretes automáticos
          </Label>
          <p className="text-sm text-muted-foreground">
            Quando ativado, lembretes serão enviados automaticamente para sessões agendadas.
          </p>
        </div>
        <Switch
          id="enable-reminders"
          checked={settings.enabled}
          onCheckedChange={(checked) => updateSetting(["enabled"], checked)}
        />
      </div>

      <Separator />

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center">
            <Bell className="mr-2 h-5 w-5 text-primary" />
            <CardTitle>Lembretes para você</CardTitle>
          </div>
          <CardDescription>Configure como você deseja receber lembretes para suas sessões.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="therapist-email"
                  checked={settings.therapistReminders.email}
                  onCheckedChange={(checked) => updateSetting(["therapistReminders", "email"], checked)}
                  disabled={!settings.enabled}
                />
                <Label htmlFor="therapist-email" className="flex items-center cursor-pointer">
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="therapist-push"
                  checked={settings.therapistReminders.push}
                  onCheckedChange={(checked) => updateSetting(["therapistReminders", "push"], checked)}
                  disabled={!settings.enabled}
                />
                <Label htmlFor="therapist-push" className="flex items-center cursor-pointer">
                  <Bell className="mr-2 h-4 w-4" />
                  Notificação push
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="therapist-sms"
                  checked={settings.therapistReminders.sms}
                  onCheckedChange={(checked) => updateSetting(["therapistReminders", "sms"], checked)}
                  disabled={!settings.enabled}
                />
                <Label htmlFor="therapist-sms" className="flex items-center cursor-pointer">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  SMS
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Quando enviar lembretes:</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {settings.therapistReminders.timing.map((timing, index) => (
                  <div key={timing.value} className="flex items-center space-x-2">
                    <Switch
                      id={`therapist-timing-${timing.value}`}
                      checked={timing.enabled}
                      onCheckedChange={(checked) => updateTimingSetting("therapistReminders", index, checked)}
                      disabled={!settings.enabled}
                    />
                    <Label htmlFor={`therapist-timing-${timing.value}`} className="flex items-center cursor-pointer">
                      <Clock className="mr-2 h-4 w-4" />
                      {formatTimingValue(timing.value)}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center">
            <Bell className="mr-2 h-5 w-5 text-primary" />
            <CardTitle>Lembretes para clientes</CardTitle>
          </div>
          <CardDescription>Configure como seus clientes receberão lembretes para as sessões.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="client-email"
                  checked={settings.clientReminders.email}
                  onCheckedChange={(checked) => updateSetting(["clientReminders", "email"], checked)}
                  disabled={!settings.enabled}
                />
                <Label htmlFor="client-email" className="flex items-center cursor-pointer">
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="client-sms"
                  checked={settings.clientReminders.sms}
                  onCheckedChange={(checked) => updateSetting(["clientReminders", "sms"], checked)}
                  disabled={!settings.enabled}
                />
                <Label htmlFor="client-sms" className="flex items-center cursor-pointer">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  SMS
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Quando enviar lembretes:</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {settings.clientReminders.timing.map((timing, index) => (
                  <div key={timing.value} className="flex items-center space-x-2">
                    <Switch
                      id={`client-timing-${timing.value}`}
                      checked={timing.enabled}
                      onCheckedChange={(checked) => updateTimingSetting("clientReminders", index, checked)}
                      disabled={!settings.enabled}
                    />
                    <Label htmlFor={`client-timing-${timing.value}`} className="flex items-center cursor-pointer">
                      <Clock className="mr-2 h-4 w-4" />
                      {formatTimingValue(timing.value)}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="client-template">Template de mensagem:</Label>
              <Select
                value={settings.clientReminders.template}
                onValueChange={(value) => updateSetting(["clientReminders", "template"], value)}
                disabled={!settings.enabled}
              >
                <SelectTrigger id="client-template">
                  <SelectValue placeholder="Selecione um template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Template padrão</SelectItem>
                  <SelectItem value="formal">Template formal</SelectItem>
                  <SelectItem value="friendly">Template amigável</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center">
            <Bell className="mr-2 h-5 w-5 text-primary" />
            <CardTitle>Sessões perdidas</CardTitle>
          </div>
          <CardDescription>Configure lembretes para quando um cliente não comparece à sessão.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="missed-sessions" className="text-base">
                Enviar lembrete para sessões perdidas
              </Label>
              <p className="text-sm text-muted-foreground">
                Enviar automaticamente uma mensagem quando um cliente não comparecer à sessão.
              </p>
            </div>
            <Switch
              id="missed-sessions"
              checked={settings.missedSessions.enabled}
              onCheckedChange={(checked) => updateSetting(["missedSessions", "enabled"], checked)}
              disabled={!settings.enabled}
            />
          </div>

          {settings.missedSessions.enabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="missed-send-after">Enviar após:</Label>
                <Select
                  value={settings.missedSessions.sendAfter}
                  onValueChange={(value) => updateSetting(["missedSessions", "sendAfter"], value)}
                  disabled={!settings.enabled || !settings.missedSessions.enabled}
                >
                  <SelectTrigger id="missed-send-after">
                    <SelectValue placeholder="Selecione o tempo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutos</SelectItem>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="60">1 hora</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="missed-template">Template de mensagem:</Label>
                <Select
                  value={settings.missedSessions.template}
                  onValueChange={(value) => updateSetting(["missedSessions", "template"], value)}
                  disabled={!settings.enabled || !settings.missedSessions.enabled}
                >
                  <SelectTrigger id="missed-template">
                    <SelectValue placeholder="Selecione um template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="missed-session">Template padrão</SelectItem>
                    <SelectItem value="missed-session-formal">Template formal</SelectItem>
                    <SelectItem value="missed-session-friendly">Template amigável</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center">
            <Bell className="mr-2 h-5 w-5 text-primary" />
            <CardTitle>Sessões canceladas</CardTitle>
          </div>
          <CardDescription>Configure lembretes para quando uma sessão é cancelada.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="cancelled-sessions" className="text-base">
                Enviar notificação para sessões canceladas
              </Label>
              <p className="text-sm text-muted-foreground">
                Enviar automaticamente uma mensagem quando uma sessão for cancelada.
              </p>
            </div>
            <Switch
              id="cancelled-sessions"
              checked={settings.cancelledSessions.enabled}
              onCheckedChange={(checked) => updateSetting(["cancelledSessions", "enabled"], checked)}
              disabled={!settings.enabled}
            />
          </div>

          {settings.cancelledSessions.enabled && (
            <div className="space-y-2 pt-2">
              <Label htmlFor="cancelled-template">Template de mensagem:</Label>
              <Select
                value={settings.cancelledSessions.template}
                onValueChange={(value) => updateSetting(["cancelledSessions", "template"], value)}
                disabled={!settings.enabled || !settings.cancelledSessions.enabled}
              >
                <SelectTrigger id="cancelled-template">
                  <SelectValue placeholder="Selecione um template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cancelled-session">Template padrão</SelectItem>
                  <SelectItem value="cancelled-session-formal">Template formal</SelectItem>
                  <SelectItem value="cancelled-session-friendly">Template amigável</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={saveSettings} disabled={isLoading}>
          {isLoading ? "Salvando..." : "Salvar configurações"}
        </Button>
      </div>
    </div>
  )
}
