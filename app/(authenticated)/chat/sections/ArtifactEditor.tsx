'use client'

import React, { useState, useEffect } from 'react'
import { X, Download, Save } from 'lucide-react'
import { Artifact } from '../store/chatStore'
import styles from './ArtifactEditor.module.scss'

interface ArtifactEditorProps {
  artifact: Artifact
  onClose: () => void
  onSave: (content: string) => void
  onDownload: () => void
}

const ArtifactEditor: React.FC<ArtifactEditorProps> = ({ 
  artifact, 
  onClose, 
  onSave, 
  onDownload 
}) => {
  const [content, setContent] = useState(artifact.content)
  const [isEditing, setIsEditing] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [TinyMCEEditor, setTinyMCEEditor] = useState<any>(null)

  useEffect(() => {
    setIsClient(true)
    // Dynamically import TinyMCE only on client side
    import('@tinymce/tinymce-react').then((module) => {
      setTinyMCEEditor(() => module.Editor)
    })
  }, [])

  const handleSave = () => {
    onSave(content)
    setIsEditing(false)
  }

  const handleEditorChange = (newContent: string) => {
    setContent(newContent)
  }

  return (
    <div className={styles.editorOverlay}>
      <div className={styles.editorModal}>
        <div className={styles.editorHeader}>
          <div className={styles.editorTitle}>
            <h3>{artifact.title}</h3>
            <span className={styles.editorType}>
              {artifact.type.charAt(0).toUpperCase() + artifact.type.slice(1)}
            </span>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {isEditing && isClient && TinyMCEEditor && (
          <div className={styles.editorContent}>
            <TinyMCEEditor
              value={content}
              onEditorChange={handleEditorChange}
              init={{
                height: 400,
                menubar: false,
                plugins: [
                  'lists', 'link', 'image', 'charmap', 'preview',
                  'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style: `
                  body { 
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; 
                    font-size: 14px;
                    background-color: var(--color-background-primary);
                    color: var(--color-text-primary);
                  }
                `,
                skin: 'oxide',
                content_css: false,
                branding: false,
                resize: false,
                statusbar: false
              }}
              className={styles.tinyMCEEditor}
            />
          </div>
        )}

        {isEditing && isClient && !TinyMCEEditor && (
          <div className={styles.editorContent}>
            <div className={styles.editorPlaceholder}>Loading editor...</div>
          </div>
        )}

        {!isEditing && (
          <div className={styles.editorContent}>
            <div 
              className={styles.previewContent}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        )}

        <div className={styles.editorActions}>
          {isEditing ? (
            <>
              <button 
                className={`${styles.actionButton} ${styles.saveButton}`}
                onClick={handleSave}
              >
                <Save size={16} />
                Save Changes
              </button>
              <button 
                className={styles.actionButton}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button 
                className={styles.actionButton}
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button 
                className={`${styles.actionButton} ${styles.downloadButton}`}
                onClick={onDownload}
              >
                <Download size={16} />
                Download
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ArtifactEditor
