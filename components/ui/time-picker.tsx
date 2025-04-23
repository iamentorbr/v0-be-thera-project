"use client"

import * as React from "react"
import { Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface TimePickerProps {
  time: string | undefined
  setTime: (time: string) => void
  className?: string
  availableTimes?: string[]
  disabled?: boolean
}

export function TimePicker({
  time,
  setTime,
  className,
  availableTimes = generateTimeSlots(),
  disabled,
}: TimePickerProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-start text-left font-normal", !time && "text-muted-foreground", className)}
          disabled={disabled}
        >
          <Clock className="mr-2 h-4 w-4" />
          {time ? time : <span>Selecione um horário</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar horário..." />
          <CommandList>
            <CommandEmpty>Nenhum horário encontrado.</CommandEmpty>
            <CommandGroup>
              {availableTimes.map((timeSlot) => (
                <CommandItem
                  key={timeSlot}
                  value={timeSlot}
                  onSelect={(currentValue) => {
                    setTime(currentValue)
                    setOpen(false)
                  }}
                >
                  {timeSlot}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

// Função para gerar horários de 30 em 30 minutos das 8h às 20h
function generateTimeSlots() {
  const timeSlots = []
  for (let hour = 8; hour < 20; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, "0")}:00`)
    timeSlots.push(`${hour.toString().padStart(2, "0")}:30`)
  }
  return timeSlots
}
