import { Metadata } from 'next'
import Header from '@/components/header'
import HeroSection from '@/components/hero-section'
import FeaturesSection from '@/components/features-section'
import HowItWorksSection from '@/components/how-it-works-section'
import UseCasesSection from '@/components/use-cases-section'
import PricingSection from '@/components/pricing-section'
import BlogSection from '@/components/blog-section'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'BotHarbor - Build, Deploy, and Manage AI Chatbots with Ease',
  description: 'BotHarbor helps you create fully customizable AI chatbots that engage your audience and boost conversions. Easy embedding, multi-LLM support, and agentic capabilities.',
  keywords: 'AI chatbots, chatbot platform, customer support, lead generation, SaaS, automation',
  authors: [{ name: 'BotHarbor' }],
  openGraph: {
    title: 'BotHarbor - Build, Deploy, and Manage AI Chatbots with Ease',
    description: 'Create fully customizable AI chatbots that engage your audience and boost conversions.',
    url: 'https://botharbor.ai',
    siteName: 'BotHarbor',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BotHarbor - AI Chatbot Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BotHarbor - Build, Deploy, and Manage AI Chatbots with Ease',
    description: 'Create fully customizable AI chatbots that engage your audience and boost conversions.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <UseCasesSection />
      <PricingSection />
      <BlogSection />
      <Footer />
    </main>
  )
}
