'use client';

import React, { useRef, useEffect } from 'react';
import { Send, X, Upload } from 'lucide-react';
import { Button } from '@/app/ui';
import styles from './ChatInput.module.scss';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (message: string, files: File[]) => void;
  onFileUpload: (files: File[]) => void;
  attachedFiles: File[];
  onFileRemove: (index: number) => void;
  placeholder?: string;
  disabled?: boolean;
  acceptFileTypes?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSubmit,
  onFileUpload,
  attachedFiles,
  onFileRemove,
  placeholder = "Type your message...",
  disabled = false,
  acceptFileTypes = ".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 400;
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  };

  useEffect(() => {
    autoResizeTextarea();
  }, [value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() || attachedFiles.length > 0) {
      onSubmit(value, attachedFiles);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() || attachedFiles.length > 0) {
        onSubmit(value, attachedFiles);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFileUpload(files);
    }
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileUpload(files);
    }
  };

  return (
    <div className={styles.container}>
      {/* File Pills */}
      {attachedFiles.length > 0 && (
        <div className={styles.filesList}>
          {attachedFiles.map((file, index) => (
            <div key={index} className={styles.filePill}>
              <span className={styles.fileName}>{file.name}</span>
              <button
                type="button"
                onClick={() => onFileRemove(index)}
                className={styles.removeFileButton}
                disabled={disabled}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input Area */}
      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <div 
          className={styles.inputWrapper}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={styles.messageInput}
            disabled={disabled}
            rows={1}
          />
          
          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={styles.uploadButton}
              disabled={disabled}
              title="Upload files"
            >
              <Upload size={16} />
            </button>
            
            <Button
              type="submit"
              disabled={(!value.trim() && attachedFiles.length === 0) || disabled}
              className={styles.sendButton}
              size="sm"
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </form>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptFileTypes}
        onChange={handleFileSelect}
        className={styles.hiddenFileInput}
      />
    </div>
  );
};

export default ChatInput;
