"use client"

import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

interface StartTourButtonProps {
  userType: "therapist" | "client"
}

export function StartTourButton({ userType }: StartTourButtonProps) {
  const handleStartTour = () => {
    localStorage.setItem(`${userType}-tour-started`, "true")
    localStorage.removeItem(`${userType}-tour-completed`)

    // Recarregar a página para iniciar o tour
    window.location.reload()
  }

  return (
    <Button onClick={handleStartTour} variant="outline" size="sm">
      <Play className="mr-2 h-4 w-4" />
      Iniciar tour guiado
    </Button>
  )
}
