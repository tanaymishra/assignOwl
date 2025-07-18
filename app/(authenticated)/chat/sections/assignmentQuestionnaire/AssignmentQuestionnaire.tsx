'use client';

import React, { useEffect, useRef } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { Button } from '@/app/ui';
import { useAssignmentQuestionnaireStore } from './store';
import { questions } from './chatQuestions';
import { ChatMessage } from './types';
import TypingAnimation from './components/TypingAnimation';
import { ModernFileUpload } from './components/ModernFileUpload';
import ChatMessages from '../ChatMessages';
import ChatInput from '../ChatInput';
import useChatStore from '../../store/chatStore';
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

  const { setMessages } = useChatStore();

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

    // Process the answer immediately without intermediate messages
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        nextStep();
        showCurrentQuestion();
      } else {
        // Complete questionnaire - no intermediate messages, just complete
        setCompleted(true);
        
        // Initialize the chat store with a welcome message when questionnaire completes
        const welcomeMessage = {
          id: `chat-welcome-${Date.now()}`,
          type: 'assistant' as const,
          content: `Perfect! I now have all the details about your assignment. Here's what we'll work on:

**Assignment Type**: ${formData.assignmentType || 'Not specified'}
**Subject**: ${formData.subject || 'Not specified'}
**Course**: ${formData.course || 'Not specified'}
**Academic Level**: ${formData.academicLevel || 'Not specified'}
**Word Count**: ${formData.wordCount || 'Not specified'} (excluding references and appendix)
**Referencing Style**: ${formData.referencingStyle || 'Not specified'}
**Formatting**: ${formData.formatting || 'Not specified'}
**Include Visuals**: ${formData.includeVisuals || 'Not specified'}
${formData.otherInstructions ? `**Additional Instructions**: ${formData.otherInstructions}` : ''}

I can help you create an outline, research sources, write sections, or generate a complete document. What would you like to start with?`,
          timestamp: new Date()
        };
        
        // Set the initial message in the chat store
        setMessages([welcomeMessage]);
        
        onComplete?.();
      }
    }, 1000);
  };

  const handleFileUpload = (file: File | null) => {
    if (file) {
      const question = questions[currentStep];
      const fileKey = question.key as 'sampleAssignments' | 'lectureNotes';
      
      // Update form data with the file in the appropriate field
      updateFormData({ [fileKey]: [file] });
      
      addMessage({
        id: generateMessageId(),
        text: `📎 Uploaded: ${file.name}`,
        sender: 'user',
        timestamp: new Date(),
        type: 'file'
      });

      setTimeout(() => {
        if (currentStep < questions.length - 1) {
          nextStep();
          showCurrentQuestion();
        } else {
          setCompleted(true);
          
          // Initialize the chat store with a welcome message when questionnaire completes
          const welcomeMessage = {
            id: `chat-welcome-${Date.now()}`,
            type: 'assistant' as const,
            content: `Perfect! I now have all the details about your assignment. Here's what we'll work on:

**Assignment Type**: ${formData.assignmentType || 'Not specified'}
**Subject**: ${formData.subject || 'Not specified'}
**Course**: ${formData.course || 'Not specified'}
**Academic Level**: ${formData.academicLevel || 'Not specified'}
**Word Count**: ${formData.wordCount || 'Not specified'} (excluding references and appendix)
**Referencing Style**: ${formData.referencingStyle || 'Not specified'}
**Formatting**: ${formData.formatting || 'Not specified'}
**Include Visuals**: ${formData.includeVisuals || 'Not specified'}
${formData.otherInstructions ? `**Additional Instructions**: ${formData.otherInstructions}` : ''}

I can help you create an outline, research sources, write sections, or generate a complete document. What would you like to start with?`,
            timestamp: new Date()
          };
          
          // Set the initial message in the chat store
          setMessages([welcomeMessage]);
          
          onComplete?.();
        }
      }, 1000);
    }
  };

  // If questionnaire is completed, show the chat interface
  if (isCompleted) {
    return (
      <div className={styles.container}>
        <div className={styles.chatContainer}>
          <ChatMessages />
          <div className={styles.inputContainer}>
            <ChatInput 
              onSubmit={() => {}} 
              placeholder="Continue the conversation about your assignment..."
            />
          </div>
        </div>
      </div>
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
                value={
                  (currentQuestion.key === 'sampleAssignments' ? formData.sampleAssignments?.[0] : 
                   currentQuestion.key === 'lectureNotes' ? formData.lectureNotes?.[0] : null) || null
                }
                onChange={handleFileUpload}
                placeholder="Drop your assignment file here or click to browse"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                maxSizeMB={10}
              />
            </div>
          ) : currentQuestion?.type === 'select' ? (
            <div className={styles.selectSection}>
              <select
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={styles.selectInput}
                disabled={isTyping}
              >
                <option value="">{currentQuestion.placeholder}</option>
                {currentQuestion.options?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <Button
                type="button"
                onClick={submitMessage}
                disabled={!inputValue.trim() || isTyping}
                className={styles.sendButton}
                size="sm"
              >
                <Send size={16} />
              </Button>
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
