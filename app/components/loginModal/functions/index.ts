// Export auth functions
export { login, signup, googleAuth, handleGoogleLogin, forgotPassword } from './authService'
export type { LoginRequest, SignupRequest, AuthResponse, ForgotPasswordRequest } from './authService'

// Export auth store and hook
export { useAuthStore, useAuth } from './authStore'
export type { User } from './authStore'
