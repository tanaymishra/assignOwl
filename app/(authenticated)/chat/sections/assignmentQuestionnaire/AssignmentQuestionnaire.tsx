'use client';

import React, { useEffect, useRef } from 'react';
import { Bot, User } from 'lucide-react';
import TypingAnimation from './components/TypingAnimation';
import QuestionInput from './components/QuestionInput';
import styles from './AssignmentQuestionnaire.module.scss';
import useAssignmentQuestionnaireStore from './store/assignMentQuestionare';
import { questions } from './questions';
interface AssignmentQuestionnaireProps {
  onComplete?: () => void;
}

export const AssignmentQuestionnaire: React.FC<AssignmentQuestionnaireProps> = ({ onComplete }) => {
  const { 
    messages, 
    isLoading, 
    currentQuesion, 
    update
  } = useAssignmentQuestionnaireStore();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
          update({ key: 'messages', value: [...messages, botMessage] });
        }
      } else {
        // All questions completed
        const completionMessage = {
          id: (Date.now() + 1).toString(),
          type: 'bot' as const,
          text: "Thank you! I have all the information I need. Let me process your assignment requirements.",
          timestamp: new Date()
        };
        update({ key: 'messages', value: [...messages, completionMessage] });
        
        if (onComplete) {
          onComplete();
        }
      }
    }, 1500); // Delay to show thinking animation
  };

  const currentQuestion = questions[currentQuesion];

  return (
    <div className={styles.container}>
      <div className={styles.chatContainer}>
        <div className={styles.messagesContainer}>
          {/* Render all messages */}
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`${styles.messageWrapper} ${
                message.type === 'bot' ? styles.botMessage : styles.userMessage
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
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
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
