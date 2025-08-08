import { CodeBlock } from "@/components/code-block"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Customization Guide - BotHarbor Documentation",
  description:
    "Learn how to customize the BotHarbor chat widget to match your brand and requirements with themes, styling, and advanced configuration options.",
}

export default function CustomizationPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-2 sm:mb-4 text-white">
          Customization Guide
        </h1>
        <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 text-gray-300">
          Learn how to customize the BotHarbor chat widget to match your brand and requirements with themes, styling,
          and advanced configuration options.
        </p>
      </div>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
          Basic Theme Configuration
        </h2>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
          BotHarbor comes with built-in themes that you can easily apply to match your application's design.
        </p>

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Available Themes</h3>
          <CodeBlock
            language="javascript"
            code={`// Light theme (default)
BotHarbor.init({
  botId: 'your-bot-id',
  theme: 'light'
})

// Dark theme
BotHarbor.init({
  botId: 'your-bot-id',
  theme: 'dark'
})

// Auto theme (follows system preference)
BotHarbor.init({
  botId: 'your-bot-id',
  theme: 'auto'
})

// Custom theme with primary color
BotHarbor.init({
  botId: 'your-bot-id',
  theme: 'light',
  primaryColor: '#3b82f6' // Blue
})`}
          />

          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Theme Customization</h3>
          <CodeBlock
            language="javascript"
            code={`BotHarbor.init({
  botId: 'your-bot-id',
  theme: {
    // Primary colors
    primaryColor: '#3b82f6',
    primaryColorHover: '#2563eb',
    primaryColorText: '#ffffff',
    
    // Background colors
    backgroundColor: '#ffffff',
    backgroundColorSecondary: '#f8fafc',
    
    // Text colors
    textColor: '#1f2937',
    textColorSecondary: '#6b7280',
    textColorMuted: '#9ca3af',
    
    // Border and divider colors
    borderColor: '#e5e7eb',
    dividerColor: '#f3f4f6',
    
    // Message bubble colors
    userMessageBackground: '#3b82f6',
    userMessageText: '#ffffff',
    botMessageBackground: '#f3f4f6',
    botMessageText: '#1f2937',
    
    // Input field styling
    inputBackground: '#ffffff',
    inputBorder: '#d1d5db',
    inputBorderFocus: '#3b82f6',
    inputText: '#1f2937',
    inputPlaceholder: '#9ca3af'
  }
})`}
          />
        </div>
      </section>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
          Position and Size Configuration
        </h2>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
          Control where the chat widget appears on your page and how it behaves on different screen sizes.
        </p>

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Position Options</h3>
          <CodeBlock
            language="javascript"
            code={`// Bottom right (default)
BotHarbor.init({
  botId: 'your-bot-id',
  position: 'bottom-right'
})

// Bottom left
BotHarbor.init({
  botId: 'your-bot-id',
  position: 'bottom-left'
})

// Top right
BotHarbor.init({
  botId: 'your-bot-id',
  position: 'top-right'
})

// Top left
BotHarbor.init({
  botId: 'your-bot-id',
  position: 'top-left'
})

// Custom position with offset
BotHarbor.init({
  botId: 'your-bot-id',
  position: 'bottom-right',
  offset: {
    x: 20, // 20px from right edge
    y: 20  // 20px from bottom edge
  }
})`}
          />

          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Responsive Configuration</h3>
          <CodeBlock
            language="javascript"
            code={`BotHarbor.init({
  botId: 'your-bot-id',
  responsive: {
    // Desktop configuration
    desktop: {
      width: 400,
      height: 600,
      position: 'bottom-right'
    },
    // Tablet configuration
    tablet: {
      width: 350,
      height: 500,
      position: 'bottom-right'
    },
    // Mobile configuration
    mobile: {
      width: '100%',
      height: '100%',
      position: 'fullscreen', // Takes full screen on mobile
      showHeader: true
    }
  },
  // Breakpoints (in pixels)
  breakpoints: {
    mobile: 768,
    tablet: 1024
  }
})`}
          />
        </div>
      </section>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
          Advanced Styling with CSS
        </h2>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
          For complete control over the widget's appearance, you can use custom CSS to override default styles.
        </p>

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">CSS Custom Properties</h3>
          <CodeBlock
            language="css"
            code={`/* Override BotHarbor CSS variables */
:root {
  --botharbor-primary-color: #3b82f6;
  --botharbor-primary-hover: #2563eb;
  --botharbor-background: #ffffff;
  --botharbor-text-color: #1f2937;
  --botharbor-border-radius: 12px;
  --botharbor-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  --botharbor-font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Dark mode overrides */
@media (prefers-color-scheme: dark) {
  :root {
    --botharbor-primary-color: #60a5fa;
    --botharbor-background: #1f2937;
    --botharbor-text-color: #f9fafb;
  }
}`}
          />

          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Custom CSS Classes</h3>
          <CodeBlock
            language="css"
            code={`/* Target specific BotHarbor elements */
.botharbor-widget {
  border-radius: 16px !important;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1) !important;
}

.botharbor-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
}

.botharbor-message-user {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  border-radius: 18px 18px 4px 18px !important;
}

.botharbor-message-bot {
  background: #f3f4f6 !important;
  border-radius: 18px 18px 18px 4px !important;
  border-left: 3px solid #3b82f6 !important;
}

.botharbor-input {
  border-radius: 25px !important;
  border: 2px solid #e5e7eb !important;
  transition: all 0.2s ease !important;
}

.botharbor-input:focus {
  border-color: #3b82f6 !important;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
}

.botharbor-send-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  border-radius: 50% !important;
  transition: transform 0.2s ease !important;
}

.botharbor-send-button:hover {
  transform: scale(1.05) !important;
}`}
          />

          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Animation Customization</h3>
          <CodeBlock
            language="css"
            code={`/* Custom animations */
@keyframes botharbor-slide-in {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes botharbor-bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.botharbor-widget {
  animation: botharbor-slide-in 0.3s ease-out !important;
}

.botharbor-trigger {
  animation: botharbor-bounce 2s infinite !important;
}

.botharbor-message {
  animation: fadeInUp 0.3s ease-out !important;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`}
          />
        </div>
      </section>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
          Behavior and Interaction Customization
        </h2>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
          Configure how the chat widget behaves and interacts with your users.
        </p>

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Auto-Opening and Greetings</h3>
          <CodeBlock
            language="javascript"
            code={`BotHarbor.init({
  botId: 'your-bot-id',
  
  // Auto-open configuration
  autoOpen: true,
  autoOpenDelay: 3000, // Wait 3 seconds before opening
  
  // Greeting message
  greeting: "👋 Hi there! How can I help you today?",
  
  // Welcome sequence
  welcomeSequence: [
    {
      message: "Welcome to our website!",
      delay: 1000
    },
    {
      message: "I'm here to help you find what you're looking for.",
      delay: 2000
    },
    {
      message: "What can I assist you with?",
      delay: 3000
    }
  ],
  
  // Trigger conditions
  triggers: {
    // Open after user scrolls 50% of page
    scrollPercentage: 50,
    // Open after 30 seconds of inactivity
    inactivityTime: 30000,
    // Open when user tries to leave (exit intent)
    exitIntent: true
  }
})`}
          />

          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">File Upload Configuration</h3>
          <CodeBlock
            language="javascript"
            code={`BotHarbor.init({
  botId: 'your-bot-id',
  
  fileUpload: {
    enabled: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ],
    multiple: true,
    maxFiles: 5,
    
    // Custom upload handler
    onUpload: (files) => {
      console.log('Files uploaded:', files)
      // Handle file upload logic
    },
    
    // Upload progress callback
    onProgress: (progress) => {
      console.log('Upload progress:', progress)
    }
  }
})`}
          />

          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Business Hours Configuration</h3>
          <CodeBlock
            language="javascript"
            code={`BotHarbor.init({
  botId: 'your-bot-id',
  
  businessHours: {
    enabled: true,
    timezone: 'America/New_York',
    schedule: {
      monday: { start: '09:00', end: '17:00' },
      tuesday: { start: '09:00', end: '17:00' },
      wednesday: { start: '09:00', end: '17:00' },
      thursday: { start: '09:00', end: '17:00' },
      friday: { start: '09:00', end: '17:00' },
      saturday: { start: '10:00', end: '14:00' },
      sunday: null // Closed on Sunday
    },
    
    // Messages for different states
    messages: {
      online: "We're online! How can we help?",
      offline: "We're currently offline. Leave us a message and we'll get back to you!",
      outsideHours: "We're outside business hours. We'll respond during: Mon-Fri 9AM-5PM EST"
    },
    
    // Behavior when offline
    offlineBehavior: {
      showWidget: true,
      collectContactInfo: true,
      autoReply: true,
      autoReplyMessage: "Thanks for your message! We'll get back to you within 24 hours."
    }
  }
})`}
          />
        </div>
      </section>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">Best Practices</h2>
        <div className="space-y-4">
          <div className="bg-muted/50 p-4 sm:p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl font-bold mb-3 text-white">Performance Tips</h3>
            <ul className="space-y-2 text-sm sm:text-base text-white">
              <li className="flex items-start">
                <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
                <span>Load the script asynchronously to avoid blocking the main thread</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
                <span>Use environment variables for configuration</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
                <span>Test your customizations across different devices and browsers</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
                <span>Consider accessibility when customizing colors and fonts</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
