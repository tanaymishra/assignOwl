import { create } from 'zustand';

export interface AssignmentFormData {
  assignmentType: string;
  subject: string;
  course: string;
  level: 'bachelors' | 'masters' | 'phd' | '';
  referencingStyle: string;
  numberOfReferences: number | '';
  sampleAssignment?: File | null;
  lectureNotes?: File | null;
  wordCount: number | '';
  lineSpacing: '1.0' | '1.5' | '2.0' | '';
  fontStyle: string;
  fontSize: number | '';
  includeDiagrams: boolean;
  otherInstructions: string;
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
  assignmentType: '',
  subject: '',
  course: '',
  level: '',
  referencingStyle: '',
  numberOfReferences: '',
  sampleAssignment: null,
  lectureNotes: null,
  wordCount: '',
  lineSpacing: '',
  fontStyle: 'Times New Roman',
  fontSize: 12,
  includeDiagrams: false,
  otherInstructions: '',
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
    currentStep: Math.min(state.currentStep + 1, 10) // Assuming 11 total steps (0-10)
  })),
  
  previousStep: () => set((state) => ({
    currentStep: Math.max(state.currentStep - 1, 0)
  })),
}));

export const ASSIGNMENT_TYPES = [
  'Essay Writing',
  'Report Writing',
  'Literature Review',
  'Dissertation Writing',
  'Black Book',
  'Research Paper',
  'Review Article',
  'Thesis Writing',
  'PPT Making',
  'Case Studies',
  'Question and Answer',
  'Research Proposal',
  'Reflective Reports',
  'Poster Making',
  'Business Plan',
  'Marketing Plan',
];

export const REFERENCING_STYLES = [
  'APA',
  'MLA',
  'Harvard',
  'Chicago',
  'IEEE',
  'Vancouver',
  'Oxford',
  'Other',
];

export const FONT_STYLES = [
  'Times New Roman',
  'Arial',
  'Calibri',
  'Georgia',
  'Verdana',
  'Helvetica',
];
