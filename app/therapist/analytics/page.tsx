"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"
import { ConfirmationRateChart } from "@/components/analytics/confirmation-rate-chart"
import { ClientConfirmationTable } from "@/components/analytics/client-confirmation-table"
import { PeriodFilter } from "@/components/analytics/period-filter"

export default function AnalyticsPage() {
  const [startDate, setStartDate] = useState<Date>(new Date(new Date().setMonth(new Date().getMonth() - 1)))
  const [endDate, setEndDate] = useState<Date>(new Date())

  const handlePeriodChange = (start: Date, end: Date) => {
    setStartDate(start)
    setEndDate(end)
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Análise de Confirmações</h2>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar Dados
        </Button>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Filtros</CardTitle>
            <CardDescription>Selecione o período para análise</CardDescription>
          </CardHeader>
          <CardContent>
            <PeriodFilter onPeriodChange={handlePeriodChange} />
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Confirmação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">76%</div>
              <p className="text-xs text-muted-foreground">+2% desde o período anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Recusa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12%</div>
              <p className="text-xs text-muted-foreground">-1% desde o período anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sem Resposta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12%</div>
              <p className="text-xs text-muted-foreground">-1% desde o período anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Sessões</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124</div>
              <p className="text-xs text-muted-foreground">+8 desde o período anterior</p>
            </CardContent>
          </Card>
        </div>

        <ConfirmationRateChart />

        <Tabs defaultValue="clients" className="space-y-4">
          <TabsList>
            <TabsTrigger value="clients">Por Cliente</TabsTrigger>
            <TabsTrigger value="sessions">Por Sessão</TabsTrigger>
          </TabsList>
          <TabsContent value="clients" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Taxa de Confirmação por Cliente</CardTitle>
                <CardDescription>Análise detalhada por cliente no período selecionado</CardDescription>
              </CardHeader>
              <CardContent>
                <ClientConfirmationTable />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="sessions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Taxa de Confirmação por Tipo de Sessão</CardTitle>
                <CardDescription>Análise detalhada por tipo de sessão no período selecionado</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-16 w-16 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    A análise por tipo de sessão estará disponível em breve
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
