"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MoonStar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const [userType, setUserType] = useState("therapist")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would authenticate the user here
    if (userType === "therapist") {
      router.push("/therapist/dashboard")
    } else {
      router.push("/client/dashboard")
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex justify-center">
            <MoonStar className="h-10 w-10" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Bem-vindo(a) de volta</h1>
          <p className="text-sm text-muted-foreground">Digite seu e-mail para entrar na sua conta</p>
        </div>
        <Tabs defaultValue="therapist" className="w-full" onValueChange={setUserType}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="therapist">Terapeuta</TabsTrigger>
            <TabsTrigger value="client">Cliente</TabsTrigger>
          </TabsList>
          <TabsContent value="therapist">
            <Card>
              <CardHeader>
                <CardTitle>Login de Terapeuta</CardTitle>
                <CardDescription>Digite suas credenciais para acessar seu painel de terapeuta</CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="nome@exemplo.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input id="password" type="password" required />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button type="submit" className="w-full">
                    Entrar
                  </Button>
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    Não tem uma conta?{" "}
                    <Link href="/register" className="underline underline-offset-4 hover:text-primary">
                      Cadastre-se
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="client">
            <Card>
              <CardHeader>
                <CardTitle>Login de Cliente</CardTitle>
                <CardDescription>Digite suas credenciais para acessar seu portal de cliente</CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="client-email">E-mail</Label>
                    <Input id="client-email" type="email" placeholder="nome@exemplo.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-password">Senha</Label>
                    <Input id="client-password" type="password" required />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button type="submit" className="w-full">
                    Entrar
                  </Button>
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    Não tem uma conta?{" "}
                    <Link href="/register" className="underline underline-offset-4 hover:text-primary">
                      Cadastre-se
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
