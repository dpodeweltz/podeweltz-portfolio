'use client'

import { useContext } from 'react';
import { ThemeContext } from '../components/ThemeProvider';
import type { ThemeMode } from '../utils/theme';

// Define the type for theme context return
interface ThemeContextReturn {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isDarkMode: boolean;
}

// Create a default theme context for SSR fallback
const defaultThemeContext: ThemeContextReturn = {
  theme: 'system',
  isDarkMode: false,
  setTheme: () => {}
};

// Type guard to check if an object is a valid ThemeContextReturn
function isThemeContext(obj: unknown): obj is ThemeContextReturn {
  if (!obj || typeof obj !== 'object') return false;
  
  const candidate = obj as Record<string, unknown>;
  return (
    'theme' in candidate && 
    (candidate.theme === 'dark' || candidate.theme === 'light' || candidate.theme === 'system') &&
    'setTheme' in candidate && 
    typeof candidate.setTheme === 'function' &&
    'isDarkMode' in candidate && 
    typeof candidate.isDarkMode === 'boolean'
  );
}

/**
 * Custom hook to access theme context
 */
export function useTheme(): ThemeContextReturn {
  // Get the context from the provider
  const context = useContext(ThemeContext) as unknown;
  
  // Check if context matches our expected shape
  if (isThemeContext(context)) {
    return context;
  }
  
  // Return default as fallback
  return defaultThemeContext;
} 