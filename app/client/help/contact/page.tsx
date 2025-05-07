import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContactSupportForm } from "@/components/help/contact-support-form"

export const metadata: Metadata = {
  title: "Contatar Suporte | Centro de Ajuda | BeTHERA",
  description: "Entre em contato com nossa equipe de suporte para obter ajuda personalizada.",
}

export default function ClientContactPage() {
  return (
    <div className="container max-w-3xl py-6 lg:py-10">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/client/help">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Voltar ao Centro de Ajuda
          </Link>
        </Button>
      </div>

      <div className="my-8 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Contatar Suporte</h1>
        <p className="text-xl text-muted-foreground">
          Preencha o formulário abaixo para entrar em contato com nossa equipe de suporte.
        </p>
      </div>

      <div className="rounded-lg border p-6">
        <ContactSupportForm userType="client" />
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-lg border p-6">
          <h3 className="mb-2 text-lg font-medium">Horário de Atendimento</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Nossa equipe de suporte está disponível nos seguintes horários:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Segunda a Sexta</span>
              <span className="font-medium">9h às 18h</span>
            </li>
            <li className="flex justify-between">
              <span>Sábado</span>
              <span className="font-medium">10h às 14h</span>
            </li>
            <li className="flex justify-between">
              <span>Domingo e Feriados</span>
              <span className="font-medium">Fechado</span>
            </li>
          </ul>
        </div>

        <div className="rounded-lg border p-6">
          <h3 className="mb-2 text-lg font-medium">Tempo de Resposta</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Nosso compromisso é responder a todas as solicitações o mais rápido possível:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Questões Gerais</span>
              <span className="font-medium">Até 24 horas</span>
            </li>
            <li className="flex justify-between">
              <span>Problemas Técnicos</span>
              <span className="font-medium">Até 12 horas</span>
            </li>
            <li className="flex justify-between">
              <span>Questões Urgentes</span>
              <span className="font-medium">Até 4 horas</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 rounded-lg border bg-muted/50 p-6 text-center">
        <h3 className="mb-2 text-lg font-medium">Consulte nossas Perguntas Frequentes</h3>
        <p className="mb-4 text-muted-foreground">
          Muitas dúvidas podem ser resolvidas rapidamente consultando nossa seção de FAQ.
        </p>
        <Button variant="outline" asChild>
          <Link href="/client/help/faq">Ver Perguntas Frequentes</Link>
        </Button>
      </div>
    </div>
  )
}
