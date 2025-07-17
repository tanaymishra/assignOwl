'use client';

import React, { useEffect, useRef } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { Button } from '@/app/ui';
import { useAssignmentQuestionnaireStore } from './store';
import { questions } from './chatQuestions';
import { ChatMessage } from './types';
import TypingAnimation from './components/TypingAnimation';
import { ModernFileUpload } from './components/ModernFileUpload';
import { ChatInterface } from './components/ChatInterface';
import styles from './AssignmentQuestionnaire.module.scss';

interface AssignmentQuestionnaireProps {
  onComplete?: () => void;
}

export const AssignmentQuestionnaire: React.FC<AssignmentQuestionnaireProps> = ({ onComplete }) => {
  const {
    currentStep,
    formData,
    updateFormData,
    nextStep,
    isCompleted,
    setCompleted
  } = useAssignmentQuestionnaireStore();

  const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Create a unique ID generator
  const messageIdRef = React.useRef(0);
  const generateMessageId = () => {
    messageIdRef.current += 1;
    return `msg-${Date.now()}-${messageIdRef.current}`;
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const addMessage = (message: ChatMessage) => {
    setChatMessages(prev => [...prev, message]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    // Auto-resize textarea when inputValue changes
    autoResizeTextarea();
  }, [inputValue]);

  useEffect(() => {
    // Show welcome message and first question
    if (chatMessages.length === 0 && !isCompleted) {
      setTimeout(() => {
        addMessage({
          id: generateMessageId(),
          text: "Hi! I'm here to help you get started with your assignment. Let's gather some details to provide you with the best assistance possible.",
          sender: 'bot',
          timestamp: new Date(),
          type: 'text'
        });
        
        setTimeout(() => {
          showCurrentQuestion();
        }, 1500);
      }, 500);
    }
  }, [isCompleted]);

  const showCurrentQuestion = () => {
    const question = questions[currentStep];
    if (question) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage({
          id: generateMessageId(),
          text: question.question,
          sender: 'bot',
          timestamp: new Date(),
          type: question.type === 'file' ? 'file' : 'text'
        });
      }, 1000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    autoResizeTextarea();
  };

  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 400; // 400px max height
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  };

  const submitMessage = () => {
    if (!inputValue.trim()) return;

    const question = questions[currentStep];
    if (!question) return;

    // Add user message
    addMessage({
      id: generateMessageId(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    });

    // Update form data
    updateFormData({ [question.key]: inputValue });
    setInputValue('');
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Show acknowledgment
    setTimeout(() => {
      addMessage({
        id: generateMessageId(),
        text: "Perfect! Let me process that...",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      });

      setTimeout(() => {
        if (currentStep < questions.length - 1) {
          nextStep();
          showCurrentQuestion();
        } else {
          // Complete questionnaire
          addMessage({
            id: generateMessageId(),
            text: "Great! I have all the information I need. Let me analyze your assignment requirements and set up your personalized workspace.",
            sender: 'bot',
            timestamp: new Date(),
            type: 'text'
          });
          
          setTimeout(() => {
            setCompleted(true);
            onComplete?.();
          }, 2000);
        }
      }, 1000);
    }, 500);
  };

  const handleFileUpload = (file: File | null) => {
    if (file) {
      updateFormData({ attachments: [file] });
      
      addMessage({
        id: generateMessageId(),
        text: `📎 Uploaded: ${file.name}`,
        sender: 'user',
        timestamp: new Date(),
        type: 'file'
      });

      setTimeout(() => {
        addMessage({
          id: generateMessageId(),
          text: "Excellent! I've received your file. This will help me understand your assignment better.",
          sender: 'bot',
          timestamp: new Date(),
          type: 'text'
        });

        setTimeout(() => {
          if (currentStep < questions.length - 1) {
            nextStep();
            showCurrentQuestion();
          } else {
            setCompleted(true);
            onComplete?.();
          }
        }, 1500);
      }, 1000);
    }
  };

  // If questionnaire is completed, show the chat interface
  if (isCompleted) {
    return (
      <ChatInterface 
        initialMessage="Based on your responses, I can help you create a detailed outline, research strategy, or start writing specific sections. What would you like to focus on first?"
      />
    );
  }

  const currentQuestion = questions[currentStep];

  return (
    <div className={styles.container}>
      <div className={styles.chatContainer}>
        <div className={styles.messagesContainer}>
          {chatMessages.map((message: ChatMessage) => (
            <div
              key={message.id}
              className={`${styles.messageWrapper} ${
                message.sender === 'user' ? styles.userMessage : styles.botMessage
              }`}
            >
              <div className={styles.messageContent}>
                <div className={styles.messageAvatar}>
                  {message.sender === 'user' ? (
                    <User size={20} />
                  ) : (
                    <Bot size={20} />
                  )}
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

          {isTyping && (
            <div className={`${styles.messageWrapper} ${styles.botMessage}`}>
              <div className={styles.messageContent}>
                <div className={styles.messageAvatar}>
                  <Bot size={20} />
                </div>
                <div className={styles.messageBubble}>
                  <TypingAnimation words={["I'm", "thinking", "about", "your", "request..."]} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className={styles.inputContainer}>
          {currentQuestion?.type === 'file' ? (
            <div className={styles.fileUploadSection}>
              <ModernFileUpload
                value={formData.attachments?.[0] || null}
                onChange={handleFileUpload}
                placeholder="Drop your assignment file here or click to browse"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                maxSizeMB={10}
              />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.inputForm}>
              <div className={styles.inputWrapper}>
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder={currentQuestion?.placeholder || "Type your answer..."}
                  className={styles.messageInput}
                  disabled={isTyping}
                  rows={1}
                />
                <Button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className={styles.sendButton}
                  size="sm"
                >
                  <Send size={16} />
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentQuestionnaire;
