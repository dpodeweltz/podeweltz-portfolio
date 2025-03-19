'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

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
  const prevThemeRef = useRef(isDarkMode);
  const [themeKey, setThemeKey] = useState(isDarkMode ? 'dark' : 'light');
  const [mousePosition, setMousePosition] = useState({ 
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, 
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 
  });
  const [particles, setParticles] = useState<Array<{ x: number; y: number; z: number; color: string; size: number; initialX: number; initialY: number }>>([]);
  const [isMoving, setIsMoving] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lastUpdateTimeRef = useRef(Date.now());
  const rafRef = useRef<number | null>(null);
  
  // Use appropriate color palette based on theme
  const colorPalette = isDarkMode ? darkColorPalette : lightColorPalette;
  
  // Create new particles with the given palette with smooth initial positions
  const createNewParticles = (palette: string[]) => {
    const newParticles = [];
    for (let i = 0; i < particleCount; i++) {
      const initialX = Math.random() * window.innerWidth;
      const initialY = Math.random() * window.innerHeight;
      
      newParticles.push({
        x: initialX,
        y: initialY,
        z: Math.random() * 100,
        color: palette[Math.floor(Math.random() * palette.length)],
        size: Math.random() * particleSize + particleSize / 2,
        initialX,
        initialY
      });
    }
    return newParticles;
  };
  
  // Initialize component and handle SSR
  useEffect(() => {
    setMounted(true);
    
    // Initialize particles with center mouse position to avoid jumpy starts
    setMousePosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    prevThemeRef.current = isDarkMode;
    setThemeKey(isDarkMode ? 'dark' : 'light');
    
    // Initialize particles
    setParticles(createNewParticles(colorPalette));
    
    // Clean up animation frame on unmount
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);
  
  // Animate particles using requestAnimationFrame for smoother animation
  useEffect(() => {
    if (!mounted) return;
    
    const updateParticles = () => {
      // Use time-based animation for consistent speed regardless of frame rate
      const now = Date.now();
      const deltaTime = (now - lastUpdateTimeRef.current) / 16; // normalize to ~60fps
      lastUpdateTimeRef.current = now;
      
      setParticles(prev => {
        return prev.map(particle => {
          // Calculate distance from cursor to particle
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Smooth particle movement
          if (distance < maxDistance) {
            // Use inverse square law for attraction/repulsion effect with smoother transitions
            const force = (maxDistance - distance) / maxDistance;
            
            // Light mode has gentler, more spread out effect
            const forceFactor = isDarkMode ? 0.03 : 0.02;
            const depthFactor = isDarkMode ? 4 : 6;
            
            // Apply smooth movement with delta time
            return {
              ...particle,
              x: particle.x - (dx * force * forceFactor * deltaTime),
              y: particle.y - (dy * force * forceFactor * deltaTime),
              z: particle.z + force * depthFactor * 0.5 * deltaTime,
              initialX: particle.initialX,
              initialY: particle.initialY
            };
          }
          
          // Gradually return to initial position when not influenced
          const returnFactor = 0.02 * deltaTime;
          const jitterFactor = 0.2 * deltaTime;
          
          return {
            ...particle,
            x: particle.x + ((particle.initialX - particle.x) * returnFactor) + ((Math.random() - 0.5) * jitterFactor),
            y: particle.y + ((particle.initialY - particle.y) * returnFactor) + ((Math.random() - 0.5) * jitterFactor),
            z: particle.z > 0 ? particle.z - (0.3 * deltaTime) : 0,
            initialX: particle.initialX,
            initialY: particle.initialY
          };
        });
      });
      
      rafRef.current = requestAnimationFrame(updateParticles);
    };
    
    rafRef.current = requestAnimationFrame(updateParticles);
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [maxDistance, mounted, isDarkMode, mousePosition]);
  
  // Handle mouse movement with debouncing to prevent too many updates
  useEffect(() => {
    if (!mounted) return;
    
    let debounceTimeout: NodeJS.Timeout;
    
    const handleMouseMove = (event: MouseEvent) => {
      // Smooth mouse position updates with lerping
      setMousePosition(prev => ({
        x: prev.x + (event.clientX - prev.x) * 0.2,
        y: prev.y + (event.clientY - prev.y) * 0.2
      }));
      
      setIsMoving(true);
      
      // Reset the moving state after some time of inactivity
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        setIsMoving(false);
      }, 150);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(debounceTimeout);
    };
  }, [mounted]);
  
  // Update particles COMPLETELY when theme changes
  useEffect(() => {
    if (!mounted) return;
    
    // Check if dark mode actually changed
    if (prevThemeRef.current !== isDarkMode) {
      prevThemeRef.current = isDarkMode;
      setThemeKey(isDarkMode ? 'dark' : 'light');
      
      // Create entirely new set of particles with new theme colors
      // Keep current mouse position to avoid jumps
      const newParticles = createNewParticles(colorPalette);
      setParticles(newParticles);
    }
  }, [isDarkMode, colorPalette, mounted, particleCount, particleSize]);
  
  // If not mounted yet (SSR), don't render anything
  if (!mounted) return null;
  
  // Force a full re-render when theme changes by using a key
  return (
    <div 
      key={themeKey}
      className="fixed inset-0 pointer-events-none overflow-hidden z-10" 
      aria-hidden="true"
      id={`cursor-effect-${themeKey}`}
    >
      {/* Main cursor glow - larger in light mode for more coverage */}
      <motion.div
        className={`rounded-full absolute filter blur-[50px] mix-blend-screen ${
          isDarkMode ? 'w-[200px] h-[200px] opacity-30' : 'w-[300px] h-[300px] opacity-20'
        }`}
        animate={{
          x: mousePosition.x - (isDarkMode ? 100 : 150),
          y: mousePosition.y - (isDarkMode ? 100 : 150),
          scale: isMoving ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 120,
          mass: 1.2
        }}
        style={{
          background: `radial-gradient(circle, ${colorPalette[0]} 0%, ${colorPalette[1]} 50%, transparent 80%)`,
        }}
      />
      
      {/* Secondary glow for light mode only - creates a smoky effect */}
      {!isDarkMode && (
        <motion.div
          className="w-[500px] h-[500px] rounded-full absolute filter blur-[100px] opacity-10 mix-blend-multiply"
          animate={{
            x: mousePosition.x - 250,
            y: mousePosition.y - 250,
            scale: isMoving ? 1.3 : 1.1,
          }}
          transition={{
            type: "spring",
            damping: 35,
            stiffness: 80,
            mass: 2.0
          }}
          style={{
            background: `radial-gradient(circle, ${colorPalette[1]} 0%, ${colorPalette[3]} 60%, transparent 85%)`,
          }}
        />
      )}
      
      {/* 3D particles */}
      {particles.map((particle, index) => {
        // Calculate opacity based on z-depth for 3D effect
        const depthOpacity = (100 - particle.z) / 100 * particleOpacity;
        const scale = (100 - particle.z) / 100; // Smaller as it goes "deeper"
        
        // Light mode particles have more blur for a smoky effect
        const blurAmount = isDarkMode ? particle.z / 50 : particle.z / 30;
        const shadowSize = isDarkMode ? particle.size / 2 : particle.size;
        
        return (
          <motion.div
            key={`${themeKey}-particle-${index}`}
            className="absolute rounded-full mix-blend-screen"
            style={{
              backgroundColor: particle.color,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: depthOpacity,
              filter: `blur(${blurAmount}px)`,
              boxShadow: `0 0 ${shadowSize}px ${particle.color}`,
              zIndex: Math.floor(100 - particle.z),
            }}
            animate={{
              x: particle.x - (particle.size / 2),
              y: particle.y - (particle.size / 2),
              scale: scale,
            }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 80,
              mass: 0.8
            }}
          />
        );
      })}
      
      {/* Core cursor dot for precise tracking */}
      <motion.div
        className={`rounded-full absolute ${isDarkMode ? 'w-4 h-4' : 'w-5 h-5'}`}
        animate={{
          x: mousePosition.x - (isDarkMode ? 8 : 10),
          y: mousePosition.y - (isDarkMode ? 8 : 10),
          scale: isMoving ? 0.5 : 1,
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 100,
          mass: 0.6
        }}
        style={{
          background: `radial-gradient(circle, white 0%, ${colorPalette[0]} 80%)`,
          boxShadow: `0 0 10px ${colorPalette[0]}`,
        }}
      />
    </div>
  );
} 