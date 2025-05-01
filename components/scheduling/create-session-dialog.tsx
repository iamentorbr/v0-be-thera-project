"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Video, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DatePicker } from "@/components/ui/date-picker"
import { TimePicker } from "@/components/ui/time-picker"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

interface CreateSessionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedDate?: Date
}

export function CreateSessionDialog({ open, onOpenChange, selectedDate }: CreateSessionDialogProps) {
  const [date, setDate] = useState<Date | undefined>(selectedDate || new Date())
  const [startTime, setStartTime] = useState<string | undefined>(undefined)
  const [endTime, setEndTime] = useState<string | undefined>(undefined)
  const [sessionType, setSessionType] = useState("video")
  const [client, setClient] = useState("")
  const [notes, setNotes] = useState("")
  const [duration, setDuration] = useState("60")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRecurring, setIsRecurring] = useState(false)
  const [recurrencePattern, setRecurrencePattern] = useState("weekly")
  const [recurrenceEnd, setRecurrenceEnd] = useState<Date | undefined>(undefined)

  // Simulação de clientes para o terapeuta selecionar
  const clients = [
    { id: "1", name: "Maria Santos" },
    { id: "2", name: "João Oliveira" },
    { id: "3", name: "Ana Silva" },
    { id: "4", name: "Carlos Mendes" },
    { id: "5", name: "Lúcia Ferreira" },
  ]

  // Função para calcular o horário de término com base no horário de início e duração
  const calculateEndTime = (start: string, durationMinutes: number) => {
    if (!start) return undefined

    const [hours, minutes] = start.split(":").map(Number)
    let endHours = hours + Math.floor((minutes + durationMinutes) / 60)
    const endMinutes = (minutes + durationMinutes) % 60

    // Ajustar para formato 24h
    if (endHours >= 24) {
      endHours -= 24
    }

    return `${endHours.toString().padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")}`
  }

  // Atualizar o horário de término quando o horário de início ou a duração mudar
  const handleStartTimeChange = (time: string) => {
    setStartTime(time)
    setEndTime(calculateEndTime(time, Number.parseInt(duration)))
  }

  const handleDurationChange = (newDuration: string) => {
    setDuration(newDuration)
    if (startTime) {
      setEndTime(calculateEndTime(startTime, Number.parseInt(newDuration)))
    }
  }

  const handleSubmit = async () => {
    if (!date || !startTime || !endTime) {
      toast({
        title: "Erro no agendamento",
        description: "Por favor, selecione uma data e horário para a sessão.",
        variant: "destructive",
      })
      return
    }

    if (!client) {
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

      const recurrenceText = isRecurring
        ? ` (recorrente ${
            recurrencePattern === "weekly"
              ? "semanalmente"
              : recurrencePattern === "biweekly"
                ? "quinzenalmente"
                : "mensalmente"
          })`
        : ""

      toast({
        title: "Sessão agendada com sucesso!",
        description: `Sessão agendada para ${format(date, "dd/MM/yyyy", { locale: ptBR })} às ${startTime}${recurrenceText}.`,
      })

      onOpenChange(false)
      resetForm()
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

  const resetForm = () => {
    setStartTime(undefined)
    setEndTime(undefined)
    setSessionType("video")
    setClient("")
    setNotes("")
    setDuration("60")
    setIsRecurring(false)
    setRecurrencePattern("weekly")
    setRecurrenceEnd(undefined)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Agendar Nova Sessão</DialogTitle>
          <DialogDescription>Preencha os detalhes para agendar uma nova sessão com seu cliente.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <DatePicker date={date} setDate={setDate} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Horário de Início</Label>
              <TimePicker time={startTime} setTime={handleStartTimeChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duração</Label>
              <Select value={duration} onValueChange={handleDurationChange}>
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
              <Label htmlFor="endTime">Horário de Término</Label>
              <TimePicker time={endTime} setTime={setEndTime} disabled />
            </div>
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
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="recurring"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="recurring">Sessão recorrente</Label>
            </div>

            {isRecurring && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 pl-6">
                <div className="space-y-2">
                  <Label htmlFor="recurrencePattern">Frequência</Label>
                  <Select value={recurrencePattern} onValueChange={setRecurrencePattern}>
                    <SelectTrigger id="recurrencePattern">
                      <SelectValue placeholder="Selecione a frequência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="biweekly">Quinzenal</SelectItem>
                      <SelectItem value="monthly">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recurrenceEnd">Até</Label>
                  <DatePicker date={recurrenceEnd} setDate={setRecurrenceEnd} />
                </div>
              </div>
            )}
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
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Agendando..." : "Agendar Sessão"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
