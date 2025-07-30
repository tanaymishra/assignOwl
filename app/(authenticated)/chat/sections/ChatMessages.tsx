'use client'

import React, { useState, useEffect } from 'react'
import useChatStore, { Message, Artifact } from '../store/chatStore'
import ArtifactCard from './artifact/ArtifactCard'
import ArtifactEditor from './artifact/ArtifactEditor'
import styles from './ChatMessages.module.scss'

const generateSampleAssignmentContent = () => {
  return `
    <h1>Assignment Structure Guide</h1>
    
    <h2>1. Understanding the Assignment</h2>
    <p>Before you begin writing, make sure you fully understand what is being asked of you:</p>
    <ul>
      <li>Read the assignment prompt multiple times</li>
      <li>Identify key requirements and criteria</li>
      <li>Note the word count and formatting requirements</li>
      <li>Check the due date and plan accordingly</li>
    </ul>
    
    <h2>2. Research and Planning</h2>
    <p>Effective research is the foundation of a strong assignment:</p>
    <ul>
      <li><strong>Primary Sources:</strong> Original documents, research papers, interviews</li>
      <li><strong>Secondary Sources:</strong> Academic books, journal articles, credible websites</li>
      <li><strong>Note-taking:</strong> Organize your research with proper citations</li>
    </ul>
    
    <h2>3. Creating an Outline</h2>
    <p>A well-structured outline will guide your writing process:</p>
    <ol>
      <li><strong>Introduction</strong> - Hook, background, thesis statement</li>
      <li><strong>Body Paragraphs</strong> - Main arguments with supporting evidence</li>
      <li><strong>Conclusion</strong> - Summary and final thoughts</li>
    </ol>
    
    <h2>4. Writing Tips</h2>
    <ul>
      <li>Start with a compelling introduction</li>
      <li>Use clear topic sentences for each paragraph</li>
      <li>Support your arguments with evidence</li>
      <li>Maintain academic tone and style</li>
      <li>Cite all sources properly</li>
    </ul>
    
    <h2>5. Review and Editing</h2>
    <p>Always leave time for revision:</p>
    <ul>
      <li>Check for clarity and coherence</li>
      <li>Verify all citations and references</li>
      <li>Proofread for grammar and spelling</li>
      <li>Ensure you've met all requirements</li>
    </ul>
    
    <p><em>Remember: Good assignments are not written, they are rewritten. Take time to refine your work!</em></p>
  `
}

const ChatMessages: React.FC = () => {
  // Don't use chat store - use local state for single response
  const [responseMessage, setResponseMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [artifact, setArtifact] = useState<Artifact | null>(null)
  const [editingArtifact, setEditingArtifact] = useState<Artifact | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [hasAutoTriggered, setHasAutoTriggered] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Auto-trigger the response sequence when component loads
  useEffect(() => {
    // Only trigger once
    if (!hasAutoTriggered) {
      setHasAutoTriggered(true)

      // Get assignment ID from URL params
      const urlParams = new URLSearchParams(window.location.search)
      const assignmentId = urlParams.get('id')

      if (assignmentId) {
        // Import socket store dynamically to avoid SSR issues
        import('@/app/socket/socketStore').then(({ useSocketStore }) => {
          const { socket, isConnected } = useSocketStore.getState()

          if (socket && isConnected) {
            // Show skeleton loading immediately while waiting for response
            setIsLoading(true)

            // Request assignment description from server - SINGLE CALL
            socket.emit('assignment:description', { assignment_id: parseInt(assignmentId) })

            // Handle response - SINGLE RESPONSE
            socket.once('assignment:description_response', (response) => {
              let messageContent = ''
              let artifactTitle = 'Assignment Document'
              let artifactContent = ''

              if (response.generated) {
                // Show only the description
                messageContent = response.assignment.description
                artifactTitle = response.assignment.title
                artifactContent = response.assignment.description
              } else {
                // Show only the server message for pending
                messageContent = response.message || "Your assignment is being generated..."
                artifactTitle = 'Assignment Document (Generating...)'
                artifactContent = 'Your assignment is being generated based on your requirements. Please wait...'
              }

              // Set single response message
              setResponseMessage(messageContent)

              // Turn off the initial loading state since we have the message
              setIsLoading(false)

              // Add assignment skeleton after message appears
              setTimeout(() => {
                const artifact: Artifact = {
                  id: `artifact-${Date.now()}`,
                  title: artifactTitle,
                  type: 'document',
                  content: artifactContent,
                  isGenerating: true // Keep as skeleton
                }

                // Set artifact with skeleton state (shows skeleton)
                setArtifact(artifact)
              }, 1000) // 1 second delay before assignment skeleton appears
            })
          } else {
            // Show skeleton loading if socket not available
            console.log('Socket not available, showing skeleton until connection')
            setIsLoading(true)
          }
        })
      }
    }
  }, [hasAutoTriggered])

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
    if (editingArtifact && artifact) {
      // Update local artifact state
      setArtifact({
        ...artifact,
        content: content
      })
      setEditingArtifact(null)
    }
  }

  // Using local state instead of chat store

  return (
    <>
      <div className={`${styles.messagesArea} chat-scrollbar`}>
        <div className={styles.innerContainer}>
          {/* Single Response Message - Not Chat */}
          {responseMessage && (
            <div className={`${styles.message} ${styles.assistantMessage}`}>
              <div className={styles.messageContent}>
                <p className={styles.messageText}>{responseMessage}</p>
                
                {/* Assignment Artifact - Inside Message Content */}
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

          {/* Initial Skeleton Loading */}
          {isLoading && (
            <div className={styles.skeletonContainer}>
              <div className={styles.skeletonCard}>
                <div className={styles.skeletonHeader}>
                  <div className={styles.skeletonTitle}></div>
                  <div className={styles.skeletonButtons}>
                    <div className={styles.skeletonButton}></div>
                    <div className={styles.skeletonButton}></div>
                  </div>
                </div>
                <div className={styles.skeletonContent}>
                  <div className={styles.skeletonLine}></div>
                  <div className={styles.skeletonLine}></div>
                  <div className={styles.skeletonLine}></div>
                  <div className={styles.skeletonLine}></div>
                  <div className={styles.skeletonLine}></div>
                  <div className={styles.skeletonLine}></div>
                  <div className={styles.skeletonLine}></div>
                  <div className={styles.skeletonLine}></div>
                </div>
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
