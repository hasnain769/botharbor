'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, ArrowRight, Zap, Building, Rocket } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'

const plans = [
  {
    name: 'Free',
    icon: Zap,
    description: 'Perfect for testing and small projects',
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      '1 chatbot',
      '10k Embedding Tokens/month',
      '100 Message Credits/month',
      'Messages History',
      'Script/iframe embedding',
      'Community support'
    ],
    popular: false,
    buttonText: 'Start for Free',
    buttonVariant: 'outline' as const
  },
  {
    name: 'Starter',
    icon: Building,
    description: 'Ideal for small businesses',
    monthlyPrice: 19,
    annualPrice: 17,
    features: [
      '2 Chatbots',
      '100k Embedding Tokens/month',
      '2000 Message Credits/month',
      'Remove Branding',
      'AI Leads',
      'Messages History',
      'Access to All LLMs',
      'Omni-channel integrations',
      'Email support'
    ],
    popular: true,
    buttonText: 'Get Started',
    buttonVariant: 'default' as const
  },
  {
    name: 'Business',
    icon: Rocket,
    description: 'For growing businesses with advanced needs',
    monthlyPrice: 49,
    annualPrice: 46,
    features: [
      '5 Chatbots',
      '200k Embedding Tokens/month',
      '5000 Message Credits/month',
      'Remove Branding',
      'AI Leads',
      'Messages History',
      'Access to All LLMs',
      'Omni-channel integrations',
      'Priority support',
      'Advanced analytics',
      'Custom integrations'
    ],
    popular: false,
    buttonText: 'Get Started',
    buttonVariant: 'outline' as const
  }
]

const faqs = [
  {
    question: 'What happens when I exceed my plan limits?',
    answer: 'When you approach your limits, we\'ll notify you in advance. You can upgrade your plan anytime or purchase additional credits as needed.'
  },
  {
    question: 'Can I change my plan anytime?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any billing adjustments.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans. All payments are processed securely through Stripe.'
  },
  {
    question: 'Is there a setup fee?',
    answer: 'No, there are no setup fees or hidden costs. You only pay for your chosen plan, and you can start building immediately.'
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied, we\'ll provide a full refund.'
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Absolutely. You can cancel your subscription at any time from your dashboard. Your chatbots will continue working until the end of your billing period.'
  }
]

export default function PricingPageClient() {
  const [isAnnual, setIsAnnual] = useState(false)

  const handleGetStarted = (planName: string) => {
    if (planName === 'Free') {
      window.open('https://app.botharbor.ai/register', '_blank')
    } else {
      window.open('https://app.botharbor.ai/billings', '_blank')
    }
  }

  const calculateSavings = (monthly: number, annual: number) => {
    if (monthly === 0) return 0
    return Math.round(((monthly * 12 - annual * 12) / (monthly * 12)) * 100)
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            Choose the perfect plan for your business. Start free and scale as you grow. 
            No hidden fees, no surprises.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <span className={`text-lg ${!isAnnual ? 'text-white font-semibold' : 'text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                isAnnual ? 'bg-gradient-to-r from-teal-500 to-cyan-500' : 'bg-gray-700'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                  isAnnual ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-lg ${isAnnual ? 'text-white font-semibold' : 'text-gray-400'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold ml-2">
                Save up to 15%
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => {
              const IconComponent = plan.icon
              const currentPrice = isAnnual ? plan.annualPrice : plan.monthlyPrice
              const savings = calculateSavings(plan.monthlyPrice, plan.annualPrice)
              
              return (
                <Card 
                  key={index} 
                  className={`relative bg-gray-900 border-gray-800 hover:border-teal-500 transition-all duration-300 ${
                    plan.popular ? 'ring-2 ring-teal-500 scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-8">
                    <div className="flex justify-center mb-4">
                      <div className={`p-3 rounded-full ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-teal-500 to-cyan-500' 
                          : 'bg-gray-800'
                      }`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    <CardTitle className="text-2xl font-bold text-white mb-2">{plan.name}</CardTitle>
                    
                    <div className="mb-4">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold text-white">${currentPrice}</span>
                        <span className="text-gray-400">/month</span>
                      </div>
                      {isAnnual && plan.monthlyPrice > 0 && (
                        <div className="text-sm text-gray-500 mt-1">
                          <span className="line-through">${plan.monthlyPrice}/month</span>
                          <span className="text-teal-400 ml-2">Save {savings}%</span>
                        </div>
                      )}
                      {isAnnual && plan.monthlyPrice > 0 && (
                        <div className="text-xs text-gray-500 mt-1">
                          Billed annually (${currentPrice * 12}/year)
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-400">{plan.description}</p>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      onClick={() => handleGetStarted(plan.name)}
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white' 
                          : 'bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white'
                      } transition-all duration-300`}
                      size="lg"
                    >
                      {plan.buttonText}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Why Choose BotHarbor?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Built for businesses of all sizes with enterprise-grade security and reliability
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast Setup</h3>
              <p className="text-gray-400">Get your chatbot up and running in minutes, not hours</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Enterprise Ready</h3>
              <p className="text-gray-400">Scale with confidence using our robust infrastructure</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Advanced AI</h3>
              <p className="text-gray-400">Powered by the latest AI models for superior conversations</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Got questions? We've got answers. Can't find what you're looking for? Contact our support team.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using BotHarbor to automate their customer interactions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => handleGetStarted('Free')}
              size="lg" 
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8"
            >
              Start for Free
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button 
              onClick={() => window.open('https://app.botharbor.ai/demo', '_blank')}
              variant="outline" 
              size="lg" 
              className="border-gray-600 text-white hover:bg-gray-800 px-8"
            >
              View Demo
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
