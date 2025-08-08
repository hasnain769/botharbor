import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, MessageSquare, Zap, Shield, Globe, BarChart } from 'lucide-react'
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Introduction to BotHarbor - AI-Powered Chatbot Platform",
  description:
    "Build, deploy, and manage intelligent chatbots with ease. BotHarbor provides everything you need to create conversational AI experiences for your website.",
}

export default function IntroductionPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2 sm:mb-4">
          Introduction 
        </h1>
        <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-300">
          Build, deploy, and manage intelligent chatbots with ease. BotHarbor provides everything you need to create
          conversational AI experiences.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-white">
              <Bot className="h-5 w-5 flex-shrink-0" />
              What is BotHarbor?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              BotHarbor is a comprehensive platform for creating, training, and deploying AI-powered chatbots. Whether
              you're building customer support bots, lead generation tools, or interactive assistants, BotHarbor
              provides the infrastructure and tools you need.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-white">
              <Zap className="h-5 w-5 flex-shrink-0" />
              Quick Setup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Get your chatbot running in minutes with our simple embedding options. Just add a script tag or iframe to
              your website, and your bot is live.
            </p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-white">Key Features</h2>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-start gap-3">
            <MessageSquare className="h-5 w-5 mt-1 text-teal-400 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white">Intelligent Conversations</h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                AI-powered responses with context awareness and natural language understanding.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Globe className="h-5 w-5 mt-1 text-teal-400 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white">Easy Integration</h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Works with any website or framework. React, Vue, Angular, or plain HTML.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <BarChart className="h-5 w-5 mt-1 text-teal-400 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white">Analytics & Insights</h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Track conversations, user engagement, and bot performance with detailed analytics.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 mt-1 text-teal-400 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white">Secure & Reliable</h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Enterprise-grade security with 99.9% uptime and data protection.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Bot className="h-5 w-5 mt-1 text-teal-400 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white">Custom Training</h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Train your bot with your own data, documents, and conversation flows.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Zap className="h-5 w-5 mt-1 text-teal-400 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white">Real-time Updates</h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Live conversation monitoring and instant bot updates without downtime.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-white">Use Cases</h2>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl text-white">Customer Support</CardTitle>
              <CardDescription className="text-sm sm:text-base text-gray-400">
                Automate common support queries and provide 24/7 assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm sm:text-base text-gray-300">
                <li>• Answer frequently asked questions</li>
                <li>• Escalate complex issues to human agents</li>
                <li>• Provide instant responses to customers</li>
                <li>• Reduce support ticket volume</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl text-white">Lead Generation</CardTitle>
              <CardDescription className="text-sm sm:text-base text-gray-400">
                Capture and qualify leads through interactive conversations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm sm:text-base text-gray-300">
                <li>• Qualify prospects automatically</li>
                <li>• Collect contact information</li>
                <li>• Schedule meetings and demos</li>
                <li>• Nurture leads with personalized content</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl text-white">E-commerce Assistant</CardTitle>
              <CardDescription className="text-sm sm:text-base text-gray-400">
                Help customers find products and complete purchases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm sm:text-base text-gray-300">
                <li>• Product recommendations</li>
                <li>• Order tracking and status</li>
                <li>• Shopping cart assistance</li>
                <li>• Return and refund support</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl text-white">Internal Tools</CardTitle>
              <CardDescription className="text-sm sm:text-base text-gray-400">
                Streamline internal processes and employee assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm sm:text-base text-gray-300">
                <li>• HR policy questions</li>
                <li>• IT support and troubleshooting</li>
                <li>• Knowledge base search</li>
                <li>• Workflow automation</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="rounded-lg border border-gray-700 bg-gray-900 p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">Ready to get started?</h3>
        <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4 leading-relaxed">
          Follow our getting started guide to create your first bot and embed it on your website in minutes.
        </p>
        <div className="flex gap-2">
          <Link href="/docs/getting-started">
            <Badge variant="secondary" className="text-xs bg-gray-800 text-gray-200 hover:bg-gray-700">
              Next: Getting Started →
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  )
}
