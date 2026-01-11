import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type FontSize = 'small' | 'medium' | 'large';
type Contrast = 'normal' | 'high';

interface SettingsContextType {
  fontSize: FontSize;
  contrast: Contrast;
  setFontSize: (size: FontSize) => void;
  setContrast: (contrast: Contrast) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    const saved = localStorage.getItem('fontSize');
    return (saved as FontSize) || 'medium';
  });

  const [contrast, setContrastState] = useState<Contrast>(() => {
    const saved = localStorage.getItem('contrast');
    return (saved as Contrast) || 'normal';
  });

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
    document.documentElement.setAttribute('data-font-size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('contrast', contrast);
    document.documentElement.setAttribute('data-contrast', contrast);
  }, [contrast]);

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size);
  };

  const setContrast = (newContrast: Contrast) => {
    setContrastState(newContrast);
  };

  return (
    <SettingsContext.Provider value={{ fontSize, contrast, setFontSize, setContrast }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
}
