"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

export function ReminderSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    enableSessionReminders: true,
    enableMissedSessionReminders: true,
    enableCancelledSessionReminders: true,
    clientReminderTimes: ["24h", "1h"],
    therapistReminderTimes: ["24h"],
    defaultClientChannel: "email",
    defaultTherapistChannel: "email",
  })

  const handleSwitchChange = (key: string) => (checked: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: checked }))
  }

  const handleSelectChange = (key: string) => (value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleMultiSelectChange = (key: string, value: string) => {
    setSettings((prev) => {
      const currentValues = prev[key as keyof typeof prev] as string[]
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [key]: currentValues.filter((v) => v !== value),
        }
      } else {
        return {
          ...prev,
          [key]: [...currentValues, value],
        }
      }
    })
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Aqui seria a chamada para a API para salvar as configurações
      // Por enquanto, vamos apenas simular um atraso
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Configurações salvas",
        description: "Suas configurações de lembretes foram salvas com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar suas configurações. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Tipos de Lembretes</h3>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enable-session-reminders" className="font-medium">
                Lembretes de Sessão
              </Label>
              <p className="text-sm text-muted-foreground">Enviar lembretes automáticos para sessões agendadas.</p>
            </div>
            <Switch
              id="enable-session-reminders"
              checked={settings.enableSessionReminders}
              onCheckedChange={handleSwitchChange("enableSessionReminders")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enable-missed-session-reminders" className="font-medium">
                Lembretes de Sessões Perdidas
              </Label>
              <p className="text-sm text-muted-foreground">
                Enviar notificações automáticas quando um cliente não comparecer a uma sessão.
              </p>
            </div>
            <Switch
              id="enable-missed-session-reminders"
              checked={settings.enableMissedSessionReminders}
              onCheckedChange={handleSwitchChange("enableMissedSessionReminders")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enable-cancelled-session-reminders" className="font-medium">
                Lembretes de Sessões Canceladas
              </Label>
              <p className="text-sm text-muted-foreground">
                Enviar notificações automáticas quando uma sessão for cancelada.
              </p>
            </div>
            <Switch
              id="enable-cancelled-session-reminders"
              checked={settings.enableCancelledSessionReminders}
              onCheckedChange={handleSwitchChange("enableCancelledSessionReminders")}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Configurações para Clientes</h3>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="client-reminder-times" className="font-medium">
              Quando enviar lembretes
            </Label>
            <p className="text-sm text-muted-foreground mb-2">
              Selecione quando os lembretes devem ser enviados aos clientes antes da sessão.
            </p>
            <div className="flex flex-wrap gap-2">
              {["24h", "12h", "3h", "1h", "30min"].map((time) => (
                <Button
                  key={time}
                  type="button"
                  variant={settings.clientReminderTimes.includes(time) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleMultiSelectChange("clientReminderTimes", time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="default-client-channel" className="font-medium">
              Canal de comunicação padrão
            </Label>
            <p className="text-sm text-muted-foreground mb-2">
              Selecione o canal de comunicação padrão para enviar lembretes aos clientes.
            </p>
            <Select value={settings.defaultClientChannel} onValueChange={handleSelectChange("defaultClientChannel")}>
              <SelectTrigger id="default-client-channel" className="w-full sm:w-[240px]">
                <SelectValue placeholder="Selecione um canal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="both">Ambos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Configurações para Terapeuta</h3>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="therapist-reminder-times" className="font-medium">
              Quando receber lembretes
            </Label>
            <p className="text-sm text-muted-foreground mb-2">
              Selecione quando você deseja receber lembretes sobre suas sessões agendadas.
            </p>
            <div className="flex flex-wrap gap-2">
              {["24h", "12h", "3h", "1h", "30min"].map((time) => (
                <Button
                  key={time}
                  type="button"
                  variant={settings.therapistReminderTimes.includes(time) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleMultiSelectChange("therapistReminderTimes", time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="default-therapist-channel" className="font-medium">
              Canal de comunicação preferido
            </Label>
            <p className="text-sm text-muted-foreground mb-2">Selecione como você prefere receber seus lembretes.</p>
            <Select
              value={settings.defaultTherapistChannel}
              onValueChange={handleSelectChange("defaultTherapistChannel")}
            >
              <SelectTrigger id="default-therapist-channel" className="w-full sm:w-[240px]">
                <SelectValue placeholder="Selecione um canal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="both">Ambos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Salvando..." : "Salvar Configurações"}
        </Button>
      </div>
    </div>
  )
}
