"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  label?: string
  className?: string
}

export function ColorPicker({ color, onChange, label, className }: ColorPickerProps) {
  const [localColor, setLocalColor] = useState(color)

  useEffect(() => {
    setLocalColor(color)
  }, [color])

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalColor(e.target.value)
    onChange(e.target.value)
  }

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocalColor(value)
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      onChange(value)
    }
  }

  return (
    <div className={cn("grid gap-2", className)}>
      {label && <Label>{label}</Label>}
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="h-8 w-8 rounded-md border"
              style={{ backgroundColor: localColor }}
              aria-label="Escolher cor"
            />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2">
            <Input type="color" value={localColor} onChange={handleColorChange} className="h-32 w-32 cursor-pointer" />
          </PopoverContent>
        </Popover>
        <Input
          type="text"
          value={localColor}
          onChange={handleHexChange}
          className="w-28 font-mono text-sm"
          placeholder="#000000"
        />
      </div>
    </div>
  )
}
