import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Support - BotHarbor Documentation",
  description:
    "Get help with BotHarbor integration, troubleshooting, and technical questions from our expert support team.",
}

export default function SupportPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-2 sm:mb-4 text-white">Support</h1>
        <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 text-gray-300">
          Get help with BotHarbor integration, troubleshooting, and technical questions from our expert support team.
        </p>
      </div>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">Contact Methods</h2>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          <div className="bg-gray-900 border border-gray-700 p-4 sm:p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">Live Chat</h3>
                <p className="text-sm sm:text-base text-gray-300">Available 24/7</p>
              </div>
            </div>
            <p className="text-sm sm:text-base mb-4 text-gray-300 leading-relaxed">
              Get instant help from our support team through our live chat widget.
            </p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base">
              Start Chat
            </button>
          </div>

          <div className="bg-gray-900 border border-gray-700 p-4 sm:p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">Email Support</h3>
                <p className="text-sm sm:text-base text-gray-300">Response within 4 hours</p>
              </div>
            </div>
            <p className="text-sm sm:text-base mb-4 text-gray-300 leading-relaxed">
              Send detailed questions and get comprehensive answers via email.
            </p>
            <a
              href="mailto:support@botharbor.ai"
              className="w-full inline-block text-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors text-sm sm:text-base"
            >
              Email Us
            </a>
          </div>

          <div className="bg-gray-900 border border-gray-700 p-4 sm:p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">Phone Support</h3>
                <p className="text-sm sm:text-base text-gray-300">Business hours only</p>
              </div>
            </div>
            <p className="text-sm sm:text-base mb-4 text-gray-300 leading-relaxed">
              Speak directly with our technical team for urgent issues.
            </p>
            <a
              href="tel:+1-555-BOTHARBOR"
              className="w-full inline-block text-center bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors text-sm sm:text-base"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">Self-Service Resources</h2>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          <div className="bg-gray-900 border border-gray-700 p-4 sm:p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl font-bold text-white">Documentation</h3>
            <p className="text-sm sm:text-base mb-4 text-gray-300 leading-relaxed">
              Comprehensive guides and API references to help you integrate BotHarbor successfully.
            </p>
            <ul className="space-y-2 mb-4 text-sm sm:text-base text-gray-300">
              <li>
                <a href="/docs/getting-started" className="text-blue-600 hover:underline">
                  Getting Started Guide
                </a>
              </li>
              <li>
                <a href="/docs/frameworks/react" className="text-blue-600 hover:underline">
                  Framework Integration Guides
                </a>
              </li>
              <li>
                <a href="/docs/customization" className="text-blue-600 hover:underline">
                  Customization Options
                </a>
              </li>
              <li>
                <a href="/docs/faq" className="text-blue-600 hover:underline">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-gray-900 border border-gray-700 p-4 sm:p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl font-bold text-white">Community Forum</h3>
            <p className="text-sm sm:text-base mb-4 text-gray-300 leading-relaxed">
              Connect with other developers, share solutions, and get help from the community.
            </p>
            <ul className="space-y-2 mb-4 text-sm sm:text-base text-gray-300">
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Integration Help
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Troubleshooting
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Feature Requests
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Show & Tell
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">Need More Help?</h2>
        <div className="rounded-lg border bg-gray-900 border border-gray-700 p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-white">Contact Our Team</h3>
          <p className="text-sm sm:text-base text-gray-300 mb-4 leading-relaxed">
            If you can't find the answer you're looking for, our support team is here to help. We typically respond
            within 4 hours during business hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:support@botharbor.ai"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-center text-sm sm:text-base"
            >
              Email Support
            </a>
            <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors text-sm sm:text-base">
              Start Live Chat
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
