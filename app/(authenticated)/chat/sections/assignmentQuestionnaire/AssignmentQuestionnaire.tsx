'use client';

import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Bot, User } from 'lucide-react';
import TypingAnimation from './components/TypingAnimation';
import QuestionInput from './components/QuestionInput';
import styles from './AssignmentQuestionnaire.module.scss';
import useAssignmentQuestionnaireStore from './store/assignMentQuestionare';
import { questions } from './questions';
import {
  assignmentStatusService,
  restoreQuestionnaireState
} from './functions/assignmentStatus';
import { useSocket, useIsConnected } from '@/app/socket/socketStore';

// Client-side only time formatting component to avoid hydration mismatch
const MessageTime: React.FC<{ timestamp: Date }> = ({ timestamp }) => {
  const [timeString, setTimeString] = React.useState('');

  React.useEffect(() => {
    // Only format time on client side
    setTimeString(timestamp.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    }));
  }, [timestamp]);

  return <>{timeString}</>;
};

interface AssignmentQuestionnaireProps {
  onComplete?: () => void;
}

export const AssignmentQuestionnaire: React.FC<AssignmentQuestionnaireProps> = ({ onComplete }) => {
  const searchParams = useSearchParams();
  const socket = useSocket();
  const isConnected = useIsConnected();
  const {
    messages,
    isLoading,
    currentQuesion,
    isInitialized,
    update,
    reset,
    initializeFromStatus
  } = useAssignmentQuestionnaireStore();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize assignment status on component mount
  useEffect(() => {
    const initializeAssignment = async () => {
      const assignmentId = searchParams.get('id');

      if (!assignmentId) {
        console.log('No assignment ID found, starting fresh questionnaire');
        return;
      }

      // Check if socket is available and connected
      if (!socket || !isConnected) {
        console.log('Socket not available, skipping assignment status fetch');
        return;
      }

      try {
        // Fetch assignment status using global socket
        const response = await assignmentStatusService.fetchAssignmentStatus(parseInt(assignmentId), socket, isConnected);

        if (response.success && response.assignment) {
          const {
            currentQuestionIndex,
            restoredAnswers,
            restoredMessages,
            isCompleted
          } = restoreQuestionnaireState(response);

          // Restore the questionnaire state
          const allMessages = [];

          // Add bot messages for each answered question
          response.assignment.previous_messages.forEach(({ questionId, answer }, index) => {
            const question = questions.find((q: any) => q.id === questionId);
            if (question) {
              // Add bot question
              allMessages.push({
                id: `restored_bot_${index}`,
                type: 'bot' as const,
                text: question.text,
                timestamp: new Date(response.assignment!.created_at)
              });

              // Add user answer
              let displayAnswer = answer;
              if (Array.isArray(answer)) {
                displayAnswer = `📎 ${answer.length} file${answer.length > 1 ? 's' : ''} uploaded`;
              } else if (typeof answer === 'boolean') {
                displayAnswer = answer ? 'Yes' : 'No';
              }

              allMessages.push({
                id: `restored_user_${index}`,
                type: 'user' as const,
                text: displayAnswer,
                timestamp: new Date(response.assignment!.updated_at)
              });
            }
          });

          // Add current question if not completed
          if (!isCompleted && currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            if (currentQuestion) {
              allMessages.push({
                id: `current_${Date.now()}`,
                type: 'bot' as const,
                text: currentQuestion.text,
                timestamp: new Date()
              });
            }
          }

          // Initialize store with restored state
          initializeFromStatus(currentQuestionIndex, restoredAnswers, allMessages);

          console.log(`Assignment ${assignmentId} restored - Question ${currentQuestionIndex}/${questions.length}`);

          if (isCompleted) {
            console.log('Assignment questionnaire already completed');
            onComplete?.();
          }
        } else {
          console.error('Failed to fetch assignment status:', response.error);
        }
      } catch (error) {
        console.error('Error initializing assignment:', error);
        // Continue with fresh questionnaire on error
      }
    };

    initializeAssignment();

    // Cleanup on unmount
    return () => {
      assignmentStatusService.removeStatusListener();
    };
  }, [searchParams, socket, isConnected, update, onComplete, initializeFromStatus]);

  const handleQuestionSubmit = () => {
    const currentQuestion = questions[currentQuesion];
    if (!currentQuestion) return;

    // Show loading state
    update({ key: 'isLoading', value: true });

    // Move to next question after a short delay
    setTimeout(() => {
      update({ key: 'isLoading', value: false });

      if (currentQuesion < questions.length - 1) {
        // Move to next question
        const nextQuestionIndex = currentQuesion + 1;
        update({ key: 'currentQuesion', value: nextQuestionIndex });

        // Add next question message
        const nextQuestion = questions[nextQuestionIndex];
        if (nextQuestion) {
          const botMessage = {
            id: (Date.now() + 1).toString(),
            type: 'bot' as const,
            text: nextQuestion.text,
            timestamp: new Date()
          };
          // Get current messages from store to ensure we have the latest state
          const currentMessages = useAssignmentQuestionnaireStore.getState().messages;
          update({ key: 'messages', value: [...currentMessages, botMessage] });
        }
      } else {
        // All questions completed - increment currentQuesion to indicate completion
        update({ key: 'currentQuesion', value: questions.length });
        
        const completionMessage = {
          id: (Date.now() + 1).toString(),
          type: 'bot' as const,
          text: "Thank you! I have all the information I need. Let me process your assignment requirements.",
          timestamp: new Date()
        };
        // Get current messages from store to ensure we have the latest state
        const currentMessages = useAssignmentQuestionnaireStore.getState().messages;
        update({ key: 'messages', value: [...currentMessages, completionMessage] });

        if (onComplete) {
          onComplete();
        }
      }
    }, 1500); // Delay to show thinking animation
  };


  return (
    <div className={styles.container}>
      <div className={styles.chatContainer}>
        <div className={styles.messagesContainer}>
          {/* Render all messages */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.messageWrapper} ${message.type === 'bot' ? styles.botMessage : styles.userMessage
                }`}
            >
              <div className={styles.messageContent}>
                <div className={styles.messageAvatar}>
                  {message.type === 'bot' ? <Bot size={20} /> : <User size={20} />}
                </div>
                <div className={styles.messageBubble}>
                  <div className={styles.messageText}>
                    {message.text}
                  </div>
                  <div className={styles.messageTime}>
                    <MessageTime timestamp={message.timestamp} />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className={`${styles.messageWrapper} ${styles.botMessage}`}>
              <div className={styles.messageContent}>
                <div className={styles.messageAvatar}>
                  <Bot size={20} />
                </div>
                <div className={styles.messageBubble}>
                  <TypingAnimation words={['Typing', '...']} />
                </div>
              </div>
            </div>
          )}

          {/* Auto scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.inputContainer}>
          <QuestionInput
            onSubmit={handleQuestionSubmit}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default AssignmentQuestionnaire;
