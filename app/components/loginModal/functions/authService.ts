/**
 * Simple auth functions that send requests to backend
 * Backend handles everything including httpOnly cookies
 */
import { useAuthStore } from "./authStore"

export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  name: string
  email: string
  password: string
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
    const response = await fetch('/api/auth/login', {
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
    const response = await fetch('/api/auth/signup', {
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
