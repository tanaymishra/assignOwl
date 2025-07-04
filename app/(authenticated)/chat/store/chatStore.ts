import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  attachments?: string[]
}

interface ChatState {
  messages: Message[]
  inputValue: string
  isLoading: boolean
  attachedFiles: File[]
  
  // Actions
  setInputValue: (value: string) => void
  setIsLoading: (loading: boolean) => void
  addMessage: (message: Message) => void
  setMessages: (messages: Message[]) => void
  addAttachedFile: (file: File) => void
  removeAttachedFile: (index: number) => void
  setAttachedFiles: (files: File[]) => void
  clearInput: () => void
  resetChat: () => void
}

const useChatStore = create<ChatState>()(
  devtools(
    (set, get) => ({
      // Initial state
      messages: [],
      inputValue: '',
      isLoading: false,
      attachedFiles: [],
      
      // Actions
      setInputValue: (value: string) =>
        set({ inputValue: value }, false, 'setInputValue'),
      
      setIsLoading: (loading: boolean) =>
        set({ isLoading: loading }, false, 'setIsLoading'),
      
      addMessage: (message: Message) =>
        set(
          (state) => ({ messages: [...state.messages, message] }),
          false,
          'addMessage'
        ),
      
      setMessages: (messages: Message[]) =>
        set({ messages }, false, 'setMessages'),
      
      addAttachedFile: (file: File) =>
        set(
          (state) => ({ attachedFiles: [...state.attachedFiles, file] }),
          false,
          'addAttachedFile'
        ),
      
      removeAttachedFile: (index: number) =>
        set(
          (state) => ({
            attachedFiles: state.attachedFiles.filter((_, i) => i !== index)
          }),
          false,
          'removeAttachedFile'
        ),
      
      setAttachedFiles: (files: File[]) =>
        set({ attachedFiles: files }, false, 'setAttachedFiles'),
      
      clearInput: () =>
        set({ inputValue: '', attachedFiles: [] }, false, 'clearInput'),
      
      resetChat: () =>
        set(
          { messages: [], inputValue: '', isLoading: false, attachedFiles: [] },
          false,
          'resetChat'
        ),
    }),
    {
      name: 'chat-store',
    }
  )
)

export default useChatStore
