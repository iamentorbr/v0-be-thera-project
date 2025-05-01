"use client"

import { useState } from "react"
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
import { Calendar, Clock, MapPin, User, FileText, Send } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { SessionConfirmationStatus } from "@/components/scheduling/session-confirmation-status"
import { SendReminderDialog } from "@/components/reminders/send-reminder-dialog"

interface ViewSessionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  session: any
}

export function ViewSessionDialog({ open, onOpenChange, session }: ViewSessionDialogProps) {
  const [sendReminderOpen, setSendReminderOpen] = useState(false)

  if (!session) return null

  const formatSessionDate = (date: Date) => {
    return format(date, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })
  }

  const formatSessionTime = (date: Date) => {
    return format(date, "HH:mm", { locale: ptBR })
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Detalhes da Sessão</DialogTitle>
            <DialogDescription>Informações completas sobre a sessão agendada.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Badge variant={session.status === "scheduled" ? "default" : "secondary"}>
                {session.status === "scheduled" ? "Agendada" : "Concluída"}
              </Badge>
              <SessionConfirmationStatus status={session.confirmationStatus || "no_response"} />
            </div>

            <div className="space-y-3">
              <div className="flex items-start">
                <User className="h-5 w-5 mr-2 text-muted-foreground" />
                <div>
                  <p className="font-medium">{session.clientName}</p>
                  <p className="text-sm text-muted-foreground">{session.clientEmail}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>{formatSessionDate(new Date(session.date))}</span>
              </div>

              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>
                  {formatSessionTime(new Date(session.date))} - {session.duration} minutos
                </span>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>{session.location}</span>
              </div>

              {session.notes && (
                <div className="flex items-start">
                  <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Observações:</p>
                    <p className="text-sm">{session.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setSendReminderOpen(true)} className="flex items-center">
                <Send className="h-4 w-4 mr-2" />
                Enviar Lembrete
              </Button>
              <Button>Editar Sessão</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <SendReminderDialog open={sendReminderOpen} onOpenChange={setSendReminderOpen} session={session} />
    </>
  )
}
