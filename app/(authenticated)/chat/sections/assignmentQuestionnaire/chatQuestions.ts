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
    placeholder: "Select assignment type...",
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
    placeholder: "e.g., Computer Science, Psychology, Business Studies, Mathematics...",
    type: 'text',
    key: 'subject',
    required: true
  },
  {
    id: '3',
    question: "What course is this assignment for?",
    placeholder: "Enter the specific course name or code...",
    type: 'text',
    key: 'course',
    required: true
  },
  {
    id: '4',
    question: "What's your academic level?",
    placeholder: "Select your level...",
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
    placeholder: "e.g., APA style, 10-15 references",
    type: 'text',
    key: 'referencingStyle',
    required: true
  },
  {
    id: '6',
    question: "Do you have any sample assignments to share?",
    placeholder: "Upload sample assignments if available",
    type: 'file',
    key: 'sampleAssignments',
    required: false
  },
  {
    id: '7',
    question: "Do you have lecture notes for this module/assignment?",
    placeholder: "Upload lecture notes if available",
    type: 'file',
    key: 'lectureNotes',
    required: false
  },
  {
    id: '8',
    question: "How many words should your assignment be (excluding references and appendix)?",
    placeholder: "e.g., 1500, 2000-2500, 3000 words...",
    type: 'text',
    key: 'wordCount',
    required: true
  },
  {
    id: '9',
    question: "What line spacing, font style, and font size are required?",
    placeholder: "e.g., Double spaced, Times New Roman, 12pt",
    type: 'text',
    key: 'formatting',
    required: true
  },
  {
    id: '10',
    question: "Should diagrams or pictures be included in your assignment?",
    placeholder: "Select if diagrams/pictures are needed...",
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
    placeholder: "Any additional requirements, special instructions, or notes...",
    type: 'text',
    key: 'otherInstructions',
    required: false
  }
];
