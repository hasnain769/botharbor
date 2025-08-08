"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Send, MessageCircle, Minimize2, X, Bot } from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

interface QAPair {
  id: number
  question: string
  answer: string
}

interface BotData {
  id: string
  name: string
  system_prompt: string
  model: string
  temperature: number
  avatar_image_url: string
  greeting_message: string
  chat_window_background_color: string
  user_message_background_color: string
  chatbot_thinking_dots_color: string
  send_message_button_color: string
}

interface ChatParams {
  bot_id: string
  theme?: string
  greeting?: string
}

// Get or create a unique user session ID
function getOrCreateSessionId(): string {
  let sessionId = localStorage.getItem('bot_user_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}`;
    localStorage.setItem('bot_user_session_id', sessionId);
  }
  return sessionId;
}

// Store and retrieve conversation_id with bot-specific key
function getConversationId(botId: string): string | null {
  return localStorage.getItem(`bot_conversation_id_${botId}`);
}

function setConversationId(botId: string, convoId: string) {
  localStorage.setItem(`bot_conversation_id_${botId}`, convoId);
}

// Store and retrieve last 10 messages with bot-specific key
function saveMessagesToStorage(botId: string, msgs: Message[]) {
  const last10 = msgs.slice(-10);
  localStorage.setItem(`bot_chat_messages_${botId}`, JSON.stringify(last10));
}

function loadMessagesFromStorage(botId: string): Message[] {
  const stored = localStorage.getItem(`bot_chat_messages_${botId}`);
  if (!stored) return [];
  try {
    return JSON.parse(stored).map((msg: any) => ({
      ...msg,
      timestamp: new Date(msg.timestamp),
    }));
  } catch (err) {
    return [];
  }
}

