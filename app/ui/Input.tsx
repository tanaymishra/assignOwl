'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  variant?: 'default' | 'glow'
}

export default function Input({
  label,
  error,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  variant = 'default',
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
  
  const baseStyles = 'w-full px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none transition-all duration-200'
  
  const variants = {
    default: 'border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20',
    glow: 'border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:shadow-lg focus:shadow-green-500/25'
  }
  
  const combinedClassName = `
    ${baseStyles}
    ${variants[variant]}
    ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
    ${Icon && iconPosition === 'left' ? 'pl-12' : ''}
    ${Icon && iconPosition === 'right' ? 'pr-12' : ''}
    ${className}
  `.trim()
  
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="w-5 h-5 text-gray-500" />
          </div>
        )}
        
        <input
          id={inputId}
          className={combinedClassName}
          {...props}
        />
        
        {Icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Icon className="w-5 h-5 text-gray-500" />
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
