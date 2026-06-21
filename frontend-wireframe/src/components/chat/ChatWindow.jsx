import { useState } from 'react'
import { X, Send, Plus, Minimize2 } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'

export default function ChatWindow() {
  const { showChat, setShowChat } = useAppContext()
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hello! How can I help you today?', time: 'now' }
  ])
  const [inputValue, setInputValue] = useState('')
  const [connectedToHuman, setConnectedToHuman] = useState(false)
  const [minimized, setMinimized] = useState(false)

  const quickOptions = [
    'Booking Information',
    'Track My Service',
    'Pricing & Plans',
    'Complaint/Feedback',
    'Connect to Human Agent'
  ]

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, sender: 'user', text: inputValue, time: 'now' }
      ])
      setInputValue('')

      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { id: prev.length + 1, sender: 'ai', text: 'Thank you for your message. How else can I assist?', time: 'now' }
        ])
      }, 800)
    }
  }

  const handleQuickOption = (option) => {
    if (option === 'Connect to Human Agent') {
      setMessages([
        ...messages,
        { id: messages.length + 1, sender: 'user', text: option, time: 'now' }
      ])
      setTimeout(() => {
        setConnectedToHuman(true)
        setMessages(prev => [
          ...prev,
          { id: prev.length + 1, sender: 'system', text: 'Connecting you to a human agent... Please wait.', time: 'now' }
        ])
      }, 500)
    } else {
      setMessages([
        ...messages,
        { id: messages.length + 1, sender: 'user', text: option, time: 'now' }
      ])
    }
  }

  if (!showChat) return null

  if (minimized) {
    return (
      <div
        onClick={() => setMinimized(false)}
        className="fixed bottom-4 right-4 bg-secondary text-white p-3 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors shadow-lg animate-slideInRight"
      >
        <span className="text-sm font-medium">Chat Support</span>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-2xl border border-neutral-light animate-slideInRight flex flex-col max-h-96">
      {/* Header */}
      <div className="bg-secondary text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <div>
            <h3 className="font-bold">Support Chat</h3>
            <p className="text-xs text-blue-100">
              {connectedToHuman ? 'Agent: Priya' : 'Powered by AI'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMinimized(true)}
            className="p-1 hover:bg-blue-600 rounded transition-colors"
          >
            <Minimize2 size={16} />
          </button>
          <button
            onClick={() => setShowChat(false)}
            className="p-1 hover:bg-blue-600 rounded transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-secondary text-white rounded-br-none'
                  : msg.sender === 'system'
                  ? 'bg-yellow-100 text-yellow-800 text-sm'
                  : 'bg-neutral-light text-text rounded-bl-none'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Options */}
      {messages.length === 1 && !connectedToHuman && (
        <div className="px-4 py-2 border-t border-neutral-light space-y-2 max-h-24 overflow-y-auto">
          {quickOptions.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickOption(option)}
              className="w-full text-left text-xs px-3 py-2 bg-neutral rounded hover:bg-neutral-light transition-colors"
            >
              • {option}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="border-t border-neutral-light p-3 flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type message..."
          className="flex-1 px-3 py-2 border border-neutral-light rounded focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
        />
        <button
          onClick={handleSendMessage}
          className="p-2 bg-secondary text-white rounded hover:bg-blue-600 transition-colors"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  )
}
