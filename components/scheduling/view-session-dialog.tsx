"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Video, MapPin, Clock, Calendar, Edit, X, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ViewSessionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  session: any
}

export function ViewSessionDialog({ open, onOpenChange, session }: ViewSessionDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false)

  // Função para obter o texto do status em português
  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmada"
      case "pending":
        return "Pendente"
      case "completed":
        return "Concluída"
      case "cancelled":
        return "Cancelada"
      default:
        return status
    }
  }

  // Função para obter a variante do badge baseado no status
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default"
      case "pending":
        return "outline"
      case "completed":
        return "secondary"
      case "cancelled":
        return "destructive"
      default:
        return "default"
    }
  }

  const handleConfirmSession = async () => {
    setIsSubmitting(true)

    try {
      // Aqui seria a chamada para a API para confirmar a sessão
      // Por enquanto, vamos apenas simular um atraso
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Sessão confirmada!",
        description: `A sessão com ${session.client.name} foi confirmada.`,
      })

      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Erro ao confirmar",
        description: "Ocorreu um erro ao confirmar a sessão. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancelSession = async () => {
    setIsSubmitting(true)

    try {
      // Aqui seria a chamada para a API para cancelar a sessão
      // Por enquanto, vamos apenas simular um atraso
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Sessão cancelada",
        description: `A sessão com ${session.client.name} foi cancelada.`,
      })

      setConfirmCancelOpen(false)
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Erro ao cancelar",
        description: "Ocorreu um erro ao cancelar a sessão. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Detalhes da Sessão</DialogTitle>
            <DialogDescription>Informações sobre a sessão agendada.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={session.client.avatar || "/placeholder.svg"} alt={session.client.name} />
                <AvatarFallback>
                  {session.client.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{session.client.name}</h3>
                <Badge variant={getStatusVariant(session.status)} className="mt-1">
                  {getStatusText(session.status)}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{format(session.date, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>
                  {session.startTime} - {session.endTime}
                </span>
              </div>
              <div className="flex items-center text-sm">
                {session.type === "video" ? (
                  <>
                    <Video className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Videochamada</span>
                  </>
                ) : (
                  <>
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Presencial</span>
                  </>
                )}
              </div>
            </div>

            {session.notes && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Observações:</h4>
                <p className="text-sm text-muted-foreground">{session.notes}</p>
              </div>
            )}
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            {session.status === "pending" && (
              <Button
                variant="default"
                className="w-full sm:w-auto"
                onClick={handleConfirmSession}
                disabled={isSubmitting}
              >
                <Check className="mr-2 h-4 w-4" />
                Confirmar
              </Button>
            )}
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Button>
            {session.status !== "cancelled" && session.status !== "completed" && (
              <Button variant="destructive" className="w-full sm:w-auto" onClick={() => setConfirmCancelOpen(true)}>
                <X className="mr-2 h-4 w-4" />
                Cancelar Sessão
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmCancelOpen} onOpenChange={setConfirmCancelOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancelar Sessão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja cancelar esta sessão? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Voltar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelSession}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Sim, cancelar sessão
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
