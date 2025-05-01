"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { ClientReminderPreferences } from "@/components/reminders/client-reminder-preferences"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Dados simulados de cliente
const mockClient = {
  id: "1",
  name: "Maria Silva",
}

export default function ClientRemindersPage() {
  const params = useParams()
  const clientId = params.id as string
  const [client, setClient] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Aqui seria a chamada para a API para buscar os dados do cliente
    // Por enquanto, vamos apenas simular um atraso e usar dados mockados
    const fetchClient = async () => {
      setIsLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))
        setClient(mockClient)
      } catch (error) {
        console.error("Erro ao buscar dados do cliente:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchClient()
  }, [clientId])

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 animate-pulse rounded-full bg-muted"></div>
          <div className="h-6 w-40 animate-pulse rounded-md bg-muted"></div>
        </div>
        <div className="h-[600px] animate-pulse rounded-md bg-muted"></div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/therapist/clients/${clientId}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Preferências de Lembretes</h2>
        </div>
      </div>

      <div className="grid gap-4">
        <ClientReminderPreferences clientId={clientId} clientName={client.name} />
      </div>
    </div>
  )
}
