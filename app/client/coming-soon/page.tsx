import { ArrowLeft } from "lucide-react"

export default function ClientComingSoonPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Funcionalidade em Desenvolvimento</h1>
          <p className="text-gray-500">Estamos trabalhando para disponibilizar esta funcionalidade em breve.</p>
        </div>
        <div className="flex flex-col items-center space-y-4 mt-6">
          <div className="relative w-40 h-40 mb-4">
            <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping opacity-75"></div>
            <div className="relative flex items-center justify-center w-40 h-40 bg-primary/20 rounded-full">
              <span className="text-lg font-semibold text-primary">Em breve</span>
            </div>
          </div>
          <p className="text-center text-gray-500">
            Esta funcionalidade estará disponível nas próximas atualizações da plataforma. Agradecemos sua paciência!
          </p>
          <a
            href="/client/dashboard"
            className="flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para o Dashboard
          </a>
        </div>
      </div>
    </div>
  )
}
