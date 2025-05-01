"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { TimePicker } from "@/components/ui/time-picker"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { Plus, Trash2 } from "lucide-react"

interface AvailabilitySlot {
  day: number
  startTime: string
  endTime: string
}

interface AvailabilityDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  availability: AvailabilitySlot[]
}

export function AvailabilityDialog({ open, onOpenChange, availability }: AvailabilityDialogProps) {
  const [slots, setSlots] = useState<AvailabilitySlot[]>(availability)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Dias da semana em português
  const weekDays = [
    { value: 1, label: "Segunda-feira" },
    { value: 2, label: "Terça-feira" },
    { value: 3, label: "Quarta-feira" },
    { value: 4, label: "Quinta-feira" },
    { value: 5, label: "Sexta-feira" },
    { value: 6, label: "Sábado" },
    { value: 7, label: "Domingo" },
  ]

  // Adicionar um novo slot de disponibilidade
  const addSlot = () => {
    setSlots([...slots, { day: 1, startTime: "09:00", endTime: "17:00" }])
  }

  // Remover um slot de disponibilidade
  const removeSlot = (index: number) => {
    setSlots(slots.filter((_, i) => i !== index))
  }

  // Atualizar um slot de disponibilidade
  const updateSlot = (index: number, field: keyof AvailabilitySlot, value: any) => {
    const updatedSlots = [...slots]
    updatedSlots[index] = { ...updatedSlots[index], [field]: value }
    setSlots(updatedSlots)
  }

  // Verificar se um dia está selecionado para um slot
  const isDaySelected = (slotIndex: number, day: number) => {
    return slots[slotIndex].day === day
  }

  // Selecionar um dia para um slot
  const toggleDay = (slotIndex: number, day: number) => {
    updateSlot(slotIndex, "day", day)
  }

  const handleSubmit = async () => {
    // Validar que os horários de início são anteriores aos de término
    const invalidSlots = slots.filter((slot) => slot.startTime >= slot.endTime)
    if (invalidSlots.length > 0) {
      toast({
        title: "Horários inválidos",
        description: "O horário de início deve ser anterior ao horário de término.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Aqui seria a chamada para a API para salvar a disponibilidade
      // Por enquanto, vamos apenas simular um atraso
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Disponibilidade salva com sucesso!",
        description: "Sua disponibilidade foi atualizada.",
      })

      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar sua disponibilidade. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Definir Disponibilidade</DialogTitle>
          <DialogDescription>
            Configure os dias e horários em que você está disponível para atendimentos.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4 max-h-[60vh] overflow-y-auto pr-2">
          {slots.map((slot, index) => (
            <div key={index} className="space-y-4 border p-4 rounded-md relative">
              <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeSlot(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>

              <div className="space-y-2">
                <Label>Dia da Semana</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {weekDays.map((day) => (
                    <div key={day.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`day-${index}-${day.value}`}
                        checked={isDaySelected(index, day.value)}
                        onCheckedChange={() => toggleDay(index, day.value)}
                      />
                      <Label htmlFor={`day-${index}-${day.value}`} className="text-sm cursor-pointer">
                        {day.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Horário de Início</Label>
                  <TimePicker time={slot.startTime} setTime={(time) => updateSlot(index, "startTime", time)} />
                </div>
                <div className="space-y-2">
                  <Label>Horário de Término</Label>
                  <TimePicker time={slot.endTime} setTime={(time) => updateSlot(index, "endTime", time)} />
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full" onClick={addSlot}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Horário
          </Button>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar Disponibilidade"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
