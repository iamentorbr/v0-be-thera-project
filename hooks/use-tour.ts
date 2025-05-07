"use client"

import { useState, useEffect } from "react"
import type { TourStep } from "@/components/onboarding/tour-step"

export function useTour(steps: TourStep[], tourId: string) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [hasCompletedTour, setHasCompletedTour] = useState(false)

  // Check if the tour has been completed before
  useEffect(() => {
    const completed = localStorage.getItem(`tour-completed-${tourId}`)
    if (completed) {
      setHasCompletedTour(true)
    }
  }, [tourId])

  const startTour = () => {
    setCurrentStep(0)
    setIsOpen(true)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const closeTour = () => {
    setIsOpen(false)
  }

  const completeTour = () => {
    localStorage.setItem(`tour-completed-${tourId}`, "true")
    setHasCompletedTour(true)
    setIsOpen(false)
  }

  const resetTour = () => {
    localStorage.removeItem(`tour-completed-${tourId}`)
    setHasCompletedTour(false)
  }

  return {
    isOpen,
    currentStep,
    hasCompletedTour,
    startTour,
    nextStep,
    prevStep,
    closeTour,
    completeTour,
    resetTour,
  }
}
