"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { BookOpen, Rocket, Code2, Palette, HelpCircle, MessageSquare, FileText, Monitor, ChevronLeft, ChevronRight } from 'lucide-react'
import { FaReact, FaAngular, FaVuejs, FaHtml5 } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { SiNuxtdotjs } from "react-icons/si";



const navigation = [
  {
    title: "Getting Started",
    items: [
      { 
        title: "Introduction", 
        href: "/docs", 
        icon: BookOpen,
        description: "Learn about BotHarbor and its capabilities"
      },
      { 
        title: "Quick Start", 
        href: "/docs/getting-started", 
        icon: Rocket,
        description: "Get up and running in minutes"
      },
    ]
  },
  {
    title: "Integration Methods",
    items: [
      { 
        title: "Script Tag", 
        href: "/docs/embedding/script-tag", 
        icon: Code2,
        description: "Simple script tag integration"
      },
      { 
        title: "iFrame Embed", 
        href: "/docs/embedding/iframe", 
        icon: Monitor,
        description: "Embed using iFrame"
      },
    ]
  },
  {
    title: "Framework Guides",
    items: [
      { 
        title: "React", 
        href: "/docs/frameworks/react", 
        icon: FaReact,
        description: "React integration guide"
      },
      { 
        title: "Vue.js", 
        href: "/docs/frameworks/vue", 
        icon: FaVuejs,
        description: "Vue.js integration guide"
      },
      { 
        title: "Next.js", 
        href: "/docs/frameworks/nextjs", 
        icon: RiNextjsFill,
        description: "Next.js integration guide"
      },
      { 
        title: "Nuxt.js", 
        href: "/docs/frameworks/nuxtjs", 
        icon: SiNuxtdotjs,
        description: "Nuxt.js integration guide"
      },
      { 
        title: "Angular", 
        href: "/docs/frameworks/angular", 
        icon: FaAngular,
        description: "Angular integration guide"
      },
      { 
        title: "HTML/JavaScript", 
        href: "/docs/frameworks/html-javascript", 
        icon: FaHtml5,
        description: "Vanilla HTML/JS integration"
      },
    ]
  },
  {
    title: "Customization",
    items: [
      { 
        title: "Styling & Themes", 
        href: "/docs/customizations", 
        icon: Palette,
        description: "Customize appearance and behavior"
      },
    ]
  },
  {
    title: "Help & Support",
    items: [
      { 
        title: "FAQ", 
        href: "/docs/faq", 
        icon: HelpCircle,
        description: "Frequently asked questions"
      },
      { 
        title: "Support", 
        href: "/docs/support", 
        icon: MessageSquare,
        description: "Get help and contact support"
      },
    ]
  }
]

export function DocsSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside className={cn(
      "hidden lg:block border-r border-gray-800 bg-gray-950/50 backdrop-blur-sm transition-all duration-300 ease-in-out",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col">
        {/* Sidebar Header with Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800 flex-shrink-0">
          {!isCollapsed && (
            <h2 className="text-sm font-semibold text-white">Documentation</h2>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              "p-1.5 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white transition-colors",
              isCollapsed && "mx-auto"
            )}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto">
          <nav className={cn(
            "space-y-6",
            isCollapsed ? "p-2" : "p-6"
          )}>
            {navigation.map((section) => (
              <div key={section.title}>
                {!isCollapsed && (
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                    {section.title}
                  </h3>
                )}
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "group relative flex items-center rounded-lg text-sm transition-all duration-200",
                            isCollapsed ? "p-3 justify-center" : "px-3 py-2 space-x-3",
                            isActive
                              ? "bg-teal-600/20 text-teal-400"
                              : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                          )}
                          title={isCollapsed ? item.title : undefined}
                        >
                          <Icon className={cn(
                            "h-4 w-4 flex-shrink-0",
                            isActive ? "text-teal-400" : "text-gray-500 group-hover:text-gray-300"
                          )} />
                          
                          {!isCollapsed && (
                            <div className="flex-1 min-w-0">
                              <div className={cn(
                                "font-medium",
                                isActive ? "text-teal-400" : "text-gray-300 group-hover:text-white"
                              )}>
                                {item.title}
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5 leading-tight">
                                {item.description}
                              </div>
                            </div>
                          )}

                          {/* Tooltip for collapsed state */}
                          {isCollapsed && (
                            <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 border border-gray-700">
                              <div className="font-medium">{item.title}</div>
                              <div className="text-xs text-gray-400 mt-0.5">{item.description}</div>
                            </div>
                          )}

                          {/* Active indicator */}
                          {isActive && !isCollapsed && (
                            <div className="w-1 h-6 bg-teal-400 rounded-full absolute -left-3" />
                          )}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  )
}
