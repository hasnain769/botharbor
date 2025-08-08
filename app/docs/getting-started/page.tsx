import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeBlock } from "@/components/code-block"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code, Rocket } from 'lucide-react'
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Getting Started with BotHarbor - Quick Setup Guide",
  description:
    "Create your first bot and embed it on your website in just a few minutes. Step-by-step guide to get started with BotHarbor chatbot integration.",
}

export default function GettingStartedPage() {
  const quickStartCode = `<!-- Add this script tag to your HTML -->
<script 
  src="https://botharbor.ai/widget.js" 
  data-bot-id="your-bot-id"
  data-theme="light"
  data-position="bottom-right">
</script>`

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2 sm:mb-4">
          Getting Started
        </h1>
        <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-300">
          Create your first bot and embed it on your website in just a few minutes.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-white text-sm font-bold flex-shrink-0">
                1
              </div>
              Create Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
              Sign up for a BotHarbor account and access your dashboard to manage bots.
            </p>
            <Button className="w-full sm:w-auto bg-teal-500 hover:bg-teal-600" asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-white text-sm font-bold flex-shrink-0">
                2
              </div>
              Create Bot
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
              Use our bot builder to create and train your chatbot with your content.
            </p>
            <Button variant="outline" className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white" asChild>
              <Link href="/dashboard/bots">Create Bot</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-white text-sm font-bold flex-shrink-0">
                3
              </div>
              Embed Widget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
              Add the widget to your website using our simple script tag or iframe.
            </p>
            <Button variant="outline" className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white" asChild>
              <Link href="/docs/embedding/script-tag">View Embedding Guide</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-white">Quick Start</h2>
        <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
          The fastest way to get your chatbot running is with our script tag integration. Just add this code to your
          HTML and replace <code className="bg-gray-800 px-1 py-0.5 rounded text-xs sm:text-sm text-gray-200">your-bot-id</code> with
          your actual bot ID.
        </p>

        <CodeBlock code={quickStartCode} language="html" title="Quick Start - Script Tag" />
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-white">Creating Your First Bot</h2>
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-sm font-bold flex-shrink-0 text-white">
              1
            </div>
            <div>
              <h3 className="font-bold text-lg sm:text-xl mb-2 text-white">Navigate to Bot Builder</h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                From your dashboard, click "Create New Bot" to open the bot builder interface.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-sm font-bold flex-shrink-0 text-white">
              2
            </div>
            <div>
              <h3 className="font-bold text-lg sm:text-xl mb-2 text-white">Configure Basic Settings</h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Set your bot's name, description, and choose a personality that matches your brand.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-sm font-bold flex-shrink-0 text-white">
              3
            </div>
            <div>
              <h3 className="font-bold text-lg sm:text-xl mb-2 text-white">Upload Training Data</h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Upload documents, FAQs, or paste text content to train your bot with your specific knowledge.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-sm font-bold flex-shrink-0 text-white">
              4
            </div>
            <div>
              <h3 className="font-bold text-lg sm:text-xl mb-2 text-white">Test Your Bot</h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Use the built-in chat interface to test your bot's responses and refine its training.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-sm font-bold flex-shrink-0 text-white">
              5
            </div>
            <div>
              <h3 className="font-bold text-lg sm:text-xl mb-2 text-white">Deploy and Embed</h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Once satisfied with your bot's performance, deploy it and get your embedding code.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-white">
              <Code className="h-5 w-5 flex-shrink-0" />
              Embedding Options
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-gray-400">
              Choose the best integration method for your website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-bold text-sm sm:text-base text-white">Script Tag (Recommended)</h4>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  Simple drop-in solution that works with any website
                </p>
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-white">iFrame Embed</h4>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  Full control over positioning and styling
                </p>
              </div>
            </div>
            <Button variant="outline" className="mt-4 w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white" asChild>
              <Link href="/docs/embedding/script-tag">
                View Embedding Guide
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-white">
              <Rocket className="h-5 w-5 flex-shrink-0" />
              Framework Guides
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-gray-400">
              Integration examples for popular frameworks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-bold text-sm sm:text-base text-white">React & Next.js</h4>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  Component-based integration with hooks
                </p>
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-white">Vue.js & Nuxt.js</h4>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">Vue component and plugin examples</p>
              </div>
            </div>
            <Button variant="outline" className="mt-4 w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white" asChild>
              <Link href="/docs/frameworks/react">
                View Framework Guides
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-lg border border-gray-700 bg-gray-900 p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">Need Help?</h3>
        <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4 leading-relaxed">
          If you run into any issues during setup, check our FAQ section or reach out to our support team.
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-gray-800 text-gray-200 hover:bg-gray-700">
            <Link href="/docs/faq">FAQ</Link>
          </Badge>
          <Badge variant="secondary" className="bg-gray-800 text-gray-200 hover:bg-gray-700">
            <Link href="/docs/support">Support</Link>
          </Badge>
        </div>
      </div>
    </div>
  )
}
