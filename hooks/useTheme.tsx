'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Define theme types
type Theme = 'dark' | 'light' | 'system';

// Create the context with proper type
interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  setTheme: (theme: Theme) => void;
}

// Create context with a default empty implementation to avoid undefined errors
const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  isDarkMode: false,
  setTheme: () => {}
});

// ThemeProvider component
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Update the theme function
  const setTheme = (newTheme: Theme) => {
    try {
      console.log('Setting theme to:', newTheme);
      setThemeState(newTheme);
      localStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Error setting theme:', error);
    }
  };

  // Check if system prefers dark mode
  const checkSystemDarkMode = (): boolean => {
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (error) {
      console.error('Error checking system theme:', error);
      return false;
    }
  };

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    try {
      // Don't do anything on the server
      setMounted(true);
      
      // Get stored theme or use system preference
      const storedTheme = localStorage.getItem('theme') as Theme | null;
      const initialTheme = storedTheme || 'system';
      setThemeState(initialTheme);
      
      // Log initial state
      console.log('Initial theme:', initialTheme);
    } catch (error) {
      console.error('Error initializing theme:', error);
    }
  }, []);

  // Apply theme effect whenever theme changes
  useEffect(() => {
    if (!mounted) return;

    try {
      const prefersDark = 
        theme === 'dark' || 
        (theme === 'system' && checkSystemDarkMode());
      
      console.log(`Applying theme: ${theme}, isDarkMode: ${prefersDark}`);
      setIsDarkMode(prefersDark);
      
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (error) {
      console.error('Error applying theme:', error);
    }
  }, [theme, mounted]);

  // Watch for system theme changes
  useEffect(() => {
    if (!mounted || theme !== 'system') return;

    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = () => {
        console.log('System theme changed, isDarkMode:', mediaQuery.matches);
        setIsDarkMode(mediaQuery.matches);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } catch (error) {
      console.error('Error setting up media query listener:', error);
      return undefined;
    }
  }, [theme, mounted]);

  // Don't render anything until mounted to avoid hydration mismatches
  if (!mounted) {
    return <>{children}</>;
  }

  // Provide theme context to children
  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to use the theme context
export function useTheme() {
  // Using useContext directly with the ThemeContext
  const context = useContext(ThemeContext);
  
  // No need to check for undefined since we provided default values
  return context;
} 