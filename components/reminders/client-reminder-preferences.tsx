"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Save } from "lucide-react"

interface ClientReminderPreferencesProps {
  clientId: string
  clientName: string
}

export function ClientReminderPreferences({ clientId, clientName }: ClientReminderPreferencesProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [preferences, setPreferences] = useState({
    enabled: true,
    overrideGlobalSettings: true,
    preferredChannel: "email",
    reminderTimes: ["24h", "1h"],
    sessionReminders: true,
    exerciseReminders: true,
    paymentReminders: true,
    contentReminders: true,
    preferredTemplate: "default",
    customMessage: "",
    weekdayPreferences: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
    },
    timePreferences: {
      morning: true,
      afternoon: true,
      evening: true,
    },
  })

  const handleSwitchChange = (key: string) => (checked: boolean) => {
    setPreferences((prev) => ({ ...prev, [key]: checked }))
  }

  const handleNestedSwitchChange = (parent: string, key: string) => (checked: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev],
        [key]: checked,
      },
    }))
  }

  const handleSelectChange = (key: string) => (value: string) => {
    setPreferences((prev) => ({ ...prev, [key]: value }))
  }

  const handleMultiSelectChange = (key: string, value: string) => {
    setPreferences((prev) => {
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
      // Aqui seria a chamada para a API para salvar as preferências
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Preferências salvas",
        description: `As preferências de lembretes para ${clientName} foram salvas com sucesso.`,
      })
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar as preferências. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Preferências de Lembretes</CardTitle>
        <CardDescription>Configure como e quando os lembretes serão enviados para {clientName}.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enable-reminders" className="font-medium">
                Ativar Lembretes
              </Label>
              <p className="text-sm text-muted-foreground">Ative ou desative todos os lembretes para este cliente.</p>
            </div>
            <Switch
              id="enable-reminders"
              checked={preferences.enabled}
              onCheckedChange={handleSwitchChange("enabled")}
            />
          </div>

          {preferences.enabled && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="override-global" className="font-medium">
                    Substituir Configurações Globais
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Use configurações personalizadas em vez das configurações globais de lembretes.
                  </p>
                </div>
                <Switch
                  id="override-global"
                  checked={preferences.overrideGlobalSettings}
                  onCheckedChange={handleSwitchChange("overrideGlobalSettings")}
                />
              </div>

              {preferences.overrideGlobalSettings && (
                <Tabs defaultValue="channels" className="w-full">
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="channels">Canais</TabsTrigger>
                    <TabsTrigger value="timing">Horários</TabsTrigger>
                    <TabsTrigger value="types">Tipos</TabsTrigger>
                    <TabsTrigger value="templates">Templates</TabsTrigger>
                  </TabsList>

                  <TabsContent value="channels" className="space-y-4">
                    <div>
                      <Label htmlFor="preferred-channel" className="font-medium">
                        Canal de Comunicação Preferido
                      </Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        Selecione o canal preferido para enviar lembretes para este cliente.
                      </p>
                      <Select
                        value={preferences.preferredChannel}
                        onValueChange={handleSelectChange("preferredChannel")}
                      >
                        <SelectTrigger id="preferred-channel" className="w-full sm:w-[240px]">
                          <SelectValue placeholder="Selecione um canal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="sms">SMS</SelectItem>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                          <SelectItem value="all">Todos os canais</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>

                  <TabsContent value="timing" className="space-y-4">
                    <div>
                      <Label className="font-medium">Quando Enviar Lembretes</Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        Selecione quando os lembretes devem ser enviados antes da sessão.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {["24h", "12h", "6h", "3h", "1h", "30min"].map((time) => (
                          <Button
                            key={time}
                            type="button"
                            variant={preferences.reminderTimes.includes(time) ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleMultiSelectChange("reminderTimes", time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div>
                      <Label className="font-medium">Dias da Semana Preferidos</Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        Selecione em quais dias da semana o cliente prefere receber lembretes.
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                        {[
                          { key: "monday", label: "Segunda" },
                          { key: "tuesday", label: "Terça" },
                          { key: "wednesday", label: "Quarta" },
                          { key: "thursday", label: "Quinta" },
                          { key: "friday", label: "Sexta" },
                          { key: "saturday", label: "Sábado" },
                          { key: "sunday", label: "Domingo" },
                        ].map((day) => (
                          <div key={day.key} className="flex items-center space-x-2">
                            <Switch
                              id={`day-${day.key}`}
                              checked={
                                preferences.weekdayPreferences[day.key as keyof typeof preferences.weekdayPreferences]
                              }
                              onCheckedChange={handleNestedSwitchChange("weekdayPreferences", day.key)}
                            />
                            <Label htmlFor={`day-${day.key}`}>{day.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div>
                      <Label className="font-medium">Horários Preferidos</Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        Selecione em quais períodos do dia o cliente prefere receber lembretes.
                      </p>
                      <div className="grid grid-cols-3 gap-3 mt-2">
                        {[
                          { key: "morning", label: "Manhã (6h-12h)" },
                          { key: "afternoon", label: "Tarde (12h-18h)" },
                          { key: "evening", label: "Noite (18h-22h)" },
                        ].map((time) => (
                          <div key={time.key} className="flex items-center space-x-2">
                            <Switch
                              id={`time-${time.key}`}
                              checked={
                                preferences.timePreferences[time.key as keyof typeof preferences.timePreferences]
                              }
                              onCheckedChange={handleNestedSwitchChange("timePreferences", time.key)}
                            />
                            <Label htmlFor={`time-${time.key}`}>{time.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="types" className="space-y-4">
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="session-reminders" className="font-medium">
                            Lembretes de Sessão
                          </Label>
                          <p className="text-sm text-muted-foreground">Enviar lembretes para sessões agendadas.</p>
                        </div>
                        <Switch
                          id="session-reminders"
                          checked={preferences.sessionReminders}
                          onCheckedChange={handleSwitchChange("sessionReminders")}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="exercise-reminders" className="font-medium">
                            Lembretes de Exercícios
                          </Label>
                          <p className="text-sm text-muted-foreground">Enviar lembretes sobre exercícios atribuídos.</p>
                        </div>
                        <Switch
                          id="exercise-reminders"
                          checked={preferences.exerciseReminders}
                          onCheckedChange={handleSwitchChange("exerciseReminders")}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="payment-reminders" className="font-medium">
                            Lembretes de Pagamento
                          </Label>
                          <p className="text-sm text-muted-foreground">Enviar lembretes sobre pagamentos pendentes.</p>
                        </div>
                        <Switch
                          id="payment-reminders"
                          checked={preferences.paymentReminders}
                          onCheckedChange={handleSwitchChange("paymentReminders")}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="content-reminders" className="font-medium">
                            Lembretes de Conteúdo
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Enviar lembretes sobre novo conteúdo compartilhado.
                          </p>
                        </div>
                        <Switch
                          id="content-reminders"
                          checked={preferences.contentReminders}
                          onCheckedChange={handleSwitchChange("contentReminders")}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="templates" className="space-y-4">
                    <div>
                      <Label htmlFor="preferred-template" className="font-medium">
                        Template Preferido
                      </Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        Selecione o template de mensagem preferido para este cliente.
                      </p>
                      <Select
                        value={preferences.preferredTemplate}
                        onValueChange={handleSelectChange("preferredTemplate")}
                      >
                        <SelectTrigger id="preferred-template" className="w-full">
                          <SelectValue placeholder="Selecione um template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Template Padrão</SelectItem>
                          <SelectItem value="formal">Template Formal</SelectItem>
                          <SelectItem value="casual">Template Casual</SelectItem>
                          <SelectItem value="minimal">Template Minimalista</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Salvar Preferências
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
