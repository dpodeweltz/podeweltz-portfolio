'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CursorEffectProps {
  colorPalette?: string[];
}

export default function CursorEffect({ 
  colorPalette = ['#3b82f6', '#6366f1', '#8b5cf6', '#d946ef', '#ec4899'] 
}: CursorEffectProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
      setIsMoving(true);
      
      // Reset the moving state after some time of inactivity
      const timeout = setTimeout(() => {
        setIsMoving(false);
      }, 150);
      
      return () => clearTimeout(timeout);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Make this effect accessible - hide from screen readers and ensure it's not distracting
  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden z-10" 
      aria-hidden="true"
    >
      {/* Main glow effect */}
      <motion.div
        className="w-[300px] h-[300px] rounded-full absolute filter blur-[80px] opacity-30 mix-blend-screen"
        animate={{
          x: mousePosition.x - 150,
          y: mousePosition.y - 150,
          scale: isMoving ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
          mass: 0.5,
        }}
        style={{
          background: `radial-gradient(circle, ${colorPalette[0]} 0%, ${colorPalette[1]} 30%, ${colorPalette[2]} 70%)`,
        }}
      />
      
      {/* Floating elements that follow cursor with offset */}
      {colorPalette.map((color, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full mix-blend-screen filter blur-sm"
          style={{ 
            backgroundColor: color,
            width: `${20 + index * 8}px`,
            height: `${20 + index * 8}px`,
            opacity: 0.4 - (index * 0.05)
          }}
          animate={{
            x: mousePosition.x - (10 + index * 4) + Math.sin(index) * 40,
            y: mousePosition.y - (10 + index * 4) + Math.cos(index) * 40,
            scale: isMoving ? 1.1 : 0.9,
          }}
          transition={{
            type: "spring",
            damping: 20 + index * 5,
            stiffness: 300 - index * 30,
            mass: 0.5 + index * 0.1,
          }}
        />
      ))}
      
      {/* Core cursor effect */}
      <motion.div
        className="w-8 h-8 rounded-full absolute"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isMoving ? 0.6 : 1,
        }}
        transition={{
          type: "spring",
          damping: 10,
          stiffness: 400,
          mass: 0.2,
        }}
        style={{
          background: `radial-gradient(circle, white 0%, ${colorPalette[0]} 70%, ${colorPalette[1]} 100%)`,
          boxShadow: `0 0 15px ${colorPalette[0]}, 0 0 30px ${colorPalette[2]}`,
        }}
      />
    </div>
  );
} 