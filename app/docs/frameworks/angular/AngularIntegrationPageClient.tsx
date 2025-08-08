"use client"

import { CodeBlock } from "@/components/ui/code-block"

export default function AngularIntegrationPageClient() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-2 sm:mb-4 text-white">
          Angular Integration
        </h1>
        <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 text-gray-300">
          Integrate BotHarbor chat widget into your Angular applications with comprehensive examples and best practices.
        </p>
      </div>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">Quick Start</h2>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
          The easiest way to add BotHarbor to your Angular app is by loading the script in your component and initializing it in the ngOnInit lifecycle hook.
        </p>

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Basic Component Integration</h3>
          <CodeBlock
            language="typescript"
            code={`import { Component, OnInit, OnDestroy } from '@angular/core';

declare global {
  interface Window {
    BOTHARBOR_CONFIG?: any;
    BotHarbor?: {
      open: () => void;
      close: () => void;
      sendMessage: (message: string) => void;
    };
  }
}

@Component({
  selector: 'app-root',
  template: \`
    <div class="app">
      <header>
        <h1>My Angular App</h1>
        <button (click)="openChat()" [disabled]="!chatReady" class="chat-button">
          {{ chatReady ? 'Open Chat' : 'Loading Chat...' }}
        </button>
      </header>
      <main>
        <p>Your app content here...</p>
      </main>
    </div>
  \`,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  chatReady = false;

  ngOnInit() {
    this.initializeBotHarbor();
  }

  ngOnDestroy() {
    // Cleanup when component is destroyed
    const existingScript = document.querySelector('script[src="https://botharbor.ai/embed.js"]');
    if (existingScript) {
      existingScript.remove();
    }
    delete window.BOTHARBOR_CONFIG;
  }

  private async initializeBotHarbor() {
    try {
      // Set global configuration
      window.BOTHARBOR_CONFIG = {
        botId: 'your-bot-id',
        theme: 'light',
        position: 'bottom-right',
        primaryColor: '#14B8A6',
        greeting: 'Hello! How can I help you?'
      };

      // Load BotHarbor script
      await this.loadScript('https://botharbor.ai/embed.js');
      this.chatReady = true;
      console.log('BotHarbor initialized successfully');
    } catch (error) {
      console.error('Failed to initialize BotHarbor:', error);
    }
  }

  private loadScript(src: string): Promise<void> {
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

  openChat() {
    if (window.BotHarbor && this.chatReady) {
      window.BotHarbor.open();
    }
  }

  closeChat() {
    if (window.BotHarbor) {
      window.BotHarbor.close();
    }
  }
}`}
          />
        </div>
      </section>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">Service-Based Approach</h2>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
          Create a dedicated service for better organization and reusability across your Angular application.
        </p>

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">BotHarbor Service</h3>
          <CodeBlock
            language="typescript"
            code={`import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface BotHarborConfig {
  botId: string;
  theme?: 'light' | 'dark' | 'auto';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  primaryColor?: string;
  greeting?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BotHarborService {
  private readySubject = new BehaviorSubject<boolean>(false);
  private openSubject = new BehaviorSubject<boolean>(false);
  
  public isReady$: Observable<boolean> = this.readySubject.asObservable();
  public isOpen$: Observable<boolean> = this.openSubject.asObservable();

  async initialize(config: BotHarborConfig): Promise<void> {
    try {
      // Set global configuration
      window.BOTHARBOR_CONFIG = config;

      // Load script if not already loaded
      await this.loadScript('https://botharbor.ai/embed.js');
      
      // Set up event listeners
      this.setupEventListeners();
      
      this.readySubject.next(true);
      console.log('BotHarbor service initialized');
    } catch (error) {
      console.error('Failed to initialize BotHarbor service:', error);
      throw error;
    }
  }

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
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

  private setupEventListeners(): void {
    // Listen for BotHarbor events
    window.addEventListener('botharbor:open', () => {
      this.openSubject.next(true);
    });

    window.addEventListener('botharbor:close', () => {
      this.openSubject.next(false);
    });
  }

  open(): void {
    if (window.BotHarbor && this.readySubject.value) {
      window.BotHarbor.open();
    }
  }

  close(): void {
    if (window.BotHarbor) {
      window.BotHarbor.close();
    }
  }

  sendMessage(message: string): void {
    if (window.BotHarbor && this.readySubject.value) {
      window.BotHarbor.sendMessage(message);
    }
  }

  destroy(): void {
    const existingScript = document.querySelector('script[src="https://botharbor.ai/embed.js"]');
    if (existingScript) {
      existingScript.remove();
    }
    delete window.BOTHARBOR_CONFIG;
    this.readySubject.next(false);
    this.openSubject.next(false);
  }
}`}
          />

          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Using the Service</h3>
          <CodeBlock
            language="typescript"
            code={`import { Component, OnInit, OnDestroy } from '@angular/core';
import { BotHarborService, BotHarborConfig } from './services/bot-harbor.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  template: \`
    <div class="app">
      <header>
        <h1>My Angular App</h1>
        <div class="chat-controls">
          <button 
            (click)="openChat()" 
            [disabled]="!isReady"
            class="btn btn-primary"
          >
            {{ isReady ? 'Open Chat' : 'Loading...' }}
          </button>
          <button 
            (click)="closeChat()" 
            [disabled]="!isOpen"
            class="btn btn-secondary"
          >
            Close Chat
          </button>
        </div>
        <p>Chat Status: {{ isOpen ? 'Open' : 'Closed' }}</p>
      </header>
      <main>
        <p>Your app content here...</p>
      </main>
    </div>
  \`
})
export class AppComponent implements OnInit, OnDestroy {
  isReady = false;
  isOpen = false;
  private subscriptions: Subscription[] = [];

  constructor(private botHarborService: BotHarborService) {}

  ngOnInit() {
    // Subscribe to service observables
    this.subscriptions.push(
      this.botHarborService.isReady$.subscribe(ready => {
        this.isReady = ready;
      })
    );

    this.subscriptions.push(
      this.botHarborService.isOpen$.subscribe(open => {
        this.isOpen = open;
      })
    );

    // Initialize BotHarbor
    const config: BotHarborConfig = {
      botId: 'your-bot-id',
      theme: 'auto',
      position: 'bottom-right',
      primaryColor: '#14B8A6'
    };

    this.botHarborService.initialize(config);
  }

  ngOnDestroy() {
    // Clean up subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
    
    // Destroy BotHarbor
    this.botHarborService.destroy();
  }

  openChat() {
    this.botHarborService.open();
  }

  closeChat() {
    this.botHarborService.close();
  }
}`}
          />
        </div>
      </section>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">Environment Configuration</h2>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
          Configure your Angular application with environment variables for different deployment environments.
        </p>

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Environment Files</h3>
          <CodeBlock
            language="typescript"
            code={`// src/environments/environment.ts
export const environment = {
  production: false,
  botHarbor: {
    botId: 'your-dev-bot-id',
    theme: 'light',
    position: 'bottom-right',
    primaryColor: '#14B8A6'
  }
};

// src/environments/environment.prod.ts
export const environment = {
  production: true,
  botHarbor: {
    botId: 'your-prod-bot-id',
    theme: 'auto',
    position: 'bottom-right',
    primaryColor: '#14B8A6'
  }
};`}
          />

          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Using Environment Variables</h3>
          <CodeBlock
            language="typescript"
            code={`import { Component, OnInit } from '@angular/core';
import { BotHarborService } from './services/bot-harbor.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  template: \`
    <div class="app">
      <h1>My Angular App</h1>
      <button (click)="openChat()" [disabled]="!isReady">
        Open Chat
      </button>
    </div>
  \`
})
export class AppComponent implements OnInit {
  isReady = false;

  constructor(private botHarborService: BotHarborService) {}

  ngOnInit() {
    this.botHarborService.isReady$.subscribe(ready => {
      this.isReady = ready;
    });

    // Use environment configuration
    this.botHarborService.initialize(environment.botHarbor);
  }

  openChat() {
    this.botHarborService.open();
  }
}`}
          />
        </div>
      </section>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">Best Practices</h2>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          <div className="bg-gray-900 border border-gray-700 p-4 sm:p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Angular-Specific Tips</h3>
            <ul className="space-y-2 text-sm sm:text-base text-gray-300">
              <li className="flex items-start">
                <span className="text-green-400 mr-2 flex-shrink-0">✓</span>
                <span>Use services for better dependency injection and testing</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 flex-shrink-0">✓</span>
                <span>Leverage RxJS observables for reactive state management</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 flex-shrink-0">✓</span>
                <span>Use environment files for configuration management</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 flex-shrink-0">✓</span>
                <span>Implement proper cleanup in ngOnDestroy</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-900 border border-gray-700 p-4 sm:p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Performance & Error Handling</h3>
            <ul className="space-y-2 text-sm sm:text-base text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 flex-shrink-0">•</span>
                <span>Load scripts asynchronously to avoid blocking</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 flex-shrink-0">•</span>
                <span>Use try-catch blocks for error handling</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 flex-shrink-0">•</span>
                <span>Implement loading states for better UX</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 flex-shrink-0">•</span>
                <span>Unsubscribe from observables to prevent memory leaks</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
