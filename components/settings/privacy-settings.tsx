"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function PrivacySettings() {
  const [isLoading, setIsLoading] = useState(false)

  function savePrivacySettings() {
    setIsLoading(true)

    // Simulação de envio para API
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Configurações de privacidade atualizadas",
        description: "Suas preferências de privacidade foram salvas com sucesso.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Visibilidade do perfil</CardTitle>
          <CardDescription>Controle quem pode ver seu perfil profissional</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup defaultValue="clients-only" className="space-y-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="public" id="public" />
              <Label htmlFor="public" className="flex flex-col">
                <span>Público</span>
                <span className="text-sm font-normal text-muted-foreground">
                  Qualquer pessoa pode ver seu perfil profissional.
                </span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="clients-only" id="clients-only" />
              <Label htmlFor="clients-only" className="flex flex-col">
                <span>Apenas clientes</span>
                <span className="text-sm font-normal text-muted-foreground">
                  Somente seus clientes atuais podem ver seu perfil completo.
                </span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="private" id="private" />
              <Label htmlFor="private" className="flex flex-col">
                <span>Privado</span>
                <span className="text-sm font-normal text-muted-foreground">Seu perfil só é visível para você.</span>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compartilhamento de dados</CardTitle>
          <CardDescription>Controle como seus dados são compartilhados</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="share-analytics"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Compartilhar dados de uso anônimos
              </label>
              <p className="text-sm text-muted-foreground">
                Ajude-nos a melhorar a plataforma compartilhando dados de uso anônimos.
              </p>
            </div>
            <Switch id="share-analytics" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="share-testimonials"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Permitir uso de depoimentos
              </label>
              <p className="text-sm text-muted-foreground">
                Permitir que usemos seus depoimentos em materiais promocionais.
              </p>
            </div>
            <Switch id="share-testimonials" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="third-party-sharing"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Compartilhamento com terceiros
              </label>
              <p className="text-sm text-muted-foreground">
                Permitir compartilhamento de dados com parceiros selecionados.
              </p>
            </div>
            <Switch id="third-party-sharing" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Segurança de dados</CardTitle>
          <CardDescription>Configure opções adicionais de segurança</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="session-timeout"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Tempo limite de sessão
              </label>
              <p className="text-sm text-muted-foreground">
                Encerrar sessão automaticamente após período de inatividade.
              </p>
            </div>
            <Select defaultValue="30">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione o tempo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutos</SelectItem>
                <SelectItem value="30">30 minutos</SelectItem>
                <SelectItem value="60">1 hora</SelectItem>
                <SelectItem value="120">2 horas</SelectItem>
                <SelectItem value="never">Nunca</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="login-history"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Histórico de login
              </label>
              <p className="text-sm text-muted-foreground">Manter histórico de logins para fins de segurança.</p>
            </div>
            <Switch id="login-history" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="data-encryption"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Criptografia avançada
              </label>
              <p className="text-sm text-muted-foreground">Usar criptografia de ponta a ponta para dados sensíveis.</p>
            </div>
            <Switch id="data-encryption" defaultChecked />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={savePrivacySettings} disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar configurações"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