const API_BASE_URL = "https://fastapi-app-163299086327.us-east1.run.app";
// const API_BASE_URL = "http://localhost:8000"; // Use local backend for development

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)
  const [chatParams, setChatParams] = useState<ChatParams | null>(null)
  const [botData, setBotData] = useState<BotData | null>(null)
  const [qaPairs, setQaPairs] = useState<QAPair[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [isFetchingBot, setIsFetchingBot] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [quotaExceeded, setQuotaExceeded] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      getOrCreateSessionId();
    }
  }, []);

  // Show popup message after a delay when bot data is loaded
  useEffect(() => {
    if (botData && isMinimized && !isFetchingBot) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        // Auto-hide popup after 5 seconds
        setTimeout(() => {
          setShowPopup(false);
        }, 5000);
      }, 2000); // Show popup 2 seconds after bot loads

      return () => clearTimeout(timer);
    }
  }, [botData, isMinimized, isFetchingBot]);

  // Parse URL parameters and fetch bot data
  useEffect(() => {
    if (isClient && typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const bot_id = urlParams.get("bot_id")
      const theme = urlParams.get("theme") || "default"
      const greeting = urlParams.get("greeting") || undefined

      if (!bot_id) {
        setError("Bot ID is required")
        return
      }

      const params: ChatParams = { bot_id, theme, greeting }
      setChatParams(params)

      // Load bot-specific messages from storage
      const restoredMessages = loadMessagesFromStorage(bot_id);
      if (restoredMessages.length > 0) {
        setMessages(restoredMessages);
      }

      // Fetch bot data from backend
      fetchBotData(bot_id)
    }
  }, [isClient])

  const fetchBotData = async (botId: string) => {
    try {
      setIsFetchingBot(true)
      setError(null)

      const response = await fetch(`${API_BASE_URL}/botInformation/${botId}`)

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        setBotData(data.bot)
        setQaPairs(data.qa_pairs || [])

        // Add greeting message from bot data or URL param
        const greetingText = chatParams?.greeting || data.bot.greeting_message
        const restoredMessages = loadMessagesFromStorage(botId);
        if (restoredMessages.length > 0) {
          setMessages(restoredMessages);
        } else if (greetingText) {
          const greetingMessage: Message = {
            id: "greeting",
            type: "bot",
            content: greetingText,
            timestamp: new Date(),
          };
          setMessages([greetingMessage]);
          saveMessagesToStorage(botId, [greetingMessage]); // Save with bot-specific key
        }

      } else {
        throw new Error(data.message || "Failed to fetch bot data")
      }
    } catch (error) {
      console.error("Error fetching bot data:", error)
      setError("Failed to load chatbot configuration")
    } finally {
      setIsFetchingBot(false)
    }
  }

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when chat is opened
  useEffect(() => {
    if (!isMinimized && isClient) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isMinimized, isClient])

  // Build enhanced system prompt with Q&A pairs
  const buildSystemPrompt = () => {
    if (!botData) return ""

    let systemPrompt = botData.system_prompt

    if (qaPairs.length > 0) {
      systemPrompt += "\n\nExample question-answer pairs:\n"
      qaPairs.forEach((qa) => {
        systemPrompt += `Q: ${qa.question}\nA: ${qa.answer}\n\n`
      })
    }

    return systemPrompt
  }

  const getErrorMessage = (error: any, status?: number): string => {
    console.log("Error details:", error, "Status code:", status);
    
    // Check for quota exceeded in error message
    if (error?.message?.includes('quota reached') || error?.message?.includes('quota exceeded') || error?.message?.includes('Message quota reached')) {
      setQuotaExceeded(true);
      return "I've reached my message limit for now. Please try again later or contact support for more messages.";
    }

    // Handle quota exceeded case by status
    if (status === 403) {
      setQuotaExceeded(true);
      return "I've reached my message limit for now. Please try again later or contact support for more messages.";
    }

    // Handle other HTTP errors
    if (status === 404) {
      return "Sorry, I couldn't find the bot configuration. Please contact support.";
    }

    if (status === 500) {
      return "I'm experiencing technical difficulties. Please try again in a moment.";
    }

    // Handle network errors
    if (error?.name === 'TypeError' && error?.message?.includes('fetch')) {
      return "I'm having trouble connecting to the server. Please check your internet connection and try again.";
    }

    // Handle timeout errors
    if (error?.name === 'AbortError' || error?.message?.includes('timeout')) {
      return "The request took too long to process. Please try again.";
    }

    // If error message contains useful info, use it
    if (error?.message && typeof error.message === 'string') {
      // Check for specific backend error messages
      if (error.message.includes('upgrade your plan')) {
        setQuotaExceeded(true);
        return "I've reached my message limit for now. Please try again later or contact support for more messages.";
      }
      
      if (error.message.includes('User not found')) {
        return "Sorry, I couldn't find the bot configuration. Please contact support.";
      }
    }

    // Default error message
    return "Sorry, I'm having trouble processing your message. Please try again.";
  }

  const sendMessage = async () => {
    if (!inputValue.trim() || !chatParams || !botData || isLoading) return;

    // Don't allow new messages if quota is exceeded
    if (quotaExceeded) {
      const errorMessage: Message = {
        id: `quota_error_${Date.now()}`,
        type: "bot",
        content: "I've reached my message limit. Please try again later or contact support for more messages.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      saveMessagesToStorage(chatParams.bot_id, [...messages, errorMessage]);
      return;
    }

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      type: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    saveMessagesToStorage(chatParams.bot_id, updatedMessages); // Use bot-specific key
    setInputValue("");
    setIsLoading(true);
    setError(null);

    try {
      // Get last 3 user and 3 bot messages
      const userMsgs = updatedMessages.filter(m => m.type === 'user').slice(-3);
      const botMsgs = updatedMessages.filter(m => m.type === 'bot').slice(-3);

      // Interleave user-bot in correct order
      const historyLines: string[] = [];
      for (let i = 0; i < 3; i++) {
        if (botMsgs[i]) historyLines.push(`ai: ${botMsgs[i].content}`);
        if (userMsgs[i]) historyLines.push(`user: ${userMsgs[i].content}`);
      }

      const finalMessage = [
        "conversation history",
        ...historyLines,
        "=====================================",
        "current message",
        userMessage.content
      ].join("\n");

      const conversationId = getConversationId(chatParams.bot_id); // Use bot-specific key

      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bot_id: chatParams.bot_id,
          bot_name: botData.name,
          system_prompt: buildSystemPrompt(), // Enhanced system prompt with Q&A pairs
          message: finalMessage,
          model: botData.model,
          temperature: botData.temperature,
          conversation_id: conversationId || undefined,
          current_msg: userMessage.content,
        }),
      });

      let data;
      let errorMessage = "";
      const responseStatus = response.status;

      // Parse response data if available
      try {
        data = await response.json();
      } catch (parseError) {
        console.error("Error parsing response:", parseError);
        data = null;
      }

      if (!response.ok) {
        // Extract error message from response
        if (data?.detail) {
          errorMessage = typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail);
        } else {
          errorMessage = `Server error: ${response.status}`;
        }
        const error = new Error(errorMessage);
        (error as any).status = responseStatus; // Attach status to error
        throw error;
      }

      if (!data) {
        throw new Error("No response data received");
      }

      // Save conversation ID if provided
      if (data.conversation_id && !conversationId) {
        setConversationId(chatParams.bot_id, data.conversation_id); // Use bot-specific key
      }

      const botMessage: Message = {
        id: `bot_${Date.now()}`,
        type: "bot",
        content: data.response || "Sorry, I couldn't process your message.",
        timestamp: new Date(),
      };

      const newMessages = [...updatedMessages, botMessage];
      setMessages(newMessages);
      saveMessagesToStorage(chatParams.bot_id, newMessages); // Use bot-specific key

      // Reset quota exceeded state if message was successful
      if (quotaExceeded) {
        setQuotaExceeded(false);
      }

    } catch (err: any) {
      // console.error("Error sending message:", err);
      
      const friendlyErrorMessage = getErrorMessage(err, err.status);
      
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        type: "bot",
        content: friendlyErrorMessage,
        timestamp: new Date(),
      };
      
      const fallback = [...updatedMessages, errorMessage];
      setMessages(fallback);
      saveMessagesToStorage(chatParams.bot_id, fallback); // Use bot-specific key
      
      // Set a brief error state for UI feedback
      setError("Connection error");
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Get colors from bot data or fallback to theme
  const getColors = () => {
    if (botData) {
      return {
        primary: botData.chat_window_background_color || "#a0616a",
        userMessage: botData.user_message_background_color || "#3b82f6",
        thinkingDots: botData.chatbot_thinking_dots_color || "#10b981",
        sendButton: botData.send_message_button_color || "#10b981",
      }
    }

    // Fallback theme colors
    const theme = chatParams?.theme || "default"
    switch (theme) {
      case "dark":
        return {
          primary: "#1f2937",
          userMessage: "#374151",
          thinkingDots: "#6b7280",
          sendButton: "#3b82f6",
        }
      case "green":
        return {
          primary: "#14b8a6",
          userMessage: "#0f766e",
          thinkingDots: "#6b7280",
          sendButton: "#06b6d4",
        }
      default:
        return {
          primary: "#a0616a",
          userMessage: "#3b82f6",
          thinkingDots: "#10b981",
          sendButton: "#10b981",
        }
    }
  }

  const colors = getColors()

  // Don't render anything until we're on the client
  if (!isClient) {
    return null
  }

  if (error && !chatParams) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-red-50 border border-red-200 rounded-lg shadow-lg p-6">
          <div className="text-center">
            <X className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-red-700 mb-2">Configuration Error</h2>
            <p className="text-red-600">{error}</p>
            <p className="text-sm text-red-500 mt-2">Please provide a valid bot_id parameter in the URL.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Widget Styles */}
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        
        .animate-bounce {
          animation: bounce 0.8s infinite;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out;
        }
        
        @media (max-width: 640px) {
          .chat-widget-container {
            bottom: 1rem !important;
            right: 1rem !important;
            left: 1rem !important;
            width: auto !important;
          }
          
          .chat-widget-window {
            width: 100% !important;
            height: 70vh !important;
            max-height: 500px !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-transparent">
        {/* Popup Message - Positioned independently */}
        {showPopup && isMinimized && (
          <div className="fixed z-50" style={{ bottom: '4rem', right: '5.5rem' }}>
            <div className="relative animate-fadeInUp">
              <div className="bg-white rounded-lg shadow-lg px-4 py-3 border border-gray-200 flex items-center gap-3">
                <p className="text-sm text-gray-800 font-medium whitespace-nowrap">Can I help you?</p>
                <button
                  onClick={() => setShowPopup(false)}
                  className="text-gray-400 hover:text-gray-600 flex-shrink-0 transition-colors"
                  aria-label="Close popup"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              {/* Arrow pointing to chat widget */}
              <div 
                className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-0 h-0"
                style={{
                  borderTop: '8px solid transparent',
                  borderBottom: '8px solid transparent',
                  borderLeft: '8px solid white'
                }}
              ></div>
              <div 
                className="absolute top-1/2 -right-2.5 transform -translate-y-1/2 w-0 h-0"
                style={{
                  borderTop: '9px solid transparent',
                  borderBottom: '9px solid transparent',
                  borderLeft: '9px solid #e5e7eb'
                }}
              ></div>
            </div>
          </div>
        )}

        <div className="chat-widget-container fixed bottom-4 right-4 z-50">
          {/* Minimized State - Clean Message Circle with Avatar */}
          {isMinimized && (
            <button
              onClick={() => {
                setIsMinimized(false);
                setShowPopup(false); // Hide popup when chat opens
              }}
              className="relative group transition-all duration-200 hover:scale-110"
            >
              {/* Message Circle Icon */}
              <MessageCircle
                className="h-14 w-14 text-gray-600 hover:text-gray-800 drop-shadow-lg"
                fill="white"
                stroke="#374151"
                strokeWidth={1.5}
              />

              {/* Bot Avatar in Center */}
              <div className="absolute inset-0 flex items-center justify-center">
                {botData?.avatar_image_url ? (
                  <img
                    src={botData.avatar_image_url || "/placeholder.svg"}
                    alt="Bot Avatar"
                    className="w-full h-full rounded-full object-cover border border-gray-900"
                  />
                ) : (
                  <Bot className="h-6 w-6 text-gray-600" />
                )}
              </div>
            </button>
          )}

          {/* Expanded Chat Window */}
          {!isMinimized && (
            <div
              className="chat-widget-window w-80 h-96 rounded-lg shadow-xl border border-gray-200 flex flex-col overflow-hidden"
              style={{ backgroundColor: colors.primary }}
            >
              {/* Header */}
              <div className="px-4 py-3 flex items-center justify-between border-b border-black/10">
                <div className="flex items-center gap-3">
                  {botData?.avatar_image_url ? (
                    <img
                      src={botData.avatar_image_url || "/placeholder.svg"}
                      alt="Bot Avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <div>
                    <div className="font-medium text-sm text-white">{botData?.name || "Chat Support"}</div>
                    <div className="text-xs text-white/70">
                      {quotaExceeded ? "Quota exceeded" : "Online"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="p-1 rounded hover:bg-black/10 transition-colors"
                  >
                    <Minimize2 className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 && !botData?.greeting_message && (
                  <div className="text-center text-white/70 text-sm py-8">
                    <MessageCircle className="h-8 w-8 mx-auto mb-2 text-white/50" />
                    <p>Start a conversation!</p>
                  </div>
                )}

                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`flex items-start gap-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : ""}`}
                    >
                      {message.type === "bot" && (
                        <div className="flex-shrink-0">
                          {botData?.avatar_image_url ? (
                            <img
                              src={botData.avatar_image_url || "/placeholder.svg"}
                              alt="Bot Avatar"
                              className="w-6 h-6 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                              <Bot className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                      )}
                      <div
                        className={`rounded-2xl px-4 py-2 text-sm max-w-full ${message.type === "user" ? "text-white rounded-br-md" : "bg-white text-gray-800 rounded-bl-md"
                          }`}
                        style={message.type === "user" ? { backgroundColor: colors.userMessage } : {}}
                      >
                        <p className="whitespace-pre-wrap break-words">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0">
                        {botData?.avatar_image_url ? (
                          <img
                            src={botData.avatar_image_url || "/placeholder.svg"}
                            alt="Bot Avatar"
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="bg-white rounded-2xl rounded-bl-md px-4 py-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">Thinking</span>
                          <div className="flex space-x-1">
                            <div
                              className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:0ms]"
                              style={{ backgroundColor: colors.thinkingDots }}
                            ></div>
                            <div
                              className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:150ms]"
                              style={{ backgroundColor: colors.thinkingDots }}
                            ></div>
                            <div
                              className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:300ms]"
                              style={{ backgroundColor: colors.thinkingDots }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-black/10">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={quotaExceeded ? "Message limit reached..." : "Type your message..."}
                    disabled={isLoading || quotaExceeded}
                    className="flex-1 px-4 py-2 bg-white/90 border-0 rounded-full text-sm focus:outline-none focus:bg-white disabled:opacity-50 placeholder-gray-500"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading || quotaExceeded}
                    className="w-10 h-10 rounded-full text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 flex items-center justify-center"
                    style={{ backgroundColor: colors.sendButton }}
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>

                {error && (
                  <p className="text-white/70 text-xs mt-2">{error}</p>
                )}
                {quotaExceeded && (
                  <p className="text-white/70 text-xs mt-2">Message limit reached. Contact support for more messages.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}