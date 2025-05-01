"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, CreditCard, TrendingUp, FileText, Video } from "lucide-react"
import Link from "next/link"
import { CreateSessionDialog } from "@/components/scheduling/create-session-dialog"

export default function TherapistDashboard() {
  const [showCreateSession, setShowCreateSession] = useState(false)

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button onClick={() => setShowCreateSession(true)}>
              <Calendar className="mr-2 h-4 w-4" />
              Agendar Sessão
            </Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="analytics">Análises</TabsTrigger>
            <TabsTrigger value="upcoming">Próximas</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+2 desde o mês passado</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sessões Este Mês</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42</div>
                  <p className="text-xs text-muted-foreground">+8 desde o mês passado</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Receita</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 4.200</div>
                  <p className="text-xs text-muted-foreground">+12% desde o mês passado</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tarefas Pendentes</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">Anotações e exercícios</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Próximas Sessões</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center">
                        <div className="w-[60px] text-center">
                          <div className="text-xl font-bold">{i + 9}</div>
                          <div className="text-xs text-muted-foreground">ABR</div>
                        </div>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            Cliente {i}: {i === 1 ? "Sessão Inicial" : "Acompanhamento"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {10 + i}:00 - {11 + i}:00
                          </p>
                        </div>
                        <div className="ml-auto font-medium">
                          <Button variant="outline" size="sm">
                            Ver
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Atividade Recente</CardTitle>
                  <CardDescription>Suas interações recentes com clientes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                          {i % 2 === 0 ? (
                            <FileText className="h-4 w-4 text-primary" />
                          ) : (
                            <Clock className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {i % 2 === 0
                              ? "Adicionou anotações para Cliente " + i
                              : "Completou sessão com Cliente " + i}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            há {i} hora{i !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Análise de Sessões</CardTitle>
                <CardDescription>Tendências de sessões e receita ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="h-16 w-16 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">A visualização de análises apareceria aqui</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="upcoming" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Próximas Sessões</CardTitle>
                <CardDescription>Suas sessões agendadas para os próximos 7 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center border-b pb-4 last:border-0 last:pb-0">
                      <div className="w-[80px] text-center">
                        <div className="text-xl font-bold">{i + 9}</div>
                        <div className="text-xs text-muted-foreground">ABR</div>
                      </div>
                      <div className="ml-4 space-y-1 flex-1">
                        <p className="text-sm font-medium leading-none">
                          Cliente {i}:{" "}
                          {
                            [
                              "Consulta Inicial",
                              "Leitura de Tarô",
                              "Sessão de Terapia",
                              "Sessão de Coaching",
                              "Leitura Astrológica",
                            ][i - 1]
                          }
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {10 + i}:00 - {11 + i}:00
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Reagendar
                        </Button>
                        <Button size="sm">Preparar</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Novidades em breve</CardTitle>
            <CardDescription>Recursos que estão chegando na plataforma</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Video className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <h4 className="font-medium leading-none">Videoconferência Integrada</h4>
                <p className="text-sm text-muted-foreground">
                  Realize sessões online diretamente na plataforma, sem necessidade de aplicativos externos.
                </p>
                <Button variant="link" size="sm" className="px-0" asChild>
                  <Link href="/therapist/video">Saiba mais</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <h4 className="font-medium leading-none">Pagamentos Integrados</h4>
                <p className="text-sm text-muted-foreground">
                  Receba pagamentos diretamente pela plataforma, com gestão financeira completa.
                </p>
                <Button variant="link" size="sm" className="px-0" asChild>
                  <Link href="/therapist/payments">Ver pagamentos</Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <CreateSessionDialog open={showCreateSession} onOpenChange={setShowCreateSession} />
    </div>
  )
}
