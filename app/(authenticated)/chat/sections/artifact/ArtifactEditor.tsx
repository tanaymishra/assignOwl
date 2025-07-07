'use client'

import React, { useState, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { 
  X, Download, Save, Bold, Italic, Underline, 
  List, ListOrdered, AlignLeft, AlignCenter, AlignRight,
  Type, Heading1, Heading2, Code, Quote
} from 'lucide-react'
import { Artifact } from '../../store/chatStore'
import styles from './ArtifactEditor.module.scss'
import {
  cleanHtml,
  executeCommand,
  insertHeading,
  isCommandActive,
  handleKeyboardShortcuts,
  applyTextAlignment,
  insertList,
  formatBlock,
  createAnimationHandlers,
  createEditorHandlers,
  type EditorAnimationState
} from './functions'

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
  const [changesRequest, setChangesRequest] = useState('')
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

  // Handle changes request
  const handleRequestChanges = () => {
    if (changesRequest.trim() && onRequestChanges) {
      onRequestChanges(changesRequest.trim())
      setChangesRequest('') // Clear the input after submitting
    }
  }

  // Initialize editor with animation
  useEffect(() => {
    const cleanup = initializeEditor()
    return cleanup
  }, [])

  // Destructure animation state for easier access
  const { showEditor, isClosing } = animationState

  // Keyboard shortcuts handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    handleKeyboardShortcuts(e, handleSave, editorRef)
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
            {/* Top Bar */}
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
                    onClick={handleSave}
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
                    onClick={handleClose}
                  >
                    <X size={16} />
                    Close
                  </button>
                </div>
              </div>

              {/* Toolbar */}
              <div className={styles.toolbar}>
                <div className={styles.toolbarGroup}>
                  <button
                    className={`${styles.toolbarButton} ${isCommandActive('bold') ? styles.active : ''}`}
                    onClick={() => executeCommand('bold', '', editorRef)}
                    title="Bold (Ctrl+B)"
                  >
                    <Bold size={16} />
                  </button>
                  <button
                    className={`${styles.toolbarButton} ${isCommandActive('italic') ? styles.active : ''}`}
                    onClick={() => executeCommand('italic', '', editorRef)}
                    title="Italic (Ctrl+I)"
                  >
                    <Italic size={16} />
                  </button>
                  <button
                    className={`${styles.toolbarButton} ${isCommandActive('underline') ? styles.active : ''}`}
                    onClick={() => executeCommand('underline', '', editorRef)}
                    title="Underline (Ctrl+U)"
                  >
                    <Underline size={16} />
                  </button>
                </div>

                <div className={styles.toolbarSeparator} />

                <div className={styles.toolbarGroup}>
                  <button
                    className={styles.toolbarButton}
                    onClick={() => insertHeading(1, editorRef)}
                    title="Heading 1"
                  >
                    <Heading1 size={16} />
                  </button>
                  <button
                    className={styles.toolbarButton}
                    onClick={() => insertHeading(2, editorRef)}
                    title="Heading 2"
                  >
                    <Heading2 size={16} />
                  </button>
                  <button
                    className={styles.toolbarButton}
                    onClick={() => formatBlock('p', editorRef)}
                    title="Paragraph"
                  >
                    <Type size={16} />
                  </button>
                </div>

                <div className={styles.toolbarSeparator} />

                <div className={styles.toolbarGroup}>
                  <button
                    className={styles.toolbarButton}
                    onClick={() => applyTextAlignment('left', editorRef)}
                    title="Align Left"
                  >
                    <AlignLeft size={16} />
                  </button>
                  <button
                    className={styles.toolbarButton}
                    onClick={() => applyTextAlignment('center', editorRef)}
                    title="Align Center"
                  >
                    <AlignCenter size={16} />
                  </button>
                  <button
                    className={styles.toolbarButton}
                    onClick={() => applyTextAlignment('right', editorRef)}
                    title="Align Right"
                  >
                    <AlignRight size={16} />
                  </button>
                </div>

                <div className={styles.toolbarSeparator} />

                <div className={styles.toolbarGroup}>
                  <button
                    className={styles.toolbarButton}
                    onClick={() => insertList('unordered', editorRef)}
                    title="Bullet List"
                  >
                    <List size={16} />
                  </button>
                  <button
                    className={styles.toolbarButton}
                    onClick={() => insertList('ordered', editorRef)}
                    title="Numbered List"
                  >
                    <ListOrdered size={16} />
                  </button>
                </div>

                <div className={styles.toolbarSeparator} />

                <div className={styles.toolbarGroup}>
                  <button
                    className={styles.toolbarButton}
                    onClick={() => formatBlock('blockquote', editorRef)}
                    title="Quote"
                  >
                    <Quote size={16} />
                  </button>
                  <button
                    className={styles.toolbarButton}
                    onClick={() => formatBlock('pre', editorRef)}
                    title="Code Block"
                  >
                    <Code size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Editor Area with A4 Document Layout */}
            <div className={styles.editorArea}>
              <div className={styles.documentContainer}>
                <div className={styles.a4Document}>
                  <div
                    ref={editorRef}
                    className={styles.richEditor}
                    contentEditable
                    dangerouslySetInnerHTML={{ __html: content }}
                    onInput={handleInput}
                    onKeyDown={handleKeyDown}
                    suppressContentEditableWarning={true}
                  />
                </div>
              </div>

              {/* Floating Changes Input Panel */}
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
                      rows={2}
                    />
                    <button
                      className={styles.floatingSubmitButton}
                      onClick={handleRequestChanges}
                      disabled={!changesRequest.trim()}
                      title="Submit change request"
                    >
                      ✨ Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  )
}

export default ArtifactEditor
