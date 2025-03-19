'use client';

import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme, isDarkMode } = useTheme();
  
  // Handle mounting for SSR
  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  // Don't render anything during SSR to avoid hydration mismatch
  if (!mounted) {
    return null;
  }
  
  console.log('ThemeToggle rendering - current theme:', theme, 'isDarkMode:', isDarkMode);
  
  // Enhanced toggle function with direct DOM manipulation as a fallback
  const handleToggle = () => {
    console.log('ThemeToggle clicked - toggling theme from:', theme, 'isDarkMode:', isDarkMode);
    
    try {
      // Force a direct toggle between light and dark
      const newTheme = isDarkMode ? 'light' : 'dark';
      console.log('Setting new theme to:', newTheme);
      
      // Apply the theme using the context
      setTheme(newTheme);
      
      // Also force apply the theme directly to the document as a backup
      if (isDarkMode) {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
      
      // Force store in localStorage as backup
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
      }
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  };
  
  return (
    <button
      onClick={handleToggle}
      className={`p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        isDarkMode 
          ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200'
      } ${className}`}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode, currently in ${isDarkMode ? 'dark' : 'light'} mode`}
    >
      {isDarkMode ? (
        <SunIcon className="h-5 w-5" aria-hidden="true" />
      ) : (
        <MoonIcon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
};

export default ThemeToggle; 