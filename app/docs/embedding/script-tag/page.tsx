import { CodeBlock } from "@/components/code-block"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertTriangle, Info } from 'lucide-react'
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Script Tag Integration - BotHarbor Documentation",
  description:
    "Learn how to embed BotHarbor chatbots using script tags - the easiest integration method for any website.",
}

export default function ScriptTagPage() {
  const basicScript = `<script 
  src="https://botharbor.ai/embed.js" 
  data-bot-id="your-bot-id">
</script>`

  const configObjectScript = `<script>
window.BOTHARBOR_CONFIG = {
  botId: 'your-bot-id',
  theme: 'light',
  position: 'bottom-right',
  primaryColor: '#14B8A6',
  greeting: 'Hello! How can I help you?'
};
</script>
<script src="https://botharbor.ai/embed.js"></script>`

  const fullHtmlExample = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>BotHarbor Chat Embed</title>
  <!-- ✅ Correct Config Object -->
  <script>
    window.BOTHARBOR_CONFIG = {
      botId: '301988f2-ea17-4b1d-81fc-ab5f2db2dfd9',
      position: 'bottom-right',
    };
  </script>
  <!-- Embed script -->
  <script src="https://botharbor.ai/embed.js" async></script>
</head>
<body>
  <h1>Welcome to My Website</h1>
  <p>The BotHarbor chatbot should appear in the bottom-right corner.</p>
</body>
</html>`

  const dataAttributeExample = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>BotHarbor Chatbot Embed</title>
</head>
<body>
  <h1>Welcome to My Website</h1>
  <p>This page embeds the BotHarbor chatbot using a script tag.</p>
  
  <!-- BotHarbor Embed Script -->
  <script 
    src="https://botharbor.ai/embed.js"
    data-bot-id="301988f2-ea17-4b1d-81fc-ab5f2db2dfd9"
    data-position="bottom-right">
  </script>
</body>
</html>`

  const asyncScript = `<!-- Async loading for better performance -->
<script>
  window.BOTHARBOR_CONFIG = {
    botId: 'your-bot-id',
    theme: 'light',
    position: 'bottom-right',
    primaryColor: '#14B8A6'
  };
</script>
<script src="https://botharbor.ai/embed.js" async></script>`

  const eventHandlers = `<script>
  // Listen for widget events
  window.addEventListener('botharbor:ready', function() {
    console.log('BotHarbor widget is ready');
  });

  window.addEventListener('botharbor:open', function() {
    console.log('Chat widget opened');
  });

  window.addEventListener('botharbor:close', function() {
    console.log('Chat widget closed');
  });

  window.addEventListener('botharbor:message', function(event) {
    console.log('New message:', event.detail);
  });
</script>`

  const apiMethods = `<script>
  // Control the widget programmatically
  
  // Open the chat widget
  if (window.BotHarbor) {
    window.BotHarbor.open();
  }
  
  // Close the chat widget
  if (window.BotHarbor) {
    window.BotHarbor.close();
  }
  
  // Send a message programmatically
  if (window.BotHarbor) {
    window.BotHarbor.sendMessage('Hello from the website!');
  }
  
  // Update widget settings
  if (window.BotHarbor) {
    window.BotHarbor.updateSettings({
      theme: 'dark',
      primaryColor: '#10b981'
    });
  }
</script>`

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2 sm:mb-4">
          Script Tag Integration
        </h1>
        <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-300">
          The easiest way to add BotHarbor to your website. Just add a script tag and you're ready to go.
        </p>
      </div>

      <Alert>
        <CheckCircle className="h-4 w-4 flex-shrink-0" />
        <AlertDescription className="text-white">
          <strong>Recommended Method:</strong> Script tag integration is the simplest and most reliable way to embed
          BotHarbor on any website.
        </AlertDescription>
      </Alert>

      <div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-white">Basic Implementation</h2>
        <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
          Add this script tag anywhere in your HTML document. We recommend placing it just before the closing{" "}
          <code className="bg-muted px-1 py-0.5 rounded text-xs sm:text-sm">&lt;/body&gt;</code> tag.
        </p>

        <CodeBlock code={basicScript} language="html" title="Basic Script Tag" />
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-white">
          Configuration Object Method
        </h2>
        <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
          For more advanced configuration, use the global configuration object before loading the script:
        </p>

        <CodeBlock code={configObjectScript} language="html" title="Configuration Object Method" />
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-white">Complete HTML Example</h2>
        <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
          Here's a complete HTML page with BotHarbor integration using the configuration object:
        </p>

        <CodeBlock code={fullHtmlExample} language="html" title="Complete HTML Example" />
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-white">Data Attributes Method</h2>
        <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
          Alternatively, you can use data attributes directly on the script tag:
        </p>

        <CodeBlock code={dataAttributeExample} language="html" title="Data Attributes Example" />
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-white">
          Available Configuration Options
        </h2>
        <div className="grid gap-4 lg:gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl text-white">Required Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-xs sm:text-sm">botId</code>
                  <p className="text-sm sm:text-base text-gray-300 mt-1 leading-relaxed">
                    Your unique bot ID from the BotHarbor dashboard
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl text-white">Appearance Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-xs sm:text-sm">theme</code>
                  <p className="text-sm sm:text-base text-gray-300 mt-1 leading-relaxed">
                    Theme mode:{" "}
                    <Badge variant="outline" className="text-xs">
                      light
                    </Badge>{" "}
                    <Badge variant="outline" className="text-xs">
                      dark
                    </Badge>{" "}
                    <Badge variant="outline" className="text-xs">
                      auto
                    </Badge>
                  </p>
                </div>
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-xs sm:text-sm">position</code>
                  <div className="mt-1 flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">
                      bottom-right
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      bottom-left
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      top-right
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      top-left
                    </Badge>
                  </div>
                </div>
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-xs sm:text-sm">primaryColor</code>
                  <p className="text-sm sm:text-base text-gray-300 mt-1 leading-relaxed">
                    Primary color in hex format (e.g., #14B8A6)
                  </p>
                </div>
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-xs sm:text-sm">greeting</code>
                  <p className="text-sm sm:text-base text-gray-300 mt-1 leading-relaxed">Custom greeting message</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-white">Async Loading</h2>
        <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
          For better page performance, load the widget asynchronously:
        </p>

        <CodeBlock code={asyncScript} language="html" title="Async Loading" />
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-white">Event Handling</h2>
        <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
          Listen to widget events to integrate with your application:
        </p>

        <CodeBlock code={eventHandlers} language="javascript" title="Event Listeners" />
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-white">JavaScript API</h2>
        <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
          Control the widget programmatically using the JavaScript API:
        </p>

        <CodeBlock code={apiMethods} language="javascript" title="JavaScript API Methods" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Alert>
          <Info className="h-4 w-4 flex-shrink-0" />
          <AlertDescription className="text-white text-sm">
            <strong>Performance Tip:</strong> The widget loads asynchronously by default and won't block your page
            rendering.
          </AlertDescription>
        </Alert>

        <Alert>
          <AlertTriangle className="h-4 w-4 flex-shrink-0" />
          <AlertDescription className="text-white text-sm">
            <strong>HTTPS Required:</strong> The widget requires HTTPS in production environments for security.
          </AlertDescription>
        </Alert>
      </div>

      <div className="rounded-lg border bg-muted/50 p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">Next Steps</h3>
        <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4 leading-relaxed">
          Now that you have the basic script tag setup, explore other integration methods or framework-specific guides.
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">
            iFrame Integration →
          </Badge>
          <Badge variant="secondary" className="text-xs">
            React Guide →
          </Badge>
        </div>
      </div>
    </div>
  )
}
