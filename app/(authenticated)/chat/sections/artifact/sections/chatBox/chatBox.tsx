'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, MessageSquare, Bot, User } from 'lucide-react'
import { Artifact } from '../../../../store/chatStore'
import styles from './chatBox.module.scss'

interface ChatMessage {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatBoxProps {
  artifact: Artifact
  onDocumentUpdate?: (content: string) => void
}

const ChatBox: React.FC<ChatBoxProps> = ({ artifact, onDocumentUpdate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      type: 'assistant',
      content: `I'm here to help you with your document: "${artifact.title}". You can ask me to make changes, add content, or improve the document in any way.`,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I understand you want to: "${userMessage.content}". I'll help you update the document accordingly. Let me make those changes for you.`,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)

      // Simulate document update
      if (onDocumentUpdate) {
        // This is where you would integrate with your AI service
        // For now, just add a note to the document
        const updatedContent = artifact.content + `\n\n<p><em>Update requested: ${userMessage.content}</em></p>`
        onDocumentUpdate(updatedContent)
      }
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className={styles.chatBox}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <MessageSquare size={20} />
        </div>
        <div className={styles.headerTitle}>
          <h3>Document Chat</h3>
          <p>Chat about: {artifact.title}</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className={styles.messagesArea}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${
              message.type === 'user' ? styles.userMessage : styles.assistantMessage
            }`}
          >
            <div className={styles.messageIcon}>
              {message.type === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={styles.messageContent}>
              <p>{message.content}</p>
              <span className={styles.messageTime}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className={`${styles.message} ${styles.assistantMessage} ${styles.loadingMessage}`}>
            <div className={styles.messageIcon}>
              <Bot size={16} />
            </div>
            <div className={styles.messageContent}>
              <div className={styles.typingIndicator}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={styles.inputArea}>
        <div className={styles.inputContainer}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me to modify the document..."
            className={styles.input}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className={styles.sendButton}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatBox
