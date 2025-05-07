"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function PricingToggle() {
  const [isAnnual, setIsAnnual] = useState(true)

  return (
    <div className="flex items-center space-x-2 mt-6">
      <Label htmlFor="pricing-toggle" className={isAnnual ? "text-muted-foreground" : "font-medium"}>
        Mensal
      </Label>
      <Switch id="pricing-toggle" checked={isAnnual} onCheckedChange={setIsAnnual} />
      <div className="flex items-center">
        <Label htmlFor="pricing-toggle" className={isAnnual ? "font-medium" : "text-muted-foreground"}>
          Anual
        </Label>
        <span className="ml-2 text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">Economize 20%</span>
      </div>
    </div>
  )
}
