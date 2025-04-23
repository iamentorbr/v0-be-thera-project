"use client"

import { SessionForm } from "@/components/scheduling/session-form"

export default function RequestSessionPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto">
        <SessionForm isTherapist={false} />
      </div>
    </div>
  )
}
