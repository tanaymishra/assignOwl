import { Question } from './types';

export const formatAnswerDisplay = (value: any, question: Question): string => {
  if (question.type === 'file' && value) {
    return `📁 ${value.name}`;
  }
  if (question.type === 'boolean') {
    return value ? 'Yes, include visuals' : 'No visuals needed';
  }
  if (value === null || value === undefined || value === '') {
    return 'Skipped';
  }
  return value?.toString() || '';
};

export const validateAnswer = (value: any, question: Question): boolean => {
  if (!question.required) return true;
  
  switch (question.type) {
    case 'input':
    case 'textarea':
      return typeof value === 'string' && value.trim() !== '';
    case 'select':
      return value !== '' && value !== null && value !== undefined;
    case 'number':
      return typeof value === 'number' || (typeof value === 'string' && value.trim() !== '');
    case 'file':
      return value !== null && value !== undefined;
    case 'boolean':
      return typeof value === 'boolean';
    default:
      return true;
  }
};

export const getInputValue = (value: any, type: string): string => {
  if (type === 'number' && typeof value === 'number') {
    return value.toString();
  }
  if (typeof value === 'string') {
    return value;
  }
  return '';
};
