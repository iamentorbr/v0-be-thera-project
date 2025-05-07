import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, CreditCard } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ComingSoonBadge } from "@/components/coming-soon-badge"

export default function ClientDashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próxima Sessão</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 de Maio, 14:00</div>
            <p className="text-xs text-muted-foreground">Com Dr. João Silva</p>
            <Button asChild className="mt-4" size="sm">
              <Link href="/client/sessions">Ver detalhes</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagamento Pendente</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 150,00</div>
            <p className="text-xs text-muted-foreground">Vencimento: 20/05/2025</p>
            <Button asChild className="mt-4" size="sm">
              <Link href="/client/payments">Realizar pagamento</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Sessões</CardTitle>
            <CardDescription>Suas últimas sessões realizadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-[60px] text-center">
                    <div className="text-xl font-bold">{10 - i}</div>
                    <div className="text-xs text-muted-foreground">Mai</div>
                  </div>
                  <div className="ml-4 space-y-1 border-l pl-4">
                    <p className="text-sm font-medium leading-none">Sessão de Terapia</p>
                    <p className="text-sm text-muted-foreground">
                      {14 + i}:00 - {15 + i}:00
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="secondary">Concluída</Badge>
                  </div>
                </div>
              ))}
              <div className="mt-4 text-center">
                <Button asChild variant="outline">
                  <Link href="/client/sessions">Ver todas as sessões</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Funcionalidades em Desenvolvimento</CardTitle>
            <CardDescription>Estamos trabalhando para trazer mais recursos para você</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Videoconferência</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Realize sessões online diretamente pela plataforma.</p>
                  <div className="mt-2">
                    <ComingSoonBadge />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Biblioteca de Conteúdo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Acesse materiais compartilhados pelo seu terapeuta.</p>
                  <div className="mt-2">
                    <ComingSoonBadge />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Exercícios</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Complete exercícios recomendados pelo seu terapeuta.</p>
                  <div className="mt-2">
                    <ComingSoonBadge />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
