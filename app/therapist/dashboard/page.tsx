"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, CreditCard, FileText } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Substituir o conteúdo da função por:
export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 no último mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessões Agendadas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Próximos 7 dias</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Anotações</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+5 na última semana</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagamentos Pendentes</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 1.250,00</div>
            <p className="text-xs text-muted-foreground">3 faturas em aberto</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Próximas Sessões</CardTitle>
            <CardDescription>Você tem 8 sessões agendadas para os próximos dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-[60px] text-center">
                    <div className="text-xl font-bold">{15 + i}</div>
                    <div className="text-xs text-muted-foreground">Mai</div>
                  </div>
                  <div className="ml-4 space-y-1 border-l pl-4">
                    <p className="text-sm font-medium leading-none">Cliente {i + 1}</p>
                    <p className="text-sm text-muted-foreground">
                      {14 + i}:00 - {15 + i}:00
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Button variant="outline" size="sm">
                      Ver detalhes
                    </Button>
                  </div>
                </div>
              ))}
              <div className="mt-4 text-center">
                <Button asChild variant="outline">
                  <Link href="/therapist/sessions">Ver todas as sessões</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Clientes Recentes</CardTitle>
            <CardDescription>Você adicionou 2 novos clientes este mês</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>C{i + 1}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Cliente {i + 1}</p>
                    <p className="text-sm text-muted-foreground">cliente{i + 1}@email.com</p>
                  </div>
                  <div className="ml-auto">
                    <Button variant="ghost" size="sm">
                      Ver perfil
                    </Button>
                  </div>
                </div>
              ))}
              <div className="mt-4 text-center">
                <Button asChild variant="outline">
                  <Link href="/therapist/clients">Ver todos os clientes</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Anotações Recentes</CardTitle>
            <CardDescription>Suas últimas anotações de sessões</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Cliente {i + 1}</div>
                    <div className="text-sm text-muted-foreground">{10 - i} de Maio, 2025</div>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    Anotação sobre a sessão com o cliente {i + 1}. Discutimos progressos e definimos novos objetivos
                    para as próximas semanas.
                  </p>
                </div>
              ))}
              <div className="mt-4 text-center">
                <Button asChild variant="outline">
                  <Link href="/therapist/notes">Ver todas as anotações</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Pagamentos Pendentes</CardTitle>
            <CardDescription>Faturas que aguardam pagamento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">Cliente {i + 1}</p>
                    <p className="text-sm text-muted-foreground">Vencimento: {20 + i}/05/2025</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">R$ {(i + 1) * 150},00</p>
                    <Badge variant="outline" className="mt-1">
                      Pendente
                    </Badge>
                  </div>
                </div>
              ))}
              <div className="mt-4 text-center">
                <Button asChild variant="outline">
                  <Link href="/therapist/payments">Gerenciar pagamentos</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
