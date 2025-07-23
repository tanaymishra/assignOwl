'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send } from 'lucide-react';
import { Button } from '@/app/ui';
import ModernSelect from '@/app/ui/ModernSelect';
import { ModernFileUpload } from './ModernFileUpload';
import useAssignmentQuestionnaireStore from '../store/assignMentQuestionare';
import { questions } from '../questions';
import { updateAssignmentField } from '../functions/assignmentStatus';
import styles from './QuestionInput.module.scss';

interface QuestionInputProps {
  onSubmit?: () => void;
  disabled?: boolean;
}

export const QuestionInput: React.FC<QuestionInputProps> = ({ onSubmit, disabled = false }) => {
  const searchParams = useSearchParams();
  const { currentQuesion, answers, messages, update } = useAssignmentQuestionnaireStore();
  const [inputValue, setInputValue] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  
  const currentQuestion = questions[currentQuesion];
  const assignmentId = searchParams.get('id');

  // Function to update assignment in background
  const updateAssignmentInBackground = async (questionId: string, answer: any) => {
    if (!assignmentId) return;

    try {
      setIsUpdating(true);
      // Import socket store to get current socket state
      const { useSocketStore } = await import('@/app/socket/socketStore');
      const socketState = useSocketStore.getState();
      const socket = socketState.socket;
      const isConnected = socketState.isConnected;
      
      const response = await updateAssignmentField(parseInt(assignmentId), questionId, answer, socket, isConnected);
      
      if (response.success) {
        console.log(`Updated assignment ${assignmentId} - Fields: ${response.assignment?.updated_fields.join(', ')}`);
      } else {
        console.error('Assignment update failed:', response.error);
        if (response.validation_errors) {
          console.error('Validation errors:', response.validation_errors);
        }
      }
    } catch (error) {
      console.error('Error updating assignment:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (disabled) return;

    let displayValue = '';
    let actualValue: any = '';

    // Get the display and actual values based on question type
    if (currentQuestion?.type === 'boolean') {
      if (inputValue === '') return;
      displayValue = inputValue === 'yes' ? 'Yes' : 'No';
      actualValue = inputValue === 'yes';
    } else if (currentQuestion?.type === 'file') {
      const savedAsArray = answers[currentQuestion.id] as string[];
      if (!savedAsArray || savedAsArray.length === 0) return;
      displayValue = `📎 ${savedAsArray.length} file${savedAsArray.length > 1 ? 's' : ''} uploaded`;
      actualValue = savedAsArray;
    } else {
      if (!inputValue.trim()) return;
      displayValue = inputValue.trim();
      actualValue = inputValue.trim();
    }

    // Add user message to chat
    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      text: displayValue,
      timestamp: new Date()
    };
    update({ key: 'messages', value: [...messages, userMessage] });

    // Save the answer
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: actualValue
    };
    update({ key: 'answers', value: updatedAnswers });

    // Update backend if assignment ID exists
    if (assignmentId && currentQuestion) {
      updateAssignmentInBackground(currentQuestion.id, actualValue);
    }

    // Clear input
    setInputValue('');

    // Call onSubmit callback
    onSubmit?.();
  };

  const handleInputChange = (value: string | File) => {
    if (typeof value === 'string') {
      setInputValue(value);
      
      // Save answer for non-file types
      if (currentQuestion && currentQuestion.type !== 'file') {
        const updatedAnswers = {
          ...answers,
          [currentQuestion.id]: value
        };
        update({ key: 'answers', value: updatedAnswers });
      }
    }
  };

  const handleFileChange = (savedAsArray: string[] | null) => {
    if (savedAsArray && savedAsArray.length > 0 && currentQuestion) {
      setInputValue(`${savedAsArray.length} file${savedAsArray.length > 1 ? 's' : ''}`);
      const updatedAnswers = {
        ...answers,
        [currentQuestion.id]: savedAsArray
      };
      update({ key: 'answers', value: updatedAnswers });
    } else {
      setInputValue('');
      const updatedAnswers = {
        ...answers,
        [currentQuestion.id]: null
      };
      update({ key: 'answers', value: updatedAnswers });
    }
  };

  const renderInput = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case 'select':
        return (
          <ModernSelect
            value={inputValue}
            onChange={handleInputChange}
            options={currentQuestion.options || []}
            placeholder={currentQuestion.placeholder}
            className={styles.selectInput}
          />
        );

      case 'boolean':
        return (
          <ModernSelect
            value={inputValue}
            onChange={handleInputChange}
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' }
            ]}
            placeholder="Select yes or no..."
            className={styles.selectInput}
          />
        );

      case 'file':
        const fileValue = answers[currentQuestion.id];
        // Handle case where file question was skipped (value would be 'Skipped')
        const fileArray = Array.isArray(fileValue) ? fileValue : null;
        
        return (
          <ModernFileUpload
            value={fileArray}
            onChange={handleFileChange}
            placeholder={currentQuestion.placeholder}
            accept={currentQuestion.accept}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={currentQuestion.placeholder}
            className={styles.numberInput}
            disabled={disabled}
          />
        );

      case 'textarea':
        return (
          <textarea
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={currentQuestion.placeholder}
            className={styles.textareaInput}
            rows={3}
            disabled={disabled}
          />
        );

      default: // 'input' type
        return (
          <textarea
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={currentQuestion.placeholder}
            className={styles.textInput}
            rows={1}
            disabled={disabled}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
        );
    }
  };

  const isSubmitDisabled = () => {
    if (disabled) return true;
    
    // For optional questions, allow submission even if empty
    if (!currentQuestion?.required) {
      return false;
    }
    
    if (currentQuestion?.type === 'boolean') {
      return inputValue === '';
    }
    
    if (currentQuestion?.type === 'file') {
      return !answers[currentQuestion.id];
    }
    
    return !inputValue.trim();
  };

  const handleSkip = () => {
    if (currentQuestion?.required) return; // Don't allow skipping required questions
    
    // Add a skip message to chat
    const skipMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      text: 'Skipped',
      timestamp: new Date()
    };
    update({ key: 'messages', value: [...messages, skipMessage] });

    // Save "Skipped" as the answer for this question
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: 'Skipped'
    };
    update({ key: 'answers', value: updatedAnswers });

    // Update backend with "Skipped" text for skipped question
    if (assignmentId && currentQuestion) {
      updateAssignmentInBackground(currentQuestion.id, 'Skipped');
    }

    // Clear input
    setInputValue('');

    // Call onSubmit callback to move to next question
    onSubmit?.();
  };

  const isSelectType = currentQuestion?.type === 'select' || currentQuestion?.type === 'boolean';

  return (
    <form className={styles.inputForm} onSubmit={handleSubmit}>
      <div className={`${styles.inputWrapper} ${isSelectType ? styles.selectWrapper : ''}`}>
        {renderInput()}
        <div className={styles.buttonGroup}>
          {!currentQuestion?.required && (
            <Button
              type="button"
              onClick={handleSkip}
              className={styles.skipButton}
              variant="secondary"
              size="sm"
              disabled={disabled}
            >
              Skip
            </Button>
          )}
          <Button
            type="submit"
            className={styles.sendButton}
            size="sm"
            disabled={isSubmitDisabled() || isUpdating}
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default QuestionInput;
