import 'react'
import { ReactNode } from 'react';

// Declare missing types for React hooks
declare module 'react' {
  // Fix useState type
  function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void]
  
  // Fix useEffect type
  function useEffect(effect: () => void | (() => void), deps?: ReadonlyArray<unknown>): void
  
  // Fix useRef type
  function useRef<T>(initialValue: T): { current: T }
  
  // Fix createContext type
  function createContext<T>(defaultValue: T): React.Context<T>
}

// Fix JSX namespace for Three.js components
declare namespace JSX {
  interface IntrinsicElements {
    'mesh': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    'sphereGeometry': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    'meshBasicMaterial': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    'cylinderGeometry': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
  }
}

// Augment React namespace
declare namespace React {
  // Add proper typing for context
  interface Context<T> {
    Provider: Provider<T>;
    Consumer: Consumer<T>;
    displayName?: string;
  }
}

// Define ThemeMode type
type ThemeMode = 'dark' | 'light' | 'system';

// Define ThemeContextType
interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isDarkMode: boolean;
} 