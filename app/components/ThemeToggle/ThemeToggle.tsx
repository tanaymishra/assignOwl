'use client'

import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/app/contexts/ThemeContext'
import { IconButton } from '@/app/ui'

interface ThemeToggleProps {
  variant?: 'default' | 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'ghost',
  size = 'md',
  showLabel = false,
  className = ''
}) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <IconButton
      icon={theme === 'light' ? Moon : Sun}
      label={theme === 'light' ? 'Dark mode' : 'Light mode'}
      onClick={toggleTheme}
      variant={variant}
      size={size}
      showLabel={showLabel}
      className={className}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      ariaLabel={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    />
  )
}

export default ThemeToggle
