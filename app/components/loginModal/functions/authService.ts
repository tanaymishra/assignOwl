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
        }
      }
    }
  }
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

export interface GoogleAuthRequest {
  token: string
  provider: 'google'
}

export interface AuthResponse {
  success: boolean
  message?: string
  error?: string
}

export interface GoogleAuthRequest {
  token: string
  provider: 'google'
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
 * Google Auth function - sends Google token to backend
 */
export const googleAuth = async (token: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for httpOnly cookies
      body: JSON.stringify({
        token: token,
        provider: 'google'
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
 * Handle Google OAuth login - manages the entire Google auth flow
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

      // Initialize Google OAuth
      if (typeof window !== 'undefined' && window.google) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async (response: any) => {
            try {
              if (!response.credential) {
                resolve({
                  success: false,
                  error: 'No credential received from Google'
                })
                return
              }

              // Send the Google token to our backend
              const result = await googleAuth(response.credential)
              resolve(result)
            } catch (error) {
              console.error('Google auth callback error:', error)
              resolve({
                success: false,
                error: 'Google authentication failed'
              })
            }
          },
          auto_select: false,
          cancel_on_tap_outside: true,
          ux_mode: 'popup',
          context: 'signin'
        })

        // Trigger the Google OAuth popup
        try {
          window.google.accounts.id.prompt((notification: any) => {
            if (notification.isNotDisplayed()) {
              console.error('Google prompt not displayed:', notification.getNotDisplayedReason())
              resolve({
                success: false,
                error: 'Google sign-in not available'
              })
            }
            if (notification.isSkippedMoment()) {
              console.error('Google prompt skipped:', notification.getSkippedReason())
              resolve({
                success: false,
                error: 'Google sign-in was skipped'
              })
            }
          })
        } catch (error) {
          console.error('Google prompt error:', error)
          resolve({
            success: false,
            error: 'Failed to show Google sign-in'
          })
        }
      } else {
        // Fallback: Load Google Identity Services script dynamically
        const script = document.createElement('script')
        script.src = 'https://accounts.google.com/gsi/client'
        script.async = true
        script.defer = true
        
        script.onload = () => {
          if (window.google) {
            window.google.accounts.id.initialize({
              client_id: clientId,
              callback: async (response: any) => {
                try {
                  if (!response.credential) {
                    resolve({
                      success: false,
                      error: 'No credential received from Google'
                    })
                    return
                  }

                  const result = await googleAuth(response.credential)
                  resolve(result)
                } catch (error) {
                  console.error('Google auth callback error:', error)
                  resolve({
                    success: false,
                    error: 'Google authentication failed'
                  })
                }
              },
              auto_select: false,
              cancel_on_tap_outside: true,
              ux_mode: 'popup',
              context: 'signin'
            })
            
            try {
              window.google.accounts.id.prompt((notification: any) => {
                if (notification.isNotDisplayed()) {
                  console.error('Google prompt not displayed:', notification.getNotDisplayedReason())
                  resolve({
                    success: false,
                    error: 'Google sign-in not available'
                  })
                }
                if (notification.isSkippedMoment()) {
                  console.error('Google prompt skipped:', notification.getSkippedReason())
                  resolve({
                    success: false,
                    error: 'Google sign-in was skipped'
                  })
                }
              })
            } catch (error) {
              console.error('Google prompt error:', error)
              resolve({
                success: false,
                error: 'Failed to show Google sign-in'
              })
            }
          } else {
            resolve({
              success: false,
              error: 'Google services failed to load'
            })
          }
        }
        
        script.onerror = () => {
          console.error('Failed to load Google Identity Services script')
          resolve({
            success: false,
            error: 'Failed to load Google authentication'
          })
        }
        
        document.head.appendChild(script)
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

