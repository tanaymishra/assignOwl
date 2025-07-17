import { create } from 'zustand';
import { ChatMessage } from './types';

export interface AssignmentFormData {
  subject: string;
  assignmentType: string;
  topic: string;
  wordCount: string;
  deadline: string;
  academicLevel: string;
  referenceStyle: string;
  specialRequirements: string;
  attachments: File[];
}

export interface AssignmentState {
  currentStep: number;
  formData: AssignmentFormData;
  chatMessages: ChatMessage[];
  isTyping: boolean;
  inputValue: string;
  isSubmitting: boolean;
}

interface AssignmentActions {
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  updateFormData: <K extends keyof AssignmentFormData>(key: K, value: AssignmentFormData[K]) => void;
  addMessage: (message: ChatMessage) => void;
  setTyping: (typing: boolean) => void;
  setInputValue: (value: string) => void;
  setSubmitting: (submitting: boolean) => void;
  resetForm: () => void;
}

const initialFormData: AssignmentFormData = {
  subject: '',
  assignmentType: '',
  topic: '',
  wordCount: '',
  deadline: '',
  academicLevel: '',
  referenceStyle: '',
  specialRequirements: '',
  attachments: [],
};

export const useAssignmentStore = create<AssignmentState & AssignmentActions>((set, get) => ({
  currentStep: 0,
  formData: initialFormData,
  chatMessages: [],
  isTyping: false,
  inputValue: '',
  isSubmitting: false,

  setCurrentStep: (step) => set({ currentStep: step }),
  
  nextStep: () => set((state) => ({
    currentStep: state.currentStep + 1
  })),
  
  previousStep: () => set((state) => ({
    currentStep: Math.max(state.currentStep - 1, 0)
  })),
  
  updateFormData: (key, value) => set((state) => ({
    formData: { ...state.formData, [key]: value }
  })),
  
  addMessage: (message) => set((state) => ({
    chatMessages: [...state.chatMessages, message]
  })),
  
  setTyping: (typing) => set({ isTyping: typing }),
  
  setInputValue: (value) => set({ inputValue: value }),
  
  setSubmitting: (submitting) => set({ isSubmitting: submitting }),
  
  resetForm: () => set({
    currentStep: 0,
    formData: initialFormData,
    chatMessages: [],
    isTyping: false,
    inputValue: '',
    isSubmitting: false,
  }),
}));
