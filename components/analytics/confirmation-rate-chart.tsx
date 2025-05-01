"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format, subDays } from "date-fns"
import { ptBR } from "date-fns/locale"

// Simulação de dados para o gráfico
const generateChartData = (days: number) => {
  const data = []
  const now = new Date()

  for (let i = days; i >= 0; i--) {
    const date = subDays(now, i)
    data.push({
      date: format(date, "dd/MM"),
      confirmed: Math.floor(Math.random() * 5) + 1,
      declined: Math.floor(Math.random() * 3),
      noResponse: Math.floor(Math.random() * 2),
    })
  }

  return data
}

interface ConfirmationRateChartProps {
  clientId?: string
  clientName?: string
}

export function ConfirmationRateChart({ clientId, clientName }: ConfirmationRateChartProps) {
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d")

  const chartData = {
    "7d": generateChartData(7),
    "30d": generateChartData(30),
    "90d": generateChartData(90),
  }

  const currentData = chartData[period]

  // Calcular totais
  const totals = currentData.reduce(
    (acc, day) => {
      acc.confirmed += day.confirmed
      acc.declined += day.declined
      acc.noResponse += day.noResponse
      acc.total += day.confirmed + day.declined + day.noResponse
      return acc
    },
    { confirmed: 0, declined: 0, noResponse: 0, total: 0 },
  )

  // Calcular percentuais
  const percentages = {
    confirmed: totals.total ? Math.round((totals.confirmed / totals.total) * 100) : 0,
    declined: totals.total ? Math.round((totals.declined / totals.total) * 100) : 0,
    noResponse: totals.total ? Math.round((totals.noResponse / totals.total) * 100) : 0,
  }

  // Determinar o período em texto
  const getPeriodText = () => {
    const now = new Date()
    switch (period) {
      case "7d":
        return `${format(subDays(now, 7), "dd/MM", { locale: ptBR })} - ${format(now, "dd/MM", { locale: ptBR })}`
      case "30d":
        return `${format(subDays(now, 30), "dd/MM", { locale: ptBR })} - ${format(now, "dd/MM", { locale: ptBR })}`
      case "90d":
        return `${format(subDays(now, 90), "dd/MM", { locale: ptBR })} - ${format(now, "dd/MM", { locale: ptBR })}`
      default:
        return ""
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{clientName ? `Estatísticas de ${clientName}` : "Estatísticas de Confirmação"}</CardTitle>
        <CardDescription>
          {clientName
            ? `Análise de confirmações de ${clientName} no período de ${getPeriodText()}`
            : `Análise de confirmações no período de ${getPeriodText()}`}
        </CardDescription>
        <Tabs value={period} onValueChange={(value) => setPeriod(value as "7d" | "30d" | "90d")}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="7d">7 dias</TabsTrigger>
            <TabsTrigger value="30d">30 dias</TabsTrigger>
            <TabsTrigger value="90d">90 dias</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] relative">
          {/* Aqui seria implementado um gráfico real com biblioteca como recharts */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="flex justify-between mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-500">{percentages.confirmed}%</div>
                  <div className="text-sm text-muted-foreground">Confirmadas</div>
                  <div className="text-sm font-medium">{totals.confirmed} sessões</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-destructive">{percentages.declined}%</div>
                  <div className="text-sm text-muted-foreground">Recusadas</div>
                  <div className="text-sm font-medium">{totals.declined} sessões</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-muted-foreground">{percentages.noResponse}%</div>
                  <div className="text-sm text-muted-foreground">Sem resposta</div>
                  <div className="text-sm font-medium">{totals.noResponse} sessões</div>
                </div>
              </div>

              <div className="w-full h-8 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500"
                  style={{
                    width: `${percentages.confirmed}%`,
                    display: "inline-block",
                  }}
                />
                <div
                  className="h-full bg-destructive"
                  style={{
                    width: `${percentages.declined}%`,
                    display: "inline-block",
                  }}
                />
                <div
                  className="h-full bg-muted-foreground"
                  style={{
                    width: `${percentages.noResponse}%`,
                    display: "inline-block",
                  }}
                />
              </div>

              <div className="mt-8 text-center text-sm text-muted-foreground">
                Total de {totals.total} sessões no período selecionado
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
