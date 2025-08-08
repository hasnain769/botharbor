"use client"

import { CodeBlock } from "@/components/code-block"

export default function ReactIntegrationPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2 sm:mb-4">
              React Integration
            </h1>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-300">
              Learn how to integrate BotHarbor chat widget into your React applications with multiple approaches and
              best practices.
            </p>
          </div>

          <section className="space-y-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">Quick Start</h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              The easiest way to add BotHarbor to your React app is using the useEffect hook to load the script after
              component mounting.
            </p>

            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-lg sm:text-xl font-bold text-white">Basic Implementation</h3>
              <div className="w-full overflow-hidden">
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
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
              Custom Hook Approach
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Create a reusable custom hook for better organization and reusability across your application.
            </p>

            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-lg sm:text-xl font-bold text-white">useBotHarbor Hook</h3>
              <div className="w-full overflow-hidden">
                <CodeBlock
                  language="jsx"
                  code={`// hooks/useBotHarbor.js
import { useEffect, useCallback } from 'react';

export const useBotHarbor = (config) => {
  const initializeBotHarbor = useCallback(() => {
    // Set global configuration
    window.BOTHARBOR_CONFIG = config;

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
    if (window.BotHarbor) {
      window.BotHarbor.open();
    }
  }, []);

  const closeChat = useCallback(() => {
    if (window.BotHarbor) {
      window.BotHarbor.close();
    }
  }, []);

  return { openChat, closeChat };
};`}
                />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white">Using the Hook</h3>
              <div className="w-full overflow-hidden">
                <CodeBlock
                  language="jsx"
                  code={`import React from 'react';
import { useBotHarbor } from './hooks/useBotHarbor';

function App() {
  const { openChat, closeChat } = useBotHarbor({
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
        <button onClick={openChat} className="chat-button">
          Need Help? Chat with us!
        </button>
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
            </div>
          </section>

          <section className="space-y-6">
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
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
