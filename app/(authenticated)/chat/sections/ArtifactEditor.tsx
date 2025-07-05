'use client'

import React, { useState, useEffect, useRef } from 'react'
import { 
  X, Download, Save, Bold, Italic, Underline, 
  List, ListOrdered, AlignLeft, AlignCenter, AlignRight,
  Type, Heading1, Heading2, Code, Quote
} from 'lucide-react'
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
  const editorRef = useRef<HTMLDivElement>(null)

  const handleSave = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML)
      onSave(editorRef.current.innerHTML)
    }
    setIsEditing(false)
  }

  const executeCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
  }

  const insertHeading = (level: number) => {
    executeCommand('formatBlock', `h${level}`)
  }

  const isCommandActive = (command: string): boolean => {
    return document.queryCommandState(command)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault()
          executeCommand('bold')
          break
        case 'i':
          e.preventDefault()
          executeCommand('italic')
          break
        case 'u':
          e.preventDefault()
          executeCommand('underline')
          break
        case 's':
          e.preventDefault()
          handleSave()
          break
      }
    }
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

        {isEditing && (
          <div className={styles.editorContent}>
            <div className={styles.toolbar}>
              <div className={styles.toolbarGroup}>
                <button
                  className={`${styles.toolbarButton} ${isCommandActive('bold') ? styles.active : ''}`}
                  onClick={() => executeCommand('bold')}
                  title="Bold (Ctrl+B)"
                >
                  <Bold size={16} />
                </button>
                <button
                  className={`${styles.toolbarButton} ${isCommandActive('italic') ? styles.active : ''}`}
                  onClick={() => executeCommand('italic')}
                  title="Italic (Ctrl+I)"
                >
                  <Italic size={16} />
                </button>
                <button
                  className={`${styles.toolbarButton} ${isCommandActive('underline') ? styles.active : ''}`}
                  onClick={() => executeCommand('underline')}
                  title="Underline (Ctrl+U)"
                >
                  <Underline size={16} />
                </button>
              </div>

              <div className={styles.toolbarSeparator} />

              <div className={styles.toolbarGroup}>
                <button
                  className={styles.toolbarButton}
                  onClick={() => insertHeading(1)}
                  title="Heading 1"
                >
                  <Heading1 size={16} />
                </button>
                <button
                  className={styles.toolbarButton}
                  onClick={() => insertHeading(2)}
                  title="Heading 2"
                >
                  <Heading2 size={16} />
                </button>
                <button
                  className={styles.toolbarButton}
                  onClick={() => executeCommand('formatBlock', 'p')}
                  title="Paragraph"
                >
                  <Type size={16} />
                </button>
              </div>

              <div className={styles.toolbarSeparator} />

              <div className={styles.toolbarGroup}>
                <button
                  className={styles.toolbarButton}
                  onClick={() => executeCommand('justifyLeft')}
                  title="Align Left"
                >
                  <AlignLeft size={16} />
                </button>
                <button
                  className={styles.toolbarButton}
                  onClick={() => executeCommand('justifyCenter')}
                  title="Align Center"
                >
                  <AlignCenter size={16} />
                </button>
                <button
                  className={styles.toolbarButton}
                  onClick={() => executeCommand('justifyRight')}
                  title="Align Right"
                >
                  <AlignRight size={16} />
                </button>
              </div>

              <div className={styles.toolbarSeparator} />

              <div className={styles.toolbarGroup}>
                <button
                  className={styles.toolbarButton}
                  onClick={() => executeCommand('insertUnorderedList')}
                  title="Bullet List"
                >
                  <List size={16} />
                </button>
                <button
                  className={styles.toolbarButton}
                  onClick={() => executeCommand('insertOrderedList')}
                  title="Numbered List"
                >
                  <ListOrdered size={16} />
                </button>
              </div>

              <div className={styles.toolbarSeparator} />

              <div className={styles.toolbarGroup}>
                <button
                  className={styles.toolbarButton}
                  onClick={() => executeCommand('formatBlock', 'blockquote')}
                  title="Quote"
                >
                  <Quote size={16} />
                </button>
                <button
                  className={styles.toolbarButton}
                  onClick={() => executeCommand('formatBlock', 'pre')}
                  title="Code Block"
                >
                  <Code size={16} />
                </button>
              </div>
            </div>

            <div
              ref={editorRef}
              className={styles.richEditor}
              contentEditable
              dangerouslySetInnerHTML={{ __html: content }}
              onKeyDown={handleKeyDown}
              suppressContentEditableWarning={true}
            />
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
