"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Loader2, AlertCircle, MessageSquare, Mail, Phone } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WhatsAppPreview } from "./whatsapp-preview"

interface SendReminderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  session: any
}

// Dados simulados de templates
const mockTemplates = [
  {
    id: "1",
    name: "Lembrete de Sessão Padrão",
    type: "session-reminder",
    subject: "Lembrete: Sua sessão está agendada para amanhã",
    body: "Olá {{cliente}},\n\nEste é um lembrete de que você tem uma sessão agendada com {{terapeuta}} amanhã, {{data}} às {{hora}}.\n\nLocal: {{local}}\n\nPor favor, confirme sua presença ou entre em contato caso precise reagendar.\n\nPara confirmar sua presença, clique no link abaixo:\n{{link_confirmacao}}\n\nAtenciosamente,\n{{terapeuta}}",
    channels: ["email", "sms", "whatsapp"],
    isDefault: true,
  },
  {
    id: "2",
    name: "Lembrete Formal",
    type: "session-reminder",
    subject: "Confirmação de Agendamento",
    body: "Prezado(a) {{cliente}},\n\nGostaríamos de confirmar seu agendamento para {{data}} às {{hora}} com {{terapeuta}}.\n\nLocal: {{local}}\n\nPara confirmar sua presença, clique no link abaixo:\n{{link_confirmacao}}\n\nAtenciosamente,\n{{terapeuta}}",
    channels: ["email"],
    isDefault: false,
  },
  {
    id: "3",
    name: "Lembrete WhatsApp",
    type: "session-reminder",
    subject: "",
    body: "Olá {{cliente}}! 👋\n\nEste é um lembrete da sua sessão com {{terapeuta}} amanhã ({{data}}) às {{hora}}.\n\nLocal: {{local}}\n\nPor favor, confirme sua presença usando os botões abaixo.",
    channels: ["whatsapp"],
    isDefault: false,
  },
]

