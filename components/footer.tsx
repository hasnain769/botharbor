import { Button } from '@/components/ui/button'
import { Twitter, Linkedin, Github, Mail } from 'lucide-react'
import Link from 'next/link'
import Logo from "@/public/botharbor.png"
import Image from 'next/image'
const footerLinks = {
  Product: [
    'Features',
    'Pricing',
    'Integrations',
    'API Documentation',
    'Changelog'
  ],
  Company: [
    'About Us',
    'Careers',
    'Contact',
    'Blog',
    'Press Kit'
  ],
  Resources: [
    'Help Center',
    'Community',
    'Tutorials',
    'Case Studies',
    'Status Page'
  ],
  Legal: [
    'Privacy Policy',
    'Terms of Service',
    'Cookie Policy',
    'GDPR',
    'Security'
  ]
}

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Mail, href: '#', label: 'Email' }
]

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/" className="flex items-center space-x-2">
            <div className="w-[3rem] h-[3rem]  ">
            <Image src={Logo} alt='BH'></Image>
              
            </div>
            <span className="text-xl font-bold text-white">BotHarbor</span>
          </Link>
             
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Powering Conversations that Convert
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0 text-gray-400 hover:text-teal-400 hover:bg-gray-800"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-teal-400 transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2024 BotHarbor. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
