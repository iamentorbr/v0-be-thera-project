import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, CheckCheck } from "lucide-react"

interface WhatsAppMessagePreviewProps {
  message: string
  businessName?: string
  includeButtons?: boolean
  timestamp?: string
  status?: "sent" | "delivered" | "read"
}

export function WhatsAppMessagePreview({
  message,
  businessName = "BeTHERA",
  includeButtons = true,
  timestamp = "14:25",
  status = "delivered",
}: WhatsAppMessagePreviewProps) {
  return (
    <div className="max-w-sm mx-auto">
      <div className="bg-[#128C7E] text-white p-2 rounded-t-lg flex items-center gap-2">
        <Avatar className="h-6 w-6">
          <AvatarImage src="/letter-b-abstract.png" alt={businessName} />
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">{businessName}</span>
      </div>
      <Card className="rounded-t-none border-t-0">
        <CardContent className="p-3 space-y-3">
          <div className="bg-[#E7FFDB] p-2 rounded-lg max-w-[80%] ml-auto relative">
            <p className="text-sm">{message}</p>
            <div className="absolute bottom-1 right-2 flex items-center text-[10px] text-gray-500 gap-1">
              <span>{timestamp}</span>
              {status === "sent" && <Check className="h-3 w-3" />}
              {status === "delivered" && <CheckCheck className="h-3 w-3" />}
              {status === "read" && <CheckCheck className="h-3 w-3 text-blue-500" />}
            </div>
          </div>

          {includeButtons && (
            <div className="flex gap-2">
              <button className="bg-[#128C7E] text-white text-xs py-1 px-3 rounded-full flex-1">Confirmar</button>
              <button className="bg-gray-200 text-gray-800 text-xs py-1 px-3 rounded-full flex-1">Recusar</button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
