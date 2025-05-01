"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ReminderTemplateForm } from "@/components/payments/reminder-template-form"
import { ReminderHistoryTable } from "@/components/payments/reminder-history-table"
import { ReminderScheduleSettings } from "@/components/payments/reminder-schedule-settings"

export default function RemindersPage() {
  const [autoRemindersEnabled, setAutoRemindersEnabled] = useState(true)

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Lembretes de Pagamento</h2>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Switch id="auto-reminders" checked={autoRemindersEnabled} onCheckedChange={setAutoRemindersEnabled} />
              <Label htmlFor="auto-reminders">Lembretes automáticos</Label>
            </div>
            <Button>Salvar configurações</Button>
          </div>
        </div>

        <Tabs defaultValue="settings" className="space-y-4">
          <TabsList>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Lembretes Automáticos</CardTitle>
                <CardDescription>
                  Configure quando e como os lembretes automáticos serão enviados para seus clientes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ReminderScheduleSettings />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Templates de Mensagens</CardTitle>
                <CardDescription>Crie e gerencie templates para seus lembretes de pagamento.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ReminderTemplateForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Lembretes</CardTitle>
                <CardDescription>Visualize todos os lembretes enviados aos seus clientes.</CardDescription>
              </CardHeader>
              <CardContent>
                <ReminderHistoryTable />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
