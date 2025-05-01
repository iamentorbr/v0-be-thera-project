"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowUpDown, ChevronRight } from "lucide-react"
import Link from "next/link"

// Dados simulados
const generateClientData = () => {
  const clients = [
    { id: "1", name: "Maria Silva", email: "maria.silva@example.com" },
    { id: "2", name: "João Santos", email: "joao.santos@example.com" },
    { id: "3", name: "Ana Oliveira", email: "ana.oliveira@example.com" },
    { id: "4", name: "Carlos Pereira", email: "carlos.pereira@example.com" },
    { id: "5", name: "Juliana Costa", email: "juliana.costa@example.com" },
    { id: "6", name: "Roberto Almeida", email: "roberto.almeida@example.com" },
    { id: "7", name: "Fernanda Lima", email: "fernanda.lima@example.com" },
    { id: "8", name: "Ricardo Souza", email: "ricardo.souza@example.com" },
  ]

  return clients.map((client) => ({
    ...client,
    totalSessions: Math.floor(Math.random() * 20) + 5,
    confirmed: Math.floor(Math.random() * 15) + 3,
    declined: Math.floor(Math.random() * 5),
    noResponse: Math.floor(Math.random() * 7),
    confirmationRate: Math.floor(Math.random() * 60) + 40,
  }))
}

const clientsData = generateClientData()

export function ClientConfirmationTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<string>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortDirection("asc")
    }
  }

  const filteredClients = clientsData
    .filter(
      (client) =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else if (sortBy === "confirmationRate") {
        return sortDirection === "asc"
          ? a.confirmationRate - b.confirmationRate
          : b.confirmationRate - a.confirmationRate
      } else if (sortBy === "totalSessions") {
        return sortDirection === "asc" ? a.totalSessions - b.totalSessions : b.totalSessions - a.totalSessions
      }
      return 0
    })

  const getConfirmationRateBadge = (rate: number) => {
    if (rate >= 80) return <Badge className="bg-emerald-500">Excelente</Badge>
    if (rate >= 60) return <Badge className="bg-green-500">Bom</Badge>
    if (rate >= 40) return <Badge className="bg-yellow-500">Regular</Badge>
    return <Badge className="bg-red-500">Baixo</Badge>
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar cliente..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" className="p-0 h-8 font-medium" onClick={() => handleSort("name")}>
                  Cliente
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 h-8 font-medium" onClick={() => handleSort("totalSessions")}>
                  Total de Sessões
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>Confirmadas</TableHead>
              <TableHead>Recusadas</TableHead>
              <TableHead>Sem Resposta</TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 h-8 font-medium" onClick={() => handleSort("confirmationRate")}>
                  Taxa de Confirmação
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  Nenhum cliente encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-xs text-muted-foreground">{client.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{client.totalSessions}</TableCell>
                  <TableCell>{client.confirmed}</TableCell>
                  <TableCell>{client.declined}</TableCell>
                  <TableCell>{client.noResponse}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{client.confirmationRate}%</span>
                      {getConfirmationRateBadge(client.confirmationRate)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/therapist/analytics/clients/${client.id}`}>
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Ver detalhes</span>
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
