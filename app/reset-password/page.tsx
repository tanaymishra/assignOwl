'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle, XCircle, Loader, Lock, Eye, EyeOff } from 'lucide-react'

interface ResetPasswordResponse {
  success: boolean
  message?: string
  error?: string
}

const resetPassword = async (token: string, newPassword: string): Promise<ResetPasswordResponse> => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        token: token,
        newPassword: newPassword
      }),
    })

    const data = await response.json()

    if (response.ok) {
      return {
        success: true,
        message: data.message || 'Password reset successfully'
      }
    } else {
      return {
        success: false,
        error: data.error || 'Password reset failed'
      }
    }
  } catch (error) {
    return {
      success: false,
      error: 'Network error. Please try again.'
    }
  }
}

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'form' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const [token, setToken] = useState<string | null>(null)
  
  // Form state
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    const tokenParam = searchParams.get('token')
    
    if (!tokenParam) {
      setStatus('error')
      setMessage('No reset token provided. Please check your email for the correct reset link.')
      return
    }

    // Token exists, show the form
    setToken(tokenParam)
    setStatus('form')
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!token) {
      setFormError('Invalid reset token')
      return
    }

    if (newPassword.length < 8) {
      setFormError('Password must be at least 8 characters long')
      return
    }

    if (newPassword !== confirmPassword) {
      setFormError('Passwords do not match')
      return
    }

    setIsSubmitting(true)
    setFormError('')

    try {
      const result = await resetPassword(token, newPassword)
      
      if (result.success) {
        setStatus('success')
        setMessage(result.message || 'Password reset successfully')
        
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          router.push('/')
        }, 3000)
      } else {
        setFormError(result.error || 'Password reset failed')
      }
    } catch (error) {
      setFormError('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          {status === 'loading' && (
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Loader className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          )}
          
          {status === 'form' && (
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
          )}
          
          {status === 'success' && (
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          )}
          
          {status === 'error' && (
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          {status === 'loading' && 'Loading...'}
          {status === 'form' && 'Reset Password'}
          {status === 'success' && 'Password Reset!'}
          {status === 'error' && 'Reset Failed'}
        </h1>

        <p className="text-gray-600 mb-6 text-center">
          {status === 'loading' && 'Please wait while we verify your reset token.'}
          {status === 'form' && 'Enter your new password below.'}
          {status === 'success' && message}
          {status === 'error' && message}
        </p>

        {status === 'form' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                required
                minLength={8}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
                required
                minLength={8}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{formError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !newPassword || !confirmPassword}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Resetting...</span>
                </>
              ) : (
                <span>Reset Password</span>
              )}
            </button>

            <div className="text-sm text-gray-500 text-center">
              Password must be at least 8 characters long
            </div>
          </form>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-4">
              Redirecting you to the homepage in a few seconds...
            </div>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Go to Homepage Now
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-3 text-center">
            <button
              onClick={() => router.push('/')}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Go to Homepage
            </button>
            <p className="text-sm text-gray-500">
              Need help? Contact support or try requesting a new reset link.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
