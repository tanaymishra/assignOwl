export interface Question {
  id: string;
  question: string;
  placeholder: string;
  type: 'text' | 'number' | 'file' | 'select';
  key: string;
  required?: boolean;
  options?: string[];
}

export const questions: Question[] = [
  {
    id: '1',
    question: "Let's start with the basics! What subject is your assignment for?",
    placeholder: "e.g., Computer Science, Psychology, Business Studies...",
    type: 'text',
    key: 'subject',
    required: true
  },
  {
    id: '2', 
    question: "What type of assignment do you need help with?",
    placeholder: "e.g., Essay, Research Paper, Case Study, Report...",
    type: 'text',
    key: 'assignmentType',
    required: true
  },
  {
    id: '3',
    question: "What's the specific topic or title of your assignment?",
    placeholder: "Enter your assignment topic or title...",
    type: 'text',
    key: 'topic',
    required: true
  },
  {
    id: '4',
    question: "How many words should your assignment be?",
    placeholder: "e.g., 1500, 2000-2500, 3000 words...",
    type: 'text',
    key: 'wordCount',
    required: true
  },
  {
    id: '5',
    question: "When is your assignment due?",
    placeholder: "e.g., Next Friday, In 2 weeks, March 15th...",
    type: 'text',
    key: 'deadline',
    required: true
  },
  {
    id: '6',
    question: "What's your academic level?",
    placeholder: "e.g., High School, Undergraduate, Master's, PhD...",
    type: 'text', 
    key: 'academicLevel',
    required: true
  },
  {
    id: '7',
    question: "What referencing style should be used?",
    placeholder: "e.g., APA, MLA, Harvard, Chicago...",
    type: 'text',
    key: 'referenceStyle',
    required: true
  },
  {
    id: '8',
    question: "Do you have any special requirements or additional instructions?",
    placeholder: "Any specific formatting, sources, or other requirements...",
    type: 'text',
    key: 'specialRequirements',
    required: false
  },
  {
    id: '9',
    question: "Do you have any files to share? (assignment brief, lecture notes, etc.)",
    placeholder: "Upload your files here",
    type: 'file',
    key: 'attachments',
    required: false
  }
];
