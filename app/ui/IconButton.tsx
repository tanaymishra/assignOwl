'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'
import styles from './IconButton.module.scss'

interface IconButtonProps {
  icon: LucideIcon
  label?: string
  onClick?: () => void
  variant?: 'default' | 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isActive?: boolean
  disabled?: boolean
  showLabel?: boolean
  className?: string
  title?: string
  ariaLabel?: string
}

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  label,
  onClick,
  variant = 'default',
  size = 'md',
  isActive = false,
  disabled = false,
  showLabel = true,
  className = '',
  title,
  ariaLabel
}) => {
  const buttonClasses = [
    styles.iconButton,
    styles[variant],
    styles[size],
    isActive ? styles.active : '',
    disabled ? styles.disabled : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      onClick={onClick}
      className={buttonClasses}
      disabled={disabled}
      title={title || label}
      aria-label={ariaLabel || label}
    >
      <Icon className={styles.icon} />
      {showLabel && label && (
        <span className={styles.label}>{label}</span>
      )}
    </button>
  )
}

export default IconButton
