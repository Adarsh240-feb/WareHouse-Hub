'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { conversations } from '@/data/warehouseData'

export default function ChatBox({ warehouse, user, onClose }) {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef(null)

  // Load existing conversation or create new
  useEffect(() => {
    const existingChat = conversations.find(conv => 
      conv.warehouseId === warehouse.id && 
      (conv.merchantId === user.id || conv.ownerId === user.id)
    )
    
    if (existingChat) {
      setMessages(existingChat.messages)
    } else {
      // Start new conversation
      setMessages([{
        id: 'INTRO',
        senderId: 'SYSTEM',
        senderType: 'system',
        message: `You're now connected with ${user.userType === 'merchant' ? warehouse.ownerName : user.name}. Start your conversation about ${warehouse.name}.`,
        timestamp: new Date().toISOString(),
        read: true
      }])
    }
  }, [warehouse.id, user.id])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      id: `MSG${Date.now()}`,
      senderId: user.id,
      senderType: user.userType,
      message: newMessage,
      timestamp: new Date().toISOString(),
      read: false
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col shadow-2xl"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Chat Header */}
        <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-primary-50 to-orange-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={warehouse.images[0]}
                  alt={warehouse.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{warehouse.name}</h3>
                <p className="text-sm text-slate-600">
                  {user.userType === 'merchant' ? warehouse.ownerName : 'Merchant Inquiry'}
                </p>
                <p className="text-xs text-slate-500">
                  📍 {warehouse.location.city} • ₹{warehouse.pricing.amount.toLocaleString()}/month
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                className="p-2 hover:bg-white rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </motion.button>
              <motion.button
                onClick={onClose}
                className="p-2 hover:bg-white rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
          <AnimatePresence>
            {messages.map((msg) => {
              const isOwn = msg.senderId === user.id
              const isSystem = msg.senderType === 'system'

              if (isSystem) {
                return (
                  <motion.div
                    key={msg.id}
                    className="flex justify-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {msg.message}
                    </div>
                  </motion.div>
                )
              }

              return (
                <motion.div
                  key={msg.id}
                  className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, x: isOwn ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`max-w-[70%] ${isOwn ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    <div className={`px-4 py-3 rounded-2xl ${
                      isOwn 
                        ? 'bg-gradient-to-r from-primary-600 to-orange-500 text-white' 
                        : 'bg-white text-slate-900 border border-slate-200'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.message}</p>
                    </div>
                    <span className="text-xs text-slate-400 px-2">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {isOwn && msg.read && ' • Read'}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Warehouse Info Sidebar (collapsed) */}
        <div className="border-t border-slate-200 bg-white p-4">
          <div className="flex items-center gap-4 overflow-x-auto">
            <div className="flex-shrink-0 px-4 py-2 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-600">Area</p>
              <p className="text-sm font-semibold text-slate-900">
                {warehouse.size.area} {warehouse.size.unit}
              </p>
            </div>
            <div className="flex-shrink-0 px-4 py-2 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-600">Monthly Rent</p>
              <p className="text-sm font-semibold text-primary-600">
                ₹{warehouse.pricing.amount.toLocaleString()}
              </p>
            </div>
            <div className="flex-shrink-0 px-4 py-2 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-600">Category</p>
              <p className="text-sm font-semibold text-slate-900">{warehouse.category}</p>
            </div>
            <motion.button
              className="flex-shrink-0 px-4 py-2 bg-primary-50 text-primary-700 rounded-lg font-medium text-sm hover:bg-primary-100"
              whileHover={{ scale: 1.05 }}
            >
              View Full Details
            </motion.button>
          </div>
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 bg-white">
          <div className="flex items-end gap-3">
            <motion.button
              type="button"
              className="p-3 text-slate-400 hover:text-slate-600 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </motion.button>
            
            <div className="flex-1">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                rows="2"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage(e)
                  }
                }}
              />
            </div>

            <motion.button
              type="submit"
              className="p-3 bg-gradient-to-r from-primary-600 to-orange-500 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!newMessage.trim()}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </motion.button>
          </div>
          <p className="text-xs text-slate-500 mt-2 px-3">
            Press Enter to send • Shift+Enter for new line
          </p>
        </form>
      </motion.div>
    </motion.div>
  )
}
