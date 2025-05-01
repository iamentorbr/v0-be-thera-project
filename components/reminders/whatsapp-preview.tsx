"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

interface WhatsAppPreviewProps {
  clientName: string
  therapistName: string
  date: string
  time: string
  location?: string
  message: string
  includeButtons?: boolean
}

export function WhatsAppPreview({
  clientName,
  therapistName,
  date,
  time,
  location = "Consultório",
  message,
  includeButtons = true,
}: WhatsAppPreviewProps) {
  const [expanded, setExpanded] = useState(false)

  // Formatar a mensagem substituindo variáveis
  const formattedMessage = message
    .replace(/{{cliente}}/g, clientName)
    .replace(/{{terapeuta}}/g, therapistName)
    .replace(/{{data}}/g, date)
    .replace(/{{hora}}/g, time)
    .replace(/{{local}}/g, location)

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-sm">
        <div className="bg-green-600 text-white p-3 rounded-t-lg flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
            <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
            <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
            <path d="M9 14a5 5 0 0 0 6 0" />
          </svg>
          <span className="font-medium">WhatsApp</span>
        </div>

        <Card className="rounded-t-none shadow-none border-t-0">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-4">
              <div className="bg-white p-3 rounded-lg shadow-sm border max-w-[85%] self-start">
                <p className="text-sm font-medium text-green-600 mb-1">{therapistName}</p>
                <p className="text-sm whitespace-pre-line">{formattedMessage}</p>
              </div>

              {includeButtons && (
                <div className="flex space-x-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Confirmar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Recusar
                  </Button>
                </div>
              )}

              {expanded && (
                <>
                  <div className="bg-green-50 p-3 rounded-lg shadow-sm border max-w-[85%] self-end">
                    <p className="text-sm">Confirmar</p>
                  </div>

                  <div className="bg-white p-3 rounded-lg shadow-sm border max-w-[85%] self-start">
                    <p className="text-sm font-medium text-green-600 mb-1">{therapistName}</p>
                    <p className="text-sm">Obrigado por confirmar sua sessão. Estamos ansiosos para vê-lo(a)!</p>
                  </div>
                </>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="mt-4 text-xs text-muted-foreground"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Mostrar menos" : "Mostrar conversa completa"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
