'use client'

import React, { useState, useEffect } from 'react'
import useChatStore, { Message, Artifact } from '../store/chatStore'
import ArtifactCard from './artifact/ArtifactCard'
import ArtifactEditor from './artifact/ArtifactEditor'
import styles from './ChatMessages.module.scss'

const ChatMessages: React.FC = () => {
  const { messages, isLoading, updateArtifactContent } = useChatStore()
  const [editingArtifact, setEditingArtifact] = useState<{ messageId: string; artifact: Artifact } | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleEditArtifact = (messageId: string, artifact: Artifact) => {
    setEditingArtifact({ messageId, artifact })
  }

  const handleDownloadArtifact = (artifact: Artifact) => {
    // Simple HTML download
    const blob = new Blob([artifact.content], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    
    // Create a temporary link and trigger download
    const link = document.createElement('a')
    link.href = url
    link.download = `${artifact.title}.html`
    document.body.appendChild(link)
    link.click()
    
    // Cleanup
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleSaveArtifact = (content: string) => {
    if (editingArtifact) {
      updateArtifactContent(editingArtifact.messageId, editingArtifact.artifact.id, content)
      setEditingArtifact(null)
    }
  }

  return (
    <>
      <div className={`${styles.messagesArea} chat-scrollbar`}>
        <div className={styles.innerContainer}>
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
                
                {message.artifact && (
                  <div className={styles.artifactContainer}>
                    <ArtifactCard
                      artifact={message.artifact}
                      onEdit={(artifact) => handleEditArtifact(message.id, artifact)}
                      onDownload={handleDownloadArtifact}
                    />
                  </div>
                )}
              </div>
              <div className={styles.messageTime}>
                {isClient && message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
        {isLoading && (
          <div className={`${styles.message} ${styles.assistantMessage} ${styles.loadingMessage}`}>
            <div className={styles.messageContent}>
              <div className={styles.typewriterText}>
                <span className={styles.typingWord}>Analyzing</span>
                <span className={styles.typingWord}>your</span>
                <span className={styles.typingWord}>assignment...</span>
                <span className={styles.typingCursor}>|</span>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
      
      {editingArtifact && (
        <ArtifactEditor
          artifact={editingArtifact.artifact}
          onClose={() => setEditingArtifact(null)}
          onSave={handleSaveArtifact}
          onDownload={() => handleDownloadArtifact(editingArtifact.artifact)}
        />
      )}
    </>
  )
}

export default ChatMessages
