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

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  type: 'text' | 'file';
}

export interface Question {
  id: string;
  question: string;
  placeholder: string;
  type: 'text' | 'number' | 'file' | 'select';
  key: string;
  required?: boolean;
  options?: string[];
}
