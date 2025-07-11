/**
 * Simple auth functions that send requests to backend
 * Backend handles everything including httpOnly cookies
 */
import { useAuthStore } from "./authStore"

// Google Identity Services type declarations
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void
          prompt: (callback?: (notification: any) => void) => void
          renderButton: (element: HTMLElement, config: any) => void
        }
      }
    }
  }
}

interface GoogleCredentialResponse {
  credential: string
  select_by: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  name: string
  email: string
  password: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface AuthResponse {
  success: boolean
  message?: string
  error?: string
}

/**
 * Login function - sends credentials to backend
 */
export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for httpOnly cookies
      body: JSON.stringify(credentials),
    })

    const data = await response.json()

    if (response.ok) {
      useAuthStore.getState().setAuth(data.user, "user");
      return {
        success: true,
        message: data.message || 'Login successful'
      }
    }
    else {
      return {
        success: false,
        error: data.error || 'Login failed'
      }
    }
  }
  catch (error) {
    return {
      success: false,
      error: 'Network error. Please try again.'
    }
  }
}

/**
 * Signup function - sends user data to backend
 */
export const signup = async (userData: SignupRequest): Promise<AuthResponse> => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for httpOnly cookies
      body: JSON.stringify(userData),
    })

    const data = await response.json()

    if (response.ok) {

      // Update auth store with new user data
      useAuthStore.getState().setAuth(data.user, "user");
      return {
        success: true,
        message: data.message || 'Account created successfully'
      }
    } else {
      return {
        success: false,
        error: data.error || 'Signup failed'
      }
    }
  } catch (error) {
    return {
      success: false,
      error: 'Network error. Please try again.'
    }
  }
}

/**
 * Google Auth function - sends Google credential token to backend
 */
export const googleAuth = async (credential: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for httpOnly cookies
      body: JSON.stringify({
        credential: credential
      }),
    })

    const data = await response.json()

    if (response.ok) {
      // Update auth store with new user data from Google
      useAuthStore.getState().setAuth(data.user, "user");
      return {
        success: true,
        message: data.message || 'Google authentication successful'
      }
    } else {
      return {
        success: false,
        error: data.error || 'Google authentication failed'
      }
    }
  } catch (error) {
    return {
      success: false,
      error: 'Network error. Please try again.'
    }
  }
}

/**
 * Handle Google OAuth login - uses Google Identity Services
 */
export const handleGoogleLogin = async (): Promise<AuthResponse> => {
  return new Promise((resolve) => {
    try {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
      
      if (!clientId) {
        resolve({
          success: false,
          error: 'Google Client ID not configured'
        })
        return
      }

      // Initialize Google Identity Services
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async (response: GoogleCredentialResponse) => {
            try {
              // Send the credential token to our backend
              const result = await googleAuth(response.credential)
              resolve(result)
            } catch (error) {
              console.error('Google auth error:', error)
              resolve({
                success: false,
                error: 'Google authentication failed'
              })
            }
          }
        })

        // Show the One Tap prompt
        window.google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // Fallback: show a popup if One Tap doesn't work
            console.log('One Tap not displayed, user might need to sign in manually')
          }
        })
      } else {
        resolve({
          success: false,
          error: 'Google Identity Services not loaded'
        })
      }

    } catch (error) {
      console.error('Google login error:', error)
      resolve({
        success: false,
        error: 'Google authentication failed'
      })
    }
  })
}

/**
 * Render Google Sign-In button - alternative to One Tap prompt
 */
export const renderGoogleButton = (element: HTMLElement): void => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  
  if (!clientId || !window.google?.accounts?.id) {
    console.error('Google Identity Services not available')
    return
  }

  window.google.accounts.id.initialize({
    client_id: clientId,
    callback: async (response: GoogleCredentialResponse) => {
      try {
        const result = await googleAuth(response.credential)
        // The result will be handled by the calling component
        if (result.success) {
          console.log('Google authentication successful')
        } else {
          console.error('Google authentication failed:', result.error)
        }
      } catch (error) {
        console.error('Google auth error:', error)
      }
    }
  })

  window.google.accounts.id.renderButton(element, {
    theme: 'outline',
    size: 'large',
    width: '100%',
    text: 'signin_with'
  })
}

/**
 * Forgot Password function - sends email to backend for password reset
 */
export const forgotPassword = async (email: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: email
      }),
    })

    const data = await response.json()

    if (response.ok) {
      return {
        success: true,
        message: data.message || 'Password reset link has been sent to your email'
      }
    } else {
      return {
        success: false,
        error: data.error || 'Failed to send password reset email'
      }
    }
  } catch (error) {
    return {
      success: false,
      error: 'Network error. Please try again.'
    }
  }
}

