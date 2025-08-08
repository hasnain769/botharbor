'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-react'
import AnimatedBackground from '@/components/animated-background'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-teal-400 bg-clip-text text-transparent leading-tight">
            Build, Deploy, and Manage AI Chatbots with Ease
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
            BotHarbor helps you create fully customizable AI chatbots that engage your audience and boost conversions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-gray-600 text-white hover:bg-gray-800 font-semibold px-8 py-4 text-lg transition-all duration-300"
            >
              <Play className="mr-2 h-5 w-5" />
              View Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
