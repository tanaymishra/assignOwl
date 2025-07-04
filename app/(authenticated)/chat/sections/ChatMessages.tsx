'use client'

import React from 'react'
import useChatStore, { Message } from '../store/chatStore'
import styles from './ChatMessages.module.scss'

const ChatMessages: React.FC = () => {
  const { messages, isLoading } = useChatStore()

  return (
    <div className={`${styles.messagesArea} chat-scrollbar`}>
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
  )
}

export default ChatMessages
