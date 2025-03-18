'use client';

import { useTheme } from '../../hooks/useTheme';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, setTheme, isDarkMode } = useTheme();
  
  console.log('ThemeToggle rendering - current theme:', theme, 'isDarkMode:', isDarkMode);
  
  // Directly toggle between light and dark only
  const handleToggle = () => {
    console.log('ThemeToggle clicked - toggling theme from:', theme);
    // Simplified toggle - just light and dark to troubleshoot
    const newTheme = isDarkMode ? 'light' : 'dark';
    console.log('Setting new theme to:', newTheme);
    setTheme(newTheme);
    
    // Force apply theme directly to document
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };
  
  return (
    <button
      onClick={handleToggle}
      className={`p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200'} ${className}`}
      aria-label={`Toggle theme, current theme is ${isDarkMode ? 'dark' : 'light'}`}
    >
      {isDarkMode ? (
        <MoonIcon className="h-5 w-5" aria-hidden="true" />
      ) : (
        <SunIcon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
};

export default ThemeToggle; 