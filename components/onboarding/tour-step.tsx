"use client"

import { useState, useEffect, useRef } from "react"
import { Portal } from "@radix-ui/react-portal"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface TourStep {
  target: string
  title: string
  content: string
  position?: "top" | "right" | "bottom" | "left"
}

interface TourStepProps {
  steps: TourStep[]
  currentStep: number
  onNext: () => void
  onPrev: () => void
  onClose: () => void
  onComplete: () => void
}

export function TourStepComponent({ steps, currentStep, onNext, onPrev, onClose, onComplete }: TourStepProps) {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0, height: 0 })
  const tooltipRef = useRef<HTMLDivElement>(null)

  const step = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1
  const isFirstStep = currentStep === 0

  useEffect(() => {
    const targetElement = document.querySelector(step.target)
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect()
      setPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
      })

      // Highlight the element
      const originalPosition = targetElement.style.position
      const originalZIndex = targetElement.style.zIndex
      targetElement.style.position = "relative"
      targetElement.style.zIndex = "50"

      return () => {
        targetElement.style.position = originalPosition
        targetElement.style.zIndex = originalZIndex
      }
    }
  }, [step])

  useEffect(() => {
    // Ensure the tooltip is visible by scrolling if needed
    if (tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect()
      if (rect.top < 0 || rect.bottom > window.innerHeight) {
        tooltipRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }
    }
  }, [position])

  const getTooltipPosition = () => {
    const pos = step.position || "bottom"
    const offset = 12 // Distance from the target element

    switch (pos) {
      case "top":
        return {
          top: position.top - (tooltipRef.current?.offsetHeight || 0) - offset,
          left: position.left + position.width / 2,
          transform: "translateX(-50%)",
        }
      case "right":
        return {
          top: position.top + position.height / 2,
          left: position.left + position.width + offset,
          transform: "translateY(-50%)",
        }
      case "left":
        return {
          top: position.top + position.height / 2,
          left: position.left - (tooltipRef.current?.offsetWidth || 0) - offset,
          transform: "translateY(-50%)",
        }
      case "bottom":
      default:
        return {
          top: position.top + position.height + offset,
          left: position.left + position.width / 2,
          transform: "translateX(-50%)",
        }
    }
  }

  return (
    <Portal>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/* Highlight target element */}
      <div
        className="absolute z-50 rounded-md ring-2 ring-primary ring-offset-2 pointer-events-none"
        style={{
          top: position.top,
          left: position.left,
          width: position.width,
          height: position.height,
        }}
      />

      {/* Tooltip */}
      <AnimatePresence>
        <motion.div
          ref={tooltipRef}
          className="fixed z-50 w-80 bg-card border rounded-lg shadow-lg p-4"
          style={getTooltipPosition()}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">{step.title}</h3>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
              <X className="h-4 w-4" />
              <span className="sr-only">Fechar</span>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{step.content}</p>
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {currentStep + 1} de {steps.length}
            </div>
            <div className="flex space-x-2">
              {!isFirstStep && (
                <Button variant="outline" size="sm" onClick={onPrev}>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Anterior
                </Button>
              )}
              {isLastStep ? (
                <Button size="sm" onClick={onComplete}>
                  Concluir
                </Button>
              ) : (
                <Button size="sm" onClick={onNext}>
                  Próximo
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </Portal>
  )
}
