import { useState, useEffect, useRef } from 'react'
import { Mic, MicOff, X, Send, ShoppingCart, Package, Clock, MapPin } from 'lucide-react'
import theme from '../theme'

const quickActions = [
  { label: 'Order groceries', icon: ShoppingCart, prompt: "I'd like to order groceries from Instacart for Dad" },
  { label: 'Refill prescription', icon: Package, prompt: "I need to refill Dad's Lisinopril prescription at CVS" },
  { label: 'Schedule a ride', icon: MapPin, prompt: "I need a ride to Dr. Smith's office tomorrow at 2pm" },
  { label: 'Reorder essentials', icon: Clock, prompt: "Reorder Dad's weekly essentials list" },
]

const conversationFlow = {
  greeting: {
    assistant: "Hi! I'm Dwel's voice assistant. What would you like to order for Robert today?",
    delay: 600,
  },
  responses: [
    {
      keywords: ['grocery', 'groceries', 'instacart', 'food', 'produce'],
      reply: "I can help with that! I see Robert's usual grocery list has 15 items. Would you like me to reorder that, or would you prefer to customize it?",
      followUp: "I've started a grocery order through Instacart. The estimated delivery is 2 hours. I've added the heart-healthy options Robert prefers. Shall I add anything else?",
    },
    {
      keywords: ['prescription', 'medication', 'medicine', 'refill', 'cvs', 'pharmacy'],
      reply: "I can see Robert's Lisinopril prescription is due for a refill. Would you like me to submit the refill through CVS? Same-day delivery is available.",
      followUp: "Done! I've submitted the prescription refill to CVS. Estimated delivery is today by 5pm. I'll notify you when it's on the way.",
    },
    {
      keywords: ['ride', 'uber', 'transport', 'drive', 'appointment', 'doctor'],
      reply: "I can arrange transportation for Robert. Where does he need to go, and what time?",
      followUp: "I've scheduled an Uber pickup for Robert at 1:30pm tomorrow to Dr. Smith's office at 456 Medical Center Dr. I'll send a reminder in the morning and notify you when the ride starts.",
    },
    {
      keywords: ['reorder', 'essentials', 'usual', 'again', 'weekly'],
      reply: "Robert's Weekly Essentials list has 15 items through Instacart, last ordered 3 days ago. Total was $67.84. Want me to place the same order?",
      followUp: "Order placed! Instacart will deliver Robert's essentials within 2 hours to 123 Oak Street. I'll send you a notification when it arrives.",
    },
    {
      keywords: ['order', 'buy', 'get', 'need', 'want', 'shopping'],
      reply: "What would you like to order? I can help with groceries from Instacart, supplies from Amazon, medications from CVS, or arrange rides through Uber.",
      followUp: null,
    },
  ],
  fallback: "I can help you order groceries, medications, supplies, or arrange transportation for Robert. What would you like to do?",
}

export default function VoiceAssistant({ isOpen, onClose, initialPrompt }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setMessages([])
      setInput('')
      // Show greeting
      setTimeout(() => {
        setMessages([{ role: 'assistant', text: conversationFlow.greeting.assistant }])
        if (initialPrompt) {
          setTimeout(() => handleSend(initialPrompt), 1000)
        }
      }, conversationFlow.greeting.delay)
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function findResponse(text) {
    const lower = text.toLowerCase()
    for (const r of conversationFlow.responses) {
      if (r.keywords.some(kw => lower.includes(kw))) return r
    }
    return null
  }

  function handleSend(text) {
    const msgText = text || input
    if (!msgText.trim()) return

    const userMsg = { role: 'user', text: msgText.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    const match = findResponse(msgText)
    setTimeout(() => {
      setIsTyping(false)
      const reply = match ? match.reply : conversationFlow.fallback
      setMessages(prev => [...prev, { role: 'assistant', text: reply }])

      // If there's a follow-up, simulate it
      if (match?.followUp) {
        setTimeout(() => {
          setIsTyping(true)
          setTimeout(() => {
            setIsTyping(false)
            setMessages(prev => [...prev, { role: 'assistant', text: match.followUp }])
          }, 2000)
        }, 3000)
      }
    }, 1200)
  }

  function toggleListening() {
    setIsListening(!isListening)
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setInput("I'd like to order groceries for Dad")
        setIsListening(false)
      }, 2000)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-dwel-teal px-5 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Mic size={20} className="text-white" />
            </div>
            <div>
              <div className="font-semibold text-white text-sm">Dwel Voice Assistant</div>
              <div className="text-white/70 text-xs">Ordering for Robert Chen</div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X size={18} className="text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 min-h-[300px]">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-dwel-teal text-white rounded-br-md'
                  : 'bg-gray-100 text-gray-800 rounded-bl-md'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          {/* Quick Actions — show only at start */}
          {messages.length === 1 && !isTyping && (
            <div className="space-y-2">
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Quick actions</div>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, i) => {
                  const Icon = action.icon
                  return (
                    <button
                      key={i}
                      onClick={() => handleSend(action.prompt)}
                      className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 hover:border-dwel-teal hover:bg-dwel-teal-light transition-all text-left"
                    >
                      <Icon size={16} className="text-dwel-teal shrink-0" />
                      {action.label}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleListening}
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-gray-100 text-gray-500 hover:bg-dwel-teal-light hover:text-dwel-teal'
              }`}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder={isListening ? 'Listening...' : 'Type or speak your request...'}
              className="flex-1 px-4 py-2.5 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-dwel-teal focus:bg-white transition-all"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="w-10 h-10 rounded-full bg-dwel-teal text-white flex items-center justify-center shrink-0 hover:bg-dwel-teal-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          </div>
          {isListening && (
            <div className="text-center text-xs text-red-500 mt-2 animate-pulse">
              🎤 Listening — speak your request...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
