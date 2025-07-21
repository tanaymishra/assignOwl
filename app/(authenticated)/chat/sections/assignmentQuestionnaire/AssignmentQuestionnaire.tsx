'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { Button } from '@/app/ui';
import TypingAnimation from './components/TypingAnimation';
import { ModernFileUpload } from './components/ModernFileUpload';
import ChatMessages from '../ChatMessages';
import ChatInput from '../ChatInput';
import styles from './AssignmentQuestionnaire.module.scss';
import useAssignmentQuestionnaireStore from './store/assignMentQuestionare';
import { questions } from './questions';
interface AssignmentQuestionnaireProps {
  onComplete?: () => void;
}

export const AssignmentQuestionnaire: React.FC<AssignmentQuestionnaireProps> = ({ onComplete }) => {
  const { 
    answers, 
    messages, 
    inputLocked, 
    isLoading, 
    currentQuesion, 
    update
  } = useAssignmentQuestionnaireStore();
  
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || inputLocked) return;

    const currentQuestion = questions[currentQuesion];
    if (!currentQuestion) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      text: inputValue.trim(),
      timestamp: new Date()
    };
    update({ key: 'messages', value: [...messages, userMessage] });

    // Save the answer
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: inputValue.trim()
    };
    update({ key: 'answers', value: updatedAnswers });

    // Clear input and show loading
    setInputValue('');
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
          update({ key: 'messages', value: [...messages, userMessage, botMessage] });
        }
      } else {
        // All questions completed
        const completionMessage = {
          id: (Date.now() + 1).toString(),
          type: 'bot' as const,
          text: "Thank you! I have all the information I need. Let me process your assignment requirements.",
          timestamp: new Date()
        };
        update({ key: 'messages', value: [...messages, userMessage, completionMessage] });
        
        if (onComplete) {
          onComplete();
        }
      }
    }, 1500); // Increased delay to show thinking animation
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
          <form className={styles.inputForm} onSubmit={handleSubmit}>
            <div className={styles.inputWrapper}>
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={currentQuestion?.placeholder || "Type your message..."}
                className={styles.messageInput}
                rows={1}
                disabled={inputLocked}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <Button
                type="submit"
                className={styles.sendButton}
                size="sm"
                disabled={!inputValue.trim() || inputLocked}
              >
                <Send size={16} />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssignmentQuestionnaire;
