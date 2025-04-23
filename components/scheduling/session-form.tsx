"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Video, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import { TimePicker } from "@/components/ui/time-picker"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

interface SessionFormProps {
  isTherapist?: boolean
  preselectedClient?: string
  onSuccess?: () => void
}

export function SessionForm({ isTherapist = true, preselectedClient, onSuccess }: SessionFormProps) {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState<string | undefined>(undefined)
  const [sessionType, setSessionType] = useState("video")
  const [client, setClient] = useState(preselectedClient || "")
  const [notes, setNotes] = useState("")
  const [duration, setDuration] = useState("60")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Simulação de clientes para o terapeuta selecionar
  const clients = [
    { id: "1", name: "Maria Santos" },
    { id: "2", name: "João Oliveira" },
    { id: "3", name: "Ana Silva" },
    { id: "4", name: "Carlos Mendes" },
    { id: "5", name: "Lúcia Ferreira" },
  ]

  // Simulação de terapeutas para o cliente selecionar
  const therapists = [
    { id: "1", name: "Dr. Paulo Ribeiro - Psicólogo" },
    { id: "2", name: "Dra. Carla Sousa - Terapeuta" },
    { id: "3", name: "Marcos Almeida - Tarólogo" },
    { id: "4", name: "Juliana Costa - Astróloga" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!date || !time) {
      toast({
        title: "Erro no agendamento",
        description: "Por favor, selecione uma data e horário para a sessão.",
        variant: "destructive",
      })
      return
    }

    if (isTherapist && !client) {
      toast({
        title: "Erro no agendamento",
        description: "Por favor, selecione um cliente para a sessão.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Aqui seria a chamada para a API para salvar o agendamento
      // Por enquanto, vamos apenas simular um atraso
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Sessão agendada com sucesso!",
        description: `Sessão agendada para ${date.toLocaleDateString("pt-BR")} às ${time}.`,
      })

      if (onSuccess) {
        onSuccess()
      } else {
        // Redirecionar para a página de sessões
        router.push(isTherapist ? "/therapist/sessions" : "/client/sessions")
      }
    } catch (error) {
      toast({
        title: "Erro no agendamento",
        description: "Ocorreu um erro ao agendar a sessão. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isTherapist ? "Agendar Nova Sessão" : "Solicitar Agendamento"}</CardTitle>
        <CardDescription>
          {isTherapist ? "Agende uma nova sessão com seu cliente" : "Solicite um horário com seu terapeuta"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {isTherapist ? (
            <div className="space-y-2">
              <Label htmlFor="client">Cliente</Label>
              <Select value={client} onValueChange={setClient}>
                <SelectTrigger id="client">
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="therapist">Terapeuta</Label>
              <Select>
                <SelectTrigger id="therapist">
                  <SelectValue placeholder="Selecione um terapeuta" />
                </SelectTrigger>
                <SelectContent>
                  {therapists.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <DatePicker date={date} setDate={setDate} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Horário</Label>
              <TimePicker time={time} setTime={setTime} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duração</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger id="duration">
                <SelectValue placeholder="Selecione a duração" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minutos</SelectItem>
                <SelectItem value="45">45 minutos</SelectItem>
                <SelectItem value="60">1 hora</SelectItem>
                <SelectItem value="90">1 hora e 30 minutos</SelectItem>
                <SelectItem value="120">2 horas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tipo de Sessão</Label>
            <RadioGroup defaultValue={sessionType} onValueChange={setSessionType} className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="video" id="video" />
                <Label htmlFor="video" className="flex items-center cursor-pointer">
                  <Video className="mr-2 h-4 w-4" />
                  Videochamada
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="inperson" id="inperson" />
                <Label htmlFor="inperson" className="flex items-center cursor-pointer">
                  <MapPin className="mr-2 h-4 w-4" />
                  Presencial
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              placeholder="Adicione informações relevantes sobre a sessão"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Agendando..." : "Agendar Sessão"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
