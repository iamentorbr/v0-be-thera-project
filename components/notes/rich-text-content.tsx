"use client"

import { cn } from "@/lib/utils"

interface RichTextContentProps {
  content: string
  className?: string
}

export function RichTextContent({ content, className }: RichTextContentProps) {
  return <div className={cn("prose prose-sm max-w-none", className)} dangerouslySetInnerHTML={{ __html: content }} />
}
