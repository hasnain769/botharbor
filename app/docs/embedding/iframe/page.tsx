import { CodeBlock } from "@/components/code-block"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Monitor, Smartphone, Settings } from 'lucide-react'
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "iFrame Integration - BotHarbor Documentation",
  description: "Learn how to embed BotHarbor chatbots using iFrames for maximum isolation and security.",
}

export default function IframePage() {
  const basicIframe = `<iframe 
  src="https://botharbor.ai/widget?bot_id=your-bot-id" 
  width="400" 
  height="600"
  frameborder="0"
  title="BotHarbor Chat">
</iframe>`

  const responsiveIframe = `<div class="botharbor-container">
  <iframe 
    src="https://botharbor.ai/widget?bot_id=your-bot-id&theme=light&greeting=Hello!" 
    frameborder="0"
    title="BotHarbor Chat">
  </iframe>
</div>

<style>
.botharbor-container {
  position: relative;
  width: 100%;
  height: 600px;
  max-width: 400px;
  margin: 0 auto;
}

.botharbor-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .botharbor-container {
    height: 500px;
    max-width: 100%;
  }
}
</style>`

  const fullPageIframe = `<!DOCTYPE html>
<html>
<head>
  <title>Customer Support Chat</title>
  <style>
    body, html {
      margin: 0;
      padding: 0;
      height: 100%;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    .chat-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    .header {
      background: #f8fafc;
      padding: 1rem;
      border-bottom: 1px solid #e2e8f0;
    }
    .chat-frame {
      flex: 1;
      border: none;
    }
  </style>
</head>
<body>
  <div class="chat-container">
    <div class="header">
      <h1>Customer Support</h1>
      <p>Chat with our AI assistant for instant help</p>
    </div>
    <iframe 
      class="chat-frame"
      src="https://botharbor.ai/widget?bot_id=your-bot-id&theme=light&fullscreen=true"
      title="Customer Support Chat">
    </iframe>
  </div>
</body>
</html>`

  const dynamicIframe = `<script>
function createBotHarborIframe(containerId, botId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Build query parameters
  const params = new URLSearchParams({
    bot_id: botId,
    theme: options.theme || 'light',
    greeting: options.greeting || 'Hello! How can I help you?',
    primaryColor: options.primaryColor || '#14B8A6',
    ...options
  });

  // Create iframe
  const iframe = document.createElement('iframe');
  iframe.src = \`https://botharbor.ai/widget?\${params.toString()}\`;
  iframe.width = options.width || '400';
  iframe.height = options.height || '600';
  iframe.frameBorder = '0';
  iframe.title = options.title || 'BotHarbor Chat';
  iframe.style.borderRadius = '12px';
  iframe.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';

  container.appendChild(iframe);
}

// Usage
createBotHarborIframe('chat-container', 'your-bot-id', {
  theme: 'dark',
  greeting: 'Welcome to our support chat!',
  primaryColor: '#10b981',
  width: '100%',
  height: '700'
});
</script>

<div id="chat-container"></div>`

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2 sm:mb-4">
          iFrame Integration
        </h1>
        <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-300">
          Embed BotHarbor as an iframe for full control over positioning, styling, and integration with your existing
          layout.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-white">
              <Monitor className="h-5 w-5 flex-shrink-0" />
              Full Control
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Complete control over size, position, and styling of the chat interface.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-white">
              <Smartphone className="h-5 w-5 flex-shrink-0" />
              Responsive
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Easily make the chat interface responsive and mobile-friendly.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-white">
              <Settings className="h-5 w-5 flex-shrink-0" />
              Customizable
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Pass configuration options via URL parameters for customization.
            </p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-white">Basic Implementation</h2>
        <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
          The simplest way to embed BotHarbor as an iframe:
        </p>

        <CodeBlock code={basicIframe} language="html" title="Basic iFrame" />
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-white">Responsive iFrame</h2>
        <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
          Make your chat widget responsive and mobile-friendly:
        </p>

        <CodeBlock code={responsiveIframe} language="html" title="Responsive iFrame with CSS" />
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-white">URL Parameters</h2>
        <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
          Customize the chat interface by adding parameters to the iframe URL:
        </p>

        <div className="grid gap-4 lg:gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl text-white">Required Parameters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-xs sm:text-sm">bot_id</code>
                  <span className="ml-2 text-sm sm:text-base text-gray-300">
                    Your unique bot ID from BotHarbor dashboard
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl text-white">Appearance Parameters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-xs sm:text-sm">theme</code>
                  <span className="ml-2 text-sm sm:text-base text-gray-300">light, dark, or auto</span>
                </div>
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-xs sm:text-sm">primaryColor</code>
                  <span className="ml-2 text-sm sm:text-base text-gray-300">Hex color code (e.g., %2314B8A6)</span>
                </div>
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-xs sm:text-sm">greeting</code>
                  <span className="ml-2 text-sm sm:text-base text-gray-300">URL-encoded greeting message</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl text-white">Layout Parameters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-xs sm:text-sm">fullscreen</code>
                  <span className="ml-2 text-sm sm:text-base text-gray-300">
                    true or false - removes padding and borders
                  </span>
                </div>
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-xs sm:text-sm">hideHeader</code>
                  <span className="ml-2 text-sm sm:text-base text-gray-300">true or false - hides the chat header</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-white">Full-Page Chat</h2>
        <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
          Create a dedicated chat page using iframe:
        </p>

        <CodeBlock code={fullPageIframe} language="html" title="Full-Page Chat Implementation" />
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-white">Dynamic iFrame Creation</h2>
        <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
          Create and configure iframes dynamically with JavaScript:
        </p>

        <CodeBlock code={dynamicIframe} language="javascript" title="Dynamic iFrame Creation" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Alert>
          <AlertDescription className="text-white text-sm">
            <strong>Security Note:</strong> iFrames are sandboxed and cannot access your page's content or cookies.
          </AlertDescription>
        </Alert>

        <Alert>
          <AlertDescription className="text-white text-sm">
            <strong>Performance:</strong> iFrames load independently and won't block your main page content.
          </AlertDescription>
        </Alert>
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-white">Best Practices</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl text-white">Responsive Design</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm sm:text-base text-gray-300">
                <li>• Use percentage-based widths for mobile compatibility</li>
                <li>• Set appropriate min/max dimensions</li>
                <li>• Test on different screen sizes</li>
                <li>• Consider touch-friendly sizing on mobile</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl text-white">Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm sm:text-base text-gray-300">
                <li>• Use loading="lazy" for below-the-fold iframes</li>
                <li>• Set explicit width and height to prevent layout shift</li>
                <li>• Consider intersection observer for conditional loading</li>
                <li>• Monitor iframe load times</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="rounded-lg border bg-muted/50 p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">When to Use iFrame</h3>
        <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4 leading-relaxed">
          iFrame integration is ideal when you need full control over the chat interface positioning, want to create
          dedicated chat pages, or need to integrate with complex layouts.
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">
            Script Tag Integration ←
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Framework Guides →
          </Badge>
        </div>
      </div>
    </div>
  )
}
