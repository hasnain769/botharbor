import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, ArrowRight } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for testing and small projects',
    features: [
      '1 chatbot',
      '10k Embedding Tokens/month',
      '60 Message Credits/month',
      'Messages History',
      'Script/iframe embedding'
    ],
    popular: false
  },
  {
    name: 'Starter',
    price: '$19',
    period: '/month',
    description: 'Ideal for small businesses',
    features: [
      '2 Chatbots',
      '100k Embedding Tokens/month',
      '2000 Message Credits/month',
      'Remove Branding',
      'AI Leads',
      'Messages History',
      'Access to All LLMs',
      'Omni-channel integrations'
    ],
    popular: true
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/month',
    description: 'For growing businesses with advanced needs',
    features: [
      '5 Chatbots',
      '200k Embedding Tokens/month',
      '5000 Message Credits/month',
      'Remove Branding',
      'AI Leads',
      'Messages History',
      'Access to All LLMs',
      'Omni-channel integrations',
      'Priority support'
    ],
    popular: false
  }
]

export default function PricingSection() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the plan that fits your business needs. All plans include our core features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative bg-gray-950 border-gray-800 hover:border-teal-500 transition-all duration-300 ${
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
                <CardTitle className="text-2xl font-bold text-white mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
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
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600' 
                      : 'bg-gray-800 hover:bg-gray-700 border border-gray-600'
                  } transition-all duration-300`}
                  size="lg"
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
            View Full Pricing Details
          </Button>
        </div>
      </div>
    </section>
  )
}
