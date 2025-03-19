import 'react';

declare module 'react' {
  interface ComponentProps {
    // Add React component props
  }
}

// Augment JSX namespace to support Three.js elements
declare namespace JSX {
  interface IntrinsicElements {
    'mesh': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    'sphereGeometry': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    'meshBasicMaterial': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    'cylinderGeometry': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
} 