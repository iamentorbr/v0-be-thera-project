import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Rotas incluídas no MVP
const mvpRoutes = [
  "/therapist/dashboard",
  "/therapist/clients",
  "/therapist/sessions",
  "/therapist/notes",
  "/therapist/payments",
  "/therapist/settings",
  "/login",
  "/register",
  "/",
]

// Verifica se uma rota está incluída no MVP
function isMvpRoute(path: string) {
  return mvpRoutes.some((route) => path === route || path.startsWith(`${route}/`) || path === "/therapist/coming-soon")
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Se for uma rota do terapeuta, mas não estiver no MVP, redireciona para "em breve"
  if (path.startsWith("/therapist/") && !isMvpRoute(path)) {
    return NextResponse.redirect(new URL("/therapist/coming-soon", request.url))
  }

  // Se for uma rota do cliente, mas não estiver no MVP, redireciona para "em breve"
  if (path.startsWith("/client/") && !path.startsWith("/client/dashboard")) {
    return NextResponse.redirect(new URL("/client/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Rotas que devem passar pelo middleware
    "/therapist/:path*",
    "/client/:path*",
  ],
}
