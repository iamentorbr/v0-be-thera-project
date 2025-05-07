import type { Metadata } from "next"
import Link from "next/link"
import { HelpArticlesGrid } from "@/components/help/help-articles-grid"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, MessageSquare, FileText, Users, Calendar, CreditCard } from "lucide-react"

export const metadata: Metadata = {
  title: "Centro de Ajuda | BeTHERA",
  description: "Encontre respostas para suas dúvidas e obtenha suporte.",
}

// Dados de exemplo para artigos de ajuda
const helpArticles = [
  {
    id: "1",
    title: "Como adicionar um novo cliente",
    description: "Aprenda a adicionar e gerenciar novos clientes em sua conta.",
    category: "Clientes",
    url: "/therapist/help/articles/adding-clients",
  },
  {
    id: "2",
    title: "Agendando sessões",
    description: "Guia completo sobre como agendar e gerenciar sessões.",
    category: "Sessões",
    url: "/therapist/help/articles/scheduling-sessions",
  },
  {
    id: "3",
    title: "Configurando seu perfil",
    description: "Dicas para configurar seu perfil profissional de forma eficaz.",
    category: "Conta",
    url: "/therapist/help/articles/profile-setup",
  },
  {
    id: "4",
    title: "Gerenciando pagamentos",
    description: "Aprenda a configurar e gerenciar pagamentos de clientes.",
    category: "Pagamentos",
    url: "/therapist/help/articles/managing-payments",
  },
  {
    id: "5",
    title: "Criando anotações de sessão",
    description: "Como criar e organizar anotações de sessões com clientes.",
    category: "Anotações",
    url: "/therapist/help/articles/session-notes",
  },
  {
    id: "6",
    title: "Usando a videoconferência",
    description: "Guia para utilizar a ferramenta de videoconferência com clientes.",
    category: "Videoconferência",
    url: "/therapist/help/articles/video-conferencing",
  },
]

const categories = ["Clientes", "Sessões", "Conta", "Pagamentos", "Anotações", "Videoconferência"]

export default function TherapistHelpCenter() {
  return (
    <div className="container max-w-7xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-bold tracking-tight lg:text-5xl">Centro de Ajuda</h1>
          <p className="text-xl text-muted-foreground">
            Encontre respostas para suas dúvidas e obtenha suporte para usar a plataforma BeTHERA.
          </p>
        </div>
      </div>

      <div className="grid gap-10 py-10">
        <section>
          <h2 className="mb-6 text-2xl font-bold tracking-tight">Como podemos ajudar?</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <HelpCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Perguntas Frequentes</CardTitle>
                  <CardDescription>Respostas para dúvidas comuns</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/therapist/help/faq">Ver Perguntas Frequentes</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Contatar Suporte</CardTitle>
                  <CardDescription>Envie uma mensagem para nossa equipe</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/therapist/help/contact">Contatar Suporte</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Meus Tickets</CardTitle>
                  <CardDescription>Acompanhe suas solicitações de suporte</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/therapist/help/tickets">Ver Meus Tickets</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-bold tracking-tight">Guias por Categoria</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Gerenciamento de Clientes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="text-primary hover:underline">
                      Como adicionar novos clientes
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline">
                      Organizando sua lista de clientes
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline">
                      Compartilhando conteúdo com clientes
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Agendamento de Sessões</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="text-primary hover:underline">
                      Como agendar uma nova sessão
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline">
                      Gerenciando seu calendário
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline">
                      Enviando lembretes de sessão
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Pagamentos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="text-primary hover:underline">
                      Configurando métodos de pagamento
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline">
                      Gerando faturas para clientes
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline">
                      Relatórios financeiros
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-bold tracking-tight">Artigos Populares</h2>
          <HelpArticlesGrid articles={helpArticles} categories={categories} />
        </section>
      </div>
    </div>
  )
}
