'use client';

import React from 'react';
import styles from './Textarea.module.scss';

interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  className?: string;
  maxLength?: number;
}

export const Textarea: React.FC<TextareaProps> = ({
  value,
  onChange,
  placeholder,
  label,
  error,
  required = false,
  disabled = false,
  rows = 4,
  className = '',
  maxLength,
}) => {
  return (
    <div className={`${styles.textareaContainer} ${className}`}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={`${styles.textareaWrapper} ${error ? styles.error : ''}`}>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          className={styles.textarea}
        />
        {maxLength && (
          <div className={styles.charCount}>
            {value.length}/{maxLength}
          </div>
        )}
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default Textarea;
