"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { TimePicker } from "@/components/ui/time-picker"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

interface CreateSessionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateSessionDialog({ open, onOpenChange }: CreateSessionDialogProps) {
  const { toast } = useToast()
  const [isRecurring, setIsRecurring] = useState(false)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [startTime, setStartTime] = useState<Date | undefined>(new Date())
  const [endTime, setEndTime] = useState<Date | undefined>(new Date(new Date().setHours(new Date().getHours() + 1)))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Aqui seria implementada a lógica para salvar a sessão

    toast({
      title: "Sessão agendada",
      description: "A sessão foi agendada com sucesso.",
    })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Agendar Nova Sessão</DialogTitle>
          <DialogDescription>Preencha os detalhes para agendar uma nova sessão com seu cliente.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="client">Cliente</Label>
                <Select required>
                  <SelectTrigger id="client">
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Maria Oliveira</SelectItem>
                    <SelectItem value="2">João Santos</SelectItem>
                    <SelectItem value="3">Ana Silva</SelectItem>
                    <SelectItem value="4">Carlos Mendes</SelectItem>
                    <SelectItem value="5">Juliana Costa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="session-type">Tipo de Sessão</Label>
                <Select required>
                  <SelectTrigger id="session-type">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="initial">Consulta Inicial</SelectItem>
                    <SelectItem value="followup">Acompanhamento</SelectItem>
                    <SelectItem value="therapy">Sessão de Terapia</SelectItem>
                    <SelectItem value="coaching">Sessão de Coaching</SelectItem>
                    <SelectItem value="emergency">Atendimento de Emergência</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="modality">Modalidade</Label>
                <Select required>
                  <SelectTrigger id="modality">
                    <SelectValue placeholder="Selecione a modalidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in-person">Presencial</SelectItem>
                    <SelectItem value="video">Videoconferência</SelectItem>
                    <SelectItem value="phone">Telefone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>
                <DatePicker date={date} setDate={setDate} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="start-time">Horário de Início</Label>
                <TimePicker date={startTime} setDate={setStartTime} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="end-time">Horário de Término</Label>
                <TimePicker date={endTime} setDate={setEndTime} />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="recurring" checked={isRecurring} onCheckedChange={setIsRecurring} />
              <Label htmlFor="recurring">Sessão recorrente</Label>
            </div>

            {isRecurring && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="recurrence">Recorrência</Label>
                  <Select>
                    <SelectTrigger id="recurrence">
                      <SelectValue placeholder="Selecione a recorrência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="biweekly">Quinzenal</SelectItem>
                      <SelectItem value="monthly">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occurrences">Número de Ocorrências</Label>
                  <Input id="occurrences" type="number" min="2" max="52" defaultValue="4" />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="notes">Observações</Label>
              <Textarea
                id="notes"
                placeholder="Adicione notas ou observações sobre esta sessão"
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Agendar Sessão</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
