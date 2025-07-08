'use client'

import React from 'react'
import { 
  Bold, Italic, Underline, List, ListOrdered, 
  AlignLeft, AlignCenter, AlignRight, Type, 
  Heading1, Heading2, Code, Quote 
} from 'lucide-react'
import {
  executeCommand,
  insertHeading,
  isCommandActive,
  applyTextAlignment,
  insertList,
  formatBlock
} from '../../functions'
import styles from './Toolbar.module.scss'

interface ToolbarProps {
  editorRef: React.RefObject<HTMLDivElement>
}

const Toolbar: React.FC<ToolbarProps> = ({ editorRef }) => {
  return (
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
  )
}

export default Toolbar
