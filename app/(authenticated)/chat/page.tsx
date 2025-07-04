import React from 'react'
import styles from './page.module.scss'

export default function ChatPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>AI Assignment Assistant</h1>
        <p className={styles.subtitle}>
          Get personalized help with your assignments using our advanced AI technology
        </p>
      </div>
      
      <div className={styles.content}>
        <div className={styles.placeholder}>
          <p>Chat interface will be built here...</p>
        </div>
      </div>
    </div>
  )
}
