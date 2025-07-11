'use client'

import React from 'react'
import styles from './Switch.module.scss'

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  leftLabel?: string
  rightLabel?: string
  leftBadge?: string
  rightBadge?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  leftLabel,
  rightLabel,
  leftBadge,
  rightBadge,
  size = 'md',
  disabled = false,
  className = ''
}) => {
  return (
    <div className={`${styles.switchContainer} ${styles[size]} ${className}`}>
      {leftLabel && (
        <span 
          className={`${styles.switchLabel} ${!checked ? styles.active : ''}`}
          onClick={() => !disabled && onChange(false)}
        >
          {leftLabel}
          {leftBadge && <span className={styles.badge}>{leftBadge}</span>}
        </span>
      )}
      
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        className={`${styles.switchButton} ${checked ? styles.checked : ''} ${disabled ? styles.disabled : ''}`}
        onClick={() => !disabled && onChange(!checked)}
      >
        <span className={styles.switchSlider} />
      </button>
      
      {rightLabel && (
        <span 
          className={`${styles.switchLabel} ${checked ? styles.active : ''}`}
          onClick={() => !disabled && onChange(true)}
        >
          {rightLabel}
          {rightBadge && <span className={styles.badge}>{rightBadge}</span>}
        </span>
      )}
    </div>
  )
}

export default Switch
