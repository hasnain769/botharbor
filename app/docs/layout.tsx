import { DocsHeader } from '@/components/docs-header'
import { DocsSidebar } from '@/components/docs-sidebar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | BotHarbor Docs',
    default: 'Documentation | BotHarbor'
  },
  description: 'Complete documentation for integrating BotHarbor chatbots into your applications.',
  keywords: ['BotHarbor', 'chatbot', 'documentation', 'integration', 'AI', 'customer support'],
  authors: [{ name: 'BotHarbor Team' }],
  openGraph: {
    title: 'BotHarbor Documentation',
    description: 'Complete documentation for integrating BotHarbor chatbots into your applications.',
    type: 'website',
    siteName: 'BotHarbor',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BotHarbor Documentation',
    description: 'Complete documentation for integrating BotHarbor chatbots into your applications.',
  },
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-950">
      <DocsHeader />
      <div className="flex">
        <DocsSidebar />
        <main className="flex-1 min-w-0 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
