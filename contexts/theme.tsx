'use client';

import ThemeWrapper from '@/layout/theme-wrapper';
import React, { createContext, useContext, useState, ReactNode } from 'react';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

type ThemeContextType = {
  theme: Theme;
  setTheme: (value: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeWrapper>{children}</ThemeWrapper>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    return {
      theme: Theme.LIGHT,
      setTheme: () => {},
    };
  }
  return context;
};
