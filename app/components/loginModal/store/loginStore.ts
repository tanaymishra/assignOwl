import { create } from 'zustand'

interface LoginStore {
  // Modal state
  isOpen: boolean
  mode: 'signin' | 'signup' | 'forgot-password'
  
  // Form data
  email: string
  password: string
  confirmPassword: string
  name: string
  
  // UI state
  isLoading: boolean
  error: string | null
  showPassword: boolean
  showConfirmPassword: boolean
  
  // Actions
  openModal: (mode?: 'signin' | 'signup') => void
  closeModal: () => void
  setMode: (mode: 'signin' | 'signup' | 'forgot-password') => void
  
  // Form actions
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  setConfirmPassword: (password: string) => void
  setName: (name: string) => void
  
  // UI actions
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  togglePasswordVisibility: () => void
  toggleConfirmPasswordVisibility: () => void
  
  // Form submission
  submitForm: () => Promise<void>
  resetForm: () => void
}

export const useLoginStore = create<LoginStore>((set, get) => ({
  // Initial state
  isOpen: false,
  mode: 'signin',
  
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  
  isLoading: false,
  error: null,
  showPassword: false,
  showConfirmPassword: false,
  
  // Modal actions
  openModal: (mode = 'signin') => set({ isOpen: true, mode, error: null }),
  closeModal: () => set({ isOpen: false, error: null }),
  setMode: (mode) => set({ mode, error: null }),
  
  // Form actions
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setName: (name) => set({ name }),
  
  // UI actions
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  togglePasswordVisibility: () => set((state) => ({ showPassword: !state.showPassword })),
  toggleConfirmPasswordVisibility: () => set((state) => ({ showConfirmPassword: !state.showConfirmPassword })),
  
  // Form submission
  submitForm: async () => {
    const { mode, email, password, confirmPassword, name } = get()
    
    set({ isLoading: true, error: null })
    
    try {
      // Validation
      if (!email || !password) {
        throw new Error('Email and password are required')
      }
      
      if (mode === 'signup') {
        if (!name) {
          throw new Error('Name is required for sign up')
        }
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match')
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters')
        }
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For demo purposes, just close the modal
      console.log(`${mode} submitted:`, { email, password, name })
      
      set({ isOpen: false })
      get().resetForm()
      
    } catch (error: any) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  },
  
  resetForm: () => set({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    error: null,
    showPassword: false,
    showConfirmPassword: false
  })
}))
