import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ComingSoonPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Funcionalidade em Desenvolvimento</CardTitle>
          <CardDescription>Estamos trabalhando para disponibilizar esta funcionalidade em breve.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="relative w-40 h-40 mb-4">
            <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping opacity-75"></div>
            <div className="relative flex items-center justify-center w-40 h-40 bg-primary/20 rounded-full">
              <span className="text-lg font-semibold text-primary">Em breve</span>
            </div>
          </div>
          <p className="text-center text-muted-foreground">
            Esta funcionalidade estará disponível nas próximas atualizações da plataforma. Agradecemos sua paciência!
          </p>
          <Button asChild className="mt-4">
            <Link href="/therapist/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para o Dashboard
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
