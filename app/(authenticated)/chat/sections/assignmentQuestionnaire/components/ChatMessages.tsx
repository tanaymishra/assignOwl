'use client';

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Bot, User } from 'lucide-react';
import TypingAnimation from './TypingAnimation';
import styles from './ChatMessages.module.scss';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'file';
}

interface ChatMessagesProps {
  initialMessage?: string;
  onNewMessage?: (message: string, files: File[]) => void;
}

export interface ChatMessagesRef {
  handleNewMessage: (text: string, files: File[]) => void;
}

export const ChatMessages = forwardRef<ChatMessagesRef, ChatMessagesProps>(({ 
  initialMessage,
  onNewMessage 
}, ref) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (initialMessage || messages.length === 0) {
      // Add welcome message
      const welcomeMessage: Message = {
        id: 'welcome-1',
        text: 'Great! I have all the information I need from the questionnaire. Now we can continue our conversation about your assignment.',
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };

      const followUpMessage: Message = {
        id: 'welcome-2', 
        text: initialMessage || 'Based on your responses, I can help you create a detailed outline, research strategy, or start writing specific sections. What would you like to focus on first?',
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages([welcomeMessage, followUpMessage]);
    }
  }, [initialMessage]);

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  // Function to handle new messages from parent
  const handleNewMessage = (text: string, files: File[]) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: text,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    addMessage(userMessage);

    // Simulate bot response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const botResponse: Message = {
        id: `bot-${Date.now()}`,
        text: "I understand what you're looking for. Let me help you develop that further...",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      addMessage(botResponse);
    }, 2000);

    // Notify parent if callback provided
    if (onNewMessage) {
      onNewMessage(text, files);
    }
  };

  // Expose handleNewMessage through ref
  useImperativeHandle(ref, () => ({
    handleNewMessage
  }));

  return (
    <div className={styles.messagesContainer}>
      {messages.map((message) => (
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
  );
});

ChatMessages.displayName = 'ChatMessages';

export default ChatMessages;
