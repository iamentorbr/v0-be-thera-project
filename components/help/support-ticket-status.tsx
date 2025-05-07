import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

export interface SupportTicket {
  id: string
  subject: string
  status: "open" | "in-progress" | "resolved" | "closed"
  createdAt: string
  lastUpdated: string
  messages: number
}

interface SupportTicketStatusProps {
  ticket: SupportTicket
}

export function SupportTicketStatus({ ticket }: SupportTicketStatusProps) {
  const statusMap = {
    open: { label: "Aberto", color: "bg-yellow-500" },
    "in-progress": { label: "Em Andamento", color: "bg-blue-500" },
    resolved: { label: "Resolvido", color: "bg-green-500" },
    closed: { label: "Fechado", color: "bg-gray-500" },
  }

  const status = statusMap[ticket.status]

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{ticket.subject}</CardTitle>
          <Badge className={status.color}>{status.label}</Badge>
        </div>
        <CardDescription>
          Ticket #{ticket.id} • Criado em {ticket.createdAt}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Última atualização: {ticket.lastUpdated}</span>
          <span className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            {ticket.messages} {ticket.messages === 1 ? "mensagem" : "mensagens"}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Ver Detalhes
        </Button>
      </CardFooter>
    </Card>
  )
}
