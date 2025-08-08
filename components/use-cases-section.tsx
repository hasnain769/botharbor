import { Card, CardContent } from '@/components/ui/card'
import { ShoppingCart, Headphones, Rocket, TrendingUp } from 'lucide-react'

const useCases = [
  {
    icon: ShoppingCart,
    title: 'E-commerce',
    description: 'Boost sales with product recommendations, order tracking, and 24/7 support across all channels.',
    image: '/ecommerce-chatbot-interface.png'
  },
  {
    icon: Headphones,
    title: 'Customer Support',
    description: 'Reduce support tickets by 80% with intelligent responses on WhatsApp, Instagram, and your website.',
    image: '/customer-support-chatbot.png'
  },
  {
    icon: Rocket,
    title: 'SaaS Onboarding',
    description: 'Guide new users through your platform with interactive tutorials across multiple touchpoints.',
    image: '/saas-onboarding-chatbot.png'
  },
  {
    icon: TrendingUp,
    title: 'Lead Generation',
    description: 'Qualify leads automatically across social media and schedule meetings with your sales team.',
    image: '/placeholder-e8q29.png'
  }
]

export default function UseCasesSection() {
  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Perfect for Every Industry
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See how businesses across different industries use BotHarbor to drive growth
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {useCases.map((useCase, index) => (
            <Card 
              key={index} 
              className="bg-gray-900 border-gray-800 hover:border-teal-500 transition-all duration-300 transform hover:scale-105 group overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={useCase.image || "/placeholder.svg"} 
                  alt={`${useCase.title} chatbot example`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <useCase.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-white">{useCase.title}</h3>
                <p className="text-gray-400 leading-relaxed">{useCase.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
