"use client"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, MessageSquare, Calendar, Clock, User } from "lucide-react"

interface ViewReminderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  reminder: any
}

export function ViewReminderDialog({ open, onOpenChange, reminder }: ViewReminderDialogProps) {
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "session-reminder":
        return "Lembrete de Sessão"
      case "missed-session":
        return "Sessão Perdida"
      case "cancelled-session":
        return "Sessão Cancelada"
      default:
        return type
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "delivered":
        return "default"
      case "failed":
        return "destructive"
      case "pending":
        return "outline"
      default:
        return "default"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "delivered":
        return "Entregue"
      case "failed":
        return "Falhou"
      case "pending":
        return "Pendente"
      default:
        return status
    }
  }

  // Simular o conteúdo do lembrete com as variáveis substituídas
  const getRenderedContent = () => {
    if (!reminder) return ""

    // Aqui seria a lógica para substituir as variáveis pelos valores reais
    // Por enquanto, vamos apenas simular
    const content =
      reminder.type === "session-reminder"
        ? `Olá ${reminder.client.name},

Este é um lembrete amigável de que você tem uma sessão agendada para ${format(reminder.session.date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })} às ${reminder.session.time}.

Por favor, confirme sua presença respondendo a este email ou entrando em contato pelo telefone (11) 98765-4321.

Atenciosamente,
Dr. Paulo Ribeiro`
        : reminder.type === "missed-session"
          ? `Olá ${reminder.client.name},

Notamos que você não compareceu à sessão agendada para hoje, ${format(reminder.session.date, "dd 'de' MMMM", { locale: ptBR })} às ${reminder.session.time}.

Esperamos que esteja tudo bem. Por favor, entre em contato para reagendarmos sua sessão.

Atenciosamente,
Dr. Paulo Ribeiro`
          : `Olá ${reminder.client.name},

Este email confirma o cancelamento da sua sessão que estava agendada para ${format(reminder.session.date, "dd 'de' MMMM", { locale: ptBR })} às ${reminder.session.time}.

Caso deseje reagendar, por favor entre em contato conosco.

Atenciosamente,
Dr. Paulo Ribeiro`

    return content
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalhes do Lembrete</DialogTitle>
          <DialogDescription>Informações sobre o lembrete enviado para {reminder?.client.name}.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{reminder?.client.name}</span>
            </div>
            <Badge variant={getStatusVariant(reminder?.status)}>{getStatusLabel(reminder?.status)}</Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Tipo de Lembrete</div>
              <div>{getTypeLabel(reminder?.type)}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Template</div>
              <div>{reminder?.template}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Canal</div>
              <div className="flex items-center">
                {reminder?.channel === "email" ? (
                  <Mail className="mr-1 h-4 w-4" />
                ) : (
                  <MessageSquare className="mr-1 h-4 w-4" />
                )}
                {reminder?.channel === "email" ? "Email" : "SMS"}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Enviado em</div>
              <div>{format(reminder?.sentAt, "dd/MM/yyyy HH:mm", { locale: ptBR })}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Sessão</div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                {format(reminder?.session.date, "dd/MM/yyyy", { locale: ptBR })}
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                {reminder?.session.time}
              </div>
            </div>
          </div>

          {reminder?.channel === "email" && (
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Assunto</div>
              <div className="font-medium">
                {reminder?.type === "session-reminder"
                  ? `Lembrete: Sua sessão está agendada para ${format(reminder?.session.date, "dd/MM", {
                      locale: ptBR,
                    })}`
                  : reminder?.type === "missed-session"
                    ? "Sobre sua sessão de hoje"
                    : `Cancelamento de Sessão - ${format(reminder?.session.date, "dd/MM", { locale: ptBR })}`}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Conteúdo</div>
            <div className="whitespace-pre-line rounded-md border p-4 text-sm">{getRenderedContent()}</div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
          {reminder?.status === "failed" && <Button>Reenviar</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
