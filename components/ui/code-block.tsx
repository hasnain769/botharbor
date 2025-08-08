"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from 'lucide-react'

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
}

export function CodeBlock({ code, language = "javascript", title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative rounded-lg border border-gray-700 bg-gray-900">
      {title && (
        <div className="border-b border-gray-700 px-4 py-2 bg-gray-800">
          <span className="text-sm font-medium text-gray-200">{title}</span>
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto p-4 bg-gray-900">
          <code className={`language-${language} text-sm text-gray-100`}>{code}</code>
        </pre>
        <Button 
          size="sm" 
          variant="ghost" 
          className="absolute right-2 top-2 text-gray-400 hover:text-white hover:bg-gray-700" 
          onClick={copyToClipboard}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
