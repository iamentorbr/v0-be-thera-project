"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Calendar, ExternalLink, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type CalendarProvider = {
  id: string
  name: string
  icon: string
  connected: boolean
  lastSync?: string
}

export function CalendarIntegration() {
  const [isLoading, setIsLoading] = useState(false)
  const [syncLoading, setSyncLoading] = useState<string | null>(null)

  // Estado simulado dos provedores de calendário
  const [providers, setProviders] = useState<CalendarProvider[]>([
    {
      id: "google",
      name: "Google Calendar",
      icon: "google",
      connected: true,
      lastSync: "2023-05-01T14:30:00Z",
    },
    {
      id: "outlook",
      name: "Microsoft Outlook",
      icon: "microsoft",
      connected: false,
    },
    {
      id: "apple",
      name: "Apple Calendar",
      icon: "apple",
      connected: false,
    },
    {
      id: "caldav",
      name: "CalDAV",
      icon: "calendar",
      connected: false,
    },
  ])

  // Configurações de sincronização
  const [syncSettings, setSyncSettings] = useState({
    autoSync: true,
    syncDirection: "bidirectional",
    syncFrequency: "realtime",
    includeDetails: true,
    syncPast: "30",
  })

  function saveSettings() {
    setIsLoading(true)

    // Simulação de envio para API
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Configurações de calendário salvas",
        description: "Suas preferências de integração foram atualizadas com sucesso.",
      })
    }, 1000)
  }

  function connectCalendar(providerId: string) {
    // Aqui seria implementada a lógica de autenticação OAuth com o provedor
    // Simulação de conexão bem-sucedida
    setProviders(
      providers.map((provider) =>
        provider.id === providerId ? { ...provider, connected: true, lastSync: new Date().toISOString() } : provider,
      ),
    )

    toast({
      title: "Calendário conectado",
      description: `Seu calendário foi conectado com sucesso.`,
    })
  }

  function disconnectCalendar(providerId: string) {
    // Simulação de desconexão
    setProviders(
      providers.map((provider) =>
        provider.id === providerId ? { ...provider, connected: false, lastSync: undefined } : provider,
      ),
    )

    toast({
      title: "Calendário desconectado",
      description: `Seu calendário foi desconectado com sucesso.`,
    })
  }

  function syncNow(providerId: string) {
    setSyncLoading(providerId)

    // Simulação de sincronização
    setTimeout(() => {
      setSyncLoading(null)
      setProviders(
        providers.map((provider) =>
          provider.id === providerId ? { ...provider, lastSync: new Date().toISOString() } : provider,
        ),
      )

      toast({
        title: "Sincronização concluída",
        description: `Seu calendário foi sincronizado com sucesso.`,
      })
    }, 2000)
  }

  function formatLastSync(dateString?: string) {
    if (!dateString) return "Nunca sincronizado"

    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Integrações de Calendário</CardTitle>
          <CardDescription>Conecte e sincronize seus calendários externos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-muted rounded-md">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">{provider.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {provider.connected ? (
                      <>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Conectado
                        </Badge>
                        <span>Última sincronização: {formatLastSync(provider.lastSync)}</span>
                      </>
                    ) : (
                      <Badge variant="outline" className="bg-muted">
                        Desconectado
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {provider.connected ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => syncNow(provider.id)}
                      disabled={syncLoading === provider.id}
                    >
                      {syncLoading === provider.id ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Sincronizando...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Sincronizar
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => disconnectCalendar(provider.id)}>
                      Desconectar
                    </Button>
                  </>
                ) : (
                  <Button variant="default" size="sm" onClick={() => connectCalendar(provider.id)}>
                    Conectar
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configurações de Sincronização</CardTitle>
          <CardDescription>Personalize como seus calendários são sincronizados</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="auto-sync"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Sincronização automática
              </label>
              <p className="text-sm text-muted-foreground">
                Sincronizar automaticamente eventos entre BeTHERA e calendários externos
              </p>
            </div>
            <Switch
              id="auto-sync"
              checked={syncSettings.autoSync}
              onCheckedChange={(checked) => setSyncSettings({ ...syncSettings, autoSync: checked })}
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium leading-none">Direção da sincronização</h3>
            <Select
              value={syncSettings.syncDirection}
              onValueChange={(value) => setSyncSettings({ ...syncSettings, syncDirection: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a direção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bidirectional">Bidirecional (ambas as direções)</SelectItem>
                <SelectItem value="to_external">Apenas para calendário externo</SelectItem>
                <SelectItem value="from_external">Apenas do calendário externo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium leading-none">Frequência de sincronização</h3>
            <Select
              value={syncSettings.syncFrequency}
              onValueChange={(value) => setSyncSettings({ ...syncSettings, syncFrequency: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a frequência" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realtime">Em tempo real</SelectItem>
                <SelectItem value="15min">A cada 15 minutos</SelectItem>
                <SelectItem value="hourly">A cada hora</SelectItem>
                <SelectItem value="daily">Diariamente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="include-details"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Incluir detalhes do cliente
              </label>
              <p className="text-sm text-muted-foreground">
                Incluir informações detalhadas do cliente nos eventos do calendário
              </p>
            </div>
            <Switch
              id="include-details"
              checked={syncSettings.includeDetails}
              onCheckedChange={(checked) => setSyncSettings({ ...syncSettings, includeDetails: checked })}
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium leading-none">Sincronizar eventos passados</h3>
            <Select
              value={syncSettings.syncPast}
              onValueChange={(value) => setSyncSettings({ ...syncSettings, syncPast: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Não sincronizar eventos passados</SelectItem>
                <SelectItem value="7">Últimos 7 dias</SelectItem>
                <SelectItem value="30">Últimos 30 dias</SelectItem>
                <SelectItem value="90">Últimos 90 dias</SelectItem>
                <SelectItem value="365">Último ano</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={saveSettings} disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar configurações"}
          </Button>
        </CardFooter>
      </Card>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Importante</AlertTitle>
        <AlertDescription>
          Ao conectar calendários externos, você concede permissão para ler e modificar eventos. Recomendamos revisar as
          configurações de privacidade de cada serviço.
          <div className="mt-2">
            <a href="#" className="text-primary inline-flex items-center hover:underline">
              Saiba mais sobre integrações de calendário
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  )
}
