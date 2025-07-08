'use client'

import React, { useState } from 'react'
import styles from './FloatingChangesPanel.module.scss'

interface FloatingChangesPanelProps {
  onRequestChanges: (changes: string) => void
}

const FloatingChangesPanel: React.FC<FloatingChangesPanelProps> = ({ 
  onRequestChanges 
}) => {
  const [changesRequest, setChangesRequest] = useState('')

  const handleSubmit = () => {
    if (changesRequest.trim()) {
      onRequestChanges(changesRequest.trim())
      setChangesRequest('') // Clear the input after submitting
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className={styles.floatingChangesPanel}>
      <div className={styles.floatingPanelContent}>
        <div className={styles.floatingPanelHeader}>
          <span className={styles.floatingPanelTitle}>💬 Request Changes</span>
        </div>
        <div className={styles.floatingInputWrapper}>
          <textarea
            className={styles.floatingChangesInput}
            placeholder="Describe the changes you'd like to make..."
            value={changesRequest}
            onChange={(e) => setChangesRequest(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
          />
          <button
            className={styles.floatingSubmitButton}
            onClick={handleSubmit}
            disabled={!changesRequest.trim()}
            title="Submit change request (Ctrl+Enter)"
          >
            ✨ Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default FloatingChangesPanel
