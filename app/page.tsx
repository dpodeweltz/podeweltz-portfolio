'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import PageTransition from '../components/PageTransition';
import CursorEffect3D from '../components/CursorEffect3D';
import { useTheme } from '../hooks/useTheme';

export default function Home() {
  const { theme, isDarkMode } = useTheme();
  
  // Debug effect to log theme state changes
  useEffect(() => {
    console.log('Home page rendered with theme:', theme, 'isDarkMode:', isDarkMode);
  }, [theme, isDarkMode]);

  // Animation variants for particles to ensure smooth initial animations
  const particleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: isDarkMode ? 0.2 : 0.15,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };
  
  // Smoke variants for light mode
  const smokeVariants = {
    hidden: { opacity: 0, scale: 0.2 },
    visible: (i: number) => ({
      opacity: isDarkMode ? 0 : [0.05, 0.1, 0.2, 0.15][i % 4],
      scale: 1,
      transition: {
        delay: i * 0.2 + 0.3,
        duration: 1.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen">
        {/* Background gradient - smoother transition between light/dark modes */}
        <div className="h-screen w-full absolute top-0 left-0 -z-10 bg-white dark:bg-gray-900 transition-colors duration-700">
          {/* Overlay gradient effect that's visible in both modes but with different opacity */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-100/30 to-indigo-100/40 dark:from-blue-900 dark:to-gray-900 opacity-80 dark:opacity-100 transition-colors duration-700"></div>
        </div>

        {/* Animated particles - using aria-hidden to hide them from screen readers */}
        <div className="absolute inset-0 -z-5" aria-hidden="true">
          {/* Light mode particles are larger and more spread out */}
          <motion.div 
            className={`absolute top-1/4 left-1/4 rounded-full animate-pulse ${isDarkMode ? 'w-4 h-4 bg-blue-400' : 'w-8 h-8 bg-blue-300'}`}
            variants={particleVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          ></motion.div>
          <motion.div 
            className={`absolute top-3/4 left-1/3 rounded-full animate-pulse ${isDarkMode ? 'w-6 h-6 bg-blue-300' : 'w-10 h-10 bg-indigo-200'}`}
            variants={particleVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          ></motion.div>
          <motion.div 
            className={`absolute top-1/3 left-2/3 rounded-full animate-pulse ${isDarkMode ? 'w-5 h-5 bg-indigo-400' : 'w-12 h-12 bg-blue-200'}`}
            variants={particleVariants}
            initial="hidden"
            animate="visible"
            custom={2}
          ></motion.div>
          <motion.div 
            className={`absolute top-2/3 left-3/4 rounded-full animate-pulse ${isDarkMode ? 'w-3 h-3 bg-purple-400' : 'w-16 h-16 bg-indigo-100'}`}
            variants={particleVariants}
            initial="hidden"
            animate="visible"
            custom={3}
          ></motion.div>
          
          {/* Additional particles for a more dynamic look - larger for light mode */}
          <motion.div 
            className={`absolute top-1/2 left-1/5 rounded-full animate-pulse ${isDarkMode ? 'w-5 h-5 bg-blue-500' : 'w-20 h-20 bg-blue-200'}`} 
            style={{ animationDuration: '3s' }}
            variants={particleVariants}
            initial="hidden"
            animate="visible"
            custom={4}
          ></motion.div>
          <motion.div 
            className={`absolute top-1/6 left-2/5 rounded-full animate-pulse ${isDarkMode ? 'w-3 h-3 bg-indigo-500' : 'w-14 h-14 bg-blue-100'}`} 
            style={{ animationDuration: '4s' }}
            variants={particleVariants}
            initial="hidden"
            animate="visible"
            custom={5}
          ></motion.div>
          <motion.div 
            className={`absolute top-4/5 left-1/2 rounded-full animate-pulse ${isDarkMode ? 'w-4 h-4 bg-blue-200' : 'w-16 h-16 bg-indigo-100'}`} 
            style={{ animationDuration: '5s' }}
            variants={particleVariants}
            initial="hidden"
            animate="visible"
            custom={6}
          ></motion.div>
          <motion.div 
            className={`absolute top-2/5 left-4/5 rounded-full animate-pulse ${isDarkMode ? 'w-6 h-6 bg-purple-300' : 'w-24 h-24 bg-blue-100'}`} 
            style={{ animationDuration: '6s' }}
            variants={particleVariants}
            initial="hidden"
            animate="visible"
            custom={7}
          ></motion.div>
          
          {/* Extra smoke-like elements for light mode with smooth fade-in */}
          {!isDarkMode && (
            <>
              <motion.div 
                className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-blue-200/20 blur-xl"
                variants={smokeVariants}
                initial="hidden"
                animate="visible"
                custom={0}
              ></motion.div>
              <motion.div 
                className="absolute top-2/3 left-1/2 w-60 h-60 rounded-full bg-indigo-100/30 blur-3xl"
                variants={smokeVariants}
                initial="hidden"
                animate="visible"
                custom={1}
              ></motion.div>
              <motion.div 
                className="absolute top-1/6 left-3/4 w-52 h-52 rounded-full bg-blue-100/20 blur-2xl"
                variants={smokeVariants}
                initial="hidden"
                animate="visible"
                custom={2}
              ></motion.div>
              <motion.div 
                className="absolute top-4/5 left-1/5 w-72 h-72 rounded-full bg-indigo-200/10 blur-3xl"
                variants={smokeVariants}
                initial="hidden"
                animate="visible"
                custom={3}
              ></motion.div>
            </>
          )}
        </div>

        {/* 3D cursor effect layer with theme-specific colors */}
        <CursorEffect3D 
          darkColorPalette={['#3b82f6', '#6366f1', '#8b5cf6', '#d946ef', '#ec4899']} 
          lightColorPalette={['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd', '#3730a3']}
          particleCount={isDarkMode ? 20 : 30} 
          maxDistance={isDarkMode ? 200 : 250}
          particleSize={isDarkMode ? 12 : 18}
          particleOpacity={isDarkMode ? 0.8 : 0.5}
        />

        {/* Main content with contrasting colors for testing */}
        <div className="relative z-10 pt-32 pb-20 px-6 flex flex-col items-center justify-center min-h-screen text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            David Podeweltz
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-6 text-gray-700 dark:text-gray-300"
          >
            Full Stack Developer & UX Designer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-lg text-center mb-8 text-gray-700 dark:text-gray-300"
          >
            Welcome to my portfolio. I specialize in creating modern, responsive web applications 
            with clean code and intuitive user experiences. My passion lies in building digital 
            solutions that make a difference.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Button 
              href="/projects"
              variant="primary"
              size="lg"
            >
              View My Work
            </Button>
            <Button 
              href="/contact"
              variant="outline"
              size="lg"
            >
              Contact Me
            </Button>
          </motion.div>
        </div>

        {/* Skip to content link for accessibility */}
        <a 
          href="#main-content" 
          className="absolute top-0 left-0 p-2 -translate-y-full focus:translate-y-0 bg-blue-600 text-white z-50"
        >
          Skip to content
        </a>
      </div>
    </PageTransition>
  );
}