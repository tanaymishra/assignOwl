'use client';

import React, { useRef, useState } from 'react';
import { Upload, X, FileText, Check, Loader2 } from 'lucide-react';
import { Button } from '@/app/ui';
import styles from './ModernFileUpload.module.scss';

interface ModernFileUploadProps {
  value?: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
  placeholder?: string;
  maxSizeMB?: number;
  onUpload?: () => void;
  isUploading?: boolean;
}

export const ModernFileUpload: React.FC<ModernFileUploadProps> = ({
  value,
  onChange,
  accept = '.pdf,.doc,.docx,.txt',
  placeholder = 'Drop your file here or click to browse',
  maxSizeMB = 10,
  onUpload,
  isUploading = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = (file: File | null) => {
    if (file && maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
      return;
    }
    onChange(file);
    
    // Simulate upload progress for demo
    if (file && onUpload) {
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    setUploadProgress(0);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={styles.uploadContainer}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
        className={styles.hiddenInput}
      />
      
      <div
        className={`${styles.uploadArea} ${isDragOver ? styles.dragOver : ''} ${value ? styles.hasFile : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={!value ? handleClick : undefined}
      >
        {value ? (
          <div className={styles.filePreview}>
            <div className={styles.fileInfo}>
              <div className={styles.fileIcon}>
                <FileText size={24} />
              </div>
              <div className={styles.fileDetails}>
                <div className={styles.fileName}>{value.name}</div>
                <div className={styles.fileSize}>{formatFileSize(value.size)}</div>
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill} 
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className={styles.fileActions}>
              {uploadProgress === 100 ? (
                <div className={styles.successIcon}>
                  <Check size={20} />
                </div>
              ) : isUploading ? (
                <div className={styles.loadingIcon}>
                  <Loader2 size={20} className={styles.spinner} />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleRemove}
                  className={styles.removeButton}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.uploadPrompt}>
            <div className={styles.uploadIcon}>
              <Upload size={32} />
            </div>
            <div className={styles.uploadText}>
              <div className={styles.primaryText}>{placeholder}</div>
              <div className={styles.secondaryText}>
                Supports {accept.split(',').join(', ')} up to {maxSizeMB}MB
              </div>
            </div>
          </div>
        )}
      </div>
      
      {value && (
        <div className={styles.actionButtons}>
          <Button
            variant="secondary"
            onClick={() => onChange(null)}
            size="sm"
          >
            Remove
          </Button>
          {onUpload && (
            <Button
              variant="primary"
              onClick={onUpload}
              disabled={isUploading}
              size="sm"
            >
              {isUploading ? 'Uploading...' : 'Upload'}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ModernFileUpload;
