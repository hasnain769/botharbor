import { Card, CardContent } from '@/components/ui/card'
import { Code, Zap, Settings, MessageSquare } from 'lucide-react'

const features = [
  {
    icon: Code,
    title: 'Easy Embedding',
    description: 'Embed your chatbot anywhere with a simple script tag or iframe. No complex setup required.'
  },
  {
    icon: Zap,
    title: 'Multi-LLM Support',
    description: 'Cost-efficient message credits with support for multiple AI models including GPT, Claude, and more.'
  },
  {
    icon: Settings,
    title: 'Agentic Capabilities',
    description: 'Integrate with business tools like Google Calendar, CRM systems, and databases for powerful automation.'
  },
  {
    icon: MessageSquare,
    title: 'Omni-Channel Integrations',
    description: 'Connect with WhatsApp, Instagram, Telegram, and other messaging platforms for seamless customer engagement.'
  }
]

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Powerful Features for Modern Businesses
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Everything you need to create, deploy, and manage AI chatbots that drive results
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-gray-900 border-gray-800 hover:border-teal-500 transition-all duration-300 transform hover:scale-105 group"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
