'use client'

import React, { useRef } from 'react'
import { Send, Plus, Loader2 } from 'lucide-react'
import useChatStore from '../store/chatStore'
import styles from './ChatInput.module.scss'

interface ChatInputProps {
  onSubmit: () => void
  placeholder?: string
  className?: string
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSubmit, 
  placeholder = "Type your message...",
  className = ""
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  const {
    inputValue,
    isLoading,
    attachedFiles,
    setInputValue,
    addAttachedFile,
    removeAttachedFile
  } = useChatStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() && attachedFiles.length === 0) return
    onSubmit()
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach(file => addAttachedFile(file))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`${styles.inputForm} ${className}`}>
      {attachedFiles.length > 0 && (
        <div className={styles.attachments}>
          {attachedFiles.map((file, index) => (
            <div key={index} className={styles.attachment}>
              <span className={styles.fileName}>{file.name}</span>
              <button
                type="button"
                onClick={() => removeAttachedFile(index)}
                className={styles.removeFile}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className={styles.inputContainer}>
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
            adjustTextareaHeight()
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={styles.textarea}
          disabled={isLoading}
        />
        
        <div className={styles.inputActions}>
          <button
            type="button"
            onClick={handleFileUpload}
            className={styles.actionButton}
            disabled={isLoading}
          >
            <Plus size={20} />
          </button>
          
          <button
            type="submit"
            disabled={(!inputValue.trim() && attachedFiles.length === 0) || isLoading}
            className={styles.sendButton}
          >
            {isLoading ? <Loader2 size={20} className={styles.spinning} /> : <Send size={20} />}
          </button>
        </div>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,.pdf,.doc,.docx,.txt"
        onChange={handleFileChange}
        className={styles.hiddenInput}
      />
    </form>
  )
}

export default ChatInput
