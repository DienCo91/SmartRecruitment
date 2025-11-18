import { useTheme } from '@/contexts/theme';
import React from 'react';

interface IThemeWrapperProps {
  children: React.ReactNode;
}

const ThemeWrapper: React.FC<IThemeWrapperProps> = ({ children }) => {
  const { theme } = useTheme();
  return (
    <html lang="en" className={theme}>
      {children}
    </html>
  );
};

export default ThemeWrapper;
