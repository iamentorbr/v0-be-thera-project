import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GenerateInviteCode } from "@/components/clients/generate-invite-code"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Dados simulados de convites
const invites = [
  {
    id: 1,
    code: "CLIENT-X7F9D2",
    email: "maria@exemplo.com",
    name: "Maria Silva",
    status: "pending",
    created: "2023-05-01T10:30:00Z",
    expires: "2023-05-08T10:30:00Z",
  },
  {
    id: 2,
    code: "CLIENT-A3B7C9",
    email: "joao@exemplo.com",
    name: "João Santos",
    status: "used",
    created: "2023-04-28T14:15:00Z",
    expires: "2023-05-05T14:15:00Z",
    usedAt: "2023-04-29T09:22:00Z",
  },
  {
    id: 3,
    code: "CLIENT-K4L8M2",
    email: "ana@exemplo.com",
    name: "Ana Oliveira",
    status: "expired",
    created: "2023-04-20T16:45:00Z",
    expires: "2023-04-27T16:45:00Z",
  },
]

export default function ClientInvitesPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Convites para Clientes</h1>
      </div>

      <Tabs defaultValue="generate">
        <TabsList>
          <TabsTrigger value="generate">Gerar Convite</TabsTrigger>
          <TabsTrigger value="history">Histórico de Convites</TabsTrigger>
        </TabsList>
        <TabsContent value="generate" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GenerateInviteCode />

            <Card>
              <CardHeader>
                <CardTitle>Instruções</CardTitle>
                <CardDescription>Como funciona o sistema de convites para clientes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">1. Gere um código de convite</h3>
                  <p className="text-sm text-muted-foreground">
                    Crie um código único para cada cliente que deseja convidar para a plataforma.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">2. Compartilhe o código</h3>
                  <p className="text-sm text-muted-foreground">
                    Envie o código por e-mail diretamente pela plataforma ou copie e compartilhe por outro meio.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">3. Cliente se cadastra</h3>
                  <p className="text-sm text-muted-foreground">
                    O cliente usa o código na página de cadastro e é automaticamente vinculado ao seu perfil.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">4. Acompanhe os convites</h3>
                  <p className="text-sm text-muted-foreground">
                    Monitore quais convites foram utilizados e quais ainda estão pendentes na aba "Histórico de
                    Convites".
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Convites</CardTitle>
              <CardDescription>Acompanhe o status dos convites enviados para seus clientes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data de Criação</TableHead>
                    <TableHead>Expira em</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invites.map((invite) => (
                    <TableRow key={invite.id}>
                      <TableCell className="font-mono">{invite.code}</TableCell>
                      <TableCell>{invite.name}</TableCell>
                      <TableCell>{invite.email}</TableCell>
                      <TableCell>
                        {invite.status === "pending" && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                            Pendente
                          </Badge>
                        )}
                        {invite.status === "used" && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                            Utilizado
                          </Badge>
                        )}
                        {invite.status === "expired" && (
                          <Badge variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                            Expirado
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{new Date(invite.created).toLocaleDateString("pt-BR")}</TableCell>
                      <TableCell>{new Date(invite.expires).toLocaleDateString("pt-BR")}</TableCell>
                      <TableCell>
                        {invite.status === "pending" && (
                          <Button variant="ghost" size="sm">
                            Reenviar
                          </Button>
                        )}
                        {invite.status === "expired" && (
                          <Button variant="ghost" size="sm">
                            Renovar
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
