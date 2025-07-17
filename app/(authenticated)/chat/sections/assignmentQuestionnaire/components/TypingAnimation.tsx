'use client';

import React from 'react';
import styles from './TypingAnimation.module.scss';

interface TypingAnimationProps {
  words: string[];
  className?: string;
}

export const TypingAnimation: React.FC<TypingAnimationProps> = ({ words, className = '' }) => {
  return (
    <div className={`${styles.typewriterText} ${className}`}>
      {words.map((word, index) => (
        <span 
          key={index} 
          className={styles.typingWord}
          style={{ animationDelay: `${index * 0.5 + 0.2}s` }}
        >
          {word}
        </span>
      ))}
      <span className={styles.typingCursor}>|</span>
    </div>
  );
};

export default TypingAnimation;
