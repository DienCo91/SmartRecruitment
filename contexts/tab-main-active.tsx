'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type TabActiveType = {
  tab: { title: string; link: string };
  setTab: (value: { title: string; link: string }) => void;
};

const ProgressContext = createContext<TabActiveType | undefined>(undefined);

export const TabActiveProvider = ({ children }: { children: ReactNode }) => {
  const [tab, setTab] = useState({ title: 'Home', link: '/home' });

  return <ProgressContext.Provider value={{ tab, setTab }}>{children}</ProgressContext.Provider>;
};

export const useTabMainActive = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
