'use client';

import React, { useRef, useState } from 'react';
import { Upload, X, FileText, Check, Loader2 } from 'lucide-react';
import { Button } from '@/app/ui';
import styles from './ModernFileUpload.module.scss';

interface UploadedFile {
  savedAs: string;
  originalName: string;
  size?: number;
  isUploading?: boolean;
  uploadProgress?: number;
}

interface ModernFileUploadProps {
  value?: string[] | null; // Array of savedAs filenames
  onChange: (savedAsArray: string[] | null) => void; // Return array of savedAs filenames
  accept?: string;
  placeholder?: string;
  maxSizeMB?: number;
  maxFiles?: number;
}

export const ModernFileUpload: React.FC<ModernFileUploadProps> = ({
  value = [],
  onChange,
  accept = '.pdf,.doc,.docx,.txt',
  placeholder = 'Add files',
  maxSizeMB = 10,
  maxFiles = 5,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<Map<string, UploadedFile>>(new Map());

  const uploadFile = async (file: File): Promise<string | null> => {
    const tempId = `temp_${Date.now()}_${Math.random()}`;
    
    // Add to uploading files
    setUploadingFiles(prev => new Map(prev).set(tempId, {
      savedAs: '',
      originalName: file.name,
      size: file.size,
      isUploading: true,
      uploadProgress: 0
    }));
    
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
        
        // Remove from uploading files
        setUploadingFiles(prev => {
          const newMap = new Map(prev);
          newMap.delete(tempId);
          return newMap;
        });
        
        // Add to uploaded files
        const currentFiles = value || [];
        onChange([...currentFiles, uploadedFile.savedAs]);
        
        return uploadedFile.savedAs;
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      
      // Remove from uploading files on error
      setUploadingFiles(prev => {
        const newMap = new Map(prev);
        newMap.delete(tempId);
        return newMap;
      });
      
      return null;
    }
  };

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return;
    
    const currentCount = (value?.length || 0) + uploadingFiles.size;
    const filesToUpload = Array.from(files).slice(0, maxFiles - currentCount);
    
    for (const file of filesToUpload) {
      if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
        alert(`File "${file.name}" is too large. Maximum size is ${maxSizeMB}MB`);
        continue;
      }
      
      await uploadFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
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

  const handleRemoveFile = (savedAs: string) => {
    const currentFiles = value || [];
    const updatedFiles = currentFiles.filter(file => file !== savedAs);
    onChange(updatedFiles.length > 0 ? updatedFiles : null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const canAddMore = (value?.length || 0) + uploadingFiles.size < maxFiles;

  return (
    <div className={styles.uploadContainer}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple
        onChange={(e) => handleFileSelect(e.target.files)}
        className={styles.hiddenInput}
      />
      
      {/* Files Grid */}
      <div className={styles.filesGrid}>
        {/* Uploaded Files */}
        {value?.map((savedAs, index) => (
          <div key={savedAs} className={styles.fileCard}>
            <div className={styles.fileIcon}>
              <FileText size={20} />
            </div>
            <div className={styles.fileInfo}>
              <div className={styles.fileName}>{savedAs}</div>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveFile(savedAs)}
              className={styles.removeButton}
            >
              <X size={14} />
            </button>
          </div>
        ))}

        {/* Uploading Files */}
        {Array.from(uploadingFiles.entries()).map(([tempId, file]) => (
          <div key={tempId} className={styles.fileCard}>
            <div className={styles.fileIcon}>
              <FileText size={20} />
            </div>
            <div className={styles.fileInfo}>
              <div className={styles.fileName}>{file.originalName}</div>
              {file.size && (
                <div className={styles.fileSize}>{formatFileSize(file.size)}</div>
              )}
            </div>
            <div className={styles.loadingIcon}>
              <Loader2 size={16} className={styles.spinner} />
            </div>
          </div>
        ))}

        {/* Add More Button */}
        {canAddMore && (
          <div 
            className={`${styles.addButton} ${isDragOver ? styles.dragOver : ''}`}
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className={styles.addIcon}>
              <Upload size={20} />
            </div>
            <div className={styles.addText}>
              {(value?.length || 0) === 0 ? placeholder : 'Add more'}
            </div>
          </div>
        )}
      </div>

      {/* Info Text */}
      <div className={styles.infoText}>
        Supports {accept.split(',').join(', ')} up to {maxSizeMB}MB each • Max {maxFiles} files
      </div>
    </div>
  );
};

export default ModernFileUpload;
