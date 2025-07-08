'use client'

import React from 'react'
import { handleKeyboardShortcuts } from '../../functions'
import styles from './DocumentEditor.module.scss'

interface DocumentEditorProps {
  content: string
  editorRef: React.RefObject<HTMLDivElement>
  onInput: (e: React.FormEvent) => void
  onSave: () => void
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({
  content,
  editorRef,
  onInput,
  onSave
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    handleKeyboardShortcuts(e, onSave, editorRef)
  }

  return (
    <div className={styles.editorArea}>
      <div className={styles.documentContainer}>
        <div className={styles.a4Document}>
          <div
            ref={editorRef}
            className={styles.richEditor}
            contentEditable
            dangerouslySetInnerHTML={{ __html: content }}
            onInput={onInput}
            onKeyDown={handleKeyDown}
            suppressContentEditableWarning={true}
          />
        </div>
      </div>
    </div>
  )
}

export default DocumentEditor
