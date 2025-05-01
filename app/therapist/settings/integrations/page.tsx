"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { WhatsAppIntegration } from "@/components/settings/whatsapp-integration"
import { CalendarIntegration } from "@/components/settings/calendar-integration"

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState("whatsapp")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integrações</CardTitle>
        <CardDescription>Configure integrações com serviços externos</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 gap-2">
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            <TabsTrigger value="calendar">Calendário</TabsTrigger>
          </TabsList>

          <TabsContent value="whatsapp">
            <WhatsAppIntegration />
          </TabsContent>

          <TabsContent value="calendar">
            <CalendarIntegration />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
