"use client"

import { useRouter } from "next/navigation"
import { AddContentForm } from "@/components/content/add-content-form"
import type { ContentItem } from "@/components/content/content-card"

export default function NewContentPage() {
  const router = useRouter()

  const handleContentAdded = (content: ContentItem) => {
    // Em uma implementação real, enviaríamos para a API
    // Por enquanto, apenas redirecionamos de volta para a biblioteca
    router.push("/therapist/content")
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto">
        <AddContentForm onContentAdded={handleContentAdded} />
      </div>
    </div>
  )
}
