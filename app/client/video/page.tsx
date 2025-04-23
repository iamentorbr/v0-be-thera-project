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
  Calendar,
  MessageSquare,
  Mic,
  Camera,
  PhoneOff,
  Clock,
  Sparkles,
  Shield,
  Smartphone,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ClientVideoPage() {
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
            <h2 className="text-3xl font-bold tracking-tight">Sessões Online</h2>
            <ComingSoonBadge size="lg" className="ml-2" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-7">
          <Card className="col-span-4 md:col-span-5">
            <CardHeader>
              <CardTitle>Sessões por Videoconferência</CardTitle>
              <CardDescription>
                Em breve você poderá ter suas sessões diretamente pela plataforma BETHERA
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
                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 text-sm backdrop-blur-sm">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Terapeuta" />
                      <AvatarFallback>DR</AvatarFallback>
                    </Avatar>
                    <span>Dr. Paulo Ribeiro</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Benefícios</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Sessões de qualquer lugar, sem aplicativos externos</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>Lembretes automáticos de sessões</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      <span>Chat integrado durante a sessão</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Recursos</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <span>Conexão segura e criptografada</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-primary" />
                      <span>Compatível com todos os dispositivos</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Video className="h-4 w-4 text-primary" />
                      <span>Qualidade HD para uma experiência imersiva</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-4 md:col-span-2">
            <CardHeader>
              <CardTitle>Seja notificado</CardTitle>
              <CardDescription>Receba um aviso quando as sessões online estiverem disponíveis</CardDescription>
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
                <h3 className="text-sm font-medium">Como funcionará?</h3>
                <p className="text-sm text-muted-foreground">
                  Quando sua sessão estiver agendada, você receberá um link para entrar diretamente na sala virtual no
                  horário marcado. Não será necessário baixar nenhum aplicativo adicional.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2 border-t px-6 py-4">
              <h3 className="text-sm font-medium">Preparando-se para sessões online</h3>
              <p className="text-sm text-muted-foreground">
                Encontre um local tranquilo e privado, verifique sua conexão com a internet e teste sua câmera e
                microfone antes da sessão.
              </p>
            </CardFooter>
          </Card>
        </div>

        <Tabs defaultValue="how-it-works" className="space-y-4">
          <TabsList>
            <TabsTrigger value="how-it-works">Como Funciona</TabsTrigger>
            <TabsTrigger value="faq">Perguntas Frequentes</TabsTrigger>
          </TabsList>
          <TabsContent value="how-it-works" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Como Funcionarão as Sessões Online</CardTitle>
                <CardDescription>
                  Entenda o processo de atendimento por videoconferência na plataforma BETHERA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium">1. Agendamento</h3>
                    <p className="text-sm text-muted-foreground">
                      Agende sua sessão normalmente com seu terapeuta através da plataforma.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium">2. Lembrete</h3>
                    <p className="text-sm text-muted-foreground">
                      Receba lembretes por e-mail e notificação com o link para sua sessão.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Video className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium">3. Conexão</h3>
                    <p className="text-sm text-muted-foreground">
                      Clique no link no horário agendado para entrar na sala virtual com seu terapeuta.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="faq" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Perguntas Frequentes</CardTitle>
                <CardDescription>Tudo o que você precisa saber sobre as sessões online</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Quando as sessões online estarão disponíveis?</h3>
                  <p className="text-sm text-muted-foreground">
                    Estamos trabalhando para lançar esta funcionalidade no próximo trimestre. Inscreva-se para ser
                    notificado assim que estiver disponível.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Preciso baixar algum aplicativo?</h3>
                  <p className="text-sm text-muted-foreground">
                    Não, as sessões acontecerão diretamente no navegador, sem necessidade de baixar aplicativos
                    adicionais.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Quais dispositivos posso usar?</h3>
                  <p className="text-sm text-muted-foreground">
                    Você poderá participar das sessões usando computador, tablet ou smartphone, desde que tenha câmera e
                    microfone.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">As sessões online são seguras?</h3>
                  <p className="text-sm text-muted-foreground">
                    Sim, todas as sessões são criptografadas de ponta a ponta e seguem rigorosos protocolos de segurança
                    para garantir sua privacidade.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">O que fazer se tiver problemas técnicos?</h3>
                  <p className="text-sm text-muted-foreground">
                    A plataforma oferecerá suporte técnico em tempo real e um guia de solução de problemas para ajudar
                    com qualquer dificuldade.
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
