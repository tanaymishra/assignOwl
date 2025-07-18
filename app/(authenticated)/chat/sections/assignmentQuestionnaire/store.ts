import { create } from 'zustand';

export interface AssignmentFormData {
  assignmentType: string;
  subject: string;
  course: string;
  academicLevel: string;
  referencingStyle: string;
  sampleAssignments: File[];
  lectureNotes: File[];
  wordCount: string;
  formatting: string;
  includeVisuals: string;
  otherInstructions: string;
}

export interface QuestionnaireState {
  currentStep: number;
  formData: AssignmentFormData;
  isSubmitting: boolean;
  isCompleted: boolean;
  errors: Record<string, string>;
}

interface QuestionnaireActions {
  setCurrentStep: (step: number) => void;
  updateFormData: (data: Partial<AssignmentFormData>) => void;
  setErrors: (errors: Record<string, string>) => void;
  setSubmitting: (submitting: boolean) => void;
  setCompleted: (completed: boolean) => void;
  resetForm: () => void;
  nextStep: () => void;
  previousStep: () => void;
}

const initialFormData: AssignmentFormData = {
  assignmentType: '',
  subject: '',
  course: '',
  academicLevel: '',
  referencingStyle: '',
  sampleAssignments: [],
  lectureNotes: [],
  wordCount: '',
  formatting: '',
  includeVisuals: '',
  otherInstructions: '',
};

export const useAssignmentQuestionnaireStore = create<QuestionnaireState & QuestionnaireActions>((set, get) => ({
  currentStep: 0,
  formData: initialFormData,
  isSubmitting: false,
  isCompleted: false,
  errors: {},

  setCurrentStep: (step) => set({ currentStep: step }),
  
  updateFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data },
    errors: {}, // Clear errors when updating data
  })),
  
  setErrors: (errors) => set({ errors }),
  
  setSubmitting: (submitting) => set({ isSubmitting: submitting }),
  
  setCompleted: (completed) => set({ isCompleted: completed }),
  
  resetForm: () => set({
    currentStep: 0,
    formData: initialFormData,
    isSubmitting: false,
    isCompleted: false,
    errors: {},
  }),
  
  nextStep: () => set((state) => ({
    currentStep: Math.min(state.currentStep + 1, 10) // 11 total questions (0-10)
  })),
  
  previousStep: () => set((state) => ({
    currentStep: Math.max(state.currentStep - 1, 0)
  })),
}));
