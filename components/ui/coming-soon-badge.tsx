import { cn } from "@/lib/utils"

interface ComingSoonBadgeProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function ComingSoonBadge({ className, size = "md" }: ComingSoonBadgeProps) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        size === "sm" && "h-5 px-2 text-xs",
        size === "md" && "h-6 px-3 text-sm",
        size === "lg" && "h-7 px-4 text-base",
        className,
      )}
    >
      <span className="absolute inset-0 animate-pulse rounded-full bg-primary/20"></span>
      <span className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-sm"></span>
      <span className="relative font-semibold text-primary">Em Breve</span>
    </div>
  )
}
