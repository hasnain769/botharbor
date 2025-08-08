"use client"

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  children: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
}

export function CodeBlock({ 
  children, 
  language = 'javascript', 
  filename,
  showLineNumbers = false 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="relative group">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700 rounded-t-lg">
          <span className="text-sm text-gray-300 font-mono">{filename}</span>
        </div>
      )}
      
      <div className="relative">
        <pre className={cn(
          "overflow-x-auto p-4 bg-gray-900 text-gray-100 text-sm leading-relaxed",
          filename ? "rounded-b-lg" : "rounded-lg",
          "border border-gray-700"
        )}>
          <code className={`language-${language}`}>
            {children}
          </code>
        </pre>
        
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 p-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  )
}
