import { CodeBlock } from "@/components/code-block"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nuxt.js Integration - BotHarbor Documentation",
  description:
    "Learn how to integrate BotHarbor chatbots into Nuxt.js applications with support for both Nuxt 2 and Nuxt 3.",
}

export default function NuxtIntegrationPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-2 sm:mb-4 text-white">
          Nuxt.js Integration
        </h1>
        <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 text-gray-300">
          Integrate BotHarbor chat widget into your Nuxt.js applications with support for both Nuxt 2 and Nuxt 3.
        </p>
      </div>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">Nuxt 3 Integration</h2>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
          For Nuxt 3 applications using the modern composition API and auto-imports.
        </p>

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Plugin Setup</h3>
          <CodeBlock
            language="typescript"
            code={`// plugins/botharbor.client.ts
export default defineNuxtPlugin(() => {
  // Only run on client side
  if (process.server) return

  const config = useRuntimeConfig()
  
  const loadBotHarbor = () => {
    return new Promise((resolve, reject) => {
      if (window.BotHarbor) {
        resolve(window.BotHarbor)
        return
      }

      const script = document.createElement('script')
      script.src = 'https://botharbor.ai/embed.js'
      script.async = true
      script.onload = () => resolve(window.BotHarbor)
      script.onerror = reject
      document.head.appendChild(script)
    })
  }

  const initializeBotHarbor = async () => {
    try {
      const BotHarbor = await loadBotHarbor()
      BotHarbor.init({
        botId: config.public.botharborBotId,
        theme: 'light',
        position: 'bottom-right',
        onReady: () => {
          console.log('BotHarbor is ready')
        }
      })
    } catch (error) {
      console.error('Failed to load BotHarbor:', error)
    }
  }

  // Initialize when the plugin loads
  initializeBotHarbor()
})`}
          />

          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Composable Approach</h3>
          <CodeBlock
            language="typescript"
            code={`// composables/useBotHarbor.ts
export const useBotHarbor = () => {
  const isReady = ref(false)
  const isOpen = ref(false)
  const config = useRuntimeConfig()

  const loadScript = () => {
    return new Promise((resolve, reject) => {
      if (window.BotHarbor) {
        resolve(window.BotHarbor)
        return
      }

      const script = document.createElement('script')
      script.src = 'https://botharbor.ai/embed.js'
      script.async = true
      script.onload = () => resolve(window.BotHarbor)
      script.onerror = () => reject(new Error('Failed to load BotHarbor script'))
      document.head.appendChild(script)
    })
  }

  const initialize = async () => {
    if (process.server) return

    try {
      const BotHarbor = await loadScript()
      BotHarbor.init({
        botId: config.public.botharborBotId,
        theme: 'light',
        position: 'bottom-right',
        onReady: () => {
          isReady.value = true
        },
        onOpen: () => {
          isOpen.value = true
        },
        onClose: () => {
          isOpen.value = false
        }
      })
    } catch (error) {
      console.error('BotHarbor initialization failed:', error)
    }
  }

  const open = () => {
    if (window.BotHarbor && isReady.value) {
      window.BotHarbor.open()
    }
  }

  const close = () => {
    if (window.BotHarbor) {
      window.BotHarbor.close()
    }
  }

  onMounted(() => {
    initialize()
  })

  return {
    isReady: readonly(isReady),
    isOpen: readonly(isOpen),
    open,
    close
  }
}`}
          />

          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Using in Components</h3>
          <CodeBlock
            language="vue"
            code={`<template>
  <div>
    <h1>My Nuxt 3 App</h1>
    <button @click="open" :disabled="!isReady" class="btn">
      {{ isReady ? 'Open Chat' : 'Loading...' }}
    </button>
    <p>Chat is {{ isOpen ? 'open' : 'closed' }}</p>
  </div>
</template>

<script setup>
const { isReady, isOpen, open, close } = useBotHarbor()
</script>`}
          />
        </div>
      </section>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">Nuxt 2 Integration</h2>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
          For Nuxt 2 applications using the traditional plugin system.
        </p>

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Plugin Setup</h3>
          <CodeBlock
            language="javascript"
            code={`// plugins/botharbor.client.js
export default ({ $config }, inject) => {
  // Only run on client side
  if (process.server) return

  const loadBotHarbor = () => {
    return new Promise((resolve, reject) => {
      if (window.BotHarbor) {
        resolve(window.BotHarbor)
        return
      }

      const script = document.createElement('script')
      script.src = 'https://botharbor.ai/embed.js'
      script.async = true
      script.onload = () => resolve(window.BotHarbor)
      script.onerror = reject
      document.head.appendChild(script)
    })
  }

  const botHarbor = {
    async init() {
      try {
        const BotHarbor = await loadBotHarbor()
        BotHarbor.init({
          botId: $config.botharborBotId,
          theme: 'light',
          position: 'bottom-right',
          onReady: () => {
            console.log('BotHarbor is ready')
          }
        })
      } catch (error) {
        console.error('Failed to load BotHarbor:', error)
      }
    },
    open() {
      if (window.BotHarbor) {
        window.BotHarbor.open()
      }
    },
    close() {
      if (window.BotHarbor) {
        window.BotHarbor.close()
      }
    }
  }

  inject('botHarbor', botHarbor)
}`}
          />

          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Nuxt Config</h3>
          <CodeBlock
            language="javascript"
            code={`// nuxt.config.js
export default {
  plugins: [
    { src: '~/plugins/botharbor.client.js', mode: 'client' }
  ],
  
  publicRuntimeConfig: {
    botharborBotId: process.env.BOTHARBOR_BOT_ID
  },
  
  privateRuntimeConfig: {
    // Private keys (only available on server-side)
  }
}`}
          />

          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Using in Pages/Components</h3>
          <CodeBlock
            language="vue"
            code={`<template>
  <div>
    <h1>My Nuxt 2 App</h1>
    <button @click="openChat" class="btn">
      Open Chat
    </button>
  </div>
</template>

<script>
export default {
  async mounted() {
    // Initialize BotHarbor when component mounts
    await this.$botHarbor.init()
  },
  methods: {
    openChat() {
      this.$botHarbor.open()
    },
    closeChat() {
      this.$botHarbor.close()
    }
  }
}
</script>`}
          />
        </div>
      </section>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
          Environment Configuration
        </h2>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
          Configure your Nuxt application with environment variables.
        </p>

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Nuxt 3 Configuration</h3>
          <CodeBlock
            language="typescript"
            code={`// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    // Private keys (only available on server-side)
    apiSecret: '123',
    
    // Public keys (exposed to client-side)
    public: {
      botharborBotId: process.env.BOTHARBOR_BOT_ID,
      botharborTheme: process.env.BOTHARBOR_THEME || 'light',
      botharborPosition: process.env.BOTHARBOR_POSITION || 'bottom-right'
    }
  }
})

// .env
BOTHARBOR_BOT_ID=your-bot-id-here
BOTHARBOR_THEME=light
BOTHARBOR_POSITION=bottom-right`}
          />

          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Nuxt 2 Configuration</h3>
          <CodeBlock
            language="javascript"
            code={`// nuxt.config.js
export default {
  publicRuntimeConfig: {
    botharborBotId: process.env.BOTHARBOR_BOT_ID,
    botharborTheme: process.env.BOTHARBOR_THEME || 'light',
    botharborPosition: process.env.BOTHARBOR_POSITION || 'bottom-right'
  }
}

// .env
BOTHARBOR_BOT_ID=your-bot-id-here
BOTHARBOR_THEME=light
BOTHARBOR_POSITION=bottom-right`}
          />
        </div>
      </section>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">SSR Considerations</h2>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
          Handle server-side rendering properly to avoid hydration issues.
        </p>

        <div className="space-y-4">
          <div className="bg-gray-900 border border-gray-700 p-4 sm:p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl font-bold mb-3 text-white">Client-Only Components</h3>
            <CodeBlock
              language="vue"
              code={`<template>
  <div>
    <h1>My Page</h1>
    <client-only>
      <BotHarborWidget />
      <template #fallback>
        <div>Loading chat widget...</div>
      </template>
    </client-only>
  </div>
</template>

<script>
import BotHarborWidget from '~/components/BotHarborWidget.vue'

export default {
  components: {
    BotHarborWidget
  }
}
</script>`}
            />
          </div>

          <div className="bg-gray-900 border border-gray-700 p-4 sm:p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl font-bold mb-3 text-white">Process Check</h3>
            <CodeBlock
              language="javascript"
              code={`// Always check for client-side before accessing window
if (process.client) {
  // Client-side only code
  window.BotHarbor.open()
}

// Or use mounted/onMounted lifecycle hooks
mounted() {
  // This only runs on client-side
  this.initializeBotHarbor()
}`}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">Best Practices</h2>
        <div className="space-y-4">
          <div className="bg-gray-900 border border-gray-700 p-4 sm:p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl font-bold mb-3 text-white">Nuxt-Specific Tips</h3>
            <ul className="space-y-2 text-sm sm:text-base text-white">
              <li className="flex items-start">
                <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
                <span>Use client-only plugins for browser-specific code</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
                <span>Leverage Nuxt's runtime config for environment variables</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
                <span>Use process.client checks for client-side only code</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
                <span>Wrap widgets in client-only components for SSR</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
