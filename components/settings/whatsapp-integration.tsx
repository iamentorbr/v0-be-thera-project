"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, QrCode, RefreshCw, Save, Smartphone } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function WhatsAppIntegration() {
  const [isLoading, setIsLoading] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isQrCodeVisible, setIsQrCodeVisible] = useState(false)
  const [settings, setSettings] = useState({
    enabled: false,
    phoneNumber: "",
    businessName: "",
    welcomeMessage:
      "Olá! Este é o sistema de confirmação de sessões da BeTHERA. Responda com 'SIM' para confirmar ou 'NÃO' para recusar.",
    confirmationMessage: "Obrigado por confirmar sua sessão. Estamos ansiosos para vê-lo(a)!",
    cancellationMessage: "Entendemos que você não poderá comparecer. Entraremos em contato para reagendar.",
    includeConfirmationButtons: true,
    sendReminders: true,
    sendReceipts: false,
    notifyOnConfirmation: true,
  })

  const handleSwitchChange = (key: string) => (checked: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: checked }))
  }

  const handleInputChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings((prev) => ({ ...prev, [key]: e.target.value }))
  }

  const handleConnect = async () => {
    setIsLoading(true)
    setIsQrCodeVisible(true)

    // Simulação de conexão com WhatsApp
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsConnected(true)
      toast({
        title: "WhatsApp conectado",
        description: "Sua conta do WhatsApp foi conectada com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro na conexão",
        description: "Não foi possível conectar ao WhatsApp. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setIsQrCodeVisible(false)
    }
  }

  const handleDisconnect = async () => {
    setIsLoading(true)

    // Simulação de desconexão
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsConnected(false)
      toast({
        title: "WhatsApp desconectado",
        description: "Sua conta do WhatsApp foi desconectada com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro na desconexão",
        description: "Não foi possível desconectar do WhatsApp. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setIsLoading(true)

    // Simulação de salvamento das configurações
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Configurações salvas",
        description: "Suas configurações de WhatsApp foram salvas com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as configurações. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Integração com WhatsApp</CardTitle>
          <CardDescription>
            Configure a integração com WhatsApp para permitir que seus clientes confirmem sessões diretamente pelo
            aplicativo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enable-whatsapp" className="font-medium">
                Ativar WhatsApp
              </Label>
              <p className="text-sm text-muted-foreground">
                Ative a integração com WhatsApp para enviar e receber mensagens.
              </p>
            </div>
            <Switch id="enable-whatsapp" checked={settings.enabled} onCheckedChange={handleSwitchChange("enabled")} />
          </div>

          {settings.enabled && (
            <>
              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Status da Conexão</h3>

                {isConnected ? (
                  <Alert className="bg-green-50 border-green-200">
                    <Smartphone className="h-4 w-4 text-green-600" />
                    <AlertTitle className="text-green-600">WhatsApp Conectado</AlertTitle>
                    <AlertDescription className="text-green-600">
                      Seu WhatsApp está conectado e pronto para enviar e receber mensagens.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert>
                    <Smartphone className="h-4 w-4" />
                    <AlertTitle>WhatsApp Desconectado</AlertTitle>
                    <AlertDescription>Conecte seu WhatsApp para começar a enviar e receber mensagens.</AlertDescription>
                  </Alert>
                )}

                <div className="flex space-x-2">
                  {!isConnected ? (
                    <Button onClick={handleConnect} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Conectando...
                        </>
                      ) : (
                        <>
                          <QrCode className="mr-2 h-4 w-4" />
                          Conectar WhatsApp
                        </>
                      )}
                    </Button>
                  ) : (
                    <>
                      <Button onClick={handleDisconnect} variant="outline" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Desconectando...
                          </>
                        ) : (
                          "Desconectar"
                        )}
                      </Button>
                      <Button onClick={handleConnect} variant="outline" disabled={isLoading}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Reconectar
                      </Button>
                    </>
                  )}
                </div>

                {isQrCodeVisible && (
                  <div className="flex flex-col items-center space-y-4 p-4 border rounded-md">
                    <p className="text-sm text-center">
                      Escaneie o QR code abaixo com seu WhatsApp para conectar sua conta.
                    </p>
                    <div className="w-64 h-64 bg-gray-100 flex items-center justify-center">
                      <img
                        src="/placeholder.svg?key=rumfg"
                        alt="QR Code para conexão do WhatsApp"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Este QR code expirará em 60 segundos. Clique em "Reconectar" se expirar.
                    </p>
                  </div>
                )}
              </div>

              <Separator />

              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="general">Geral</TabsTrigger>
                  <TabsTrigger value="messages">Mensagens</TabsTrigger>
                  <TabsTrigger value="notifications">Notificações</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone-number">Número de Telefone</Label>
                      <Input
                        id="phone-number"
                        placeholder="+55 (11) 98765-4321"
                        value={settings.phoneNumber}
                        onChange={handleInputChange("phoneNumber")}
                      />
                      <p className="text-xs text-muted-foreground">
                        Este é o número que será usado para enviar mensagens aos clientes.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="business-name">Nome do Negócio</Label>
                      <Input id="business-name" placeholder="Consultório de Psicologia" value={settings.businessName} />
                      <p className="text-xs text-muted-foreground">
                        Este é o nome que será exibido para seus clientes no WhatsApp.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="messages" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="welcome-message">Mensagem de Boas-Vindas</Label>
                      <Input
                        id="welcome-message"
                        placeholder="Olá! Este é o sistema de confirmação de sessões da BeTHERA..."
                        value={settings.welcomeMessage}
                        onChange={handleInputChange("welcomeMessage")}
                      />
                      <p className="text-xs text-muted-foreground">
                        Esta mensagem será enviada quando um cliente iniciar uma conversa com você.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmation-message">Mensagem de Confirmação</Label>
                      <Input
                        id="confirmation-message"
                        placeholder="Obrigado por confirmar sua sessão..."
                        value={settings.confirmationMessage}
                        onChange={handleInputChange("confirmationMessage")}
                      />
                      <p className="text-xs text-muted-foreground">
                        Esta mensagem será enviada quando um cliente confirmar uma sessão.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cancellation-message">Mensagem de Cancelamento</Label>
                      <Input
                        id="cancellation-message"
                        placeholder="Entendemos que você não poderá comparecer..."
                        value={settings.cancellationMessage}
                        onChange={handleInputChange("cancellationMessage")}
                      />
                      <p className="text-xs text-muted-foreground">
                        Esta mensagem será enviada quando um cliente cancelar uma sessão.
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Label htmlFor="include-confirmation-buttons">Incluir Botões de Confirmação</Label>
                      <Switch
                        id="include-confirmation-buttons"
                        checked={settings.includeConfirmationButtons}
                        onCheckedChange={handleSwitchChange("includeConfirmationButtons")}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="send-reminders">Enviar Lembretes</Label>
                      <Switch
                        id="send-reminders"
                        checked={settings.sendReminders}
                        onCheckedChange={handleSwitchChange("sendReminders")}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Label htmlFor="send-receipts">Enviar Recibos</Label>
                      <Switch
                        id="send-receipts"
                        checked={settings.sendReceipts}
                        onCheckedChange={handleSwitchChange("sendReceipts")}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Label htmlFor="notify-on-confirmation">Notificar na Confirmação</Label>
                      <Switch
                        id="notify-on-confirmation"
                        checked={settings.notifyOnConfirmation}
                        onCheckedChange={handleSwitchChange("notifyOnConfirmation")}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <Separator />

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Configurações
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
