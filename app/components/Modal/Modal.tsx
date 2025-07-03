'use client'

import React from 'react'
import { X } from 'lucide-react'
import styles from './Modal.module.scss'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl'
  showCloseButton?: boolean
  closeOnBackdropClick?: boolean
  className?: string
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  maxWidth = 'md',
  showCloseButton = true,
  closeOnBackdropClick = true,
  className = ''
}) => {
  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const maxWidthClass = {
    sm: styles.maxWidthSm,
    md: styles.maxWidthMd,
    lg: styles.maxWidthLg,
    xl: styles.maxWidthXl
  }[maxWidth]

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={`${styles.modal} ${maxWidthClass} ${className}`}>
        {showCloseButton && (
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        {children}
      </div>
    </div>
  )
}

export default Modal
