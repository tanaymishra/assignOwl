import { create } from 'zustand';

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

export interface QuestionnaireState {
  currentStep: number;
  formData: AssignmentFormData;
  isSubmitting: boolean;
  errors: Record<string, string>;
}

interface QuestionnaireActions {
  setCurrentStep: (step: number) => void;
  updateFormData: (data: Partial<AssignmentFormData>) => void;
  setErrors: (errors: Record<string, string>) => void;
  setSubmitting: (submitting: boolean) => void;
  resetForm: () => void;
  nextStep: () => void;
  previousStep: () => void;
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

export const useAssignmentQuestionnaireStore = create<QuestionnaireState & QuestionnaireActions>((set, get) => ({
  currentStep: 0,
  formData: initialFormData,
  isSubmitting: false,
  errors: {},

  setCurrentStep: (step) => set({ currentStep: step }),
  
  updateFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data },
    errors: {}, // Clear errors when updating data
  })),
  
  setErrors: (errors) => set({ errors }),
  
  setSubmitting: (submitting) => set({ isSubmitting: submitting }),
  
  resetForm: () => set({
    currentStep: 0,
    formData: initialFormData,
    isSubmitting: false,
    errors: {},
  }),
  
  nextStep: () => set((state) => ({
    currentStep: Math.min(state.currentStep + 1, 13) // Assuming 14 total steps (0-13)
  })),
  
  previousStep: () => set((state) => ({
    currentStep: Math.max(state.currentStep - 1, 0)
  })),
}));
