"use client"

import { CodeBlock } from "@/components/ui/code-block"

export default function ReactIntegrationPageClient() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-2 sm:mb-4 text-white">
          React Integration
        </h1>
        <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 text-gray-300">
          Learn how to integrate BotHarbor chat widget into your React applications with multiple approaches and best practices.
        </p>
      </div>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">Quick Start</h2>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
          The easiest way to add BotHarbor to your React app is using the useEffect hook to load the script after component mounting.
        </p>

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Basic Implementation</h3>
          <CodeBlock
            language="jsx"
            code={`import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Set configuration before loading script
    window.BOTHARBOR_CONFIG = {
      botId: 'your-bot-id',
      theme: 'light',
      position: 'bottom-right',
      primaryColor: '#14B8A6',
      greeting: 'Hello! How can I help you?'
    };

    // Load BotHarbor script
    const script = document.createElement('script');
    script.src = 'https://botharbor.ai/embed.js';
    script.async = true;
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const existingScript = document.querySelector('script[src="https://botharbor.ai/embed.js"]');
      if (existingScript) {
        existingScript.remove();
      }
      // Clean up global config
      delete window.BOTHARBOR_CONFIG;
    };
  }, []);

  return (
    <div className="App">
      <h1>My React App</h1>
      <p>BotHarbor chat widget will appear in the bottom-right corner.</p>
    </div>
  );
}

export default App;`}
          />
        </div>
      </section>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">Custom Hook Approach</h2>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
          Create a reusable custom hook for better organization and reusability across your application.
        </p>

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">useBotHarbor Hook</h3>
          <CodeBlock
            language="jsx"
            code={`// hooks/useBotHarbor.js
import { useEffect, useCallback, useState } from 'react';

export const useBotHarbor = (config) => {
  const [isReady, setIsReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const initializeBotHarbor = useCallback(() => {
    // Set global configuration
    window.BOTHARBOR_CONFIG = {
      ...config,
      onReady: () => {
        setIsReady(true);
        console.log('BotHarbor is ready');
      },
      onOpen: () => setIsOpen(true),
      onClose: () => setIsOpen(false)
    };

    // Check if script already exists
    const existingScript = document.querySelector('script[src="https://botharbor.ai/embed.js"]');
    if (existingScript) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://botharbor.ai/embed.js';
    script.async = true;
    document.head.appendChild(script);
  }, [config]);

  useEffect(() => {
    initializeBotHarbor();

    return () => {
      // Cleanup on unmount
      const existingScript = document.querySelector('script[src="https://botharbor.ai/embed.js"]');
      if (existingScript) {
        existingScript.remove();
      }
      delete window.BOTHARBOR_CONFIG;
    };
  }, [initializeBotHarbor]);

  const openChat = useCallback(() => {
    if (window.BotHarbor && isReady) {
      window.BotHarbor.open();
    }
  }, [isReady]);

  const closeChat = useCallback(() => {
    if (window.BotHarbor) {
      window.BotHarbor.close();
    }
  }, []);

  const sendMessage = useCallback((message) => {
    if (window.BotHarbor && isReady) {
      window.BotHarbor.sendMessage(message);
    }
  }, [isReady]);

  return { isReady, isOpen, openChat, closeChat, sendMessage };
};`}
          />

          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Using the Hook</h3>
          <CodeBlock
            language="jsx"
            code={`import React from 'react';
import { useBotHarbor } from './hooks/useBotHarbor';

function App() {
  const { isReady, isOpen, openChat, closeChat, sendMessage } = useBotHarbor({
    botId: process.env.REACT_APP_BOTHARBOR_BOT_ID,
    theme: 'light',
    position: 'bottom-right',
    primaryColor: '#14B8A6',
    greeting: 'Hello! How can I help you?'
  });

  return (
    <div className="App">
      <header>
        <h1>Welcome to My App</h1>
        <div className="chat-controls">
          <button 
            onClick={openChat} 
            disabled={!isReady}
            className="chat-button"
          >
            {isReady ? 'Need Help? Chat with us!' : 'Loading Chat...'}
          </button>
          {isOpen && (
            <button onClick={closeChat} className="chat-button secondary">
              Close Chat
            </button>
          )}
        </div>
        <p>Chat Status: {isOpen ? 'Open' : 'Closed'}</p>
      </header>
      <main>
        <p>Your app content here...</p>
      </main>
    </div>
  );
}

export default App;`}
          />
        </div>
      </section>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">Component Wrapper</h2>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
          Create a dedicated component that encapsulates all BotHarbor functionality for better maintainability.
        </p>

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">BotHarbor Widget Component</h3>
          <CodeBlock
            language="jsx"
            code={`// components/BotHarborWidget.jsx
import React, { useEffect, useRef, useState } from 'react';

const BotHarborWidget = ({ 
  botId, 
  theme = 'light', 
  position = 'bottom-right',
  primaryColor = '#14B8A6',
  greeting = 'Hello! How can I help you?',
  onReady,
  onMessage,
  onClose
}) => {
  const initialized = useRef(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (initialized.current) return;

    const loadBotHarbor = async () => {
      try {
        // Set global configuration
        window.BOTHARBOR_CONFIG = {
          botId,
          theme,
          position,
          primaryColor,
          greeting,
          onReady: () => {
            setIsReady(true);
            onReady?.();
            initialized.current = true;
          },
          onMessage: (message) => {
            onMessage?.(message);
          },
          onClose: () => {
            onClose?.();
          }
        };

        // Load script
        const script = document.createElement('script');
        script.src = 'https://botharbor.ai/embed.js';
        script.async = true;
        
        script.onload = () => {
          console.log('BotHarbor loaded successfully');
        };

        script.onerror = () => {
          console.error('Failed to load BotHarbor script');
        };

        document.head.appendChild(script);

      } catch (error) {
        console.error('Error loading BotHarbor:', error);
      }
    };

    loadBotHarbor();

    return () => {
      const existingScript = document.querySelector('script[src="https://botharbor.ai/embed.js"]');
      if (existingScript) {
        existingScript.remove();
      }
      delete window.BOTHARBOR_CONFIG;
      initialized.current = false;
    };
  }, [botId, theme, position, primaryColor, greeting, onReady, onMessage, onClose]);

  return null; // This component doesn't render anything visible
};

export default BotHarborWidget;`}
          />

          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Using the Widget Component</h3>
          <CodeBlock
            language="jsx"
            code={`import React from 'react';
import BotHarborWidget from './components/BotHarborWidget';

function App() {
  const handleChatReady = () => {
    console.log('Chat is ready!');
  };

  const handleNewMessage = (message) => {
    console.log('New message received:', message);
    // Handle analytics, notifications, etc.
  };

  const handleChatClose = () => {
    console.log('Chat was closed');
  };

  return (
    <div className="App">
      <header>
        <h1>My React App</h1>
        <p>BotHarbor chat widget is integrated and ready to use!</p>
      </header>
      
      <main>
        <p>Your app content here...</p>
      </main>

      <BotHarborWidget
        botId={process.env.REACT_APP_BOTHARBOR_BOT_ID}
        theme="auto"
        position="bottom-right"
        primaryColor="#14B8A6"
        greeting="Welcome! How can I assist you today?"
        onReady={handleChatReady}
        onMessage={handleNewMessage}
        onClose={handleChatClose}
      />
    </div>
  );
}

export default App;`}
          />
        </div>
      </section>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">TypeScript Support</h2>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
          Add proper TypeScript definitions for better development experience and type safety.
        </p>

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Type Definitions</h3>
          <CodeBlock
            language="typescript"
            code={`// types/botharbor.d.ts
declare global {
  interface Window {
    BOTHARBOR_CONFIG?: BotHarborConfig;
    BotHarbor?: {
      open: () => void;
      close: () => void;
      sendMessage: (message: string) => void;
      updateSettings: (settings: Partial<BotHarborConfig>) => void;
    };
  }
}

export interface BotHarborConfig {
  botId: string;
  theme?: 'light' | 'dark' | 'auto';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  primaryColor?: string;
  greeting?: string;
  onReady?: () => void;
  onOpen?: () => void;
  onClose?: () => void;
  onMessage?: (message: BotHarborMessage) => void;
}

export interface BotHarborMessage {
  id: string;
  text: string;
  timestamp: Date;
  sender: 'user' | 'bot';
  type: 'text' | 'image' | 'file';
}

export interface BotHarborUser {
  id?: string;
  name?: string;
  email?: string;
  avatar?: string;
  metadata?: Record<string, any>;
}`}
          />

          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">TypeScript Hook</h3>
          <CodeBlock
            language="typescript"
            code={`// hooks/useBotHarbor.ts
import { useEffect, useCallback, useState } from 'react';
import type { BotHarborConfig } from '../types/botharbor';

interface UseBotHarborReturn {
  isReady: boolean;
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  sendMessage: (message: string) => void;
}

export const useBotHarbor = (config: BotHarborConfig): UseBotHarborReturn => {
  const [isReady, setIsReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const initializeBotHarbor = useCallback(() => {
    // Set global configuration
    window.BOTHARBOR_CONFIG = {
      ...config,
      onReady: () => {
        setIsReady(true);
        config.onReady?.();
      },
      onOpen: () => {
        setIsOpen(true);
        config.onOpen?.();
      },
      onClose: () => {
        setIsOpen(false);
        config.onClose?.();
      },
      onMessage: config.onMessage
    };

    // Check if script already exists
    const existingScript = document.querySelector('script[src="https://botharbor.ai/embed.js"]');
    if (existingScript) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://botharbor.ai/embed.js';
    script.async = true;
    document.head.appendChild(script);
  }, [config]);

  useEffect(() => {
    initializeBotHarbor();

    return () => {
      const existingScript = document.querySelector('script[src="https://botharbor.ai/embed.js"]');
      if (existingScript) {
        existingScript.remove();
      }
      delete window.BOTHARBOR_CONFIG;
    };
  }, [initializeBotHarbor]);

  const openChat = useCallback(() => {
    window.BotHarbor?.open();
  }, []);

  const closeChat = useCallback(() => {
    window.BotHarbor?.close();
  }, []);

  const sendMessage = useCallback((message: string) => {
    window.BotHarbor?.sendMessage(message);
  }, []);

  return { isReady, isOpen, openChat, closeChat, sendMessage };
};`}
          />
        </div>
      </section>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">Environment Configuration</h2>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
          Configure your React app with environment variables for different deployment environments.
        </p>

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Environment Variables</h3>
          <CodeBlock
            language="bash"
            code={`# .env.local
REACT_APP_BOTHARBOR_BOT_ID=your-bot-id-here
REACT_APP_BOTHARBOR_THEME=light
REACT_APP_BOTHARBOR_POSITION=bottom-right
REACT_APP_BOTHARBOR_PRIMARY_COLOR=#14B8A6

# .env.production
REACT_APP_BOTHARBOR_BOT_ID=your-production-bot-id
REACT_APP_BOTHARBOR_THEME=auto
REACT_APP_BOTHARBOR_POSITION=bottom-right
REACT_APP_BOTHARBOR_PRIMARY_COLOR=#14B8A6`}
          />

          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Using Environment Variables</h3>
          <CodeBlock
            language="jsx"
            code={`import React from 'react';
import { useBotHarbor } from './hooks/useBotHarbor';

function App() {
  const { isReady, openChat } = useBotHarbor({
    botId: process.env.REACT_APP_BOTHARBOR_BOT_ID!,
    theme: process.env.REACT_APP_BOTHARBOR_THEME as 'light' | 'dark' | 'auto',
    position: process.env.REACT_APP_BOTHARBOR_POSITION as any,
    primaryColor: process.env.REACT_APP_BOTHARBOR_PRIMARY_COLOR
  });

  return (
    <div className="App">
      <h1>My React App</h1>
      <button 
        onClick={openChat}
        disabled={!isReady}
        className="chat-button"
      >
        {isReady ? 'Open Chat' : 'Loading...'}
      </button>
    </div>
  );
}

export default App;`}
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
                <span>Load the script asynchronously to avoid blocking the main thread</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 flex-shrink-0">✓</span>
                <span>Use environment variables for configuration</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 flex-shrink-0">✓</span>
                <span>Implement proper cleanup in useEffect</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 flex-shrink-0">✓</span>
                <span>Set BOTHARBOR_CONFIG before loading the script</span>
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
                <span>Implement error boundaries for graceful failure handling</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 flex-shrink-0">•</span>
                <span>Add fallback UI when the chat widget fails to load</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 flex-shrink-0">•</span>
                <span>Use loading states to improve user experience</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
