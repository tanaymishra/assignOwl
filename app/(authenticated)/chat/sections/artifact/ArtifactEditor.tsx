'use client'

import React, { useState, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Artifact } from '../../store/chatStore'
import styles from './ArtifactEditor.module.scss'
import {
  cleanHtml,
  createAnimationHandlers,
  createEditorHandlers,
  type EditorAnimationState
} from './functions'
import { 
  TopBar, 
  Toolbar, 
  DocumentEditor, 
  FloatingChangesPanel 
} from './sections'

interface ArtifactEditorProps {
  artifact: Artifact
  onClose: () => void
  onSave: (content: string) => void
  onDownload: () => void
  onRequestChanges?: (changes: string) => void
}

const ArtifactEditor: React.FC<ArtifactEditorProps> = ({ 
  artifact, 
  onClose, 
  onSave, 
  onDownload,
  onRequestChanges
}) => {
  const [content, setContent] = useState(artifact.content)
  const [animationState, setAnimationState] = useState<EditorAnimationState>({
    isEditing: true,
    showEditor: false,
    isClosing: false
  })
  const editorRef = useRef<HTMLDivElement>(null)
  const fullscreenRef = useRef<HTMLDivElement>(null)

  // Animation handlers
  const { handleClose, initializeEditor } = createAnimationHandlers(setAnimationState, onClose)
  
  // Editor handlers
  const { handleSave, handleInput } = createEditorHandlers(
    editorRef,
    (cleanContent) => {
      setContent(cleanContent)
      onSave(cleanContent)
    },
    cleanHtml,
    handleClose
  )

  // Initialize editor with animation
  useEffect(() => {
    const cleanup = initializeEditor()
    return cleanup
  }, [])

  // Destructure animation state for easier access
  const { showEditor, isClosing } = animationState

  // Handle changes request
  const handleRequestChanges = (changes: string) => {
    if (onRequestChanges) {
      onRequestChanges(changes)
    }
  }

  return (
    <>
      {/* Full Screen Editor Mode */}
      <CSSTransition
        in={showEditor && !isClosing}
        timeout={300}
        classNames={{
          enter: styles.editorEnter,
          enterActive: styles.editorEnterActive,
          exit: styles.editorExit,
          exitActive: styles.editorExitActive
        }}
        unmountOnExit
        nodeRef={fullscreenRef}
      >
        <div 
          ref={fullscreenRef}
          className={styles.fullscreenEditor}
        >
          <div className={styles.editorContainer}>
            {/* Top Bar with Title and Actions */}
            <TopBar
              artifact={artifact}
              onSave={handleSave}
              onDownload={onDownload}
              onClose={handleClose}
            />

            {/* Toolbar with Formatting Options */}
            <Toolbar editorRef={editorRef} />

            {/* Document Editor Area */}
            <DocumentEditor
              content={content}
              editorRef={editorRef}
              onInput={handleInput}
              onSave={handleSave}
            />

            {/* Floating Changes Panel */}
            {onRequestChanges && (
              <FloatingChangesPanel onRequestChanges={handleRequestChanges} />
            )}
          </div>
        </div>
      </CSSTransition>
    </>
  )
}

export default ArtifactEditor
