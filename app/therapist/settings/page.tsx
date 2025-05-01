"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { AccountSettings } from "@/components/settings/account-settings"
import { PaymentSettings } from "@/components/settings/payment-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { SchedulingSettings } from "@/components/settings/scheduling-settings"
import { PrivacySettings } from "@/components/settings/privacy-settings"
import { InterfaceSettings } from "@/components/settings/interface-settings"
import { SettingsNav } from "@/components/settings/settings-nav"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">Gerencie suas preferências e informações da conta</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:w-1/4">
          <SettingsNav />
        </div>

        <div className="md:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="hidden">
              <TabsTrigger value="profile">Perfil</TabsTrigger>
              <TabsTrigger value="account">Conta</TabsTrigger>
              <TabsTrigger value="payment">Pagamento</TabsTrigger>
              <TabsTrigger value="notifications">Notificações</TabsTrigger>
              <TabsTrigger value="scheduling">Agendamento</TabsTrigger>
              <TabsTrigger value="privacy">Privacidade</TabsTrigger>
              <TabsTrigger value="interface">Interface</TabsTrigger>
              <TabsTrigger value="integrations">Integrações</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Perfil Profissional</CardTitle>
                  <CardDescription>Gerencie suas informações pessoais e profissionais</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfileSettings />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações da Conta</CardTitle>
                  <CardDescription>Gerencie suas credenciais e segurança da conta</CardDescription>
                </CardHeader>
                <CardContent>
                  <AccountSettings />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações de Pagamento</CardTitle>
                  <CardDescription>Gerencie seus métodos de recebimento e dados bancários</CardDescription>
                </CardHeader>
                <CardContent>
                  <PaymentSettings />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações de Notificações</CardTitle>
                  <CardDescription>Personalize como e quando você recebe notificações</CardDescription>
                </CardHeader>
                <CardContent>
                  <NotificationSettings />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scheduling">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações de Agendamento</CardTitle>
                  <CardDescription>Defina sua disponibilidade e preferências de agendamento</CardDescription>
                </CardHeader>
                <CardContent>
                  <SchedulingSettings />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações de Privacidade</CardTitle>
                  <CardDescription>Controle sua privacidade e compartilhamento de dados</CardDescription>
                </CardHeader>
                <CardContent>
                  <PrivacySettings />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="interface">
              <Card>
                <CardHeader>
                  <CardTitle>Personalização da Interface</CardTitle>
                  <CardDescription>Personalize a aparência e o comportamento da plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                  <InterfaceSettings />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integrations">
              <Card>
                <CardHeader>
                  <CardTitle>Integrações</CardTitle>
                  <CardDescription>Configure integrações com WhatsApp, calendário e outros serviços</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>Integrações content</div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
