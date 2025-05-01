"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, MessageSquare, Send } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface SendReminderDialogProps {
  clientName: string
  paymentId: string
  amount: string
  dueDate: string
  children: React.ReactNode
}

export function SendReminderDialog({ clientName, paymentId, amount, dueDate, children }: SendReminderDialogProps) {
  const [selectedTemplate, setSelectedTemplate] = useState("lembrete-padrao")
  const [selectedChannel, setSelectedChannel] = useState("email")
  const [open, setOpen] = useState(false)
  const [isSending, setIsSending] = useState(false)

  // Templates de exemplo
  const templates = {
    "lembrete-padrao": {
      subject: "Lembrete de Pagamento",
      body: `Olá ${clientName},\n\nEste é um lembrete amigável de que você tem um pagamento de ${amount} com vencimento em ${dueDate}.\n\nObrigado por sua atenção.\n\nAtenciosamente,\nSeu Terapeuta`,
    },
    "vencimento-hoje": {
      subject: "Seu pagamento vence hoje",
      body: `Olá ${clientName},\n\nGostaríamos de lembrá-lo que seu pagamento de ${amount} vence hoje (${dueDate}).\n\nPor favor, efetue o pagamento para evitar atrasos.\n\nAtenciosamente,\nSeu Terapeuta`,
    },
    "pagamento-atrasado": {
      subject: "Pagamento em atraso",
      body: `Olá ${clientName},\n\nNotamos que seu pagamento de ${amount} com vencimento em ${dueDate} está em atraso.\n\nPor favor, entre em contato conosco para regularizar sua situação.\n\nAtenciosamente,\nSeu Terapeuta`,
    },
  }

  const [customMessage, setCustomMessage] = useState(templates["lembrete-padrao"].body)

  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value)
    setCustomMessage(templates[value as keyof typeof templates].body)
  }

  const handleSendReminder = async () => {
    setIsSending(true)

    // Simulação de envio
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSending(false)
    setOpen(false)

    // Aqui você adicionaria a lógica para enviar o lembrete
    console.log("Enviando lembrete:", {
      clientName,
      paymentId,
      amount,
      dueDate,
      template: selectedTemplate,
      channel: selectedChannel,
      message: customMessage,
    })
  }

  const handleInsertVariable = (variable: string) => {
    setCustomMessage((prevMessage) => prevMessage + ` {{${variable}}}`)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Enviar Lembrete de Pagamento</DialogTitle>
          <DialogDescription>
            Envie um lembrete para {clientName} sobre o pagamento {paymentId}.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="template" className="text-right">
              Template
            </Label>
            <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
              <SelectTrigger id="template" className="col-span-3">
                <SelectValue placeholder="Selecione um template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lembrete-padrao">Lembrete Padrão</SelectItem>
                <SelectItem value="vencimento-hoje">Vencimento Hoje</SelectItem>
                <SelectItem value="pagamento-atrasado">Pagamento Atrasado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="channel" className="text-right">
              Canal
            </Label>
            <div className="col-span-3">
              <Tabs defaultValue="email" value={selectedChannel} onValueChange={setSelectedChannel}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email">
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="sms">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    SMS
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="message" className="text-right pt-2">
              Mensagem
            </Label>
            <div className="col-span-3 space-y-2">
              {selectedChannel === "email" && (
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Assunto:</span>{" "}
                  {templates[selectedTemplate as keyof typeof templates].subject}
                </div>
              )}
              <Textarea
                id="message"
                rows={8}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
              />
              <div className="flex flex-wrap gap-1">
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-secondary"
                  onClick={() => handleInsertVariable("cliente")}
                >
                  {{ cliente }}
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-secondary"
                  onClick={() => handleInsertVariable("valor")}
                >
                  {{ valor }}
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-secondary"
                  onClick={() => handleInsertVariable("data_vencimento")}
                >
                  {{ data_vencimento }}
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-secondary"
                  onClick={() => handleInsertVariable("terapeuta")}
                >
                  {{ terapeuta }}
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-secondary"
                  onClick={() => handleInsertVariable("link_pagamento")}
                >
                  {{ link_pagamento }}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSendReminder} disabled={isSending}>
            {isSending ? (
              <>Enviando...</>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Enviar Lembrete
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
