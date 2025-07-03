'use client'

import React, { useState, useEffect } from 'react'
import { X, Mail, User, CheckCircle } from 'lucide-react'
import { signupUser } from '@/lib/api'
import { Button, Input } from '@/app/ui'

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
        <div className="relative w-full max-w-md transform rounded-2xl bg-white p-8 shadow-2xl transition-all">
          {/* Close button */}
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors p-1"
            icon={X}
          />

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Join the Waitlist
            </h2>
            <p className="text-gray-600">
              Be the first to experience the future of academic assistance
            </p>
          </div>

          {/* Success State */}
          {isSubmitted ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Welcome aboard!</h3>
              <p className="text-gray-600">
                You've successfully joined our waitlist. We'll notify you when early access is available.
              </p>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                icon={User}
                iconPosition="left"
                variant="glow"
                fullWidth={true}
                required
                disabled={isLoading}
              />

              {/* Email Input */}
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                icon={Mail}
                iconPosition="left"
                variant="glow"
                fullWidth={true}
                required
                disabled={isLoading}
              />

              {/* Error Message */}
              {error && (
                <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth={true}
                loading={isLoading}
                disabled={isLoading}
                glow={true}
              >
                Join Waitlist
              </Button>

              {/* Footer */}
              <div className="text-center text-sm text-gray-500 space-y-2">
                <p>✓ Free to join • ✓ Early access benefits</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
