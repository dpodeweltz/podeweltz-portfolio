'use client';

import { useContext } from 'react';
import { ThemeContext } from '../components/ThemeProvider';
import { ThemeMode } from '../utils/theme';

interface UseThemeReturn {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

/**
 * Custom hook for managing theme
 */
export function useTheme(): UseThemeReturn {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  // Toggle between light and dark
  const toggleTheme = () => {
    if (context.theme === 'system') {
      // If system, switch to explicit light/dark based on current appearance
      context.setTheme(context.isDarkMode ? 'light' : 'dark');
    } else {
      // Toggle between light and dark
      context.setTheme(context.theme === 'dark' ? 'light' : 'dark');
    }
  };
  
  return {
    ...context,
    toggleTheme,
  };
}

export default useTheme; 