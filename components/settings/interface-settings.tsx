"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { MoonIcon, SunIcon, MonitorIcon } from "lucide-react"

export function InterfaceSettings() {
  const [isLoading, setIsLoading] = useState(false)

  function saveInterfaceSettings() {
    setIsLoading(true)

    // Simulação de envio para API
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Configurações de interface atualizadas",
        description: "Suas preferências de interface foram salvas com sucesso.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tema</CardTitle>
          <CardDescription>Personalize a aparência da plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="system" className="grid grid-cols-3 gap-4">
            <div>
              <RadioGroupItem value="light" id="light" className="peer sr-only" />
              <Label
                htmlFor="light"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <SunIcon className="mb-3 h-6 w-6" />
                <span className="text-sm font-medium">Claro</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
              <Label
                htmlFor="dark"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <MoonIcon className="mb-3 h-6 w-6" />
                <span className="text-sm font-medium">Escuro</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="system" id="system" className="peer sr-only" />
              <Label
                htmlFor="system"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <MonitorIcon className="mb-3 h-6 w-6" />
                <span className="text-sm font-medium">Sistema</span>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Idioma</CardTitle>
          <CardDescription>Escolha o idioma da interface</CardDescription>
        </CardHeader>
        <CardContent>
          <Select defaultValue="pt-BR">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o idioma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
              <SelectItem value="en-US">English (US)</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Acessibilidade</CardTitle>
          <CardDescription>Configure opções de acessibilidade</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="high-contrast"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Alto contraste
              </label>
              <p className="text-sm text-muted-foreground">Aumentar o contraste para melhor visibilidade.</p>
            </div>
            <Switch id="high-contrast" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="reduce-motion"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Reduzir movimento
              </label>
              <p className="text-sm text-muted-foreground">Reduzir ou eliminar animações na interface.</p>
            </div>
            <Switch id="reduce-motion" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="larger-text"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Texto maior
              </label>
              <p className="text-sm text-muted-foreground">Aumentar o tamanho do texto em toda a interface.</p>
            </div>
            <Switch id="larger-text" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Layout da dashboard</CardTitle>
          <CardDescription>Personalize a visualização da sua dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="compact-view"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Visualização compacta
              </label>
              <p className="text-sm text-muted-foreground">Mostrar mais informações em menos espaço.</p>
            </div>
            <Switch id="compact-view" />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium leading-none">Página inicial</h3>
            <Select defaultValue="dashboard">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione a página" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dashboard">Dashboard</SelectItem>
                <SelectItem value="clients">Clientes</SelectItem>
                <SelectItem value="sessions">Sessões</SelectItem>
                <SelectItem value="payments">Pagamentos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="show-welcome"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Mostrar mensagem de boas-vindas
              </label>
              <p className="text-sm text-muted-foreground">Exibir mensagem de boas-vindas na dashboard.</p>
            </div>
            <Switch id="show-welcome" defaultChecked />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={saveInterfaceSettings} disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar configurações"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
