"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import { useState } from "react"
import { Download, FileText } from "lucide-react"

// Dados de exemplo para o relatório
const monthlyData = [
  { month: "Janeiro", revenue: "R$ 4.200,00", sessions: 21, clients: 8 },
  { month: "Fevereiro", revenue: "R$ 4.600,00", sessions: 23, clients: 9 },
  { month: "Março", revenue: "R$ 5.000,00", sessions: 25, clients: 10 },
  { month: "Abril", revenue: "R$ 5.400,00", sessions: 27, clients: 12 },
]

export function FinancialReport() {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Relatório Financeiro</CardTitle>
            <CardDescription>Análise detalhada das suas finanças</CardDescription>
          </div>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exportar Relatório
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly" className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="monthly">Mensal</TabsTrigger>
              <TabsTrigger value="quarterly">Trimestral</TabsTrigger>
              <TabsTrigger value="yearly">Anual</TabsTrigger>
              <TabsTrigger value="custom">Personalizado</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <DatePicker date={startDate} setDate={setStartDate} placeholder="Data inicial" />
              <span className="text-muted-foreground">até</span>
              <DatePicker date={endDate} setDate={setEndDate} placeholder="Data final" />
            </div>
          </div>

          <TabsContent value="monthly" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 5.400,00</div>
                  <p className="text-xs text-muted-foreground">+8% em relação ao mês anterior</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Sessões Realizadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">27</div>
                  <p className="text-xs text-muted-foreground">+2 em relação ao mês anterior</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 200,00</div>
                  <p className="text-xs text-muted-foreground">+5% em relação ao mês anterior</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Taxa de Inadimplência</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3,2%</div>
                  <p className="text-xs text-muted-foreground">-1,5% em relação ao mês anterior</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Histórico Mensal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="grid grid-cols-4 font-medium text-sm">
                    <div>Mês</div>
                    <div>Receita</div>
                    <div>Sessões</div>
                    <div>Clientes</div>
                  </div>
                  {monthlyData.map((item, index) => (
                    <div key={index} className="grid grid-cols-4 text-sm py-2 border-t">
                      <div>{item.month}</div>
                      <div>{item.revenue}</div>
                      <div>{item.sessions}</div>
                      <div>{item.clients}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quarterly" className="space-y-4">
            <div className="flex items-center justify-center h-40">
              <div className="text-center">
                <FileText className="h-16 w-16 mx-auto text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">Relatório trimestral em desenvolvimento</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="yearly" className="space-y-4">
            <div className="flex items-center justify-center h-40">
              <div className="text-center">
                <FileText className="h-16 w-16 mx-auto text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">Relatório anual em desenvolvimento</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <div className="flex items-center justify-center h-40">
              <div className="text-center">
                <FileText className="h-16 w-16 mx-auto text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">Selecione um período personalizado acima</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
