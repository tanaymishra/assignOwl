'use client'

import React from 'react'
import useChatStore, { Message } from './store/chatStore'
import { EmptyState, ChatMessages, ChatInput } from './sections'
import styles from './page.module.scss'

export default function ChatPage() {
  const { 
    messages, 
    inputValue, 
    attachedFiles,
    addMessage,
    clearInput,
    setIsLoading 
  } = useChatStore()

  const handleSubmit = async () => {
    if (!inputValue.trim() && attachedFiles.length === 0) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
      attachments: attachedFiles.map(f => f.name)
    }

    addMessage(userMessage)
    clearInput()
    setIsLoading(true)

    // Simulate AI response with static data
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I understand you need help with your assignment. Based on what you've shared, here are some suggestions:\n\n1. **Start with an outline** - Break down your assignment into smaller, manageable sections.\n\n2. **Research thoroughly** - Use credible academic sources to support your arguments.\n\n3. **Create a timeline** - Set deadlines for each section to avoid last-minute stress.\n\n4. **Review requirements** - Make sure you understand all the assignment criteria.\n\nWould you like me to help you with any specific aspect of your assignment?",
        timestamp: new Date()
      }
      addMessage(aiResponse)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className={styles.container}>
      {messages.length === 0 ? (
        <EmptyState onSubmit={handleSubmit} />
      ) : (
        <div className={styles.chatContainer}>
          <ChatMessages />
          <ChatInput 
            onSubmit={handleSubmit}
            placeholder="Continue the conversation..."
            className={styles.fixedInput}
          />
        </div>
      )}
    </div>
  )
}
