import type { Metadata } from "next"
import Link from "next/link"
import { HelpArticlesGrid } from "@/components/help/help-articles-grid"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, MessageSquare, FileText, Calendar, CreditCard, Video } from "lucide-react"

export const metadata: Metadata = {
  title: "Centro de Ajuda | BeTHERA",
  description: "Encontre respostas para suas dúvidas e obtenha suporte.",
}

// Dados de exemplo para artigos de ajuda
const helpArticles = [
  {
    id: "1",
    title: "Como confirmar uma sessão",
    description: "Aprenda a confirmar sessões agendadas pelo seu terapeuta.",
    category: "Sessões",
    url: "/client/help/articles/confirming-sessions",
  },
  {
    id: "2",
    title: "Realizando pagamentos",
    description: "Guia completo sobre como realizar pagamentos na plataforma.",
    category: "Pagamentos",
    url: "/client/help/articles/making-payments",
  },
  {
    id: "3",
    title: "Configurando seu perfil",
    description: "Dicas para configurar seu perfil pessoal de forma eficaz.",
    category: "Conta",
    url: "/client/help/articles/profile-setup",
  },
  {
    id: "4",
    title: "Acessando conteúdos compartilhados",
    description: "Como acessar materiais compartilhados pelo seu terapeuta.",
    category: "Conteúdo",
    url: "/client/help/articles/accessing-content",
  },
  {
    id: "5",
    title: "Participando de videoconferências",
    description: "Como participar de sessões online com seu terapeuta.",
    category: "Videoconferência",
    url: "/client/help/articles/video-sessions",
  },
  {
    id: "6",
    title: "Registrando seu progresso",
    description: "Como utilizar o diário e ferramentas de acompanhamento.",
    category: "Jornada",
    url: "/client/help/articles/tracking-progress",
  },
]

const categories = ["Sessões", "Pagamentos", "Conta", "Conteúdo", "Videoconferência", "Jornada"]

export default function ClientHelpCenter() {
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
                  <Link href="/client/help/faq">Ver Perguntas Frequentes</Link>
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
                  <Link href="/client/help/contact">Contatar Suporte</Link>
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
                  <Link href="/client/help/tickets">Ver Meus Tickets</Link>
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
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Sessões</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="text-primary hover:underline">
                      Como confirmar uma sessão
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline">
                      Reagendando sessões
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline">
                      Preparando-se para uma sessão
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
                      Métodos de pagamento aceitos
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline">
                      Como visualizar faturas
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline">
                      Política de cancelamento
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Video className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Videoconferência</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="text-primary hover:underline">
                      Como participar de uma sessão online
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline">
                      Requisitos técnicos
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline">
                      Solucionando problemas de conexão
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
