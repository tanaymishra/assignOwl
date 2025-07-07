'use client'

import React from 'react'
import useChatStore, { Message, Artifact } from './store/chatStore'
import { EmptyState, ChatMessages, ChatInput } from './sections'
import styles from './page.module.scss'

import { handleSubmit } from './functions/chatFuctions'


export default function ChatPage() {
  const {
    messages,

  } = useChatStore()


  return (
    <div className={styles.container}>
      {messages.length === 0 ? (
        <EmptyState onSubmit={handleSubmit} />
      ) : (
        <div className={styles.chatContainer}>
          <ChatMessages />
          <div className={styles.chatInputContainer}>
            <ChatInput
              onSubmit={handleSubmit}
              placeholder="Continue the conversation..."
              className={styles.fixedInput}
            />
          </div>
        </div>
      )}
    </div>
  )
}
