'use client';

import React, { useEffect, useRef } from 'react';
import { Send, Bot, User, Upload, CheckCircle, Clock } from 'lucide-react';
import { Button, Input } from '@/app/ui';
import { useAssignmentQuestionnaireStore } from './store';
import { questions } from './chatQuestions';
import { ChatMessage } from './types';
import TypingAnimation from './components/TypingAnimation';
import { ModernFileUpload } from './components/ModernFileUpload';
import styles from './AssignmentQuestionnaire.module.scss';

interface AssignmentQuestionnaireProps {
  onComplete?: () => void;
}

export const AssignmentQuestionnaire: React.FC<AssignmentQuestionnaireProps> = ({ onComplete }) => {
  const {
    currentStep,
    formData,
    setCurrentStep,
    updateFormData,
    nextStep,
  } = useAssignmentQuestionnaireStore();

  const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const addMessage = (message: ChatMessage) => {
    setChatMessages(prev => [...prev, message]);
  };

  const setTyping = (typing: boolean) => {
    setIsTyping(typing);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    // Show welcome message and first question
    if (chatMessages.length === 0) {
      setTimeout(() => {
        addMessage({
          id: Date.now().toString(),
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
  }, []);

  const showCurrentQuestion = () => {
    const question = questions[currentStep];
    if (question) {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        addMessage({
          id: Date.now().toString(),
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
    
    if (!inputValue.trim()) return;

    const question = questions[currentStep];
    if (!question) return;

    // Add user message
    addMessage({
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    });

    // Update form data
    updateFormData({ [question.key]: inputValue });
    setInputValue('');

    // Show acknowledgment
    setTimeout(() => {
      addMessage({
        id: Date.now().toString(),
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
            id: Date.now().toString(),
            text: "Great! I have all the information I need. Let me analyze your assignment requirements and set up your personalized workspace.",
            sender: 'bot',
            timestamp: new Date(),
            type: 'text'
          });
          
          setTimeout(() => {
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
        id: Date.now().toString(),
        text: `📎 Uploaded: ${file.name}`,
        sender: 'user',
        timestamp: new Date(),
        type: 'file'
      });

      setTimeout(() => {
        addMessage({
          id: Date.now().toString(),
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
            onComplete?.();
          }
        }, 1500);
      }, 1000);
    }
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.title}>
            <Bot className={styles.titleIcon} />
            <span>Assignment Setup Assistant</span>
          </div>
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className={styles.progressText}>
              {currentStep + 1} of {questions.length}
            </span>
          </div>
        </div>
      </div>

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
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={currentQuestion?.placeholder || "Type your answer..."}
                  className={styles.messageInput}
                  disabled={isTyping}
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

      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.statusIndicator}>
            <Clock size={16} />
            <span>Setting up your assignment workspace...</span>
          </div>
          <div className={styles.features}>
            <div className={styles.feature}>
              <CheckCircle size={14} />
              <span>AI-Powered Analysis</span>
            </div>
            <div className={styles.feature}>
              <CheckCircle size={14} />
              <span>Smart Suggestions</span>
            </div>
            <div className={styles.feature}>
              <CheckCircle size={14} />
              <span>Personalized Help</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentQuestionnaire;
