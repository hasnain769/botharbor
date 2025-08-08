"use client"

import { CodeBlock } from "@/components/ui/code-block"

interface NextJSIntegrationPageClientProps {
  theme?: 'light' | 'dark'
}

export default function NextJSIntegrationPageClient({ theme = 'dark' }: NextJSIntegrationPageClientProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-2 sm:mb-4 text-white">
          Next.js Integration
        </h1>
        <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 text-gray-300">
          Integrate BotHarbor chat widget into your Next.js applications with support for both App Router and Pages Router.
        </p>
      </div>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">App Router Integration</h2>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
          The recommended approach for Next.js 13+ applications using the App Router.
        </p>

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Client Component Approach</h3>
          <CodeBlock
            language="tsx"
            code={`'use client'

import { useEffect, useState } from 'react'

interface BotHarborConfig {
  botId: string
  theme?: 'light' | 'dark' | 'auto'
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  primaryColor?: string
  greeting?: string
}

interface BotHarborWidgetProps {
  config: BotHarborConfig
}

export default function BotHarborWidget({ config }: BotHarborWidgetProps) {
  const [isReady, setIsReady] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const initializeBotHarbor = async () => {
      try {
        // Set global configuration
        window.BOTHARBOR_CONFIG = {
          ...config,
          onReady: () => {
            setIsReady(true)
            console.log('BotHarbor is ready')
          },
          onOpen: () => setIsOpen(true),
          onClose: () => setIsOpen(false)
        }

        // Check if script already exists
        const existingScript = document.querySelector('script[src="https://botharbor.ai/embed.js"]')
        if (existingScript) {
          return
        }

        // Load BotHarbor script
        const script = document.createElement('script')
        script.src = 'https://botharbor.ai/embed.js'
        script.async = true
        document.head.appendChild(script)
      } catch (error) {
        console.error('Failed to initialize BotHarbor:', error)
      }
    }

    initializeBotHarbor()

    // Cleanup function
    return () => {
      const existingScript = document.querySelector('script[src="https://botharbor.ai/embed.js"]')
      if (existingScript) {
        existingScript.remove()
      }
      delete window.BOTHARBOR_CONFIG
    }
  }, [config])

  const openChat = () => {
    if (window.BotHarbor && isReady) {
      window.BotHarbor.open()
    }
  }

  const closeChat = () => {
    if (window.BotHarbor) {
      window.BotHarbor.close()
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={openChat}
        disabled={!isReady}
        className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
      >
        {isReady ? 'Open Chat' : 'Loading...'}
      </button>
    </div>
  )
}

// Declare global types
declare global {
  interface Window {
    BOTHARBOR_CONFIG?: any
    BotHarbor?: {
      open: () => void
      close: () => void
      sendMessage: (message: string) => void
    }
  }
}`}
          />

          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Using in App Router Layout</h3>
          <CodeBlock
            language="tsx"
            code={`// app/layout.tsx
import BotHarborWidget from '@/components/BotHarborWidget'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <BotHarborWidget
          config={{
            botId: process.env.NEXT_PUBLIC_BOTHARBOR_BOT_ID!,
            theme: 'auto',
            position: 'bottom-right',
            primaryColor: '#14B8A6',
            greeting: 'Hello! How can I help you today?'
          }}
        />
      </body>
    </html>
  )
}`}
          />
        </div>
      </section>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">Custom Hook Approach</h2>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
          Create a reusable custom hook for better organization and state management.
        </p>

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">useBotHarbor Hook</h3>
          <CodeBlock
            language="tsx"
            code={`// hooks/useBotHarbor.ts
'use client'

import { useEffect, useState, useCallback } from 'react'

interface BotHarborConfig {
  botId: string
  theme?: 'light' | 'dark' | 'auto'
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  primaryColor?: string
  greeting?: string
}

interface UseBotHarborReturn {
  isReady: boolean
  isOpen: boolean
  openChat: () => void
  closeChat: () => void
  sendMessage: (message: string) => void
}

export function useBotHarbor(config: BotHarborConfig): UseBotHarborReturn {
  const [isReady, setIsReady] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const initializeBotHarbor = useCallback(async () => {
    try {
      // Set global configuration
      window.BOTHARBOR_CONFIG = {
        ...config,
        onReady: () => {
          setIsReady(true)
          console.log('BotHarbor is ready')
        },
        onOpen: () => setIsOpen(true),
        onClose: () => setIsOpen(false)
      }

      // Check if script already exists
      const existingScript = document.querySelector('script[src="https://botharbor.ai/embed.js"]')
      if (existingScript) {
        return
      }

      // Load BotHarbor script
      const script = document.createElement('script')
      script.src = 'https://botharbor.ai/embed.js'
      script.async = true
      document.head.appendChild(script)
    } catch (error) {
      console.error('Failed to initialize BotHarbor:', error)
    }
  }, [config])

  useEffect(() => {
    initializeBotHarbor()

    return () => {
      const existingScript = document.querySelector('script[src="https://botharbor.ai/embed.js"]')
      if (existingScript) {
        existingScript.remove()
      }
      delete window.BOTHARBOR_CONFIG
    }
  }, [initializeBotHarbor])

  const openChat = useCallback(() => {
    if (window.BotHarbor && isReady) {
      window.BotHarbor.open()
    }
  }, [isReady])

  const closeChat = useCallback(() => {
    if (window.BotHarbor) {
      window.BotHarbor.close()
    }
  }, [])

  const sendMessage = useCallback((message: string) => {
    if (window.BotHarbor && isReady) {
      window.BotHarbor.sendMessage(message)
    }
  }, [isReady])

  return { isReady, isOpen, openChat, closeChat, sendMessage }
}`}
          />

          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Using the Hook</h3>
          <CodeBlock
            language="tsx"
            code={`'use client'

import { useBotHarbor } from '@/hooks/useBotHarbor'

export default function ChatWidget() {
  const { isReady, isOpen, openChat, closeChat, sendMessage } = useBotHarbor({
    botId: process.env.NEXT_PUBLIC_BOTHARBOR_BOT_ID!,
    theme: 'auto',
    position: 'bottom-right',
    primaryColor: '#14B8A6'
  })

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <button
        onClick={openChat}
        disabled={!isReady}
        className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
      >
        {isReady ? 'Open Chat' : 'Loading...'}
      </button>
      
      {isOpen && (
        <button
          onClick={closeChat}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
        >
          Close Chat
        </button>
      )}
      
      <div className="text-xs text-gray-500">
        Status: {isOpen ? 'Open' : 'Closed'}
      </div>
    </div>
  )
}`}
          />
        </div>
      </section>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">Pages Router Integration</h2>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
          For Next.js applications using the traditional Pages Router.
        </p>

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">_app.tsx Integration</h3>
          <CodeBlock
            language="tsx"
            code={`// pages/_app.tsx
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const initializeBotHarbor = async () => {
      try {
        // Set global configuration
        window.BOTHARBOR_CONFIG = {
          botId: process.env.NEXT_PUBLIC_BOTHARBOR_BOT_ID!,
          theme: 'auto',
          position: 'bottom-right',
          primaryColor: '#14B8A6',
          greeting: 'Hello! How can I help you?'
        }

        // Load BotHarbor script
        const script = document.createElement('script')
        script.src = 'https://botharbor.ai/embed.js'
        script.async = true
        document.head.appendChild(script)
      } catch (error) {
        console.error('Failed to initialize BotHarbor:', error)
      }
    }

    initializeBotHarbor()

    return () => {
      const existingScript = document.querySelector('script[src="https://botharbor.ai/embed.js"]')
      if (existingScript) {
        existingScript.remove()
      }
      delete window.BOTHARBOR_CONFIG
    }
  }, [])

  return <Component {...pageProps} />
}

// Declare global types
declare global {
  interface Window {
    BOTHARBOR_CONFIG?: any
    BotHarbor?: {
      open: () => void
      close: () => void
      sendMessage: (message: string) => void
    }
  }
}`}
          />

          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Using in Pages</h3>
          <CodeBlock
            language="tsx"
            code={`// pages/index.tsx
import { useState, useEffect } from 'react'

export default function HomePage() {
  const [chatReady, setChatReady] = useState(false)

  useEffect(() => {
    // Check if BotHarbor is ready
    const checkBotHarbor = () => {
      if (window.BotHarbor) {
        setChatReady(true)
      } else {
        setTimeout(checkBotHarbor, 100)
      }
    }
    
    checkBotHarbor()
  }, [])

  const openChat = () => {
    if (window.BotHarbor && chatReady) {
      window.BotHarbor.open()
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              My Next.js App
            </h1>
            <button
              onClick={openChat}
              disabled={!chatReady}
              className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {chatReady ? 'Need Help?' : 'Loading Chat...'}
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <p className="text-gray-500">Your page content here...</p>
          </div>
        </div>
      </main>
    </div>
  )
}`}
          />
        </div>
      </section>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">Environment Configuration</h2>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
          Configure your Next.js application with environment variables for different deployment environments.
        </p>

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Environment Variables</h3>
          <CodeBlock
            language="bash"
            code={`# .env.local
NEXT_PUBLIC_BOTHARBOR_BOT_ID=your-bot-id-here
NEXT_PUBLIC_BOTHARBOR_THEME=auto
NEXT_PUBLIC_BOTHARBOR_POSITION=bottom-right
NEXT_PUBLIC_BOTHARBOR_PRIMARY_COLOR=#14B8A6

# .env.production
NEXT_PUBLIC_BOTHARBOR_BOT_ID=your-production-bot-id
NEXT_PUBLIC_BOTHARBOR_THEME=light
NEXT_PUBLIC_BOTHARBOR_POSITION=bottom-right
NEXT_PUBLIC_BOTHARBOR_PRIMARY_COLOR=#14B8A6`}
          />

          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Using Environment Variables</h3>
          <CodeBlock
            language="tsx"
            code={`// components/BotHarborWidget.tsx
'use client'

import { useBotHarbor } from '@/hooks/useBotHarbor'

export default function BotHarborWidget() {
  const { isReady, openChat } = useBotHarbor({
    botId: process.env.NEXT_PUBLIC_BOTHARBOR_BOT_ID!,
    theme: (process.env.NEXT_PUBLIC_BOTHARBOR_THEME as 'light' | 'dark' | 'auto') || 'auto',
    position: (process.env.NEXT_PUBLIC_BOTHARBOR_POSITION as any) || 'bottom-right',
    primaryColor: process.env.NEXT_PUBLIC_BOTHARBOR_PRIMARY_COLOR || '#14B8A6'
  })

  return (
    <button
      onClick={openChat}
      disabled={!isReady}
      className="fixed bottom-4 right-4 z-50 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
    >
      {isReady ? 'Chat with us' : 'Loading...'}
    </button>
  )
}`}
          />
        </div>
      </section>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">Best Practices</h2>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          <div className="bg-gray-900 border border-gray-700 p-4 sm:p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Next.js Specific Tips</h3>
            <ul className="space-y-2 text-sm sm:text-base text-gray-300">
              <li className="flex items-start">
                <span className="text-green-400 mr-2 flex-shrink-0">✓</span>
                <span>Use 'use client' directive for client-side components</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 flex-shrink-0">✓</span>
                <span>Leverage NEXT_PUBLIC_ environment variables</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 flex-shrink-0">✓</span>
                <span>Use custom hooks for reusable logic</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 flex-shrink-0">✓</span>
                <span>Implement proper cleanup in useEffect</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-900 border border-gray-700 p-4 sm:p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Performance & SEO</h3>
            <ul className="space-y-2 text-sm sm:text-base text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 flex-shrink-0">•</span>
                <span>Load scripts asynchronously to avoid blocking</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 flex-shrink-0">•</span>
                <span>Use dynamic imports for code splitting</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 flex-shrink-0">•</span>
                <span>Implement loading states for better UX</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 flex-shrink-0">•</span>
                <span>Consider SSR implications for chat widgets</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
