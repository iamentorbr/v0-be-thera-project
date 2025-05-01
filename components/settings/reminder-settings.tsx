"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function ReminderSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("schedule")

  const handleSave = async () => {
    setIsLoading(true)

    // Simulação de salvamento das configurações
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Configurações salvas",
        description: "Suas configurações de lembretes foram salvas com sucesso.",
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
          <TabsTrigger value="schedule">Agendamento</TabsTrigger>
          <TabsTrigger value="channels">Canais</TabsTrigger>
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agendamento de Lembretes</CardTitle>
              <CardDescription>Configure quando os lembretes serão enviados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enable-reminders" className="font-medium">
                    Ativar lembretes automáticos
                  </Label>
                  <p className="text-sm text-muted-foreground">Enviar lembretes automáticos para sessões agendadas.</p>
                </div>
                <Switch id="enable-reminders" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reminder-time">Tempo antes da sessão</Label>
                <Select defaultValue="24">
                  <SelectTrigger id="reminder-time">
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

              <div className="space-y-2">
                <Label htmlFor="reminder-frequency">Frequência</Label>
                <RadioGroup defaultValue="single" id="reminder-frequency">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="single" id="single" />
                    <Label htmlFor="single">Enviar um único lembrete</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="multiple" id="multiple" />
                    <Label htmlFor="multiple">Enviar múltiplos lembretes</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional-times">Tempos adicionais (para múltiplos lembretes)</Label>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="time-48h" />
                    <Label htmlFor="time-48h">48 horas antes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="time-24h" defaultChecked />
                    <Label htmlFor="time-24h">24 horas antes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="time-2h" />
                    <Label htmlFor="time-2h">2 horas antes</Label>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="require-confirmation" className="font-medium">
                    Exigir confirmação
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Solicitar que o cliente confirme a presença na sessão.
                  </p>
                </div>
                <Switch id="require-confirmation" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Canais de Comunicação</CardTitle>
              <CardDescription>Escolha como os lembretes serão enviados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Canais de envio</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch id="channel-email" defaultChecked />
                      <Label htmlFor="channel-email">Email</Label>
                    </div>
                    <Select defaultValue="primary">
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Prioridade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="primary">Primário</SelectItem>
                        <SelectItem value="secondary">Secundário</SelectItem>
                        <SelectItem value="tertiary">Terciário</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch id="channel-sms" defaultChecked />
                      <Label htmlFor="channel-sms">SMS</Label>
                    </div>
                    <Select defaultValue="secondary">
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Prioridade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="primary">Primário</SelectItem>
                        <SelectItem value="secondary">Secundário</SelectItem>
                        <SelectItem value="tertiary">Terciário</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch id="channel-whatsapp" defaultChecked />
                      <Label htmlFor="channel-whatsapp">WhatsApp</Label>
                    </div>
                    <Select defaultValue="tertiary">
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Prioridade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="primary">Primário</SelectItem>
                        <SelectItem value="secondary">Secundário</SelectItem>
                        <SelectItem value="tertiary">Terciário</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="respect-preferences" className="font-medium">
                    Respeitar preferências do cliente
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Usar apenas os canais preferidos definidos pelo cliente.
                  </p>
                </div>
                <Switch id="respect-preferences" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="fallback-channels" className="font-medium">
                    Usar canais alternativos
                  </Label>
                  <p className="text-sm text-muted-foreground">Tentar canais alternativos se o principal falhar.</p>
                </div>
                <Switch id="fallback-channels" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conteúdo dos Lembretes</CardTitle>
              <CardDescription>Personalize o texto dos lembretes enviados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reminder-template">Template de lembrete</Label>
                <Textarea
                  id="reminder-template"
                  placeholder="Digite o template do lembrete..."
                  defaultValue="Olá {nome_cliente},\n\nEste é um lembrete para sua sessão agendada para {data_sessao} às {hora_sessao}.\n\nPor favor, confirme sua presença respondendo a esta mensagem.\n\nAtenciosamente,\n{nome_terapeuta}"
                  className="min-h-[200px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmation-template">Template de confirmação</Label>
                <Textarea
                  id="confirmation-template"
                  placeholder="Digite o template de confirmação..."
                  defaultValue="Olá {nome_cliente},\n\nObrigado por confirmar sua sessão para {data_sessao} às {hora_sessao}.\n\nEstou ansioso para nosso encontro.\n\nAtenciosamente,\n{nome_terapeuta}"
                  className="min-h-[150px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cancellation-template">Template de cancelamento</Label>
                <Textarea
                  id="cancellation-template"
                  placeholder="Digite o template de cancelamento..."
                  defaultValue="Olá {nome_cliente},\n\nEntendemos que você não poderá comparecer à sessão agendada para {data_sessao} às {hora_sessao}.\n\nPor favor, entre em contato para reagendarmos.\n\nAtenciosamente,\n{nome_terapeuta}"
                  className="min-h-[150px]"
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
                    {"{local_sessao}"}
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
