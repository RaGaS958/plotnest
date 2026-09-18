import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { PlotNestLogo } from '../branding/PlotNestLogo';

interface SplashScreenProps {
  onComplete: () => void;
  showTagline?: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, showTagline = true }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Preparing your property experience...');
  const shouldReduceMotion = useReducedMotion();
  
  useEffect(() => {
    // Prevent scrolling while splash is active
    document.body.style.overflow = 'hidden';
    
    // Progress simulation
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 20;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
      }
      setProgress(Math.min(currentProgress, 100));
    }, 150);

    // Text rotation
    const texts = [
      'Preparing your property experience...',
      'Loading verified projects...',
      'Preparing plot inventory...',
      'Welcome to PlotNest'
    ];
    let textIndex = 0;
    const textInterval = setInterval(() => {
      textIndex++;
      if (textIndex < texts.length) {
        setLoadingText(texts[textIndex]);
      }
    }, 450);

    // Completion timeout (max 2 seconds)
    const timeout = setTimeout(() => {
      clearInterval(interval);
      clearInterval(textInterval);
      setProgress(100);
      setLoadingText('Welcome to PlotNest');
      
      // Delay completion callback to allow exit animation
      setTimeout(() => {
        document.body.style.overflow = 'auto';
        onComplete();
      }, 500); // Wait for exit animation
    }, 1800);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
      clearTimeout(timeout);
      document.body.style.overflow = 'auto';
    };
  }, [onComplete]);

  // Subtle land/grid motif for background
  const gridMotif = (
    <div className="absolute inset-0 z-0 opacity-[0.04] text-[#14532D] pointer-events-none flex items-center justify-center overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        {/* Subtle plot boundaries */}
        <motion.path 
          d="M 240 160 L 400 160 L 400 320 L 240 320 Z" 
          fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="2" 
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.path 
          d="M 400 160 L 640 160 L 640 400 L 480 400 L 480 240 L 400 240 Z" 
          fill="currentColor" fillOpacity="0.02" stroke="currentColor" strokeWidth="2" 
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
        />
        <motion.path 
          d="M 160 320 L 400 320 L 400 480 L 160 480 Z" 
          fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeWidth="2" 
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
        />
      </svg>
    </div>
  );

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#FDFCFB] flex flex-col items-center justify-center text-[#152018]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
    >
      {gridMotif}
      
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md px-6">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 relative"
        >
          {/* Subtle light sweep effect */}
          {!shouldReduceMotion && (
            <motion.div
              className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/80 to-transparent blur-md"
              initial={{ x: '-150%', opacity: 0 }}
              animate={{ x: '150%', opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
            />
          )}
          <PlotNestLogo variant="large" size="xl" />
        </motion.div>

        {/* Progress Section */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="w-full flex flex-col items-center gap-4"
        >
          {/* Thin loading line */}
          <div className="w-full h-px bg-slate-200 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 bottom-0 bg-[#D4AF37]"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.15 }}
            />
          </div>
          
          <div className="flex flex-col items-center gap-1">
            <div className="font-mono text-[10px] font-semibold tracking-widest text-slate-400">
              {Math.floor(progress)}%
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={loadingText}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -2 }}
                transition={{ duration: 0.2 }}
                className="text-[10px] text-slate-400 uppercase tracking-widest font-medium text-center h-4"
              >
                {loadingText}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
