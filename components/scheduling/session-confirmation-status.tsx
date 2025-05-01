import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, HelpCircle, Clock } from "lucide-react"

type ConfirmationStatus = "confirmed" | "declined" | "pending" | "no_response"

interface SessionConfirmationStatusProps {
  status: ConfirmationStatus
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
}

export function SessionConfirmationStatus({ status, size = "md", showLabel = true }: SessionConfirmationStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "confirmed":
        return {
          label: "Confirmado",
          icon: CheckCircle2,
          variant: "success" as const,
        }
      case "declined":
        return {
          label: "Recusado",
          icon: XCircle,
          variant: "destructive" as const,
        }
      case "pending":
        return {
          label: "Aguardando",
          icon: Clock,
          variant: "warning" as const,
        }
      case "no_response":
        return {
          label: "Sem resposta",
          icon: HelpCircle,
          variant: "outline" as const,
        }
      default:
        return {
          label: "Sem resposta",
          icon: HelpCircle,
          variant: "outline" as const,
        }
    }
  }

  const { label, icon: Icon, variant } = getStatusConfig()

  const sizeClasses = {
    sm: "text-xs py-0 px-2",
    md: "text-sm py-0.5 px-2.5",
    lg: "py-1 px-3",
  }

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  return (
    <Badge variant={variant} className={sizeClasses[size]}>
      <Icon className={`${iconSizes[size]} ${showLabel ? "mr-1" : ""}`} />
      {showLabel && label}
    </Badge>
  )
}
