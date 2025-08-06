'use client'

import React from 'react'
import { FileText, Download, Edit3 } from 'lucide-react'
import { Artifact } from '../../../store/chatStore'
import styles from './ArtifactCard.module.scss'

interface ArtifactCardProps {
  artifact: any
  onEdit: (artifact: Artifact) => void
  onDownload: (artifact: Artifact) => void
}

const ArtifactCard: React.FC<ArtifactCardProps> = ({ artifact, onEdit, onDownload }) => {
  if (artifact.isGenerating) {
    return (
      <div className={styles.artifactCard}>
        <div className={styles.artifactHeader}>
          <div className={styles.artifactIcon}>
            <FileText size={20} />
          </div>
          <div className={styles.artifactInfo}>
            <div className={styles.artifactTitle}>Building your assignment...</div>
            <div className={styles.artifactType}>Document</div>
          </div>
        </div>
        <div className={styles.skeletonLoader}>
          <div className={styles.skeletonLine}></div>
          <div className={styles.skeletonLine}></div>
          <div className={styles.skeletonLine} style={{ width: '60%' }}></div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.artifactCard}>
      <div className={styles.artifactHeader}>
        <div className={styles.artifactIcon}>
          <FileText size={20} />
        </div>
        <div className={styles.artifactInfo}>
          <div className={styles.artifactTitle}>{artifact.title}</div>
          <div className={styles.artifactType}>
            {artifact.type.charAt(0).toUpperCase() + artifact.type.slice(1)}
          </div>
        </div>
      </div>

      <div className={styles.artifactPreview}>
        <p className={styles.previewText}>
          {artifact.content.substring(0, 120)}...
        </p>
      </div>

      <div className={styles.artifactActions}>
        <button
          className={styles.actionButton}
          onClick={() => onEdit(artifact)}
        >
          <Edit3 size={16} />
          Edit
        </button>
        <button
          className={styles.actionButton}
          onClick={() => onDownload(artifact)}
        >
          <Download size={16} />
          Download
        </button>
      </div>
    </div>
  )
}

export default ArtifactCard
