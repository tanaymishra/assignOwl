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
    question: "What type of assignment do you need help with?",
    placeholder: "Choose assignment type...",
    type: 'select',
    key: 'assignmentType',
    required: true,
    options: [
      'Essay',
      'Research Paper',
      'Case Study',
      'Report',
      'Dissertation',
      'Thesis',
      'Literature Review',
      'Critical Analysis',
      'Lab Report',
      'Reflection Paper',
      'Argumentative Essay',
      'Comparative Analysis',
      'Book Review',
      'Research Proposal',
      'Annotated Bibliography',
      'Business Plan',
      'Project Report'
    ]
  },
  {
    id: '2',
    question: "What subject is your assignment for?",
    placeholder: "e.g., Computer Science, Psychology, Business Studies...",
    type: 'text',
    key: 'subject',
    required: true
  },
  {
    id: '3',
    question: "What course is this assignment for?",
    placeholder: "e.g., CS101, Introduction to Psychology, Marketing 101...",
    type: 'text',
    key: 'course',
    required: true
  },
  {
    id: '4',
    question: "What's your academic level?",
    placeholder: "Select your academic level...",
    type: 'select',
    key: 'academicLevel',
    required: true,
    options: [
      'Bachelor\'s',
      'Master\'s',
      'PhD'
    ]
  },
  {
    id: '5',
    question: "What referencing style should be used and how many references do you need?",
    placeholder: "e.g., APA style with 10-15 references, Harvard style with 8-12 sources...",
    type: 'text',
    key: 'referencingStyle',
    required: true
  },
  {
    id: '6',
    question: "Do you have any sample assignments to share?",
    placeholder: "Upload sample assignments (optional)",
    type: 'file',
    key: 'sampleAssignments',
    required: false
  },
  {
    id: '7',
    question: "Do you have lecture notes for this module/assignment?",
    placeholder: "Upload lecture notes (optional)",
    type: 'file',
    key: 'lectureNotes',
    required: false
  },
  {
    id: '8',
    question: "How many words should your assignment be (excluding references and appendix)?",
    placeholder: "e.g., 1500 words, 2000-2500 words, 3000 words...",
    type: 'text',
    key: 'wordCount',
    required: true
  },
  {
    id: '9',
    question: "What line spacing, font style, and font size are required?",
    placeholder: "e.g., Double spaced, Times New Roman 12pt, Single spaced Arial 11pt...",
    type: 'text',
    key: 'formatting',
    required: true
  },
  {
    id: '10',
    question: "Should diagrams or pictures be included in your assignment?",
    placeholder: "Choose visual requirements...",
    type: 'select',
    key: 'includeVisuals',
    required: true,
    options: [
      'Yes, diagrams and pictures required',
      'Yes, only diagrams',
      'Yes, only pictures',
      'No, text only'
    ]
  },
  {
    id: '11',
    question: "Any other specific instructions or requirements?",
    placeholder: "e.g., specific sources to use, formatting requirements, deadline notes... (optional)",
    type: 'text',
    key: 'otherInstructions',
    required: false
  }
];
