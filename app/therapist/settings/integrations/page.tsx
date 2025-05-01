"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { WhatsAppIntegration } from "@/components/settings/whatsapp-integration"
import { CalendarIntegration } from "@/components/settings/calendar-integration"

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState("whatsapp")

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Integrações</h1>
        <p className="text-muted-foreground">Configure integrações com serviços externos</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 gap-2">
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="calendar">Calendário</TabsTrigger>
        </TabsList>

        <TabsContent value="whatsapp">
          <WhatsAppIntegration />
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Integração com Calendário</CardTitle>
              <CardDescription>Configure a integração com serviços de calendário externos.</CardDescription>
            </CardHeader>
            <CardContent>
              <CalendarIntegration />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
