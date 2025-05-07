"use client"

import { usePathname } from "next/navigation"
import { PromotionalPopup } from "@/components/promotional-popup"

export function PublicPromotionalPopup() {
  const pathname = usePathname()

  // Lista de caminhos onde o pop-up deve aparecer
  const publicPaths = ["/", "/pricing", "/about", "/contact"]

  // Verificar se o caminho atual é uma página pública
  const isPublicPage =
    publicPaths.includes(pathname) ||
    pathname.startsWith("/blog") ||
    (!pathname.includes("/therapist") && !pathname.includes("/client"))

  if (!isPublicPage) return null

  return <PromotionalPopup />
}
