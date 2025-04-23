"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComingSoonBadge } from "@/components/ui/coming-soon-badge"
import { toast } from "@/components/ui/use-toast"
import {
  Video,
  Users,
  Calendar,
  MessageSquare,
  Share,
  Settings,
  Mic,
  Camera,
  ScreenShare,
  PhoneOff,
  Clock,
  Bell,
} from "lucide-react"

export default function TherapistVideoPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNotifyMe = () => {
    if (!email || !email.includes("@")) {
      toast({
        title: "E-mail inválido",
        description: "Por favor, insira um e-mail válido para receber notificações.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulação de envio
    setTimeout(() => {
      setIsSubmitting(false)
      setEmail("")
      toast({
        title: "Inscrição realizada!",
        description: "Você será notificado quando a videoconferência estiver disponível.",
      })
    }, 1500)
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold tracking-tight">Videoconferência</h2>
            <ComingSoonBadge size="lg" className="ml-2" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-7">
          <Card className="col-span-4 md:col-span-5">
            <CardHeader>
              <CardTitle>Prévia da Videoconferência</CardTitle>
              <CardDescription>
                Conheça a nova experiência de atendimento online que estará disponível em breve
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Video className="h-16 w-16 text-muted-foreground opacity-20" />
                  <p className="mt-4 text-center text-muted-foreground">Prévia da interface de videoconferência</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-4 p-4">
                  <Button size="icon" variant="secondary" className="rounded-full h-12 w-12">
                    <Mic className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="secondary" className="rounded-full h-12 w-12">
                    <Camera className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="secondary" className="rounded-full h-12 w-12">
                    <ScreenShare className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="destructive" className="rounded-full h-12 w-12">
                    <PhoneOff className="h-5 w-5" />
                  </Button>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 text-sm backdrop-blur-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>45:30</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Recursos Principais</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Video className="h-4 w-4 text-primary" />
                      <span>Videoconferência em HD</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Share className="h-4 w-4 text-primary" />
                      <span>Compartilhamento de tela</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      <span>Chat durante a sessão</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>Integração com agendamento</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Benefícios</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>Atendimento remoto de qualquer lugar</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-primary" />
                      <span>Lembretes automáticos para sessões</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Settings className="h-4 w-4 text-primary" />
                      <span>Configurações avançadas de privacidade</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-4 md:col-span-2">
            <CardHeader>
              <CardTitle>Seja notificado</CardTitle>
              <CardDescription>Receba um aviso quando a videoconferência estiver disponível</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={handleNotifyMe} disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Notifique-me"}
                </Button>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="text-sm font-medium">Lançamento previsto</h3>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">Próximo trimestre</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2 border-t px-6 py-4">
              <h3 className="text-sm font-medium">Quer testar antes?</h3>
              <p className="text-sm text-muted-foreground">Estamos selecionando terapeutas para o programa beta.</p>
              <Button variant="outline" className="mt-2">
                Participar do Beta
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Tabs defaultValue="features" className="space-y-4">
          <TabsList>
            <TabsTrigger value="features">Recursos</TabsTrigger>
            <TabsTrigger value="faq">Perguntas Frequentes</TabsTrigger>
          </TabsList>
          <TabsContent value="features" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Videoconferência HD</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Conexão de alta qualidade para uma experiência de atendimento imersiva e sem interrupções.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Compartilhamento de Conteúdo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Compartilhe tela, documentos e apresentações durante a sessão para enriquecer o atendimento.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Gravação de Sessões</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Com permissão do cliente, grave sessões para revisão posterior ou para fins de supervisão.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Chat Integrado</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Troque mensagens durante a sessão para compartilhar links ou informações complementares.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Sala de Espera Virtual</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Clientes aguardam em uma sala de espera virtual até que você esteja pronto para iniciar a sessão.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Segurança Avançada</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Criptografia de ponta a ponta e conformidade com regulamentações de privacidade para proteger suas
                    sessões.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="faq" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Perguntas Frequentes</CardTitle>
                <CardDescription>
                  Tudo o que você precisa saber sobre a nova funcionalidade de videoconferência
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Quando a videoconferência estará disponível?</h3>
                  <p className="text-sm text-muted-foreground">
                    Estamos trabalhando para lançar a funcionalidade no próximo trimestre. Inscreva-se para ser
                    notificado assim que estiver disponível.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Haverá custo adicional para usar a videoconferência?</h3>
                  <p className="text-sm text-muted-foreground">
                    A funcionalidade básica de videoconferência será incluída em todos os planos. Recursos avançados
                    como gravação e salas múltiplas estarão disponíveis nos planos premium.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Quais dispositivos serão compatíveis?</h3>
                  <p className="text-sm text-muted-foreground">
                    A videoconferência funcionará em computadores (Windows, Mac, Linux) e dispositivos móveis (iOS e
                    Android) através do navegador ou aplicativo.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Como será a integração com o agendamento?</h3>
                  <p className="text-sm text-muted-foreground">
                    As sessões agendadas terão links de videoconferência gerados automaticamente, com lembretes enviados
                    para você e seu cliente.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Como posso participar do programa beta?</h3>
                  <p className="text-sm text-muted-foreground">
                    Clique no botão "Participar do Beta" e preencha o formulário. Selecionaremos um grupo limitado de
                    terapeutas para testar a funcionalidade antes do lançamento oficial.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
