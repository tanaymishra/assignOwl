'use client'

import React, { useState, useEffect } from 'react'
import { X, Mail, User, CheckCircle } from 'lucide-react'
import { signupUser } from '@/lib/api'

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
  prefilledEmail?: string
}

export default function WaitlistModal({ isOpen, onClose, prefilledEmail = '' }: WaitlistModalProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Prefill email when modal opens
  useEffect(() => {
    if (isOpen && prefilledEmail) {
      setEmail(prefilledEmail)
    }
  }, [isOpen, prefilledEmail])

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setEmail(prefilledEmail || '')
      setName('')
      setError('')
      setIsSubmitted(false)
      setIsLoading(false)
    }
  }, [isOpen, prefilledEmail])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signupUser({ email, name })
      
      if (result.success) {
        setIsSubmitted(true)
        setTimeout(() => {
          onClose()
        }, 2000)
      } else {
        setError(result.error || 'Something went wrong')
      }
    } catch (error: any) {
      setError('Network error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md transform rounded-2xl bg-gray-900 p-8 shadow-2xl transition-all">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Join the Waitlist
            </h2>
            <p className="text-gray-300">
              Be the first to experience the future of academic assistance
            </p>
          </div>

          {/* Success State */}
          {isSubmitted ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Welcome aboard!</h3>
              <p className="text-gray-300">
                You've successfully joined our waitlist. We'll notify you when early access is available.
              </p>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-gray-700 transition-all duration-200"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-gray-700 transition-all duration-200"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-400 text-sm text-center bg-red-900/20 p-3 rounded-lg border border-red-800">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Joining Waitlist...</span>
                  </div>
                ) : (
                  'Join Waitlist'
                )}
              </button>

              {/* Footer */}
              <div className="text-center text-sm text-gray-400 space-y-2">
                <p>✓ Free to join • ✓ Early access benefits</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
