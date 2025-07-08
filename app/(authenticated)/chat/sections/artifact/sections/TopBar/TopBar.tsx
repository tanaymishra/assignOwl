'use client'

import React from 'react'
import { X, Download, Save } from 'lucide-react'
import { Artifact } from '../../../../store/chatStore'
import styles from './TopBar.module.scss'

interface TopBarProps {
  artifact: Artifact
  onSave: () => void
  onDownload: () => void
  onClose: () => void
}

const TopBar: React.FC<TopBarProps> = ({ 
  artifact, 
  onSave, 
  onDownload, 
  onClose 
}) => {
  return (
    <div className={styles.topBar}>
      <div className={styles.editorTitleBar}>
        <div className={styles.editorTitle}>
          <h3>{artifact.title}</h3>
          <span className={styles.editorType}>
            {artifact.type.charAt(0).toUpperCase() + artifact.type.slice(1)}
          </span>
        </div>
        <div className={styles.topBarActions}>
          <button 
            className={`${styles.topBarButton} ${styles.saveButton}`}
            onClick={onSave}
          >
            <Save size={16} />
            Save
          </button>
          <button 
            className={`${styles.topBarButton} ${styles.downloadButton}`}
            onClick={onDownload}
          >
            <Download size={16} />
            Download
          </button>
          <button 
            className={styles.topBarButton}
            onClick={onClose}
          >
            <X size={16} />
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default TopBar
