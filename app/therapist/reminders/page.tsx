"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ReminderSettings } from "@/components/reminders/reminder-settings"
import { ReminderTemplates } from "@/components/reminders/reminder-templates"
import { ReminderHistory } from "@/components/reminders/reminder-history"
import { Plus, Settings, History, MessageSquare } from "lucide-react"
import { CreateReminderTemplateDialog } from "@/components/reminders/create-reminder-template-dialog"

export default function RemindersPage() {
  const [createTemplateOpen, setCreateTemplateOpen] = useState(false)

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Lembretes</h2>
          <div className="flex items-center space-x-2">
            <Button onClick={() => setCreateTemplateOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Template
            </Button>
          </div>
        </div>

        <Tabs defaultValue="settings" className="space-y-4">
          <TabsList>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Configurações
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center">
              <MessageSquare className="mr-2 h-4 w-4" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center">
              <History className="mr-2 h-4 w-4" />
              Histórico
            </TabsTrigger>
          </TabsList>
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Lembretes</CardTitle>
                <CardDescription>
                  Configure quando e como os lembretes serão enviados para você e seus clientes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ReminderSettings />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <CardTitle>Templates de Lembretes</CardTitle>
                <CardDescription>
                  Gerencie os templates de mensagens para diferentes tipos de lembretes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ReminderTemplates />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Lembretes</CardTitle>
                <CardDescription>Visualize os lembretes enviados recentemente.</CardDescription>
              </CardHeader>
              <CardContent>
                <ReminderHistory />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <CreateReminderTemplateDialog open={createTemplateOpen} onOpenChange={setCreateTemplateOpen} />
    </div>
  )
}
