import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MoonStar, Sparkles, Users, Calendar, FileText, MessageSquare } from "lucide-react"

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
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Entrar
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Cadastrar</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
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
                <h3 className="text-xl font-bold">Gestão de Clientes</h3>
                <p className="text-center text-muted-foreground">
                  Gerencie seus clientes, acompanhe sessões e mantenha anotações detalhadas.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Calendar className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Agendamento</h3>
                <p className="text-center text-muted-foreground">
                  Agende sessões com lembretes automáticos e acompanhamento de pagamentos.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <FileText className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Compartilhamento de Conteúdo</h3>
                <p className="text-center text-muted-foreground">
                  Compartilhe áudios, PDFs e exercícios personalizados com seus clientes.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <MessageSquare className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Diário Interativo</h3>
                <p className="text-center text-muted-foreground">
                  Ofereça aos clientes um diário privado para reflexões e gravações de áudio.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Sparkles className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Exercícios Terapêuticos</h3>
                <p className="text-center text-muted-foreground">
                  Crie exercícios personalizados e acompanhe o progresso do cliente.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <MoonStar className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Interface Mística</h3>
                <p className="text-center text-muted-foreground">
                  Interface bonita e intuitiva projetada para profissionais de bem-estar.
                </p>
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
