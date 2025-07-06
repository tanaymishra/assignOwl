import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  attachments?: string[]
  artifact?: Artifact
}

export interface Artifact {
  id: string
  title: string
  type: 'document' | 'code' | 'text'
  content: string
  isGenerating?: boolean
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
  updateMessageArtifact: (messageId: string, artifact: Artifact) => void
  updateArtifactContent: (messageId: string, artifactId: string, content: string) => void
  requestArtifactChanges: (artifactId: string, changes: string) => void
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
      
      updateMessageArtifact: (messageId: string, artifact: Artifact) =>
        set(
          (state) => ({
            messages: state.messages.map((message) =>
              message.id === messageId ? { ...message, artifact } : message
            )
          }),
          false,
          'updateMessageArtifact'
        ),
      
      updateArtifactContent: (messageId: string, artifactId: string, content: string) =>
        set(
          (state) => ({
            messages: state.messages.map((message) =>
              message.id === messageId && message.artifact?.id === artifactId
                ? { ...message, artifact: { ...message.artifact, content } }
                : message
            )
          }),
          false,
          'updateArtifactContent'
        ),

      requestArtifactChanges: (artifactId: string, changes: string) => {
        // Create a new user message with the change request
        const changeMessage: Message = {
          id: Date.now().toString(),
          type: 'user',
          content: `Please update the document "${artifactId}" with the following changes: ${changes}`,
          timestamp: new Date()
        }
        
        // Add the message to the chat
        set(
          (state) => ({ 
            messages: [...state.messages, changeMessage],
            isLoading: true // Start loading state for AI response
          }),
          false,
          'requestArtifactChanges'
        )

        // Here you would typically call your AI service to process the changes
        // For now, we'll just simulate the start of processing
        console.log('Change request submitted:', { artifactId, changes })
      },
    }),
    {
      name: 'chat-store',
    }
  )
)

export default useChatStore
