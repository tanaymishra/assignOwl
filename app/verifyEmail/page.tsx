'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle, XCircle, Loader } from 'lucide-react'
import styles from './verifyEmail.module.scss'

interface VerifyResponse {
  success: boolean
  message?: string
  error?: string
}

const verifyEmail = async (token: string): Promise<VerifyResponse> => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/auth/verify-email', {
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
        message: data.message || 'Email verified successfully'
      }
    } else {
      return {
        success: false,
        error: data.error || 'Email verification failed'
      }
    }
  } catch (error) {
    return {
      success: false,
      error: 'Network error. Please try again.'
    }
  }
}

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = searchParams.get('token')
    
    if (!token) {
      setStatus('error')
      setMessage('No verification token provided')
      return
    }

    const performVerification = async () => {
      try {
        const result = await verifyEmail(token)
        
        if (result.success) {
          setStatus('success')
          setMessage(result.message || 'Email verified successfully')
          
          // Redirect to login page after 3 seconds
          setTimeout(() => {
            router.push('/')
          }, 3000)
        } else {
          setStatus('error')
          setMessage(result.error || 'Email verification failed')
        }
      } catch (error) {
        setStatus('error')
        setMessage('An unexpected error occurred')
      }
    }

    performVerification()
  }, [searchParams, router])

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconContainer}>
          {status === 'loading' && (
            <div className={`${styles.iconWrapper} ${styles.loading}`}>
              <Loader className={`${styles.icon} ${styles.loading}`} />
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
          {status === 'loading' && 'Verifying Email...'}
          {status === 'success' && 'Email Verified!'}
          {status === 'error' && 'Verification Failed'}
        </h1>

        <p className={styles.message}>
          {status === 'loading' && 'Please wait while we verify your email address.'}
          {status === 'success' && message}
          {status === 'error' && message}
        </p>

        {status === 'success' && (
          <div className={styles.redirectMessage}>
            Redirecting you to the homepage in a few seconds...
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
            <button
              onClick={() => window.location.reload()}
              className={`${styles.button} ${styles.secondary}`}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
