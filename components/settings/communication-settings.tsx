"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Save } from "lucide-react"

export function CommunicationSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("email")

  const handleSave = async () => {
    setIsLoading(true)

    // Simulação de salvamento das configurações
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Configurações salvas",
        description: "Suas configurações de comunicação foram salvas com sucesso.",
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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 gap-2">
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="sms">SMS</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Email</CardTitle>
              <CardDescription>Personalize como os emails são enviados aos clientes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-signature" className="font-medium">
                    Incluir assinatura
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Adicionar sua assinatura profissional ao final dos emails.
                  </p>
                </div>
                <Switch id="email-signature" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-signature-text">Assinatura de Email</Label>
                <Textarea
                  id="email-signature-text"
                  placeholder="Digite sua assinatura de email..."
                  defaultValue="João Silva, Psicólogo\nCRP: 00/00000\nTel: (11) 98765-4321\nwww.joaosilva.com.br"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reply-to">Email de resposta</Label>
                <Input id="reply-to" placeholder="seu.email@exemplo.com" defaultValue="contato@joaosilva.com.br" />
                <p className="text-xs text-muted-foreground">
                  Este é o email que os clientes verão para responder suas mensagens.
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-tracking" className="font-medium">
                    Rastreamento de abertura
                  </Label>
                  <p className="text-sm text-muted-foreground">Receba notificações quando seus emails forem abertos.</p>
                </div>
                <Switch id="email-tracking" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de SMS</CardTitle>
              <CardDescription>Personalize como as mensagens SMS são enviadas aos clientes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-enabled" className="font-medium">
                    Ativar SMS
                  </Label>
                  <p className="text-sm text-muted-foreground">Enviar comunicações via SMS para clientes.</p>
                </div>
                <Switch id="sms-enabled" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sender-name">Nome do remetente</Label>
                <Input id="sender-name" placeholder="Seu nome ou clínica" defaultValue="Dr. João Silva" />
                <p className="text-xs text-muted-foreground">
                  Este é o nome que aparecerá como remetente das mensagens SMS.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sms-character-limit">Limite de caracteres</Label>
                <Select defaultValue="160">
                  <SelectTrigger id="sms-character-limit">
                    <SelectValue placeholder="Selecione o limite" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="160">160 (SMS padrão)</SelectItem>
                    <SelectItem value="320">320 (SMS duplo)</SelectItem>
                    <SelectItem value="480">480 (SMS triplo)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Mensagens maiores que o limite serão divididas em múltiplos SMS.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Templates de Comunicação</CardTitle>
              <CardDescription>Gerencie modelos de mensagens para diferentes situações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="template-type">Tipo de template</Label>
                <Select defaultValue="welcome">
                  <SelectTrigger id="template-type">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="welcome">Boas-vindas</SelectItem>
                    <SelectItem value="appointment">Confirmação de sessão</SelectItem>
                    <SelectItem value="reminder">Lembrete de sessão</SelectItem>
                    <SelectItem value="followup">Acompanhamento</SelectItem>
                    <SelectItem value="payment">Confirmação de pagamento</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="template-content">Conteúdo do template</Label>
                <Textarea
                  id="template-content"
                  placeholder="Digite o conteúdo do template..."
                  defaultValue="Olá {nome_cliente},\n\nSeja bem-vindo(a) à minha prática terapêutica. Estou feliz em tê-lo(a) como cliente e ansioso para trabalharmos juntos.\n\nAtenciosamente,\n{nome_terapeuta}"
                  className="min-h-[200px]"
                />
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Variáveis disponíveis:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium">
                    {"{nome_cliente}"}
                  </span>
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium">
                    {"{nome_terapeuta}"}
                  </span>
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium">
                    {"{data_sessao}"}
                  </span>
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium">
                    {"{hora_sessao}"}
                  </span>
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium">
                    {"{valor_sessao}"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? (
            "Salvando..."
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Salvar Configurações
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
