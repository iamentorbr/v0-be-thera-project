"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export function PricingToggle() {
  const [isAnnual, setIsAnnual] = useState(true)

  return (
    <div className="flex items-center justify-center space-x-4 mt-6">
      <Label
        htmlFor="billing-toggle"
        className={`text-sm font-medium ${!isAnnual ? "text-foreground" : "text-muted-foreground"}`}
      >
        Mensal
      </Label>
      <Switch
        id="billing-toggle"
        checked={isAnnual}
        onCheckedChange={setIsAnnual}
        aria-label="Alternar entre cobrança mensal e anual"
      />
      <div className="flex items-center gap-2">
        <Label
          htmlFor="billing-toggle"
          className={`text-sm font-medium ${isAnnual ? "text-foreground" : "text-muted-foreground"}`}
        >
          Anual
        </Label>
        <Badge
          variant="secondary"
          className="text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
        >
          Economize 20%
        </Badge>
      </div>
    </div>
  )
}