export function SendReminderDialog({ open, onOpenChange, session }: SendReminderDialogProps) {
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [customMessage, setCustomMessage] = useState("")
  const [includeConfirmation, setIncludeConfirmation] = useState(true)
  const [channels, setChannels] = useState<string[]>(["email"])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [clientPreferences, setClientPreferences] = useState<any>(null)
  const [isLoadingPreferences, setIsLoadingPreferences] = useState(false)
  const [activeTab, setActiveTab] = useState("email")

  useEffect(() => {
    if (open && session?.clientId) {
      fetchClientPreferences(session.clientId)
    }
  }, [open, session])

  useEffect(() => {
    // Quando o template muda, ajuste a visualização da aba para o canal principal do template
    if (selectedTemplate) {
      const template = mockTemplates.find((t) => t.id === selectedTemplate)
      if (template) {
        if (template.channels.includes("whatsapp")) {
          setActiveTab("whatsapp")
        } else if (template.channels.includes("email")) {
          setActiveTab("email")
        } else if (template.channels.includes("sms")) {
          setActiveTab("sms")
        }
      }
    }
  }, [selectedTemplate])

  const fetchClientPreferences = async (clientId: string) => {
    setIsLoadingPreferences(true)
    try {
      // Aqui seria a chamada para a API para buscar as preferências do cliente
      // Por enquanto, vamos apenas simular um atraso e usar dados mockados
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Dados simulados de preferências do cliente
      const preferences = {
        enabled: true,
        preferredChannel: "whatsapp", // Atualizado para WhatsApp
        reminderTimes: ["24h", "1h"],
        sessionReminders: true,
        preferredTemplate: "3", // ID do template de WhatsApp
      }

      setClientPreferences(preferences)

      // Pré-selecionar o canal preferido do cliente
      if (preferences.preferredChannel) {
        setChannels([preferences.preferredChannel])
      }

      // Pré-selecionar o template preferido do cliente
      if (preferences.preferredTemplate) {
        setSelectedTemplate(preferences.preferredTemplate)
      }
    } catch (error) {
      console.error("Erro ao buscar preferências do cliente:", error)
    } finally {
      setIsLoadingPreferences(false)
    }
  }

  const handleChannelChange = (channel: string, checked: boolean) => {
    if (checked) {
      setChannels((prev) => [...prev, channel])
    } else {
      setChannels((prev) => prev.filter((c) => c !== channel))
    }
  }

  const handleSubmit = async () => {
    if (!selectedTemplate || channels.length === 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, selecione um template e pelo menos um canal de envio.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Aqui seria a chamada para a API para enviar o lembrete
      // Por enquanto, vamos apenas simular um atraso
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Lembrete enviado",
        description: `O lembrete foi enviado com sucesso para ${session.clientName}.`,
      })

      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Erro ao enviar lembrete",
        description: "Ocorreu um erro ao enviar o lembrete. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getTemplatePreview = () => {
    if (!selectedTemplate) return ""

    const template = mockTemplates.find((t) => t.id === selectedTemplate)
    if (!template) return ""

    let preview = template.body
      .replace(/{{cliente}}/g, session.clientName)
      .replace(/{{terapeuta}}/g, "Dr. Paulo Ribeiro")
      .replace(/{{data}}/g, "10/05/2025")
      .replace(/{{hora}}/g, "14:30")
      .replace(/{{local}}/g, session.location || "Consultório")
      .replace(/{{telefone}}/g, "(11) 98765-4321")

    if (includeConfirmation) {
      preview = preview.replace(/{{link_confirmacao}}/g, "https://bethera.app/confirm/abc123def456")
    } else {
      // Remove a linha inteira que contém o link de confirmação
      preview = preview.replace(/.*{{link_confirmacao}}.*\n?/g, "")
    }

    if (customMessage) {
      preview += "\n\n" + customMessage
    }

    return preview
  }

  const getSelectedTemplate = () => {
    return mockTemplates.find((t) => t.id === selectedTemplate)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Enviar Lembrete</DialogTitle>
          <DialogDescription>Envie um lembrete para {session?.clientName} sobre a sessão agendada.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {clientPreferences && !clientPreferences.enabled && (
            <Alert variant="warning">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Este cliente optou por não receber lembretes. Você ainda pode enviar este lembrete manualmente.
              </AlertDescription>
            </Alert>
          )}

          {clientPreferences && clientPreferences.enabled && !clientPreferences.sessionReminders && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Este cliente optou por não receber lembretes de sessão. Você ainda pode enviar este lembrete
                manualmente.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="template">Template</Label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger id="template">
                  <SelectValue placeholder="Selecione um template" />
                </SelectTrigger>
                <SelectContent>
                  {mockTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name} {clientPreferences?.preferredTemplate === template.id && "(Preferido)"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedTemplate && (
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-confirmation" className="cursor-pointer">
                    Incluir link/botões de confirmação
                  </Label>
                  <Checkbox
                    id="include-confirmation"
                    checked={includeConfirmation}
                    onCheckedChange={(checked) => setIncludeConfirmation(checked as boolean)}
                  />
                </div>
                {includeConfirmation && (
                  <p className="text-sm text-muted-foreground">
                    Um link único ou botões serão gerados para o cliente confirmar sua presença diretamente pelo
                    lembrete.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-message">Mensagem Adicional (opcional)</Label>
                <Textarea
                  id="custom-message"
                  placeholder="Digite uma mensagem adicional personalizada..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Canais</Label>
                <div className="flex items-start space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="channel-email"
                      checked={channels.includes("email")}
                      onCheckedChange={(checked) => handleChannelChange("email", checked as boolean)}
                    />
                    <Label htmlFor="channel-email">
                      Email {clientPreferences?.preferredChannel === "email" && "(Preferido)"}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="channel-sms"
                      checked={channels.includes("sms")}
                      onCheckedChange={(checked) => handleChannelChange("sms", checked as boolean)}
                    />
                    <Label htmlFor="channel-sms">
                      SMS {clientPreferences?.preferredChannel === "sms" && "(Preferido)"}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="channel-whatsapp"
                      checked={channels.includes("whatsapp")}
                      onCheckedChange={(checked) => handleChannelChange("whatsapp", checked as boolean)}
                    />
                    <Label htmlFor="channel-whatsapp">
                      WhatsApp {clientPreferences?.preferredChannel === "whatsapp" && "(Preferido)"}
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Prévia</Label>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="email" disabled={!channels.includes("email")}>
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </TabsTrigger>
                    <TabsTrigger value="sms" disabled={!channels.includes("sms")}>
                      <Phone className="h-4 w-4 mr-2" />
                      SMS
                    </TabsTrigger>
                    <TabsTrigger value="whatsapp" disabled={!channels.includes("whatsapp")}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      WhatsApp
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="email" className="border rounded-md p-4 bg-muted/30 whitespace-pre-line text-sm">
                    <p className="font-semibold mb-2">Assunto: {getSelectedTemplate()?.subject}</p>
                    {getTemplatePreview()}
                  </TabsContent>

                  <TabsContent value="sms" className="border rounded-md p-4 bg-muted/30 whitespace-pre-line text-sm">
                    {getTemplatePreview()}
                  </TabsContent>

                  <TabsContent value="whatsapp">
                    <WhatsAppPreview
                      clientName={session?.clientName || "Cliente"}
                      therapistName="Dr. Paulo Ribeiro"
                      date="10/05/2025"
                      time="14:30"
                      location={session?.location || "Consultório"}
                      message={getTemplatePreview()}
                      includeButtons={includeConfirmation}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || !selectedTemplate}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar Lembrete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
