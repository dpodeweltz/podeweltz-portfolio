'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

// Define window.cursorEffectTimeout globally
declare global {
  interface Window {
    cursorEffectTimeout?: number;
  }
}

interface CursorEffect3DProps {
  darkColorPalette?: string[];
  lightColorPalette?: string[];
  particleCount?: number;
  maxDistance?: number;
  particleSize?: number;
  particleOpacity?: number;
}

export default function CursorEffect3D({
  darkColorPalette = ['#3b82f6', '#6366f1', '#8b5cf6', '#d946ef', '#ec4899'],
  lightColorPalette = ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd', '#3730a3'],
  particleCount = 30,
  maxDistance = 150,
  particleSize = 8,
  particleOpacity = 0.6
}: CursorEffect3DProps) {
  const { isDarkMode } = useTheme();
  const [themeKey, setThemeKey] = useState(isDarkMode ? 'dark' : 'light');
  const [mousePosition, setMousePosition] = useState({ 
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, 
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 
  });
  const [particles, setParticles] = useState<Array<{ x: number; y: number; z: number; color: string; size: number; initialX: number; initialY: number }>>([]);
  const [isMoving, setIsMoving] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lastFrameTimeRef = useRef(0);
  const requestRef = useRef<number>();

  // Initialize on mount
  useEffect(() => {
    setMounted(true);
    // Initial particles setup
    const colorPalette = isDarkMode ? darkColorPalette : lightColorPalette;
    const newParticles = createNewParticles(colorPalette);
    setParticles(newParticles);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [mounted]);

  // Theme effect
  useEffect(() => {
    if (!mounted) return;
    
    console.log('Theme changed in CursorEffect3D:', isDarkMode ? 'dark' : 'light');
    setThemeKey(isDarkMode ? 'dark' : 'light');

    // Create entirely new particles when theme changes to ensure correct colors
    const colors = isDarkMode ? darkColorPalette : lightColorPalette;
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    
    const newParticles = Array.from({ length: particleCount }, () => {
      const x = Math.random() * viewportWidth;
      const y = Math.random() * viewportHeight;
      const z = Math.random() * 100 - 50;
      return {
        x,
        y, 
        z,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 3 + (particleSize || 8),
        initialX: x,
        initialY: y
      };
    });
    
    setParticles(newParticles);
    
    // Force a state update to trigger re-render with new colors
    setThemeKey(prevKey => prevKey === 'dark' ? 'dark-update' : 'light-update');
    
  }, [isDarkMode, darkColorPalette, lightColorPalette, particleCount, mounted, particleSize]);

  // Create new particles function
  const createNewParticles = (palette: string[]) => {
    if (typeof window === 'undefined') return [];
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    return Array.from({ length: particleCount }, () => {
      const x = Math.random() * viewportWidth;
      const y = Math.random() * viewportHeight;
      const z = Math.random() * 100 - 50;
      
      return {
        x,
        y,
        z,
        color: palette[Math.floor(Math.random() * palette.length)],
        size: Math.random() * 3 + particleSize,
        initialX: x,
        initialY: y
      };
    });
  };

  // Mouse movement handling with debounce for performance
  useEffect(() => {
    if (!mounted) return;
    
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
      setIsMoving(true);
      
      // Debounce the isMoving state
      if (typeof window !== 'undefined') {
        window.clearTimeout(window.cursorEffectTimeout);
        window.cursorEffectTimeout = window.setTimeout(() => {
          setIsMoving(false);
        }, 100);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.clearTimeout(window.cursorEffectTimeout);
      };
    }
    return undefined;
  }, [mounted]);

  // Animation frame for smooth particle movement
  useEffect(() => {
    if (!mounted) return;
    
    const updateParticles = () => {
      const currentTime = performance.now();
      const deltaTime = (currentTime - lastFrameTimeRef.current) / 16.67; // Normalize to ~60fps
      lastFrameTimeRef.current = currentTime;
      
      if (deltaTime === 0 || !particles.length) return;
      
      // Use time-based animation for smooth movement
      setParticles(prevParticles => {
        return prevParticles.map(particle => {
          // Calculate distance to mouse
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            // Attraction force - stronger when closer to mouse
            const force = (1 - distance / maxDistance) * 0.2;
            
            // Return to initial position when not moving
            const returnForce = isMoving ? 0 : 0.05;
            
            // Calculate new position with smooth lerping
            const newX = particle.x + dx * force * deltaTime * 0.06;
            const newY = particle.y + dy * force * deltaTime * 0.06;
            
            // Add return-to-initial-position behavior
            const returnX = particle.initialX - particle.x;
            const returnY = particle.initialY - particle.y;
            
            return {
              ...particle,
              x: newX + returnX * returnForce,
              y: newY + returnY * returnForce
            };
          }
          
          // Return to initial position if far from mouse
          if (!isMoving) {
            const returnX = particle.initialX - particle.x;
            const returnY = particle.initialY - particle.y;
            const returnForce = 0.03;
            
            return {
              ...particle,
              x: particle.x + returnX * returnForce * deltaTime,
              y: particle.y + returnY * returnForce * deltaTime
            };
          }
          
          return particle;
        });
      });
      
      requestRef.current = requestAnimationFrame(updateParticles);
    };
    
    lastFrameTimeRef.current = performance.now();
    requestRef.current = requestAnimationFrame(updateParticles);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [maxDistance, mousePosition, particles.length, isMoving, mounted]);

  // If not mounted yet (SSR), don't render anything
  if (!mounted) {
    return null;
  }

  // Current color palette based on theme
  const colorPalette = isDarkMode ? darkColorPalette : lightColorPalette;

  return (
    <div 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-10" 
      style={{ overflow: 'hidden' }}
      aria-hidden="true"
    >
      {/* Main cursor element */}
      <motion.div
        className="absolute rounded-full pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isMoving ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 150,
          mass: 0.1
        }}
        style={{
          width: 32,
          height: 32,
          backgroundColor: colorPalette[0],
          opacity: particleOpacity + 0.2,
          boxShadow: `0 0 20px ${colorPalette[0]}`,
        }}
      />
      
      {/* Particles that follow the cursor */}
      <div className="absolute top-0 left-0 w-full h-full">
        {particles.map((particle, index) => (
          <motion.div
            key={`${themeKey}-particle-${index}`}
            className="absolute rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: particleOpacity,
              scale: 1,
              x: particle.x - particle.size / 2,
              y: particle.y - particle.size / 2,
            }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 100,
              mass: 0.3 + Math.random() * 0.5,
            }}
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              zIndex: Math.floor(particle.z) + 20
            }}
          />
        ))}
      </div>
    </div>
  );
} 