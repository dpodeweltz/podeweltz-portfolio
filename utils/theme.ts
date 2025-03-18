/**
 * Theme utility to manage dark/light mode and theme consistency
 */

export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Get the current theme from localStorage or default to system
 */
export const getStoredTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'system';
  
  const theme = (localStorage.getItem('theme') as ThemeMode) || 'system';
  console.log('getStoredTheme:', theme);
  return theme;
};

/**
 * Set the theme in localStorage and apply it to the document
 */
export const setTheme = (theme: ThemeMode): void => {
  if (typeof window === 'undefined') return;
  
  console.log('setTheme called with:', theme);
  
  // Save to localStorage
  localStorage.setItem('theme', theme);
  
  // Apply theme
  applyTheme(theme);
};

/**
 * Apply theme to the document based on the selected theme mode
 */
export const applyTheme = (theme: ThemeMode): void => {
  if (typeof window === 'undefined') return;
  
  console.log('applyTheme called with:', theme);
  
  const isDark = 
    theme === 'dark' || 
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  console.log('isDark:', isDark);
  
  // Add or remove the 'dark' class on the document
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  console.log('dark class:', document.documentElement.classList.contains('dark'));
};

/**
 * Initialize theme based on stored preference
 */
export const initTheme = (): void => {
  if (typeof window === 'undefined') return;
  
  console.log('initTheme called');
  
  // Get stored theme
  const theme = getStoredTheme();
  
  // Apply it
  applyTheme(theme);
  
  // Listen for system preference changes
  if (theme === 'system') {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      console.log('System preference changed');
      applyTheme('system');
    });
  }
};

export default {
  getStoredTheme,
  setTheme,
  applyTheme,
  initTheme,
}; 