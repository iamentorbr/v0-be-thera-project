"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function ConfirmationPage({ params }: { params: { token: string } }) {
  const router = useRouter()
  const [status, setStatus] = useState<"loading" | "success" | "error" | "declined">("loading")
  const [sessionData, setSessionData] = useState<any>(null)

  // Simular dados da sessão
  useEffect(() => {
    // Em um ambiente real, faríamos uma chamada à API para validar o token
    // e obter os dados da sessão
    setTimeout(() => {
      // Simulando dados da sessão
      const mockSession = {
        id: "123",
        therapistName: "Dra. Ana Silva",
        clientName: "João Pereira",
        date: new Date("2025-05-10T14:30:00"),
        location: "Consultório 302, Edifício Medical Center",
        duration: 50,
        type: "Terapia Individual",
      }
      setSessionData(mockSession)
      setStatus("success")
    }, 1500)
  }, [params.token])

  const handleConfirm = async () => {
    setStatus("loading")
    // Simulando chamada à API para confirmar presença
    setTimeout(() => {
      setStatus("success")
      // Redirecionar após um tempo
      setTimeout(() => {
        router.push("/client/sessions")
      }, 3000)
    }, 1500)
  }

  const handleDecline = async () => {
    setStatus("loading")
    // Simulando chamada à API para recusar presença
    setTimeout(() => {
      setStatus("declined")
      // Redirecionar após um tempo
      setTimeout(() => {
        router.push("/client/sessions")
      }, 3000)
    }, 1500)
  }

  if (status === "loading" && !sessionData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Verificando informações...</CardTitle>
            <CardDescription>Estamos validando os dados da sua sessão</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-6">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (status === "success" && sessionData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Confirmar Presença</CardTitle>
            <CardDescription>Confirme sua presença na sessão com {sessionData.therapistName}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4 space-y-3">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Terapeuta:</span>
                <p className="font-medium">{sessionData.therapistName}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Data e Hora:</span>
                <p className="font-medium">
                  {format(sessionData.date, "EEEE, dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Duração:</span>
                <p className="font-medium">{sessionData.duration} minutos</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Local:</span>
                <p className="font-medium">{sessionData.location}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Tipo de Sessão:</span>
                <p className="font-medium">{sessionData.type}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleDecline}>
              Não poderei comparecer
            </Button>
            <Button onClick={handleConfirm}>Confirmar presença</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  if (status === "success") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle>Presença Confirmada!</CardTitle>
            <CardDescription>
              Sua presença foi confirmada com sucesso. Você será redirecionado em instantes.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (status === "declined") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-10 w-10 text-red-600" />
            </div>
            <CardTitle>Ausência Registrada</CardTitle>
            <CardDescription>
              Registramos que você não poderá comparecer. Seu terapeuta será notificado.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-10 w-10 text-red-600" />
          </div>
          <CardTitle>Link Inválido</CardTitle>
          <CardDescription>
            Este link de confirmação é inválido ou expirou. Por favor, entre em contato com seu terapeuta.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
