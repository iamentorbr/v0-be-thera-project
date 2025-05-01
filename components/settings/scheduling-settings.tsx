"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIntegration } from "./calendar-integration"

export function SchedulingSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("availability")
  const [availableDays, setAvailableDays] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
  })

  function saveSchedulingSettings() {
    setIsLoading(true)

    // Simulação de envio para API
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Configurações de agendamento atualizadas",
        description: "Suas preferências de agendamento foram salvas com sucesso.",
      })
    }, 1000)
  }

  function toggleDay(day: keyof typeof availableDays) {
    setAvailableDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }))
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <TabsTrigger value="availability">Disponibilidade</TabsTrigger>
          <TabsTrigger value="session">Configurações de Sessão</TabsTrigger>
          <TabsTrigger value="calendar">Integração de Calendário</TabsTrigger>
        </TabsList>

        <TabsContent value="availability">
          <Card>
            <CardHeader>
              <CardTitle>Horário de trabalho</CardTitle>
              <CardDescription>Configure seus dias e horários de disponibilidade</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium leading-none">Dias disponíveis</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="monday" checked={availableDays.monday} onCheckedChange={() => toggleDay("monday")} />
                    <Label htmlFor="monday">Segunda-feira</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tuesday"
                      checked={availableDays.tuesday}
                      onCheckedChange={() => toggleDay("tuesday")}
                    />
                    <Label htmlFor="tuesday">Terça-feira</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="wednesday"
                      checked={availableDays.wednesday}
                      onCheckedChange={() => toggleDay("wednesday")}
                    />
                    <Label htmlFor="wednesday">Quarta-feira</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="thursday"
                      checked={availableDays.thursday}
                      onCheckedChange={() => toggleDay("thursday")}
                    />
                    <Label htmlFor="thursday">Quinta-feira</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="friday" checked={availableDays.friday} onCheckedChange={() => toggleDay("friday")} />
                    <Label htmlFor="friday">Sexta-feira</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="saturday"
                      checked={availableDays.saturday}
                      onCheckedChange={() => toggleDay("saturday")}
                    />
                    <Label htmlFor="saturday">Sábado</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="sunday" checked={availableDays.sunday} onCheckedChange={() => toggleDay("sunday")} />
                    <Label htmlFor="sunday">Domingo</Label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium leading-none">Horário de início</h3>
                  <Select defaultValue="09:00">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o horário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="08:00">08:00</SelectItem>
                      <SelectItem value="09:00">09:00</SelectItem>
                      <SelectItem value="10:00">10:00</SelectItem>
                      <SelectItem value="11:00">11:00</SelectItem>
                      <SelectItem value="12:00">12:00</SelectItem>
                      <SelectItem value="13:00">13:00</SelectItem>
                      <SelectItem value="14:00">14:00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium leading-none">Horário de término</h3>
                  <Select defaultValue="18:00">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o horário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="16:00">16:00</SelectItem>
                      <SelectItem value="17:00">17:00</SelectItem>
                      <SelectItem value="18:00">18:00</SelectItem>
                      <SelectItem value="19:00">19:00</SelectItem>
                      <SelectItem value="20:00">20:00</SelectItem>
                      <SelectItem value="21:00">21:00</SelectItem>
                      <SelectItem value="22:00">22:00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={saveSchedulingSettings} disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar disponibilidade"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="session">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de sessão</CardTitle>
              <CardDescription>Configure as opções padrão para suas sessões</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium leading-none">Duração padrão da sessão</h3>
                  <Select defaultValue="60">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a duração" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="45">45 minutos</SelectItem>
                      <SelectItem value="60">1 hora</SelectItem>
                      <SelectItem value="90">1 hora e 30 minutos</SelectItem>
                      <SelectItem value="120">2 horas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium leading-none">Intervalo entre sessões</h3>
                  <Select defaultValue="15">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o intervalo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Sem intervalo</SelectItem>
                      <SelectItem value="5">5 minutos</SelectItem>
                      <SelectItem value="10">10 minutos</SelectItem>
                      <SelectItem value="15">15 minutos</SelectItem>
                      <SelectItem value="30">30 minutos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium leading-none">Valor padrão da sessão</h3>
                <div className="flex">
                  <div className="flex items-center border rounded-l-md px-3 bg-muted">
                    <span>R$</span>
                  </div>
                  <Input type="number" className="rounded-l-none" defaultValue="150" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label
                    htmlFor="buffer-time"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Permitir agendamento no mesmo dia
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Permitir que clientes agendem sessões para o mesmo dia.
                  </p>
                </div>
                <Switch id="buffer-time" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label
                    htmlFor="advance-booking"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Limite de agendamento antecipado
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Limitar quanto tempo no futuro os clientes podem agendar.
                  </p>
                </div>
                <Select defaultValue="60">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecione o limite" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 dias</SelectItem>
                    <SelectItem value="60">60 dias</SelectItem>
                    <SelectItem value="90">90 dias</SelectItem>
                    <SelectItem value="180">6 meses</SelectItem>
                    <SelectItem value="365">1 ano</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={saveSchedulingSettings} disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar configurações de sessão"}
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Lembretes e confirmações</CardTitle>
              <CardDescription>Configure lembretes automáticos para sessões</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label
                    htmlFor="client-reminders"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Enviar lembretes para clientes
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Enviar lembretes automáticos para clientes antes das sessões.
                  </p>
                </div>
                <Switch id="client-reminders" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label
                    htmlFor="therapist-reminders"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Receber lembretes de sessão
                  </label>
                  <p className="text-sm text-muted-foreground">Receber lembretes automáticos antes das suas sessões.</p>
                </div>
                <Switch id="therapist-reminders" defaultChecked />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium leading-none">Tempo de antecedência para lembretes</h3>
                <Select defaultValue="24">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tempo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hora antes</SelectItem>
                    <SelectItem value="2">2 horas antes</SelectItem>
                    <SelectItem value="12">12 horas antes</SelectItem>
                    <SelectItem value="24">24 horas antes</SelectItem>
                    <SelectItem value="48">48 horas antes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label
                    htmlFor="confirmation-required"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Exigir confirmação do cliente
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Exigir que clientes confirmem a presença antes da sessão.
                  </p>
                </div>
                <Switch id="confirmation-required" />
              </div>
              <Button onClick={saveSchedulingSettings} disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar configurações de lembretes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <CalendarIntegration />
        </TabsContent>
      </Tabs>
    </div>
  )
}
