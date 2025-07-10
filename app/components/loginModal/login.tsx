'use client'

import React from 'react'
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react'
import { Button, Input } from '@/app/ui'
import { Modal } from '@/app/components/Modal'
import { useLoginStore } from './store/loginStore'
import styles from './login.module.scss'
import { signup, login } from './functions'
import { useAuth } from './functions/authStore'
// Google Icon Component
const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" width="20" height="20">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
)

const LoginComp = () => {
  const {
    isOpen,
    mode,
    email,
    password,
    confirmPassword,
    name,
    isLoading,
    error,
    showPassword,
    showConfirmPassword,
    openModal,
    closeModal,
    setMode,
    setEmail,
    setPassword,
    setConfirmPassword,
    setName,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    setLoading,
    setError
  } = useLoginStore()

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setLoading(true)
    setError('')

    try {
      if (mode === 'signin') {
        const result = await login({ email, password })
        if (result.success) {
          closeModal()
          // Auth store is already updated by the login function
        } else {
          setError(result.error || 'Login failed')
        }
      } else if (mode === 'signup') {
        if (password !== confirmPassword) {
          setError('Passwords do not match')
          setLoading(false)
          return
        }
        
        const result = await signup({ name, email, password })
        if (result.success) {
          closeModal()
          // Auth store is already updated by the signup function
        } else {
          setError(result.error || 'Signup failed')
        }
      } else if (mode === 'forgot-password') {
        // TODO: Implement forgot password
        setError('Forgot password not implemented yet')
      }
    } catch (error) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth login
    console.log('Google login clicked')
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={closeModal}
      maxWidth="md"
      showCloseButton={true}
      closeOnBackdropClick={true}
    >
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <div className={styles.icon}>
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <h2 className={styles.title}>
          {mode === 'signin' ? 'Welcome Back' : 
           mode === 'signup' ? 'Create Account' : 
           'Reset Password'}
        </h2>
        
        <p className={styles.subtitle}>
          {mode === 'signin' ? 'Sign in to continue your academic journey' :
           mode === 'signup' ? 'Join thousands of students achieving academic excellence' :
           'Enter your email to reset your password'}
        </p>
      </div>

      {/* Mode Toggle */}
      {mode !== 'forgot-password' && (
        <div className={styles.modeToggle}>
          <button
            onClick={() => setMode('signin')}
            className={`${styles.modeButton} ${mode === 'signin' ? styles.active : ''}`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`${styles.modeButton} ${mode === 'signup' ? styles.active : ''}`}
          >
            Sign Up
          </button>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className={styles.form}>
          {/* Name Field (Sign Up Only) */}
          {mode === 'signup' && (
            <div className={styles.inputGroup}>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                icon={User}
                iconPosition="left"
                fullWidth={true}
                required
                disabled={isLoading}
              />
            </div>
          )}

          {/* Email Field */}
          <div className={styles.inputGroup}>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              icon={Mail}
              iconPosition="left"
              fullWidth={true}
              required
              disabled={isLoading}
            />
          </div>

          {/* Password Field */}
          {mode !== 'forgot-password' && (
            <div className={styles.inputGroup}>
              <div className={styles.passwordWrapper}>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  icon={Lock}
                  iconPosition="left"
                  fullWidth={true}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={styles.passwordToggle}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* Confirm Password Field (Sign Up Only) */}
          {mode === 'signup' && (
            <div className={styles.inputGroup}>
              <div className={styles.passwordWrapper}>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  icon={Lock}
                  iconPosition="left"
                  fullWidth={true}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className={styles.passwordToggle}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className={styles.error}>
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
            icon={ArrowRight}
            iconPosition="right"
          >
            {mode === 'signin' ? 'Sign In' :
             mode === 'signup' ? 'Create Account' :
             'Send Reset Link'}
          </Button>

          {/* Google Login Section */}
          {mode !== 'forgot-password' && (
            <>
              <div className={styles.divider}>
                <span className={styles.dividerText}>or</span>
              </div>
              
              <button
                type="button"
                onClick={handleGoogleLogin}
                className={styles.googleButton}
                disabled={isLoading}
              >
                <GoogleIcon className={styles.googleIcon} />
                <span>Continue with Google</span>
              </button>
            </>
          )}

          {/* Footer Links */}
          <div className={styles.footer}>
            {mode === 'signin' && (
              <>
                <button
                  type="button"
                  onClick={() => setMode('forgot-password')}
                  className={styles.linkButton}
                  disabled={isLoading}
                >
                  Forgot your password?
                </button>
                <p className={styles.switchMode}>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className={styles.linkButton}
                    disabled={isLoading}
                  >
                    Sign up
                  </button>
                </p>
              </>
            )}

            {mode === 'signup' && (
              <p className={styles.switchMode}>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className={styles.linkButton}
                  disabled={isLoading}
                >
                  Sign in
                </button>
              </p>
            )}

            {mode === 'forgot-password' && (
              <button
                type="button"
                onClick={() => setMode('signin')}
                className={styles.linkButton}
                disabled={isLoading}
              >
                ← Back to sign in
              </button>
            )}
          </div>
        </form>
      </Modal>
    )
  }

  export default LoginComp