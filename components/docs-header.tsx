"use client"

import Link from "next/link"
import { Github, ExternalLink, Menu, X, Home } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import Logo from "@/public/botharbor.png"

export function DocsHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    // Toggle body scroll lock
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'unset'
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left side - Mobile menu + Logo */}
            <div className="flex items-center space-x-3">
              {/* Mobile menu button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>

              {/* Logo */}
              <Link href="/docs" className="flex items-center space-x-2  lg:pl-16">
                
            <div className="w-[3rem] h-[3rem]  ">
            <Image src={Logo} alt='BH'></Image>
              
            </div>
            
                <div className="hidden sm:block">
                  <h1 className="text-lg font-semibold text-white">Documentation</h1>
                </div>
                <div className="sm:hidden">
                  <h1 className="text-lg font-semibold text-white">Docs</h1>
                </div>
              </Link>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              
              
              <Link
                href="https://app.botharbor.ai"
                className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 transition-colors rounded-md"
              >
                {/* <span className="hidden xs:inline">Dashboard</span> */}
                <span className="xs:hidden">Dashboard</span>
                <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-gray-950 border-r border-gray-800 overflow-y-auto">
            <div className="p-6">
              <nav className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Getting Started
                  </h3>
                  <div className="space-y-2">
                    <Link
                      href="/docs"
                      onClick={toggleMobileMenu}
                      className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                    >
                      Introduction
                    </Link>
                    <Link
                      href="/docs/getting-started"
                      onClick={toggleMobileMenu}
                      className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                    >
                      Quick Start
                    </Link>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Integration
                  </h3>
                  <div className="space-y-2">
                    <Link
                      href="/docs/embedding/script-tag"
                      onClick={toggleMobileMenu}
                      className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                    >
                      Script Tag
                    </Link>
                    <Link
                      href="/docs/embedding/iframe"
                      onClick={toggleMobileMenu}
                      className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                    >
                      iFrame
                    </Link>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Frameworks
                  </h3>
                  <div className="space-y-2">
                    <Link
                      href="/docs/frameworks/react"
                      onClick={toggleMobileMenu}
                      className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                    >
                      React
                    </Link>
                    <Link
                      href="/docs/frameworks/vue"
                      onClick={toggleMobileMenu}
                      className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                    >
                      Vue.js
                    </Link>
                    <Link
                      href="/docs/frameworks/nextjs"
                      onClick={toggleMobileMenu}
                      className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                    >
                      Next.js
                    </Link>
                    <Link
                      href="/docs/frameworks/nuxtjs"
                      onClick={toggleMobileMenu}
                      className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                    >
                      Nuxt.js
                    </Link>
                    <Link
                      href="/docs/frameworks/angular"
                      onClick={toggleMobileMenu}
                      className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                    >
                      Angular
                    </Link>
                    <Link
                      href="/docs/frameworks/html-javascript"
                      onClick={toggleMobileMenu}
                      className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                    >
                      HTML/JavaScript
                    </Link>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Resources
                  </h3>
                  <div className="space-y-2">
                    <Link
                      href="/docs/customizations"
                      onClick={toggleMobileMenu}
                      className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                    >
                      Customizations
                    </Link>
                    <Link
                      href="/docs/faq"
                      onClick={toggleMobileMenu}
                      className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                    >
                      FAQ
                    </Link>
                    <Link
                      href="/docs/support"
                      onClick={toggleMobileMenu}
                      className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                    >
                      Support
                    </Link>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
