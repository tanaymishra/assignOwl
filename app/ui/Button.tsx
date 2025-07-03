'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  loading?: boolean
  fullWidth?: boolean
  glow?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  fullWidth = false,
  glow = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden backdrop-blur-sm border'
  
  const variants = {
    primary: `bg-gradient-to-r from-green-600/80 to-green-700/80 hover:from-green-500/90 hover:to-green-600/90 text-white shadow-lg hover:shadow-xl transform hover:scale-105 border-green-500/30 hover:border-green-400/50 hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 ${glow ? 'shadow-green-500/30 hover:shadow-green-400/60' : ''}`,
    secondary: 'bg-gray-100/80 hover:bg-gray-200/90 text-gray-900 border-gray-300/50 hover:border-gray-400/70 backdrop-blur-md hover:shadow-lg',
    outline: 'border-green-600/60 text-green-600 hover:bg-green-50/80 hover:text-green-700 backdrop-blur-md hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:border-green-500/80',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 border-transparent hover:border-gray-300/50 backdrop-blur-sm'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 sm:px-6 py-2 text-sm sm:text-base',
    lg: 'px-6 sm:px-8 py-3 text-base sm:text-lg'
  }
  
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }
  
  const combinedClassName = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim()
  
  return (
    <button
      className={combinedClassName}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className={`animate-spin -ml-1 mr-2 ${iconSizes[size]} text-current`} fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {Icon && iconPosition === 'left' && !loading && (
        <Icon className={`${iconSizes[size]} ${children ? 'mr-2' : ''}`} />
      )}
      
      {children}
      
      {Icon && iconPosition === 'right' && !loading && (
        <Icon className={`${iconSizes[size]} ${children ? 'ml-2' : ''}`} />
      )}
    </button>
  )
}
