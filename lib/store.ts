import { create } from 'zustand'

interface WaitlistModalState {
  isOpen: boolean
  prefilledEmail: string
  openModal: (email?: string) => void
  closeModal: () => void
}

export const useWaitlistModal = create<WaitlistModalState>((set) => ({
  isOpen: false,
  prefilledEmail: '',
  openModal: (email = '') => set({ isOpen: true, prefilledEmail: email }),
  closeModal: () => set({ isOpen: false, prefilledEmail: '' }),
}))
