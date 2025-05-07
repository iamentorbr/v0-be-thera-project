"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MoonStar, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RegisterPage() {
  const router = useRouter()
  const [userType, setUserType] = useState("therapist")
  const [inviteCode, setInviteCode] = useState("")
  const [inviteError, setInviteError] = useState("")
  const [isValidatingCode, setIsValidatingCode] = useState(false)
  const [therapistInfo, setTherapistInfo] = useState<{ name: string; specialty: string } | null>(null)

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // Em uma aplicação real, você registraria o usuário aqui
    if (userType === "therapist") {
      router.push("/therapist/dashboard")
    } else {
      // Verificar se o código de convite é válido antes de prosseguir
      if (!therapistInfo) {
        setInviteError("Por favor, valide o código de convite primeiro.")
        return
      }
      router.push("/client/dashboard")
    }
  }

  const validateInviteCode = () => {
    if (!inviteCode.trim()) {
      setInviteError("Por favor, insira um código de convite.")
      return
    }

    setIsValidatingCode(true)
    setInviteError("")

    // Simulação de validação do código de convite
    // Em uma aplicação real, isso seria uma chamada à API
    setTimeout(() => {
      // Simulando um código válido para demonstração
      if (inviteCode === "DEMO123" || inviteCode === "TEST456") {
        setTherapistInfo({
          name: inviteCode === "DEMO123" ? "Dra. Ana Silva" : "Dr. Carlos Mendes",
          specialty: inviteCode === "DEMO123" ? "Psicologia" : "Terapia",
        })
      } else {
        setInviteError("Código de convite inválido. Por favor, verifique com seu terapeuta.")
        setTherapistInfo(null)
      }
      setIsValidatingCode(false)
    }, 1500)
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex justify-center">
            <MoonStar className="h-10 w-10" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Criar uma conta</h1>
          <p className="text-sm text-muted-foreground">Digite seus dados para criar sua conta</p>
        </div>
        <Tabs defaultValue="therapist" className="w-full" onValueChange={setUserType}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="therapist">Terapeuta</TabsTrigger>
            <TabsTrigger value="client">Cliente</TabsTrigger>
          </TabsList>
          <TabsContent value="therapist">
            <Card>
              <CardHeader>
                <CardTitle>Cadastro de Terapeuta</CardTitle>
                <CardDescription>Crie sua conta de terapeuta para começar a gerenciar clientes</CardDescription>
              </CardHeader>
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" placeholder="João Silva" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="nome@exemplo.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Especialidade</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione sua especialidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="therapy">Terapia</SelectItem>
                        <SelectItem value="tarot">Tarologia</SelectItem>
                        <SelectItem value="astrology">Astrologia</SelectItem>
                        <SelectItem value="psychology">Psicologia</SelectItem>
                        <SelectItem value="coaching">Coaching</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input id="password" type="password" required />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button type="submit" className="w-full">
                    Criar Conta
                  </Button>
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    Já tem uma conta?{" "}
                    <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                      Entrar
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="client">
            <Card>
              <CardHeader>
                <CardTitle>Cadastro de Cliente</CardTitle>
                <CardDescription>
                  Para se cadastrar como cliente, você precisa de um código de convite do seu terapeuta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="invite-code">Código de Convite</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="invite-code"
                      placeholder="Digite o código fornecido pelo seu terapeuta"
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={validateInviteCode}
                      disabled={isValidatingCode || !inviteCode.trim()}
                    >
                      {isValidatingCode ? "Validando..." : "Validar"}
                    </Button>
                  </div>
                  {inviteError && (
                    <Alert variant="destructive" className="mt-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{inviteError}</AlertDescription>
                    </Alert>
                  )}
                </div>

                {therapistInfo && (
                  <Alert className="bg-muted">
                    <AlertDescription className="space-y-2">
                      <p className="font-medium">Código válido! Você será vinculado a:</p>
                      <p>
                        <span className="font-medium">Terapeuta:</span> {therapistInfo.name}
                      </p>
                      <p>
                        <span className="font-medium">Especialidade:</span> {therapistInfo.specialty}
                      </p>
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleRegister}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="client-name">Nome Completo</Label>
                      <Input id="client-name" placeholder="João Silva" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="client-email">E-mail</Label>
                      <Input id="client-email" type="email" placeholder="nome@exemplo.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="client-password">Senha</Label>
                      <Input id="client-password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full" disabled={!therapistInfo}>
                      Criar Conta
                    </Button>
                  </div>
                </form>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Já tem uma conta?{" "}
                  <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                    Entrar
                  </Link>
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
