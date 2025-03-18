'use client';

import { useEffect, createContext, useState } from 'react';
import { getStoredTheme, ThemeMode } from '../utils/theme';

// Create theme context
export const ThemeContext = createContext<{
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isDarkMode: boolean;
}>({
  theme: 'system',
  setTheme: () => {},
  isDarkMode: false,
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * ThemeProvider initializes the theme based on user preferences
 * and provides theme context to the application
 */
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>('system');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [themeChangeTimestamp, setThemeChangeTimestamp] = useState(0);

  // The setTheme function that components will use
  const setTheme = (newTheme: ThemeMode) => {
    try {
      console.log('Setting theme to:', newTheme);
      setThemeState(newTheme);
      localStorage.setItem('theme', newTheme);
      setThemeChangeTimestamp(Date.now());
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
      const storedTheme = getStoredTheme();
      console.log('Initial stored theme:', storedTheme);
      
      // Check if dark mode is active
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      console.log('System prefers dark mode:', prefersDark);
      
      const shouldBeDark = storedTheme === 'dark' || (storedTheme === 'system' && prefersDark);
      console.log('Should be dark:', shouldBeDark);
      
      // Update state
      setThemeState(storedTheme);
      setIsDarkMode(shouldBeDark);
      
      // Apply to document directly
      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      console.log('Initial setup complete, dark class:', document.documentElement.classList.contains('dark'));
    } catch (error) {
      console.error('Error in ThemeProvider:', error);
    }
  }, []);

  // Apply theme effect whenever theme changes
  useEffect(() => {
    if (!mounted) return;

    try {
      const applyTheme = () => {
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
      };
      
      // Apply theme with a small delay to ensure it takes effect
      // This helps avoid flicker and ensures components relying on theme react correctly
      if (themeChangeTimestamp > 0) {
        const timeout = setTimeout(applyTheme, 5);
        return () => clearTimeout(timeout);
      } else {
        applyTheme();
      }
    } catch (error) {
      console.error('Error applying theme:', error);
    }
  }, [theme, mounted, themeChangeTimestamp]);
  
  // Watch for system theme changes
  useEffect(() => {
    if (!mounted || theme !== 'system') return;

    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = () => {
        console.log('System preference changed to dark:', mediaQuery.matches);
        if (theme === 'system') {
          setIsDarkMode(mediaQuery.matches);
          setThemeChangeTimestamp(Date.now());
          if (mediaQuery.matches) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      };
      
      mediaQuery.addEventListener('change', handleChange);
      
      // Cleanup
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    } catch (error) {
      console.error('Error setting up media query listener:', error);
      return undefined;
    }
  }, [theme, mounted]);

  // Provide a consistent UI during SSR by avoiding theme flash
  // This ensures the app is rendered without theme until client-side JS runs
  if (!mounted) {
    // Prevent theme flash during SSR/hydration
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 