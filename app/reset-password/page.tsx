'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle, XCircle, Loader, Lock, Eye, EyeOff } from 'lucide-react'
import styles from './resetPassword.module.scss'

interface ResetPasswordResponse {
  success: boolean
  message?: string
  error?: string
}

interface ValidateTokenResponse {
  success: boolean
  message?: string
  error?: string
}

const validateResetToken = async (token: string): Promise<ValidateTokenResponse> => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/auth/validate-reset-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        token: token
      }),
    })

    const data = await response.json()

    if (response.ok) {
      return {
        success: true,
        message: data.message || 'Token is valid'
      }
    } else {
      return {
        success: false,
        error: data.error || 'Invalid or expired token'
      }
    }
  } catch (error) {
    return {
      success: false,
      error: 'Network error. Please try again.'
    }
  }
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

    // Validate the token first
    setToken(tokenParam)
    const validateToken = async () => {
      try {
        const result = await validateResetToken(tokenParam)
        
        if (result.success) {
          setStatus('form')
        } else {
          setStatus('error')
          setMessage(result.error || 'Invalid or expired reset token')
        }
      } catch (error) {
        setStatus('error')
        setMessage('An unexpected error occurred')
      }
    }

    validateToken()
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
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconContainer}>
          {status === 'loading' && (
            <div className={`${styles.iconWrapper} ${styles.loading}`}>
              <Loader className={`${styles.icon} ${styles.loading}`} />
            </div>
          )}
          
          {status === 'form' && (
            <div className={`${styles.iconWrapper} ${styles.form}`}>
              <Lock className={`${styles.icon} ${styles.form}`} />
            </div>
          )}
          
          {status === 'success' && (
            <div className={`${styles.iconWrapper} ${styles.success}`}>
              <CheckCircle className={`${styles.icon} ${styles.success}`} />
            </div>
          )}
          
          {status === 'error' && (
            <div className={`${styles.iconWrapper} ${styles.error}`}>
              <XCircle className={`${styles.icon} ${styles.error}`} />
            </div>
          )}
        </div>

        <h1 className={styles.title}>
          {status === 'loading' && 'Loading...'}
          {status === 'form' && 'Reset Password'}
          {status === 'success' && 'Password Reset!'}
          {status === 'error' && 'Reset Failed'}
        </h1>

        <p className={styles.message}>
          {status === 'loading' && 'Please wait while we verify your reset token.'}
          {status === 'form' && 'Enter your new password below.'}
          {status === 'success' && message}
          {status === 'error' && message}
        </p>

        {status === 'form' && (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <Lock className={styles.inputIcon} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                required
                minLength={8}
                className={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.passwordToggle}
              >
                {showPassword ? <EyeOff className={styles.passwordToggleIcon} /> : <Eye className={styles.passwordToggleIcon} />}
              </button>
            </div>

            <div className={styles.inputGroup}>
              <Lock className={styles.inputIcon} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
                required
                minLength={8}
                className={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={styles.passwordToggle}
              >
                {showConfirmPassword ? <EyeOff className={styles.passwordToggleIcon} /> : <Eye className={styles.passwordToggleIcon} />}
              </button>
            </div>

            {formError && (
              <div className={styles.errorMessage}>
                {formError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !newPassword || !confirmPassword}
              className={`${styles.button} ${styles.primary}`}
            >
              {isSubmitting ? (
                <>
                  <Loader className={styles.buttonIcon} />
                  <span>Resetting...</span>
                </>
              ) : (
                <span>Reset Password</span>
              )}
            </button>

            <div className={styles.helpText}>
              Password must be at least 8 characters long
            </div>
          </form>
        )}

        {status === 'success' && (
          <div className={styles.actions}>
            <div className={styles.redirectMessage}>
              Redirecting you to the homepage in a few seconds...
            </div>
            <button
              onClick={() => router.push('/')}
              className={`${styles.button} ${styles.primary}`}
            >
              Go to Homepage Now
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className={styles.actions}>
            <button
              onClick={() => router.push('/')}
              className={`${styles.button} ${styles.primary}`}
            >
              Go to Homepage
            </button>
            <p className={styles.actionText}>
              Need help? Contact support or try requesting a new reset link.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
