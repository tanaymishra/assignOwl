'use client';

import React, { useRef } from 'react';
import { Upload, X, FileText } from 'lucide-react';
import styles from './FileUpload.module.scss';

interface FileUploadProps {
  value?: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  maxSizeMB?: number;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  value,
  onChange,
  accept = '.pdf,.doc,.docx,.txt',
  label,
  placeholder = 'Choose file or drag and drop',
  error,
  required = false,
  disabled = false,
  className = '',
  maxSizeMB = 10,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File | null) => {
    if (file && maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
      // Handle file size error
      return;
    }
    onChange(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`${styles.fileUploadContainer} ${className}`}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <div
        className={`${styles.uploadArea} ${error ? styles.error : ''} ${disabled ? styles.disabled : ''} ${value ? styles.hasFile : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
          disabled={disabled}
          className={styles.hiddenInput}
        />
        
        {value ? (
          <div className={styles.fileInfo}>
            <div className={styles.fileDetails}>
              <FileText className={styles.fileIcon} size={20} />
              <div className={styles.fileText}>
                <span className={styles.fileName}>{value.name}</span>
                <span className={styles.fileSize}>{formatFileSize(value.size)}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className={styles.removeButton}
              disabled={disabled}
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className={styles.uploadPrompt}>
            <Upload className={styles.uploadIcon} size={24} />
            <span className={styles.uploadText}>{placeholder}</span>
            <span className={styles.uploadSubtext}>
              {accept.split(',').join(', ')} up to {maxSizeMB}MB
            </span>
          </div>
        )}
      </div>
      
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default FileUpload;
