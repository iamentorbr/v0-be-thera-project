import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { PublicPromotionalPopup } from "@/components/public-promotional-popup"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BETHERA - Plataforma para Profissionais de Bem-estar",
  description: "Plataforma para terapeutas, tarólogos, astrólogos, psicólogos e coaches",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
          <PublicPromotionalPopup />
        </ThemeProvider>
      </body>
    </html>
  )
}
