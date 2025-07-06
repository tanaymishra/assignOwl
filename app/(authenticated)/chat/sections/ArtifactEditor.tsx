'use client'

import React, { useState, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
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
  const [isEditing, setIsEditing] = useState(true) // Start directly in editing mode
  const [showEditor, setShowEditor] = useState(false) // Controls animation
  const [isClosing, setIsClosing] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)
  const fullscreenRef = useRef<HTMLDivElement>(null)

  // Trigger opening animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEditor(true)
    }, 50) // Small delay to ensure animation triggers
    
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsClosing(true)
    setShowEditor(false)
    // Delay the actual close to allow animation
    setTimeout(() => {
      setIsEditing(false)
      setIsClosing(false)
      onClose()
    }, 300) // Match animation duration
  }

  const handleSave = () => {
    if (editorRef.current) {
      // Clean up the content by removing extra spaces and normalizing HTML
      const cleanContent = cleanHtml(editorRef.current.innerHTML)
      setContent(cleanContent)
      onSave(cleanContent)
    }
    handleClose() // Use animated close
  }

  const cleanHtml = (html: string): string => {
    // Remove extra spaces, normalize line breaks, and clean up formatting
    return html
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/>\s+</g, '><') // Remove spaces between tags
      .replace(/<div><br><\/div>/g, '<br>') // Replace empty divs with br
      .replace(/<div>/g, '<p>') // Convert divs to paragraphs
      .replace(/<\/div>/g, '</p>')
      .replace(/<br\s*\/?>\s*<br\s*\/?>/g, '</p><p>') // Convert double br to paragraph breaks
      .replace(/<p>\s*<\/p>/g, '') // Remove empty paragraphs
      .replace(/(<p[^>]*>)\s*/g, '$1') // Remove leading spaces in paragraphs
      .replace(/\s*(<\/p>)/g, '$1') // Remove trailing spaces in paragraphs
      .replace(/<font[^>]*>/g, '') // Remove font tags
      .replace(/<\/font>/g, '') // Remove closing font tags
      .replace(/<span[^>]*>\s*<\/span>/g, '') // Remove empty spans
      .trim()
  }

  const executeCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    
    // Clean up after command execution
    setTimeout(() => {
      if (editorRef.current) {
        const selection = window.getSelection()
        const range = selection?.getRangeAt(0)
        if (range) {
          // Normalize the content around the cursor
          const container = range.commonAncestorContainer
          if (container.nodeType === Node.TEXT_NODE && container.parentElement) {
            const parent = container.parentElement
            parent.normalize()
          }
        }
      }
    }, 10)
  }

  const insertHeading = (level: number) => {
    executeCommand('formatBlock', `h${level}`)
  }

  const isCommandActive = (command: string): boolean => {
    try {
      return document.queryCommandState(command)
    } catch {
      return false
    }
  }

  const handleInput = () => {
    if (editorRef.current) {
      // Prevent excessive nested elements and clean up on input
      const content = editorRef.current.innerHTML
      if (content.includes('<div><div>') || content.includes('<span><span>')) {
        editorRef.current.innerHTML = cleanHtml(content)
        
        // Restore cursor position
        const selection = window.getSelection()
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0)
          range.collapse(false)
          selection.removeAllRanges()
          selection.addRange(range)
        }
      }
    }
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
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  )
}

export default ArtifactEditor
