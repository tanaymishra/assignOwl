'use client'

import React from 'react'
import ChatInput from './ChatInput'
import styles from './EmptyState.module.scss'

interface EmptyStateProps {
  onSubmit: () => void
}

const EmptyState: React.FC<EmptyStateProps> = ({ onSubmit }) => {
  return (
    <div className={styles.emptyState}>
      <div className={styles.welcomeSection}>
        <h1 className={styles.welcomeTitle}>How can I help with your assignment?</h1>
        <p className={styles.welcomeSubtitle}>
          Upload your assignment files, ask questions, or describe what you need help with.
        </p>
      </div>
      
      <ChatInput 
        onSubmit={onSubmit}
        placeholder="Describe your assignment or ask a question..."
        className={styles.centeredInput}
      />
    </div>
  )
}

export default EmptyState
