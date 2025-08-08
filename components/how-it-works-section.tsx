import { Card, CardContent } from '@/components/ui/card'
import { Palette, Settings, MessageSquare } from 'lucide-react'

const steps = [
  {
    icon: Palette,
    title: 'Create',
    description: 'Design your chatbot with our intuitive drag-and-drop builder. Configure AI models and train with your data.',
    step: '01'
  },
  {
    icon: Settings,
    title: 'Customize',
    description: 'Personalize appearance, set up omni-channel integrations, and configure agentic capabilities for your business tools.',
    step: '02'
  },
  {
    icon: MessageSquare,
    title: 'Deploy',
    description: 'Launch across multiple channels - embed on websites, connect to WhatsApp, Instagram, Telegram, and more.',
    step: '03'
  }
]

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get your AI chatbot up and running in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection lines */}
          <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 transform -translate-y-1/2 z-0"></div>
          
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className="bg-gray-950 border-gray-700 hover:border-teal-500 transition-all duration-300 relative z-10"
            >
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-800 border-2 border-teal-500 rounded-full flex items-center justify-center text-sm font-bold text-teal-400">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
