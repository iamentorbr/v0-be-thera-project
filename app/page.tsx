import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MoonStar, Sparkles, Users, Calendar, FileText, MessageSquare } from "lucide-react"
import { ComingSoonBadge } from "@/components/ui/coming-soon-badge"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center space-x-2">
            <MoonStar className="h-6 w-6" />
            <span className="font-bold">BETHERA</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link href="/pricing">
                <Button
                  variant="default"
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 font-medium"
                >
                  SEJA BeThera
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Entrar
                </Button>
              </Link>
              <Button asChild variant="ghost" size="sm">
                <Link href="/register">Seja um Terapeuta</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
          {/* Imagem de fundo com opacidade */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-background.png"
              alt="BETHERA background"
              fill
              className="object-cover opacity-55"
              priority
            />
            <div className="absolute inset-0 bg-background/40 backdrop-blur-sm"></div>
          </div>

          <div className="container relative z-10 px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Eleve sua Prática com BETHERA
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    A plataforma completa para terapeutas, tarólogos, astrólogos, psicólogos e coaches gerenciarem
                    clientes, sessões e muito mais.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="gap-1">
                      <Sparkles className="h-4 w-4" />
                      Começar Agora
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button size="lg" variant="outline">
                      Saiba Mais
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[350px] rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 opacity-80 blur-2xl"></div>
                <div className="absolute flex items-center justify-center">
                  <MoonStar className="h-24 w-24 text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Funcionalidades</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Tudo o que você precisa para gerenciar sua prática de bem-estar
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Users className="h-12 w-12 text-primary" />
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">Gestão de Clientes</h3>
                </div>
                <p className="text-center text-muted-foreground">
                  Gerencie seus clientes, acompanhe sessões e mantenha anotações detalhadas.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Calendar className="h-12 w-12 text-primary" />
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">Agendamento</h3>
                </div>
                <p className="text-center text-muted-foreground">
                  Agende sessões com lembretes automáticos e acompanhamento de pagamentos.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <FileText className="h-12 w-12 text-primary" />
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">Compartilhamento de Conteúdo</h3>
                </div>
                <p className="text-center text-muted-foreground">
                  Compartilhe áudios, PDFs e exercícios personalizados com seus clientes.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <MessageSquare className="h-12 w-12 text-primary" />
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">Diário Interativo</h3>
                </div>
                <p className="text-center text-muted-foreground">
                  Ofereça aos clientes um diário privado para reflexões e gravações de áudio.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Sparkles className="h-12 w-12 text-primary" />
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">Exercícios Terapêuticos</h3>
                </div>
                <p className="text-center text-muted-foreground">
                  Crie exercícios personalizados e acompanhe o progresso do cliente.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <MoonStar className="h-12 w-12 text-primary" />
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">Interface Mística</h3>
                </div>
                <p className="text-center text-muted-foreground">
                  Interface bonita e intuitiva projetada para profissionais de bem-estar.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Recursos Disponíveis e Futuros</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Conheça o que já está disponível e o que está por vir na plataforma BETHERA
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Disponível Agora</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                      <Sparkles className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Gestão de Clientes</h4>
                      <p className="text-sm text-muted-foreground">
                        Cadastro e gerenciamento de informações de clientes
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                      <Sparkles className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Agendamento de Sessões</h4>
                      <p className="text-sm text-muted-foreground">Criação e gerenciamento de sessões com clientes</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                      <Sparkles className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Compartilhamento de Conteúdo</h4>
                      <p className="text-sm text-muted-foreground">Envio de materiais e recursos para clientes</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                      <Sparkles className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Diário do Cliente</h4>
                      <p className="text-sm text-muted-foreground">Espaço para clientes registrarem suas reflexões</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                      <Sparkles className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Exercícios Terapêuticos</h4>
                      <p className="text-sm text-muted-foreground">Criação e atribuição de exercícios personalizados</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Em Breve</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                      <Sparkles className="h-3 w-3 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">Videoconferência</h4>
                      <ComingSoonBadge size="sm" />
                    </div>
                    <p className="text-sm text-muted-foreground">Sessões online integradas à plataforma</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                      <Sparkles className="h-3 w-3 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">Pagamentos Integrados</h4>
                      <ComingSoonBadge size="sm" />
                    </div>
                    <p className="text-sm text-muted-foreground">Receba pagamentos diretamente pela plataforma</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                      <Sparkles className="h-3 w-3 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">Integração com Calendário</h4>
                      <ComingSoonBadge size="sm" />
                    </div>
                    <p className="text-sm text-muted-foreground">Sincronize com Google Calendar e outros serviços</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                      <Sparkles className="h-3 w-3 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">Personalização de Marca</h4>
                      <ComingSoonBadge size="sm" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Adapte a plataforma à identidade visual do seu negócio
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                      <Sparkles className="h-3 w-3 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">Gráficos de Progresso</h4>
                      <ComingSoonBadge size="sm" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Visualize o progresso dos clientes ao longo do tempo
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 BETHERA. Todos os direitos reservados.
          </p>
          <div className="flex items-center space-x-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Termos
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacidade
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
