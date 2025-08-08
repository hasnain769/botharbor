import { CodeBlock } from "@/components/code-block"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Vue.js Integration - BotHarbor Documentation",
  description:
    "Learn how to integrate BotHarbor chatbots into Vue.js applications with support for both Vue 2 and Vue 3.",
}

export default function VueIntegrationPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-2 sm:mb-4 text-white">
          Vue.js Integration
        </h1>
        <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 text-gray-300">
          Integrate BotHarbor chat widget into your Vue.js applications with support for both Vue 2 and Vue 3.
        </p>
      </div>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">Vue 3 Composition API</h2>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
          The recommended approach for Vue 3 applications using the modern Composition API.
        </p>

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Basic Setup</h3>
          <CodeBlock
            language="vue"
            code={`<template>
  <div class="app">
    <header>
      <h1>My Vue App</h1>
      <button @click="openChat" class="chat-button">
        Need Help?
      </button>
    </header>
    <main>
      <p>Your app content here...</p>
    </main>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const chatReady = ref(false)

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
      botId: import.meta.env.VITE_BOTHARBOR_BOT_ID,
      theme: 'light',
      position: 'bottom-right',
      autoOpen: false,
      onReady: () => {
        chatReady.value = true
        console.log('BotHarbor is ready')
      }
    })
  } catch (error) {
    console.error('Failed to load BotHarbor:', error)
  }
}

const openChat = () => {
  if (window.BotHarbor && chatReady.value) {
    window.BotHarbor.open()
  }
}

const closeChat = () => {
  if (window.BotHarbor) {
    window.BotHarbor.close()
  }
}

onMounted(() => {
  initializeBotHarbor()
})

onUnmounted(() => {
  if (window.BotHarbor) {
    window.BotHarbor.destroy()
  }
})
</script>`}
          />
        </div>
      </section>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">Vue 3 Composable</h2>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
          Create a reusable composable for better organization and reusability across components.
        </p>

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">useBotHarbor Composable</h3>
          <CodeBlock
            language="javascript"
            code={`// composables/useBotHarbor.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useBotHarbor(config = {}) {
  const isReady = ref(false)
  const isOpen = ref(false)
  const error = ref(null)

  const defaultConfig = {
    theme: 'light',
    position: 'bottom-right',
    autoOpen: false,
    ...config
  }

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
    try {
      const BotHarbor = await loadScript()
      BotHarbor.init({
        ...defaultConfig,
        onReady: () => {
          isReady.value = true
          defaultConfig.onReady?.()
        },
        onOpen: () => {
          isOpen.value = true
          defaultConfig.onOpen?.()
        },
        onClose: () => {
          isOpen.value = false
          defaultConfig.onClose?.()
        },
        onError: (err) => {
          error.value = err
          defaultConfig.onError?.(err)
        }
      })
    } catch (err) {
      error.value = err
      console.error('BotHarbor initialization failed:', err)
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

  const sendMessage = (message) => {
    if (window.BotHarbor && isReady.value) {
      window.BotHarbor.sendMessage(message)
    }
  }

  const setUser = (user) => {
    if (window.BotHarbor && isReady.value) {
      window.BotHarbor.setUser(user)
    }
  }

  onMounted(() => {
    initialize()
  })

  onUnmounted(() => {
    if (window.BotHarbor) {
      window.BotHarbor.destroy()
    }
  })

  return {
    isReady,
    isOpen,
    error,
    open,
    close,
    sendMessage,
    setUser
  }
}`}
          />

          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Using the Composable</h3>
          <CodeBlock
            language="vue"
            code={`<template>
  <div class="app">
    <header>
      <h1>My Vue App</h1>
      <div class="chat-controls">
        <button 
          @click="open" 
          :disabled="!isReady"
          class="btn btn-primary"
        >
          {{ isReady ? 'Open Chat' : 'Loading...' }}
        </button>
        <button 
          @click="close" 
          :disabled="!isOpen"
          class="btn btn-secondary"
        >
          Close Chat
        </button>
      </div>
      <div v-if="error" class="error">
        Error: {{ error.message }}
      </div>
    </header>
    <main>
      <p>Chat status: {{ isOpen ? 'Open' : 'Closed' }}</p>
    </main>
  </div>
</template>

<script setup>
import { useBotHarbor } from '@/composables/useBotHarbor'

const { isReady, isOpen, error, open, close, sendMessage, setUser } = useBotHarbor({
  botId: import.meta.env.VITE_BOTHARBOR_BOT_ID,
  theme: 'auto',
  position: 'bottom-right',
  onReady: () => {
    console.log('Chat is ready!')
    // Set user information when chat is ready
    setUser({
      name: 'John Doe',
      email: 'john@example.com'
    })
  }
})
</script>`}
          />
        </div>
      </section>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">Vue 2 Options API</h2>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
          For Vue 2 applications using the traditional Options API approach.
        </p>

        <CodeBlock
          language="vue"
          code={`<template>
  <div class="app">
    <header>
      <h1>My Vue 2 App</h1>
      <button @click="openChat" :disabled="!chatReady">
        {{ chatReady ? 'Open Chat' : 'Loading Chat...' }}
      </button>
    </header>
    <main>
      <p>Your app content here...</p>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      chatReady: false,
      chatOpen: false
    }
  },
  async mounted() {
    await this.initializeBotHarbor()
  },
  beforeDestroy() {
    if (window.BotHarbor) {
      window.BotHarbor.destroy()
    }
  },
  methods: {
    loadBotHarborScript() {
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
    },
    async initializeBotHarbor() {
      try {
        const BotHarbor = await this.loadBotHarborScript()
        BotHarbor.init({
          botId: process.env.VUE_APP_BOTHARBOR_BOT_ID,
          theme: 'light',
          position: 'bottom-right',
          autoOpen: false,
          onReady: () => {
            this.chatReady = true
            console.log('BotHarbor is ready')
          },
          onOpen: () => {
            this.chatOpen = true
          },
          onClose: () => {
            this.chatOpen = false
          }
        })
      } catch (error) {
        console.error('Failed to initialize BotHarbor:', error)
      }
    },
    openChat() {
      if (window.BotHarbor && this.chatReady) {
        window.BotHarbor.open()
      }
    },
    closeChat() {
      if (window.BotHarbor) {
        window.BotHarbor.close()
      }
    }
  }
}
</script>`}
        />
      </section>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
          Environment Configuration
        </h2>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
          Configure your Vue application with environment variables for different deployment environments.
        </p>

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Environment Files</h3>
          <CodeBlock
            language="bash"
            code={`# .env.local (Vue 3 with Vite)
VITE_BOTHARBOR_BOT_ID=your-bot-id-here
VITE_BOTHARBOR_THEME=light
VITE_BOTHARBOR_POSITION=bottom-right

# .env.local (Vue 2 with Vue CLI)
VUE_APP_BOTHARBOR_BOT_ID=your-bot-id-here
VUE_APP_BOTHARBOR_THEME=light
VUE_APP_BOTHARBOR_POSITION=bottom-right`}
          />
        </div>
      </section>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">Best Practices</h2>
        <div className="space-y-4">
          <div className="bg-gray-900 border border-gray-700 p-4 sm:p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl font-bold mb-3 text-white">Performance Optimization</h3>
            <ul className="space-y-2 text-sm sm:text-base text-gray-300">
              <li className="flex items-start">
                <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
                <span>Use async script loading to prevent blocking</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
                <span>Initialize BotHarbor in mounted/onMounted lifecycle</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
                <span>Clean up resources in beforeDestroy/onUnmounted</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
                <span>Use composables for reusable logic (Vue 3)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
