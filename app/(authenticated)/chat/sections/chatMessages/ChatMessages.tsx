'use client'

import React, { useState, useEffect } from 'react'
import { Artifact } from '../../store/chatStore'
import ArtifactCard from '../artifact/artifiactCard/ArtifactCard'
import ArtifactEditor from '../artifact/artificatEditor/ArtifactEditor'
import styles from './ChatMessages.module.scss'
import { useMessagesStore } from './store/store'
import { fetchAssignmentDetails } from './functions/requestUpdateStatus,'
import { useSocketStore } from '@/app/socket'
import { useSearchParams } from 'next/navigation'
const ChatMessages: React.FC = () => {
  const { value, update } = useMessagesStore()
  const [editingArtifact, setEditingArtifact] = useState<Artifact | null>(null)
  const [isClient, setIsClient] = useState(false)
  const { socket } = useSocketStore()
  const params = useSearchParams()



  useEffect(() => {
    setIsClient(true)
  }, [])
  useEffect(() => {
    const assignmentId = params.get("id")
    const unMount = fetchAssignmentDetails(assignmentId)
    return unMount;
  }, [socket])

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

  return (
    <>
      <div className={`${styles.messagesArea} chat-scrollbar`}>
        <div className={styles.innerContainer}>
          {!value.description ? (
            // Show loading skeleton when description is not available
            <div className={`${styles.message} ${styles.assistantMessage}`}>
              <div className={styles.messageContent}>
                <div className={styles.skeletonLoader}>
                  <div className={styles.skeletonLine}></div>
                  <div className={styles.skeletonLine}></div>
                  <div className={styles.skeletonLine} style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
          ) : (
            // Show description when available
            <div className={`${styles.message} ${styles.assistantMessage}`}>
              <div className={styles.messageContent}>
                <p className={styles.messageText}>{value.description}</p>

                {(value.has_generated_content || value.status === 'generating') && (
                  <div className={styles.artifactContainer}>
                    <ArtifactCard
                      artifact={
                        value.generated_content ? {
                          id: value.generated_content.generation_id.toString(),
                          title: value.title || 'Generated Assignment',
                          type: 'document' as const,
                          content: value.generated_content.content,
                          isGenerating: false
                        } : {
                          id: 'generating',
                          title: value.title || 'Assignment',
                          type: 'document' as const,
                          content: '',
                          isGenerating: true
                        }
                      }
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
          onClose={() => { }}
          onSave={() => { }}
          onDownload={() => handleDownloadArtifact(editingArtifact)}
        />
      )}
    </>
  )
}

export default ChatMessages
