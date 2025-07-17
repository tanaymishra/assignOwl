import React, { useState, useRef } from 'react';
import { ChatInput } from './ChatInput';
import { ChatMessages, ChatMessagesRef } from './ChatMessages';
import styles from './ChatInterface.module.scss';

interface ChatInterfaceProps {
  initialMessage?: string;
  onSubmit?: (message: string, files: File[]) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  initialMessage,
  onSubmit 
}) => {
  const [inputValue, setInputValue] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const chatMessagesRef = useRef<ChatMessagesRef>(null);

  const handleSubmit = (message: string, files: File[]) => {
    // Clear the input
    setInputValue('');
    setAttachedFiles([]);
    
    // Handle the message in ChatMessages component
    if (chatMessagesRef.current?.handleNewMessage) {
      chatMessagesRef.current.handleNewMessage(message, files);
    }
    
    // Call parent handler if provided
    if (onSubmit) {
      onSubmit(message, files);
    }
  };

  const handleFileUpload = (files: File[]) => {
    setAttachedFiles(prev => [...prev, ...files]);
  };

  const handleFileRemove = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.container}>
      <ChatMessages 
        ref={chatMessagesRef}
        initialMessage={initialMessage} 
      />
      <div className={styles.inputContainer}>
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSubmit}
          onFileUpload={handleFileUpload}
          attachedFiles={attachedFiles}
          onFileRemove={handleFileRemove}
          placeholder="Continue your conversation..."
        />
      </div>
    </div>
  );
};

export default ChatInterface;
