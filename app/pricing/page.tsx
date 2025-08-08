import { Metadata } from 'next'
import PricingPageClient from './PricingPageClient'

export const metadata: Metadata = {
  title: 'Pricing - BotHarbor | Flexible Plans for Every Business',
  description: 'Choose the perfect plan for your business. Start free and scale with our flexible pricing options for AI chatbot solutions.',
  keywords: 'BotHarbor pricing, chatbot pricing, AI chatbot plans, business automation pricing',
  openGraph: {
    title: 'Pricing - BotHarbor | Flexible Plans for Every Business',
    description: 'Choose the perfect plan for your business. Start free and scale with our flexible pricing options for AI chatbot solutions.',
    type: 'website',
  },
}

export default function PricingPage() {
  return <PricingPageClient />
}
