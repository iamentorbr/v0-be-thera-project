import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserPlus, Search, MoreHorizontal, Calendar, FileText } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function ClientsPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
          <div className="flex items-center space-x-2">
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Adicionar Cliente
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar clientes..." className="pl-8" />
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Todos os Clientes</TabsTrigger>
            <TabsTrigger value="active">Ativos</TabsTrigger>
            <TabsTrigger value="new">Novos</TabsTrigger>
            <TabsTrigger value="inactive">Inativos</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Última Sessão</TableHead>
                      <TableHead>Próxima Sessão</TableHead>
                      <TableHead>Pagamento</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        name: "John Smith",
                        email: "john@example.com",
                        status: "Ativo",
                        lastSession: "Apr 5, 2024",
                        nextSession: "Apr 12, 2024",
                        payment: "Pago",
                      },
                      {
                        name: "Sarah Johnson",
                        email: "sarah@example.com",
                        status: "Ativo",
                        lastSession: "Apr 3, 2024",
                        nextSession: "Apr 17, 2024",
                        payment: "Pago",
                      },
                      {
                        name: "Michael Brown",
                        email: "michael@example.com",
                        status: "Novo",
                        lastSession: "Nunca",
                        nextSession: "Apr 15, 2024",
                        payment: "Pendente",
                      },
                      {
                        name: "Emily Davis",
                        email: "emily@example.com",
                        status: "Inativo",
                        lastSession: "Mar 10, 2024",
                        nextSession: "Nenhuma",
                        payment: "N/D",
                      },
                      {
                        name: "David Wilson",
                        email: "david@example.com",
                        status: "Ativo",
                        lastSession: "Apr 8, 2024",
                        nextSession: "Apr 22, 2024",
                        payment: "Pago",
                      },
                    ].map((client, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={`/generic-placeholder-graphic.png?height=40&width=40`} alt={client.name} />
                              <AvatarFallback>
                                {client.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{client.name}</div>
                              <div className="text-sm text-muted-foreground">{client.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              client.status === "Ativo" ? "default" : client.status === "Novo" ? "outline" : "secondary"
                            }
                          >
                            {client.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{client.lastSession}</TableCell>
                        <TableCell>{client.nextSession}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              client.payment === "Pago"
                                ? "default"
                                : client.payment === "Pendente"
                                  ? "outline"
                                  : "secondary"
                            }
                          >
                            {client.payment}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="icon">
                              <Calendar className="h-4 w-4" />
                              <span className="sr-only">Agendar</span>
                            </Button>
                            <Button variant="outline" size="icon">
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">Notas</span>
                            </Button>
                            <Button variant="outline" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Mais</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="active" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Clientes Ativos</CardTitle>
                <CardDescription>Gerencie seus relacionamentos com clientes ativos</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Conteúdo de clientes ativos apareceria aqui</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="new" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Novos Clientes</CardTitle>
                <CardDescription>Integre e gerencie seus novos clientes</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Conteúdo de novos clientes apareceria aqui</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="inactive" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Clientes Inativos</CardTitle>
                <CardDescription>Revise e potencialmente reengage clientes inativos</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Conteúdo de clientes inativos apareceria aqui</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
