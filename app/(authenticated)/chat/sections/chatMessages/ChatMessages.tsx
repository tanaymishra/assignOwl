'use client'

import React, { useState, useEffect } from 'react'
import { Artifact } from '../../store/chatStore'
import ArtifactCard from '../artifact/ArtifactCard'
import ArtifactEditor from '../artifact/ArtifactEditor'
import styles from './ChatMessages.module.scss'
import { useMessagesStore } from './store/store'
import { fetchAssignmentDetails } from './functions/requestUpdateStatus,'
import { useSocketStore } from '@/app/socket'
const ChatMessages: React.FC = () => {
  const {value,update}=useMessagesStore()
  const [artifact, setArtifact] = useState<Artifact | null>(null)
  const [editingArtifact, setEditingArtifact] = useState<Artifact | null>(null)
  const [isClient, setIsClient] = useState(false)
  const {socket}=useSocketStore()

  useEffect(() => {
    setIsClient(true)
  }, [])
  useEffect(()=>{
    fetchAssignmentDetails()
  },[socket])

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
    if (editingArtifact && artifact) {
      // Update local artifact state
      setArtifact({
        ...artifact,
        content: content
      })
      setEditingArtifact(null)
    }
  }

  return (
    <>
      <div className={`${styles.messagesArea} chat-scrollbar`}>
        <div className={styles.innerContainer}>
          {value.description && (
            <div className={`${styles.message} ${styles.assistantMessage}`}>
              <div className={styles.messageContent}>
                <p className={styles.messageText}>{value.description}</p>
                
                {artifact && (
                  <div className={styles.artifactContainer}>
                    <ArtifactCard
                      artifact={artifact}
                      onEdit={(artifact) => setEditingArtifact(artifact)}
                      onDownload={handleDownloadArtifact}
                    />
                  </div>
                )}
              </div>
              <div className={styles.messageTime}>
                {isClient && new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          )}
        </div>
      </div>

      {editingArtifact && (
        <ArtifactEditor
          artifact={editingArtifact}
          onClose={() => setEditingArtifact(null)}
          onSave={handleSaveArtifact}
          onDownload={() => handleDownloadArtifact(editingArtifact)}
        />
      )}
    </>
  )
}

export default ChatMessages
