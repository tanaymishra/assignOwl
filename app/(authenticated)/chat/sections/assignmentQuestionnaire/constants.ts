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

export const LEVEL_OPTIONS = [
  { value: 'bachelors', label: 'Bachelors' },
  { value: 'masters', label: 'Masters' },
  { value: 'phd', label: 'PhD' },
];

export const LINE_SPACING_OPTIONS = [
  { value: '1.0', label: 'Single (1.0)' },
  { value: '1.5', label: 'One and a half (1.5)' },
  { value: '2.0', label: 'Double (2.0)' },
];

export const FONT_SIZE_OPTIONS = Array.from({ length: 8 }, (_, i) => ({
  value: (10 + i).toString(),
  label: `${10 + i}pt`,
}));
