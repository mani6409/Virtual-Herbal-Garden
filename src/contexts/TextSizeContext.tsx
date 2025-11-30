import React, { createContext, useContext, useState, useEffect } from 'react';

type TextSize = 'small' | 'medium' | 'large' | 'extra-large';

interface TextSizeContextType {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  getTextSizeClass: () => string;
}

const TextSizeContext = createContext<TextSizeContextType | undefined>(undefined);

export const useTextSize = () => {
  const context = useContext(TextSizeContext);
  if (!context) {
    throw new Error('useTextSize must be used within a TextSizeProvider');
  }
  return context;
};

export const TextSizeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [textSize, setTextSize] = useState<TextSize>('medium');

  useEffect(() => {
    const savedSize = localStorage.getItem('textSize') as TextSize;
    if (savedSize && ['small', 'medium', 'large', 'extra-large'].includes(savedSize)) {
      setTextSize(savedSize);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('textSize', textSize);
    
    // Apply text size to document root
    const root = document.documentElement;
    root.classList.remove('text-small', 'text-medium', 'text-large', 'text-extra-large');
    root.classList.add(`text-${textSize}`);
  }, [textSize]);

  const getTextSizeClass = () => {
    switch (textSize) {
      case 'small':
        return 'text-sm';
      case 'medium':
        return 'text-base';
      case 'large':
        return 'text-lg';
      case 'extra-large':
        return 'text-xl';
      default:
        return 'text-base';
    }
  };

  return (
    <TextSizeContext.Provider value={{ textSize, setTextSize, getTextSizeClass }}>
      {children}
    </TextSizeContext.Provider>
  );
};