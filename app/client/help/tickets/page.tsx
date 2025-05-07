import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SupportTicketsList } from "@/components/help/support-tickets-list"

export const metadata: Metadata = {
  title: "Meus Tickets | Centro de Ajuda | BeTHERA",
  description: "Acompanhe suas solicitações de suporte e histórico de atendimento.",
}

// Dados de exemplo para tickets
const tickets = [
  {
    id: "TK-2023-101",
    subject: "Dificuldade para confirmar sessão",
    status: "resolved",
    createdAt: "12/05/2023",
    lastUpdated: "13/05/2023",
    messages: 2,
  },
  {
    id: "TK-2023-102",
    subject: "Problema com pagamento por cartão",
    status: "in-progress",
    createdAt: "16/05/2023",
    lastUpdated: "17/05/2023",
    messages: 3,
  },
  {
    id: "TK-2023-103",
    subject: "Não consigo acessar videoconferência",
    status: "open",
    createdAt: "18/05/2023",
    lastUpdated: "18/05/2023",
    messages: 1,
  },
]

export default function ClientTicketsPage() {
  return (
    <div className="container max-w-5xl py-6 lg:py-10">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/client/help">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Voltar ao Centro de Ajuda
          </Link>
        </Button>
      </div>

      <div className="my-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Meus Tickets</h1>
          <p className="text-muted-foreground">Acompanhe suas solicitações de suporte e histórico de atendimento.</p>
        </div>
        <Button asChild>
          <Link href="/client/help/contact">
            <Plus className="mr-2 h-4 w-4" />
            Novo Ticket
          </Link>
        </Button>
      </div>

      <SupportTicketsList tickets={tickets} />

      <div className="mt-12 rounded-lg border bg-muted/50 p-6">
        <h3 className="mb-2 text-lg font-medium">Dicas para um Atendimento Eficiente</h3>
        <ul className="ml-6 list-disc space-y-2 text-sm text-muted-foreground">
          <li>Descreva seu problema ou dúvida com o máximo de detalhes possível</li>
          <li>Inclua capturas de tela quando relevante</li>
          <li>Mencione quaisquer mensagens de erro que apareçam</li>
          <li>Informe os passos que você seguiu antes do problema ocorrer</li>
          <li>Verifique regularmente seu email para atualizações sobre seu ticket</li>
        </ul>
      </div>
    </div>
  )
}
