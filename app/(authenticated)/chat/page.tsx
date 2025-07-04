'use client'

import React, { useState, useRef } from 'react'
import { Send, Image as ImageIcon, Paperclip, Loader2 } from 'lucide-react'
import styles from './page.module.scss'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  attachments?: string[]
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!inputValue.trim() && attachedFiles.length === 0) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
      attachments: attachedFiles.map(f => f.name)
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setAttachedFiles([])
    setIsLoading(true)

    // Simulate AI response with static data
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I understand you need help with your assignment. Based on what you've shared, here are some suggestions:\n\n1. **Start with an outline** - Break down your assignment into smaller, manageable sections.\n\n2. **Research thoroughly** - Use credible academic sources to support your arguments.\n\n3. **Create a timeline** - Set deadlines for each section to avoid last-minute stress.\n\n4. **Review requirements** - Make sure you understand all the assignment criteria.\n\nWould you like me to help you with any specific aspect of your assignment?",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 2000)
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setAttachedFiles(prev => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
    }
  }

  return (
    <div className={styles.container}>
      {messages.length === 0 ? (
        // Empty state - input in center
        <div className={styles.emptyState}>
          <div className={styles.welcomeSection}>
            <h1 className={styles.welcomeTitle}>How can I help with your assignment?</h1>
            <p className={styles.welcomeSubtitle}>
              Upload your assignment files, ask questions, or describe what you need help with.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className={styles.inputForm}>
            {attachedFiles.length > 0 && (
              <div className={styles.attachments}>
                {attachedFiles.map((file, index) => (
                  <div key={index} className={styles.attachment}>
                    <span className={styles.fileName}>{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className={styles.removeFile}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className={styles.inputContainer}>
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value)
                  adjustTextareaHeight()
                }}
                onKeyDown={handleKeyDown}
                placeholder="Describe your assignment or ask a question..."
                className={styles.textarea}
                disabled={isLoading}
              />
              
              <div className={styles.inputActions}>
                <button
                  type="button"
                  onClick={handleFileUpload}
                  className={styles.actionButton}
                  disabled={isLoading}
                >
                  <Paperclip size={20} />
                </button>
                
                <button
                  type="submit"
                  disabled={(!inputValue.trim() && attachedFiles.length === 0) || isLoading}
                  className={styles.sendButton}
                >
                  {isLoading ? <Loader2 size={20} className={styles.spinning} /> : <Send size={20} />}
                </button>
              </div>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.pdf,.doc,.docx,.txt"
              onChange={handleFileChange}
              className={styles.hiddenInput}
            />
          </form>
        </div>
      ) : (
        // Chat with messages
        <div className={styles.chatContainer}>
          <div className={styles.messagesArea}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.message} ${message.type === 'user' ? styles.userMessage : styles.assistantMessage}`}
              >
                <div className={styles.messageContent}>
                  {message.attachments && message.attachments.length > 0 && (
                    <div className={styles.messageAttachments}>
                      {message.attachments.map((attachment, index) => (
                        <span key={index} className={styles.messageAttachment}>
                          📎 {attachment}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className={styles.messageText}>{message.content}</p>
                </div>
                <div className={styles.messageTime}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className={`${styles.message} ${styles.assistantMessage} ${styles.loadingMessage}`}>
                <div className={styles.messageContent}>
                  <div className={styles.loadingDots}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Fixed input at bottom */}
          <form onSubmit={handleSubmit} className={styles.fixedInputForm}>
            {attachedFiles.length > 0 && (
              <div className={styles.attachments}>
                {attachedFiles.map((file, index) => (
                  <div key={index} className={styles.attachment}>
                    <span className={styles.fileName}>{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className={styles.removeFile}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className={styles.inputContainer}>
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value)
                  adjustTextareaHeight()
                }}
                onKeyDown={handleKeyDown}
                placeholder="Continue the conversation..."
                className={styles.textarea}
                disabled={isLoading}
              />
              
              <div className={styles.inputActions}>
                <button
                  type="button"
                  onClick={handleFileUpload}
                  className={styles.actionButton}
                  disabled={isLoading}
                >
                  <Paperclip size={20} />
                </button>
                
                <button
                  type="submit"
                  disabled={(!inputValue.trim() && attachedFiles.length === 0) || isLoading}
                  className={styles.sendButton}
                >
                  {isLoading ? <Loader2 size={20} className={styles.spinning} /> : <Send size={20} />}
                </button>
              </div>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.pdf,.doc,.docx,.txt"
              onChange={handleFileChange}
              className={styles.hiddenInput}
            />
          </form>
        </div>
      )}
    </div>
  )
}
