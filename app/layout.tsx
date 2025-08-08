import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Chat from '@/components/chatbot'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BotHarbor - Build, Deploy, and Manage AI Chatbots with Ease',
  description: 'BotHarbor helps you create fully customizable AI chatbots that engage your audience and boost conversions.',
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}

      <Chat />
      </body>
    </html>
  )
}
