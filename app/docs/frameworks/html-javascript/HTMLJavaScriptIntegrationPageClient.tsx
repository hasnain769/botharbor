"use client"

import { CodeBlock } from "@/components/ui/code-block"

export default function HTMLJavaScriptIntegrationPageClient() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-2 sm:mb-4 text-white">
          HTML/JavaScript Integration
        </h1>
        <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 text-gray-300">
          Integrate BotHarbor chat widget into your HTML and JavaScript applications with vanilla JavaScript examples.
        </p>
      </div>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">Quick Start</h2>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
          The simplest way to add BotHarbor to your website is by including the script tag and initializing it with your configuration.
        </p>

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Basic HTML Implementation</h3>
          <CodeBlock
            language="html"
            code={`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website with BotHarbor</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .chat-button {
            background: #14B8A6;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            margin: 10px 0;
        }
        .chat-button:hover {
            background: #0F9488;
        }
        .chat-button:disabled {
            background: #ccc;
            cursor: not-allowed;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Welcome to My Website</h1>
            <button id="openChatBtn" class="chat-button" disabled>
                Loading Chat...
            </button>
            <button id="closeChatBtn" class="chat-button">
                Close Chat
            </button>
        </header>
        
        <main>
            <h2>About Our Service</h2>
            <p>This is a sample website with BotHarbor chat integration.</p>
            <p>The chat widget will appear in the bottom-right corner once loaded.</p>
        </main>
    </div>

    <script>
        // Set BotHarbor configuration before loading the script
        window.BOTHARBOR_CONFIG = {
            botId: 'your-bot-id-here',
            theme: 'light',
            position: 'bottom-right',
            primaryColor: '#14B8A6',
            greeting: 'Hello! How can I help you today?',
            autoOpen: false
        };

        // Load BotHarbor script
        const script = document.createElement('script');
        script.src = 'https://botharbor.ai/embed.js';
        script.async = true;
        
        script.onload = function() {
            console.log('BotHarbor loaded successfully');
            
            // Enable the open chat button
            const openBtn = document.getElementById('openChatBtn');
            openBtn.disabled = false;
            openBtn.textContent = 'Open Chat';
            
            // Set up event listeners
            setupEventListeners();
        };
        
        script.onerror = function() {
            console.error('Failed to load BotHarbor script');
            const openBtn = document.getElementById('openChatBtn');
            openBtn.textContent = 'Chat Unavailable';
        };
        
        document.head.appendChild(script);

        function setupEventListeners() {
            // Open chat button
            document.getElementById('openChatBtn').addEventListener('click', function() {
                if (window.BotHarbor) {
                    window.BotHarbor.open();
                }
            });

            // Close chat button
            document.getElementById('closeChatBtn').addEventListener('click', function() {
                if (window.BotHarbor) {
                    window.BotHarbor.close();
                }
            });

            // Listen for BotHarbor events
            window.addEventListener('botharbor:ready', function() {
                console.log('BotHarbor is ready');
            });

            window.addEventListener('botharbor:open', function() {
                console.log('Chat opened');
            });

            window.addEventListener('botharbor:close', function() {
                console.log('Chat closed');
            });

            window.addEventListener('botharbor:message', function(event) {
                console.log('New message:', event.detail);
            });
        }
    </script>
</body>
</html>`}
          />
        </div>
      </section>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">Advanced JavaScript Integration</h2>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
          For more complex applications, you can create a JavaScript class to manage BotHarbor functionality.
        </p>

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">BotHarbor Manager Class</h3>
          <CodeBlock
            language="javascript"
            code={`class BotHarborManager {
    constructor(config) {
        this.config = {
            theme: 'light',
            position: 'bottom-right',
            autoOpen: false,
            ...config
        };
        this.isReady = false;
        this.isOpen = false;
        this.eventListeners = new Map();
        
        this.init();
    }

    async init() {
        try {
            // Set global configuration
            window.BOTHARBOR_CONFIG = this.config;
            
            // Load the script
            await this.loadScript('https://botharbor.ai/embed.js');
            
            // Set up event listeners
            this.setupEventListeners();
            
            this.isReady = true;
            this.emit('ready');
            
            console.log('BotHarbor initialized successfully');
        } catch (error) {
            console.error('Failed to initialize BotHarbor:', error);
            this.emit('error', error);
        }
    }

    loadScript(src) {
        return new Promise((resolve, reject) => {
            // Check if script already exists
            const existingScript = document.querySelector(\`script[src="\${src}"]\`);
            if (existingScript) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(\`Failed to load script: \${src}\`));
            document.head.appendChild(script);
        });
    }

    setupEventListeners() {
        // Listen for BotHarbor events
        window.addEventListener('botharbor:open', () => {
            this.isOpen = true;
            this.emit('open');
        });

        window.addEventListener('botharbor:close', () => {
            this.isOpen = false;
            this.emit('close');
        });

        window.addEventListener('botharbor:message', (event) => {
            this.emit('message', event.detail);
        });
    }

    open() {
        if (window.BotHarbor && this.isReady) {
            window.BotHarbor.open();
        } else {
            console.warn('BotHarbor is not ready yet');
        }
    }

    close() {
        if (window.BotHarbor) {
            window.BotHarbor.close();
        }
    }

    sendMessage(message) {
        if (window.BotHarbor && this.isReady) {
            window.BotHarbor.sendMessage(message);
        } else {
            console.warn('BotHarbor is not ready yet');
        }
    }

    updateSettings(newSettings) {
        if (window.BotHarbor && this.isReady) {
            window.BotHarbor.updateSettings(newSettings);
        }
    }

    // Event system
    on(event, callback) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, []);
        }
        this.eventListeners.get(event).push(callback);
    }

    off(event, callback) {
        if (this.eventListeners.has(event)) {
            const listeners = this.eventListeners.get(event);
            const index = listeners.indexOf(callback);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
    }

    emit(event, data) {
        if (this.eventListeners.has(event)) {
            this.eventListeners.get(event).forEach(callback => {
                callback(data);
            });
        }
    }

    destroy() {
        // Remove script
        const existingScript = document.querySelector('script[src="https://botharbor.ai/embed.js"]');
        if (existingScript) {
            existingScript.remove();
        }
        
        // Clean up global config
        delete window.BOTHARBOR_CONFIG;
        
        // Clear event listeners
        this.eventListeners.clear();
        
        this.isReady = false;
        this.isOpen = false;
    }
}`}
          />

          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Using the Manager Class</h3>
          <CodeBlock
            language="javascript"
            code={`// Initialize BotHarbor
const botHarbor = new BotHarborManager({
    botId: 'your-bot-id-here',
    theme: 'auto',
    position: 'bottom-right',
    primaryColor: '#14B8A6',
    greeting: 'Welcome! How can I assist you?'
});

// Set up event listeners
botHarbor.on('ready', () => {
    console.log('BotHarbor is ready!');
    
    // Enable UI elements
    document.getElementById('openChatBtn').disabled = false;
    document.getElementById('openChatBtn').textContent = 'Open Chat';
});

botHarbor.on('open', () => {
    console.log('Chat opened');
    document.getElementById('chatStatus').textContent = 'Chat is open';
});

botHarbor.on('close', () => {
    console.log('Chat closed');
    document.getElementById('chatStatus').textContent = 'Chat is closed';
});

botHarbor.on('message', (message) => {
    console.log('New message received:', message);
    // Handle new messages
});

botHarbor.on('error', (error) => {
    console.error('BotHarbor error:', error);
    document.getElementById('openChatBtn').textContent = 'Chat Unavailable';
});

// UI Event Handlers
document.getElementById('openChatBtn').addEventListener('click', () => {
    botHarbor.open();
});

document.getElementById('closeChatBtn').addEventListener('click', () => {
    botHarbor.close();
});

document.getElementById('sendMessageBtn').addEventListener('click', () => {
    const message = document.getElementById('messageInput').value;
    if (message.trim()) {
        botHarbor.sendMessage(message);
        document.getElementById('messageInput').value = '';
    }
});

// Cleanup when page unloads
window.addEventListener('beforeunload', () => {
    botHarbor.destroy();
});`}
          />
        </div>
      </section>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">Configuration Options</h2>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
          Customize BotHarbor's appearance and behavior with various configuration options.
        </p>

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Complete Configuration Example</h3>
          <CodeBlock
            language="javascript"
            code={`window.BOTHARBOR_CONFIG = {
    // Required
    botId: 'your-bot-id-here',
    
    // Appearance
    theme: 'light', // 'light', 'dark', or 'auto'
    position: 'bottom-right', // 'bottom-right', 'bottom-left', 'top-right', 'top-left'
    primaryColor: '#14B8A6',
    secondaryColor: '#F3F4F6',
    
    // Behavior
    autoOpen: false,
    greeting: 'Hello! How can I help you today?',
    placeholder: 'Type your message...',
    
    // User Information
    user: {
        id: 'user-123',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://example.com/avatar.jpg',
        metadata: {
            plan: 'premium',
            signupDate: '2024-01-15'
        }
    },
    
    // Advanced Options
    enableFileUpload: true,
    enableEmoji: true,
    enableTypingIndicator: true,
    maxFileSize: 10485760, // 10MB in bytes
    allowedFileTypes: ['image/*', '.pdf', '.doc', '.docx'],
    
    // Callbacks
    onReady: function() {
        console.log('BotHarbor is ready');
    },
    onOpen: function() {
        console.log('Chat opened');
    },
    onClose: function() {
        console.log('Chat closed');
    },
    onMessage: function(message) {
        console.log('New message:', message);
    },
    onError: function(error) {
        console.error('BotHarbor error:', error);
    }
};`}
          />
        </div>
      </section>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">Best Practices</h2>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          <div className="bg-gray-900 border border-gray-700 p-4 sm:p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Performance Tips</h3>
            <ul className="space-y-2 text-sm sm:text-base text-gray-300">
              <li className="flex items-start">
                <span className="text-green-400 mr-2 flex-shrink-0">✓</span>
                <span>Load scripts asynchronously to avoid blocking page render</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 flex-shrink-0">✓</span>
                <span>Set configuration before loading the script</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 flex-shrink-0">✓</span>
                <span>Use event listeners for better user experience</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 flex-shrink-0">✓</span>
                <span>Implement loading states for UI elements</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-900 border border-gray-700 p-4 sm:p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Error Handling</h3>
            <ul className="space-y-2 text-sm sm:text-base text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 flex-shrink-0">•</span>
                <span>Always check if window.BotHarbor exists before calling methods</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 flex-shrink-0">•</span>
                <span>Implement fallback UI when chat fails to load</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 flex-shrink-0">•</span>
                <span>Use try-catch blocks for error handling</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 flex-shrink-0">•</span>
                <span>Provide clear error messages to users</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
