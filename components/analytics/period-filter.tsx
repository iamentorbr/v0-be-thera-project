"use client"

import { useState } from "react"
import { format, subDays, subMonths, subYears } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface PeriodFilterProps {
  onPeriodChange: (startDate: Date, endDate: Date) => void
}

export function PeriodFilter({ onPeriodChange }: PeriodFilterProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(subMonths(new Date(), 1))
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const [presetPeriod, setPresetPeriod] = useState<string>("30d")

  const handlePresetChange = (value: string) => {
    setPresetPeriod(value)

    const now = new Date()
    let start: Date

    switch (value) {
      case "7d":
        start = subDays(now, 7)
        break
      case "30d":
        start = subMonths(now, 1)
        break
      case "90d":
        start = subMonths(now, 3)
        break
      case "6m":
        start = subMonths(now, 6)
        break
      case "1y":
        start = subYears(now, 1)
        break
      default:
        start = subMonths(now, 1)
    }

    setStartDate(start)
    setEndDate(now)
    onPeriodChange(start, now)
  }

  const handleStartDateChange = (date: Date | undefined) => {
    if (date) {
      setStartDate(date)
      setPresetPeriod("custom")

      if (endDate) {
        onPeriodChange(date, endDate)
      }
    }
  }

  const handleEndDateChange = (date: Date | undefined) => {
    if (date) {
      setEndDate(date)
      setPresetPeriod("custom")

      if (startDate) {
        onPeriodChange(startDate, date)
      }
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Select value={presetPeriod} onValueChange={handlePresetChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecione o período" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="7d">Últimos 7 dias</SelectItem>
          <SelectItem value="30d">Últimos 30 dias</SelectItem>
          <SelectItem value="90d">Últimos 90 dias</SelectItem>
          <SelectItem value="6m">Últimos 6 meses</SelectItem>
          <SelectItem value="1y">Último ano</SelectItem>
          <SelectItem value="custom">Personalizado</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-[180px] justify-start text-left font-normal", !startDate && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, "dd/MM/yyyy", { locale: ptBR }) : "Data inicial"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={handleStartDateChange}
              initialFocus
              disabled={(date) => date > new Date() || (endDate ? date > endDate : false)}
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-[180px] justify-start text-left font-normal", !endDate && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate ? format(endDate, "dd/MM/yyyy", { locale: ptBR }) : "Data final"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={handleEndDateChange}
              initialFocus
              disabled={(date) => date > new Date() || (startDate ? date < startDate : false)}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
