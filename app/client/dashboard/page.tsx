import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, FileAudio, BookOpen, MessageSquare, Sparkles, Video } from "lucide-react"
import Link from "next/link"

export default function ClientDashboard() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">✨ Bem-vindo, John</h2>
            <p className="text-muted-foreground">Sua jornada de bem-estar continua hoje</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Agendar Sessão
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próxima Sessão</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Apr 12</div>
              <p className="text-xs text-muted-foreground">2:00 PM with Jane Doe</p>
              <Button variant="link" className="px-0 mt-2">
                Ver detalhes
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Novo Conteúdo</CardTitle>
              <FileAudio className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3 Items</div>
              <p className="text-xs text-muted-foreground">Áudio de meditação e recursos</p>
              <Button variant="link" className="px-0 mt-2">
                Explorar
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Exercícios Pendentes</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Prazo até 15 de abril</p>
              <Button variant="link" className="px-0 mt-2">
                Completar agora
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Entradas do Diário</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">Este mês</p>
              <Button variant="link" className="px-0 mt-2">
                Escrever nova entrada
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Sua Jornada de Bem-estar</CardTitle>
              <CardDescription>Acompanhe seu progresso e próximos marcos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="font-medium">Prática de Meditação</div>
                    <div>7/10 days</div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-full w-[70%] rounded-full bg-primary"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="font-medium">Diário</div>
                    <div>5/8 entries</div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-full w-[62.5%] rounded-full bg-primary"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="font-medium">Conclusão de Exercícios</div>
                    <div>3/5 exercises</div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-full w-[60%] rounded-full bg-primary"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Inspiração Diária</CardTitle>
              <CardDescription>Um pensamento para sua reflexão</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center space-y-4 py-6">
                <Sparkles className="h-12 w-12 text-primary" />
                <blockquote className="italic text-lg">
                  "The journey of a thousand miles begins with a single step."
                </blockquote>
                <p className="text-sm text-muted-foreground">
                  Tire um momento hoje para refletir sobre o quanto você já avançou em sua jornada.
                </p>
                <Button variant="outline" className="mt-4">
                  Adicionar ao Diário
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Conteúdo Recente</CardTitle>
            <CardDescription>Recursos compartilhados pelo seu terapeuta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Meditação Matinal", type: "Áudio", date: "8 Abr" },
                { title: "Exercício de Atenção Plena", type: "PDF", date: "5 Abr" },
                { title: "Perguntas de Reflexão", type: "Texto", date: "3 Abr" },
              ].map((item, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-32 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center">
                    {item.type === "Áudio" ? (
                      <FileAudio className="h-10 w-10 text-primary" />
                    ) : item.type === "PDF" ? (
                      <BookOpen className="h-10 w-10 text-primary" />
                    ) : (
                      <MessageSquare className="h-10 w-10 text-primary" />
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium">{item.title}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                      <Button variant="ghost" size="sm">
                        Visualizar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Novidades em breve</CardTitle>
            <CardDescription>Recursos que estão chegando na plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium leading-none">Sessões Online</h4>
                  <p className="text-sm text-muted-foreground">
                    Participe de sessões por videoconferência diretamente na plataforma.
                  </p>
                  <Button variant="link" size="sm" className="px-0" asChild>
                    <Link href="/client/video">Saiba mais</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium leading-none">Chat com Terapeuta</h4>
                  <p className="text-sm text-muted-foreground">
                    Comunique-se com seu terapeuta entre as sessões de forma segura.
                  </p>
                  <Button variant="link" size="sm" className="px-0" disabled>
                    Em desenvolvimento
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
