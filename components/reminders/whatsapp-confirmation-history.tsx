"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X, Clock, MessageSquare, ChevronDown, ChevronUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

interface WhatsAppConfirmationHistoryProps {
  clientId?: string
}

// Dados simulados de confirmações
const mockConfirmations = [
  {
    id: "1",
    clientId: "client1",
    clientName: "Maria Silva",
    sessionDate: "2025-05-10T14:30:00",
    sentAt: "2025-05-09T10:15:00",
    respondedAt: "2025-05-09T10:45:00",
    status: "confirmed",
    message:
      "Olá Maria! 👋\n\nEste é um lembrete da sua sessão com Dr. Paulo Ribeiro amanhã (10/05/2025) às 14:30.\n\nLocal: Consultório\n\nPor favor, confirme sua presença usando os botões abaixo.",
    response: "Confirmar",
  },
  {
    id: "2",
    clientId: "client2",
    clientName: "João Santos",
    sessionDate: "2025-05-11T10:00:00",
    sentAt: "2025-05-10T09:30:00",
    respondedAt: "2025-05-10T11:20:00",
    status: "declined",
    message:
      "Olá João! 👋\n\nEste é um lembrete da sua sessão com Dr. Paulo Ribeiro amanhã (11/05/2025) às 10:00.\n\nLocal: Consultório\n\nPor favor, confirme sua presença usando os botões abaixo.",
    response: "Recusar",
  },
  {
    id: "3",
    clientId: "client3",
    clientName: "Ana Oliveira",
    sessionDate: "2025-05-12T16:00:00",
    sentAt: "2025-05-11T15:00:00",
    respondedAt: null,
    status: "pending",
    message:
      "Olá Ana! 👋\n\nEste é um lembrete da sua sessão com Dr. Paulo Ribeiro amanhã (12/05/2025) às 16:00.\n\nLocal: Consultório\n\nPor favor, confirme sua presença usando os botões abaixo.",
    response: null,
  },
  {
    id: "4",
    clientId: "client1",
    clientName: "Maria Silva",
    sessionDate: "2025-05-17T14:30:00",
    sentAt: "2025-05-16T10:15:00",
    respondedAt: "2025-05-16T10:20:00",
    status: "confirmed",
    message:
      "Olá Maria! 👋\n\nEste é um lembrete da sua sessão com Dr. Paulo Ribeiro amanhã (17/05/2025) às 14:30.\n\nLocal: Consultório\n\nPor favor, confirme sua presença usando os botões abaixo.",
    response: "Confirmar",
  },
  {
    id: "5",
    clientId: "client4",
    clientName: "Carlos Mendes",
    sessionDate: "2025-05-15T11:00:00",
    sentAt: "2025-05-14T09:00:00",
    respondedAt: "2025-05-14T17:45:00",
    status: "confirmed",
    message:
      "Olá Carlos! 👋\n\nEste é um lembrete da sua sessão com Dr. Paulo Ribeiro amanhã (15/05/2025) às 11:00.\n\nLocal: Consultório\n\nPor favor, confirme sua presença usando os botões abaixo.",
    response: "Confirmar",
  },
]

export function WhatsAppConfirmationHistory({ clientId }: WhatsAppConfirmationHistoryProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  // Filtrar confirmações por cliente, se um ID de cliente for fornecido
  const filteredConfirmations = clientId
    ? mockConfirmations.filter((confirmation) => confirmation.clientId === clientId)
    : mockConfirmations

  const toggleExpand = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            <Check className="h-3 w-3 mr-1" />
            Confirmado
          </Badge>
        )
      case "declined":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
            <X className="h-3 w-3 mr-1" />
            Recusado
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pendente
          </Badge>
        )
      default:
        return null
    }
  }

  const getResponseTime = (sentAt: string, respondedAt: string | null) => {
    if (!respondedAt) return null

    const sent = new Date(sentAt).getTime()
    const responded = new Date(respondedAt).getTime()
    const diffMinutes = Math.floor((responded - sent) / (1000 * 60))

    if (diffMinutes < 60) {
      return `${diffMinutes} min`
    } else {
      const hours = Math.floor(diffMinutes / 60)
      const mins = diffMinutes % 60
      return `${hours}h ${mins}min`
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-green-600" />
          Confirmações via WhatsApp
        </CardTitle>
        <CardDescription>Histórico de lembretes enviados e confirmações recebidas via WhatsApp.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {filteredConfirmations.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Nenhuma confirmação via WhatsApp encontrada.</p>
            ) : (
              filteredConfirmations.map((confirmation) => (
                <div key={confirmation.id} className="border rounded-lg overflow-hidden">
                  <div
                    className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleExpand(confirmation.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`/abstract-geometric-shapes.png?height=32&width=32&query=${encodeURIComponent(confirmation.clientName)}`}
                        />
                        <AvatarFallback>{confirmation.clientName.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        {!clientId && <p className="font-medium">{confirmation.clientName}</p>}
                        <p className="text-sm text-muted-foreground">Sessão: {formatDate(confirmation.sessionDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getStatusBadge(confirmation.status)}
                      {confirmation.respondedAt && (
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {getResponseTime(confirmation.sentAt, confirmation.respondedAt)}
                        </span>
                      )}
                      {expandedItem === confirmation.id ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {expandedItem === confirmation.id && (
                    <div className="p-3 border-t bg-muted/20">
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Mensagem Enviada:</p>
                          <div className="bg-white p-2 rounded border text-sm whitespace-pre-line">
                            {confirmation.message}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Enviado em: {formatDate(confirmation.sentAt)}
                          </p>
                        </div>

                        {confirmation.response && (
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">Resposta:</p>
                            <div className="bg-green-50 p-2 rounded border text-sm">{confirmation.response}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Respondido em:{" "}
                              {confirmation.respondedAt ? formatDate(confirmation.respondedAt) : "Pendente"}
                            </p>
                          </div>
                        )}

                        {confirmation.status === "pending" && (
                          <div className="flex justify-end">
                            <Button size="sm" variant="outline">
                              Reenviar Lembrete
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
