'use client';

import React, { useRef, useState } from 'react';
import { Upload, X, FileText, Check, Loader2 } from 'lucide-react';
import { Button } from '@/app/ui';
import styles from './ModernFileUpload.module.scss';

interface ModernFileUploadProps {
  value?: string | null; // Changed to string (savedAs filename)
  onChange: (savedAs: string | null) => void; // Changed to return savedAs filename
  accept?: string;
  placeholder?: string;
  maxSizeMB?: number;
}

export const ModernFileUpload: React.FC<ModernFileUploadProps> = ({
  value,
  onChange,
  accept = '.pdf,.doc,.docx,.txt',
  placeholder = 'Drop your file here or click to browse',
  maxSizeMB = 10,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      const formData = new FormData();
      formData.append('folder', 'assignowl');
      formData.append('file', file);

      const response = await fetch('https://files.bluepen.co.in/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      
      if (result.success && result.files && result.files.length > 0) {
        const uploadedFile = result.files[0];
        setUploadedFileName(uploadedFile.originalName);
        onChange(uploadedFile.savedAs); // Return savedAs to parent
        setUploadProgress(100);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      onChange(null);
      setCurrentFile(null);
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = async (file: File | null) => {
    if (!file) return;
    
    if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
      alert(`File size must be less than ${maxSizeMB}MB`);
      return;
    }
    
    setCurrentFile(file);
    await uploadFile(file);
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
    setCurrentFile(null);
    setUploadedFileName('');
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
        {value || currentFile ? (
          <div className={styles.filePreview}>
            <div className={styles.fileInfo}>
              <div className={styles.fileIcon}>
                <FileText size={24} />
              </div>
              <div className={styles.fileDetails}>
                <div className={styles.fileName}>
                  {uploadedFileName || currentFile?.name || 'Uploaded file'}
                </div>
                {currentFile && (
                  <div className={styles.fileSize}>{formatFileSize(currentFile.size)}</div>
                )}
                {isUploading && (
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
              {value && !isUploading ? (
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
        </div>
      )}
    </div>
  );
};

export default ModernFileUpload;
