'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * PageTransition component for animating page transitions
 * Wraps page content with Framer Motion animations
 */
export default function PageTransition({ children, className = '' }: PageTransitionProps) {
  // Base variants for animating the page
  const variants = {
    hidden: { opacity: 0, y: 10 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered children animation for lists of items
 * Use this to animate lists of cards, grid items, etc.
 */
export function StaggeredList({ children, className = '' }: PageTransitionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={className}
    >
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants}>{children}</motion.div>
      }
    </motion.div>
  );
}

/**
 * FadeIn component for simple fade-in animations
 * Use for content that appears after the page loads
 */
export function FadeIn({ 
  children, 
  className = '',
  delay = 0,
  duration = 0.5,
  direction = 'up'
}: PageTransitionProps & { 
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}) {
  // Map directions to initial positions
  const directionMap = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
    none: {}
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScaleIn component for elements that scale up on entrance
 * Good for emphasis on important UI elements
 */
export function ScaleIn({ 
  children, 
  className = '',
  delay = 0,
  duration = 0.5
}: PageTransitionProps & { 
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration, delay, ease: [0.175, 0.885, 0.32, 1.275] }}
      className={className}
    >
      {children}
    </motion.div>
  );
} 