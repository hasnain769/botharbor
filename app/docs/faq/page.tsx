"use client"

import { CardDescription } from "@/components/ui/card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CodeBlock } from "@/components/code-block"
import { AlertTriangle, Info, HelpCircle, Shield } from 'lucide-react'

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2 sm:mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-300">
              Find answers to common questions about integrating and using BotHarbor chat widget in your applications.
            </p>
          </div>

          <section className="space-y-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-white">
              Quick Troubleshooting
            </h2>
            <div className="space-y-4 sm:space-y-6">
              <div className="border-l-4 border-blue-500 pl-4 sm:pl-6 bg-gray-900 p-4 rounded-r-lg">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">Widget not showing up?</h3>
                <p className="text-sm sm:text-base leading-relaxed mb-3 text-gray-300">
                  If the BotHarbor widget isn't appearing on your website, try these quick fixes:
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2 flex-shrink-0">•</span>
                    <span>Check that your bot ID is correct in the configuration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2 flex-shrink-0">•</span>
                    <span>Verify the script is loading by checking the Network tab in DevTools</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2 flex-shrink-0">•</span>
                    <span>Ensure there are no JavaScript errors in the console</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2 flex-shrink-0">•</span>
                    <span>Check if Content Security Policy (CSP) is blocking the script</span>
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-4 sm:pl-6 bg-gray-900 p-4 rounded-r-lg">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">Widget appears but doesn't respond?</h3>
                <p className="text-sm sm:text-base leading-relaxed mb-3 text-gray-300">
                  If the widget loads but the bot doesn't respond to messages:
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 flex-shrink-0">•</span>
                    <span>Verify your bot is published and active in the BotHarbor dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 flex-shrink-0">•</span>
                    <span>Check your bot's training data and conversation flows</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 flex-shrink-0">•</span>
                    <span>Ensure your subscription plan supports the number of conversations</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <div className="space-y-6 sm:space-y-8">
            {/* Installation & Setup */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-white">
                  <HelpCircle className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  Installation & Setup
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="widget-not-showing" className="border-gray-700">
                    <AccordionTrigger className="text-left text-white hover:text-gray-300">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="destructive" className="text-xs">
                          Critical
                        </Badge>
                        <span className="text-sm sm:text-base">Why isn't my widget showing up?</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 text-gray-300">
                      <p className="text-sm sm:text-base">
                        This is the most common issue. Here's a step-by-step diagnostic:
                      </p>

                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold mb-2 text-sm sm:text-base text-white">1. Verify Bot ID</h4>
                          <div className="w-full overflow-hidden">
                            <CodeBlock
                              language="html"
                              code={`<!-- Make sure your bot ID is correct -->
<script
  src="https://botharbor.com/widget.js"
  data-bot-id="your-actual-bot-id-here"
></script>

<!-- Check in browser console -->
<script>
console.log('Bot ID:', document.querySelector('script[data-bot-id]')?.getAttribute('data-bot-id'));
</script>`}
                            />
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 text-sm sm:text-base text-white">2. Check Script Loading</h4>
                          <div className="w-full overflow-hidden">
                            <CodeBlock
                              language="javascript"
                              code={`// Add this to check if script loads
const script = document.querySelector('script[src*="botharbor.com"]');
if (script) {
  script.onload = () => console.log('✅ BotHarbor script loaded');
  script.onerror = () => console.error('❌ Failed to load BotHarbor script');
} else {
  console.error('❌ BotHarbor script not found in DOM');
}`}
                            />
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Framework-Specific Issues */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Shield className="h-5 w-5 text-green-500 flex-shrink-0" />
                  Framework-Specific Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="react-issues">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className="text-xs">React</Badge>
                        <span className="text-sm sm:text-base">React-specific problems and solutions</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 text-sm sm:text-base">
                            Issue: Widget reloads on every render
                          </h4>
                          <div className="w-full overflow-hidden">
                            <CodeBlock
                              language="tsx"
                              code={`// ❌ Wrong - causes reload on every render
function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://botharbor.com/widget.js';
    document.body.appendChild(script);
  }); // Missing dependency array!
}

// ✅ Correct - loads only once
function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://botharbor.com/widget.js';
    script.setAttribute('data-bot-id', process.env.REACT_APP_BOT_ID);
    document.body.appendChild(script);
    
    return () => {
      const existingScript = document.querySelector('script[src*="botharbor.com"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []); // Empty dependency array
}`}
                            />
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 text-sm sm:text-base">
                            Issue: Environment variables not working
                          </h4>
                          <div className="w-full overflow-hidden">
                            <CodeBlock
                              language="bash"
                              code={`# ❌ Wrong - missing REACT_APP_ prefix
BOT_ID=your-bot-id

# ✅ Correct - with REACT_APP_ prefix
REACT_APP_BOT_ID=your-bot-id`}
                            />
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="nextjs-issues">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className="text-xs">Next.js</Badge>
                        <span className="text-sm sm:text-base">Next.js SSR and hydration issues</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 text-sm sm:text-base">Issue: Hydration mismatch errors</h4>
                          <div className="w-full overflow-hidden">
                            <CodeBlock
                              language="tsx"
                              code={`// ❌ Wrong - causes hydration issues
export default function Layout() {
  return (
    <div>
      <script src="https://botharbor.com/widget.js" data-bot-id="..." />
    </div>
  );
}

// ✅ Correct - client-side only
'use client'
import { useEffect, useState } from 'react';

export default function BotHarborWidget() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if (!isClient) return;
    
    const script = document.createElement('script');
    script.src = 'https://botharbor.com/widget.js';
    script.setAttribute('data-bot-id', process.env.NEXT_PUBLIC_BOT_ID);
    document.body.appendChild(script);
  }, [isClient]);
  
  return null;
}`}
                            />
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 text-sm sm:text-base">
                            Issue: Environment variables undefined
                          </h4>
                          <div className="w-full overflow-hidden">
                            <CodeBlock
                              language="bash"
                              code={`# ❌ Wrong - missing NEXT_PUBLIC_ prefix
BOT_ID=your-bot-id

# ✅ Correct - with NEXT_PUBLIC_ prefix for client-side
NEXT_PUBLIC_BOT_ID=your-bot-id`}
                            />
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="vue-issues">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className="text-xs">Vue.js</Badge>
                        <span className="text-sm sm:text-base">Vue.js lifecycle and reactivity issues</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 text-sm sm:text-base">
                            Issue: Widget not cleaning up properly
                          </h4>
                          <div className="w-full overflow-hidden">
                            <CodeBlock
                              language="vue"
                              code={`<!-- ❌ Wrong - no cleanup -->
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://botharbor.com/widget.js'
  document.body.appendChild(script)
})
</script>

<!-- ✅ Correct - with proper cleanup -->
<script setup>
import { onMounted, onUnmounted } from 'vue'

let scriptElement = null

onMounted(() => {
  scriptElement = document.createElement('script')
  scriptElement.src = 'https://botharbor.com/widget.js'
  scriptElement.setAttribute('data-bot-id', process.env.VUE_APP_BOT_ID)
  document.body.appendChild(scriptElement)
})

onUnmounted(() => {
  if (scriptElement) {
    document.body.removeChild(scriptElement)
    scriptElement = null
  }
})
</script>`}
                            />
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Performance & Security */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Performance & Security</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="slow-loading">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          Performance
                        </Badge>
                        <span className="text-sm sm:text-base">Widget is loading slowly</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p className="text-sm sm:text-base">Optimize widget loading performance:</p>

                      <div className="w-full overflow-hidden">
                        <CodeBlock
                          language="html"
                          code={`<!-- Preload resources -->
<link rel="preload" href="https://botharbor.com/widget.js" as="script">
<link rel="dns-prefetch" href="https://botharbor.com">

<!-- Use async loading -->
<script
  src="https://botharbor.com/widget.js"
  async
  data-bot-id="your-bot-id"
></script>

<!-- Or lazy load on user interaction -->
<script>
let widgetLoaded = false;

function loadWidget() {
  if (widgetLoaded) return;
  
  const script = document.createElement('script');
  script.src = 'https://botharbor.com/widget.js';
  script.async = true;
  script.setAttribute('data-bot-id', 'your-bot-id');
  document.body.appendChild(script);
  
  widgetLoaded = true;
}

// Load on first user interaction
document.addEventListener('click', loadWidget, { once: true });
document.addEventListener('scroll', loadWidget, { once: true });
</script>`}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="csp-issues">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          Security
                        </Badge>
                        <span className="text-sm sm:text-base">Content Security Policy (CSP) blocking widget</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p className="text-sm sm:text-base">Configure CSP to allow BotHarbor widget:</p>

                      <div className="w-full overflow-hidden">
                        <CodeBlock
                          language="html"
                          code={`<!-- Add to your HTML head or HTTP headers -->
<meta http-equiv="Content-Security-Policy" content="
  script-src 'self' https://botharbor.com;
  connect-src 'self' https://api.botharbor.com wss://ws.botharbor.com;
  img-src 'self' https://botharbor.com data:;
  style-src 'self' 'unsafe-inline' https://botharbor.com;
  font-src 'self' https://botharbor.com;
  frame-src 'self' https://botharbor.com;
">

<!-- Or in HTTP headers -->
Content-Security-Policy: 
  script-src 'self' https://botharbor.com;
  connect-src 'self' https://api.botharbor.com wss://ws.botharbor.com;
  img-src 'self' https://botharbor.com data:;
  style-src 'self' 'unsafe-inline' https://botharbor.com;`}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="cors-issues">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          Security
                        </Badge>
                        <span className="text-sm sm:text-base">CORS errors when loading widget</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p className="text-sm sm:text-base">
                        CORS issues are usually resolved automatically, but here are some troubleshooting steps:
                      </p>

                      <div className="w-full overflow-hidden">
                        <CodeBlock
                          language="javascript"
                          code={`// Check if CORS is the actual issue
fetch('https://botharbor.com/widget.js')
  .then(response => {
    if (response.ok) {
      console.log('✅ CORS is not the issue');
    } else {
      console.log('❌ Response not OK:', response.status);
    }
  })
  .catch(error => {
    console.log('❌ Fetch error (might be CORS):', error);
  });

// Alternative loading method if CORS persists
function loadWidgetWithJsonp() {
  window.botHarborCallback = function() {
    console.log('Widget loaded via JSONP');
  };
  
  const script = document.createElement('script');
  script.src = 'https://botharbor.com/widget.js?callback=botHarborCallback';
  script.setAttribute('data-bot-id', 'your-bot-id');
  document.body.appendChild(script);
}`}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Browser Compatibility */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Browser Compatibility</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="ie-support">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          Legacy
                        </Badge>
                        <span className="text-sm sm:text-base">Internet Explorer support</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="text-sm sm:text-base">
                          <strong>Note:</strong> Internet Explorer is no longer supported by Microsoft. We recommend
                          upgrading to a modern browser.
                        </AlertDescription>
                      </Alert>

                      <p className="text-sm sm:text-base">
                        For legacy IE support (not recommended), use the compatibility version:
                      </p>

                      <div className="w-full overflow-hidden">
                        <CodeBlock
                          language="html"
                          code={`<!-- IE11 compatibility version -->
<script
  src="https://botharbor.com/widget-ie.js"
  data-bot-id="your-bot-id"
></script>

<!-- Add polyfills for IE -->
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6,fetch,Promise"></script>`}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="safari-issues">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          Safari
                        </Badge>
                        <span className="text-sm sm:text-base">Safari-specific issues</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p className="text-sm sm:text-base">Common Safari issues and fixes:</p>

                      <div className="w-full overflow-hidden">
                        <CodeBlock
                          language="css"
                          code={`/* Fix Safari viewport height issues */
.botharbor-widget {
  height: 100vh !important;
  height: -webkit-fill-available !important;
}

/* Fix Safari input zoom */
.botharbor-input {
  font-size: 16px !important; /* Prevents zoom on focus */
  -webkit-appearance: none !important;
}

/* Fix Safari flexbox issues */
.botharbor-messages {
  display: -webkit-box !important;
  display: -webkit-flex !important;
  display: flex !important;
  -webkit-flex-direction: column !important;
  flex-direction: column !important;
}`}
                        />
                      </div>

                      <div className="w-full overflow-hidden">
                        <CodeBlock
                          language="javascript"
                          code={`// Safari-specific JavaScript fixes
// Fix Safari localStorage issues
try {
  localStorage.setItem('test', 'test');
  localStorage.removeItem('test');
} catch (e) {
  console.warn('localStorage not available, using memory storage');
  // Implement fallback storage
}

// Fix Safari WebSocket issues
if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
  // Safari-specific WebSocket handling
  window.BotHarborConfig = {
    ...window.BotHarborConfig,
    websocketFallback: true
  };
}`}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Advanced Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Advanced Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="custom-data">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className="text-xs">Advanced</Badge>
                        <span className="text-sm sm:text-base">How do I pass custom data to my bot?</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p className="text-sm sm:text-base">Use the context and user data features:</p>

                      <div className="w-full overflow-hidden">
                        <CodeBlock
                          language="javascript"
                          code={`BotHarbor.init({
  botId: 'your-bot-id',
  onReady: () => {
    // Set user information
    BotHarbor.setUser({
      id: 'user123',
      name: 'John Doe',
      email: 'john@example.com',
      plan: 'premium'
    })
    
    // Set page/application context
    BotHarbor.setContext({
      page: window.location.pathname,
      product: getCurrentProduct(),
      cartValue: getCartValue(),
      userSegment: 'returning_customer'
    })
  }
})`}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="custom-appearance">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className="text-xs">Advanced</Badge>
                        <span className="text-sm sm:text-base">
                          Can I customize the widget's appearance completely?
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p className="text-sm sm:text-base">Yes, you have full control over styling:</p>

                      <div className="w-full overflow-hidden">
                        <CodeBlock
                          language="css"
                          code={`/* Override any BotHarbor styles */
.botharbor-widget {
  /* Custom widget container styles */
  border-radius: 20px !important;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
}

.botharbor-header {
  /* Custom header styles */
  background: linear-gradient(45deg, #667eea, #764ba2) !important;
}

.botharbor-message-bot {
  /* Custom bot message styles */
  background: #f0f0f0 !important;
  border-left: 4px solid #667eea !important;
}`}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="widget-events">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className="text-xs">Advanced</Badge>
                        <span className="text-sm sm:text-base">How do I handle widget events for analytics?</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p className="text-sm sm:text-base">Use the comprehensive event system:</p>

                      <div className="w-full overflow-hidden">
                        <CodeBlock
                          language="javascript"
                          code={`BotHarbor.init({
  botId: 'your-bot-id',
  
  onOpen: () => {
    // Google Analytics 4
    gtag('event', 'chat_opened', {
      event_category: 'engagement'
    })
    
    // Facebook Pixel
    fbq('track', 'Contact')
  },
  
  onMessage: (message) => {
    if (message.sender === 'user') {
      gtag('event', 'user_message', {
        event_category: 'engagement',
        message_length: message.text.length
      })
    }
  },
  
  onClose: () => {
    gtag('event', 'chat_closed', {
      event_category: 'engagement',
      session_duration: BotHarbor.getSessionDuration()
    })
  }
})`}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="api-integration">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className="text-xs">Advanced</Badge>
                        <span className="text-sm sm:text-base">How do I integrate with my existing API?</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p className="text-sm sm:text-base">Connect your bot to external APIs and databases:</p>

                      <div className="w-full overflow-hidden">
                        <CodeBlock
                          language="javascript"
                          code={`// Configure API endpoints in BotHarbor dashboard
BotHarbor.init({
  botId: 'your-bot-id',
  apiEndpoints: {
    // Custom webhook for processing messages
    webhook: 'https://your-api.com/webhook/botharbor',
    
    // User data endpoint
    userData: 'https://your-api.com/api/users/{userId}',
    
    // Product catalog
    products: 'https://your-api.com/api/products'
  },
  
  // Custom message processing
  onMessage: async (message) => {
    if (message.intent === 'get_order_status') {
      const orderData = await fetch(\`https://your-api.com/orders/\${message.orderId}\`);
      const order = await orderData.json();
      
      BotHarbor.sendMessage({
        text: \`Your order #\${order.id} is \${order.status}\`,
        data: order
      });
    }
  }
})`}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Still Need Help? */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl text-white">Still Need Help?</CardTitle>
                <CardDescription className="text-sm sm:text-base text-gray-400">
                  If you couldn't find the answer to your question, here are additional resources
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border border-gray-700 rounded-lg bg-gray-800">
                    <h3 className="font-semibold mb-2 text-base sm:text-lg text-white">📧 Email Support</h3>
                    <p className="text-sm text-gray-400 mb-2">Get help from our technical support team</p>
                    <p className="text-sm text-gray-300">
                      <strong>Email:</strong> support@botharbor.com
                      <br />
                      <strong>Response time:</strong> 24-48 hours
                    </p>
                  </div>

                  <div className="p-4 border border-gray-700 rounded-lg bg-gray-800">
                    <h3 className="font-semibold mb-2 text-base sm:text-lg text-white">💬 Live Chat</h3>
                    <p className="text-sm text-gray-400 mb-2">Chat with our support team in real-time</p>
                    <p className="text-sm text-gray-300">
                      <strong>Hours:</strong> Mon-Fri 9AM-6PM EST
                      <br />
                      <strong>Response time:</strong> Usually within minutes
                    </p>
                  </div>
                </div>

                <Alert className="border-blue-500 bg-blue-950/20">
                  <Info className="h-4 w-4 text-blue-400" />
                  <AlertDescription className="text-sm sm:text-base text-blue-200">
                    <strong>Pro tip:</strong> When contacting support, include your bot ID, browser version, and any
                    console error messages for faster resolution.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
