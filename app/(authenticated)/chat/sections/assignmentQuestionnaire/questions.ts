import { 
  ASSIGNMENT_TYPES, 
  REFERENCING_STYLES, 
  FONT_STYLES,
  LEVEL_OPTIONS,
  LINE_SPACING_OPTIONS,
  FONT_SIZE_OPTIONS
} from './constants';

export const questions: any= [
  {
    id: 'assignmentType',
    text: "Hi there! 👋 I'm here to help you with your assignment. Let's start with the basics - what type of assignment do you need help with?",
    required: true,
    type: 'select',
    options: ASSIGNMENT_TYPES.map(type => ({ value: type, label: type })),
    placeholder: "Select assignment type..."
  },
  {
    id: 'subject',
    text: "Great choice! Now, what subject is this assignment for?",
    required: true,
    type: 'input',
    placeholder: "e.g., Computer Science, Psychology, Business Studies..."
  },
  {
    id: 'course',
    text: "Perfect! What specific course or module is this assignment for?",
    required: true,
    type: 'input',
    placeholder: "e.g., Advanced Data Structures, Organizational Behavior..."
  },
  {
    id: 'level',
    text: "Got it! What academic level is this assignment?",
    required: true,
    type: 'select',
    options: LEVEL_OPTIONS,
    placeholder: "Select your academic level..."
  },
  {
    id: 'referencingStyle',
    text: "Excellent! What referencing style should I use for your assignment?",
    required: true,
    type: 'select',
    options: REFERENCING_STYLES.map(style => ({ value: style, label: style })),
    placeholder: "Select referencing style..."
  },
  {
    id: 'numberOfReferences',
    text: "And how many references do you need approximately?",
    required: true,
    type: 'number',
    placeholder: "e.g., 10"
  },
  {
    id: 'sampleAssignment',
    text: "Please upload your assignment guidelines or a sample assignment that shows the format and style required. This is mandatory to ensure I create exactly what you need! 📄",
    required: true,
    type: 'file',
    accept: ".pdf,.doc,.docx"
  },
  {
    id: 'lectureNotes',
    text: "Any lecture notes for this module? They help me align with your course content! (Also optional 📚)",
    required: false,
    type: 'file',
    accept: ".pdf,.doc,.docx,.ppt,.pptx"
  },
  {
    id: 'wordCount',
    text: "How many words should your assignment be? (excluding references and appendix)",
    required: true,
    type: 'number',
    placeholder: "e.g., 2000"
  },
  {
    id: 'lineSpacing',
    text: "What line spacing do you need?",
    required: true,
    type: 'select',
    options: LINE_SPACING_OPTIONS,
    placeholder: "Select line spacing..."
  },
  {
    id: 'fontStyle',
    text: "What font style should I use?",
    required: true,
    type: 'select',
    options: FONT_STYLES.map(font => ({ value: font, label: font })),
    placeholder: "Select font style..."
  },
  {
    id: 'fontSize',
    text: "And what font size?",
    required: true,
    type: 'select',
    options: FONT_SIZE_OPTIONS,
    placeholder: "Select font size..."
  },
  {
    id: 'includeDiagrams',
    text: "Should I include diagrams or pictures in your assignment?",
    required: true,
    type: 'boolean'
  },
  {
    id: 'otherInstructions',
    text: "Finally, any other specific instructions or requirements? Feel free to share anything else that's important! ✨",
    required: false,
    type: 'textarea',
    placeholder: "Share any additional instructions, specific requirements, or preferences..."
  }
];
