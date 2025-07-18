'use client';

import React from 'react';
import { Send, Bot, User } from 'lucide-react';
import { Button } from '@/app/ui';
import TypingAnimation from './components/TypingAnimation';
import { ModernFileUpload } from './components/ModernFileUpload';
import ChatMessages from '../ChatMessages';
import ChatInput from '../ChatInput';
import styles from './AssignmentQuestionnaire.module.scss';
import useAssignmentQuestionnaireStore from './store/assignMentQuestionare';
interface AssignmentQuestionnaireProps {
  onComplete?: () => void;
}

export const AssignmentQuestionnaire: React.FC<AssignmentQuestionnaireProps> = ({ onComplete }) => {
  const { answers, inputLocked, isLoading ,currentQuesion} = useAssignmentQuestionnaireStore();

  return (
    <div className={styles.container}>
      <div className={styles.chatContainer}>
        <div className={styles.messagesContainer}>
          {/* Messages will be rendered here */}
          <div className={`${styles.messageWrapper} ${styles.botMessage}`}>
            <div className={styles.messageContent}>
              <div className={styles.messageAvatar}>
                <Bot size={20} />
              </div>
              <div className={styles.messageBubble}>
                <div className={styles.messageText}>
                  Welcome! I'm here to help you with your assignment.
                </div>
                <div className={styles.messageTime}>
                  {new Date().toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.inputContainer}>
          <form className={styles.inputForm}>
            <div className={styles.inputWrapper}>
              <textarea
                placeholder="Type your message..."
                className={styles.messageInput}
                rows={1}
              />
              <Button
                type="submit"
                className={styles.sendButton}
                size="sm"
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
