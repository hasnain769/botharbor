'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

const navigation = [
  { name: 'Features', href: '/#features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Blog', href: '/#blog' },
  { name: 'Docs', href: '/docs' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false)
    
    if (href.startsWith('/#')) {
      // Handle anchor links for homepage
      if (window.location.pathname !== '/') {
        window.location.href = href
      } else {
        const element = document.querySelector(href.substring(1))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-950/95 backdrop-blur-sm border-b border-gray-800' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BH</span>
            </div>
            <span className="text-xl font-bold text-white">BotHarbor</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              item.href.startsWith('/') && !item.href.startsWith('/#') ? (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {item.name}
                </button>
              )
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-gray-300 hover:text-white"
              onClick={() => window.open('https://app.botharbor.ai/sign-in', '_blank')}
            >
              Sign In
            </Button>
            <Button 
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
              onClick={() => window.open('https://app.botharbor.ai/sign-up', '_blank')}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-950 border-t border-gray-800">
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                item.href.startsWith('/') && !item.href.startsWith('/#') ? (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-gray-300 hover:text-white transition-colors duration-200 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className="block text-gray-300 hover:text-white transition-colors duration-200 py-2 text-left w-full"
                  >
                    {item.name}
                  </button>
                )
              ))}
              <div className="pt-4 space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full text-gray-300 hover:text-white justify-start"
                  onClick={() => {
                    window.open('https://app.botharbor.ai/sign-in', '_blank')
                    setIsMenuOpen(false)
                  }}
                >
                  Sign In
                </Button>
                <Button 
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
                  onClick={() => {
                    window.open('https://app.botharbor.ai/sign-up', '_blank')
                    setIsMenuOpen(false)
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
