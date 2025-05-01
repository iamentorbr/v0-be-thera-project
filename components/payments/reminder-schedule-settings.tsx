"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Clock, Mail, MessageSquare, Plus, Trash } from "lucide-react"

export function ReminderScheduleSettings() {
  const [emailEnabled, setEmailEnabled] = useState(true)
  const [smsEnabled, setSmsEnabled] = useState(false)
  const [reminderRules, setReminderRules] = useState([
    { id: 1, days: -3, template: "lembrete-previo", channel: "email" },
    { id: 2, days: 0, template: "vencimento-hoje", channel: "email" },
    { id: 3, days: 3, template: "pagamento-atrasado", channel: "email" },
    { id: 4, days: 7, template: "segundo-aviso", channel: "email" },
  ])

  const addRule = () => {
    const newId = Math.max(0, ...reminderRules.map((rule) => rule.id)) + 1
    setReminderRules([...reminderRules, { id: newId, days: 0, template: "lembrete-padrao", channel: "email" }])
  }

  const removeRule = (id: number) => {
    setReminderRules(reminderRules.filter((rule) => rule.id !== id))
  }

  const updateRule = (id: number, field: string, value: any) => {
    setReminderRules(reminderRules.map((rule) => (rule.id === id ? { ...rule, [field]: value } : rule)))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Canais de Comunicação</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <Label htmlFor="email-enabled" className="text-base">
                    Email
                  </Label>
                </div>
                <Switch id="email-enabled" checked={emailEnabled} onCheckedChange={setEmailEnabled} />
              </div>
              {emailEnabled && (
                <div className="mt-4">
                  <Label htmlFor="email-sender">Email do remetente</Label>
                  <Input
                    id="email-sender"
                    placeholder="seu-email@exemplo.com"
                    className="mt-1"
                    defaultValue="contato@bethera.com"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-muted-foreground" />
                  <Label htmlFor="sms-enabled" className="text-base">
                    SMS
                  </Label>
                </div>
                <Switch id="sms-enabled" checked={smsEnabled} onCheckedChange={setSmsEnabled} />
              </div>
              {smsEnabled && (
                <div className="mt-4">
                  <Label htmlFor="sms-sender">Nome do remetente</Label>
                  <Input id="sms-sender" placeholder="Seu Nome ou Empresa" className="mt-1" defaultValue="BeTHERA" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Regras de Envio</h3>
          <Button variant="outline" size="sm" onClick={addRule}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Regra
          </Button>
        </div>

        <div className="space-y-4">
          {reminderRules.map((rule) => (
            <Card key={rule.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label htmlFor={`rule-${rule.id}-days`}>Quando enviar</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Input
                          id={`rule-${rule.id}-days`}
                          type="number"
                          className="w-20"
                          value={rule.days}
                          onChange={(e) => updateRule(rule.id, "days", Number.parseInt(e.target.value))}
                        />
                        <span className="text-sm text-muted-foreground">
                          {rule.days < 0
                            ? `dias antes do vencimento`
                            : rule.days > 0
                              ? `dias após o vencimento`
                              : `no dia do vencimento`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button variant="ghost" size="icon" onClick={() => removeRule(rule.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid gap-4 mt-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor={`rule-${rule.id}-template`}>Template</Label>
                    <Select value={rule.template} onValueChange={(value) => updateRule(rule.id, "template", value)}>
                      <SelectTrigger id={`rule-${rule.id}-template`}>
                        <SelectValue placeholder="Selecione um template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lembrete-previo">Lembrete Prévio</SelectItem>
                        <SelectItem value="vencimento-hoje">Vencimento Hoje</SelectItem>
                        <SelectItem value="pagamento-atrasado">Pagamento Atrasado</SelectItem>
                        <SelectItem value="segundo-aviso">Segundo Aviso</SelectItem>
                        <SelectItem value="lembrete-padrao">Lembrete Padrão</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor={`rule-${rule.id}-channel`}>Canal</Label>
                    <Select value={rule.channel} onValueChange={(value) => updateRule(rule.id, "channel", value)}>
                      <SelectTrigger id={`rule-${rule.id}-channel`}>
                        <SelectValue placeholder="Selecione um canal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="sms" disabled={!smsEnabled}>
                          SMS
                        </SelectItem>
                        <SelectItem value="both" disabled={!smsEnabled}>
                          Email e SMS
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
