// app/account-setup/ProgressContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type ProgressContextType = {
  progress: number;
  setProgress: (value: number) => void;
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressAccountSetupProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState<number>(0);

  return (
    <ProgressContext.Provider value={{ progress, setProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgressAccountSetup = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
