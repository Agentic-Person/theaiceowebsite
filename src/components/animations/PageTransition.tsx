'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { pageTransitionVariants, durations } from '@/lib/animations';
import { useAnimationContext } from './AnimationProvider';

interface PageTransitionProps {
  children: React.ReactNode;
  mode?: 'wait' | 'sync' | 'popLayout';
  className?: string;
  customVariants?: Variants;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  mode = 'wait',
  className = '',
  customVariants,
}) => {
  const pathname = usePathname();
  const { animationsEnabled, reduceMotion } = useAnimationContext();
  const [isLoading, setIsLoading] = useState(false);

  // Use custom variants or defaults
  const variants = customVariants || pageTransitionVariants;

  // If animations are disabled or reduced motion is on, render children directly
  if (!animationsEnabled || reduceMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode={mode}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Loading transition overlay
interface LoadingTransitionProps {
  isLoading: boolean;
  color?: string;
  duration?: number;
}

export const LoadingTransition: React.FC<LoadingTransitionProps> = ({
  isLoading,
  color = '#36b0d9',
  duration = durations.normal,
}) => {
  const { animationsEnabled } = useAnimationContext();

  if (!animationsEnabled) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{ duration, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            backgroundColor: color,
            transformOrigin: 'left',
            zIndex: 9999,
          }}
        />
      )}
    </AnimatePresence>
  );
};

// Fade transition wrapper
interface FadeTransitionProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
}

export const FadeTransition: React.FC<FadeTransitionProps> = ({
  children,
  duration = durations.slow,
  delay = 0,
  className = '',
}) => {
  const { animationsEnabled } = useAnimationContext();

  if (!animationsEnabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Slide transition wrapper
interface SlideTransitionProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  delay?: number;
  className?: string;
}

export const SlideTransition: React.FC<SlideTransitionProps> = ({
  children,
  direction = 'up',
  duration = durations.slow,
  delay = 0,
  className = '',
}) => {
  const { animationsEnabled } = useAnimationContext();

  if (!animationsEnabled) {
    return <div className={className}>{children}</div>;
  }

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 20, opacity: 0 };
      case 'down': return { y: -20, opacity: 0 };
      case 'left': return { x: 20, opacity: 0 };
      case 'right': return { x: -20, opacity: 0 };
      default: return { y: 20, opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      animate={{ x: 0, y: 0, opacity: 1 }}
      exit={getInitialPosition()}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Route transition hook
export const useRouteTransition = () => {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousPath, setPreviousPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== previousPath) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setPreviousPath(pathname);
      }, durations.slow * 1000);

      return () => clearTimeout(timer);
    }
  }, [pathname, previousPath]);

  return {
    isTransitioning,
    currentPath: pathname,
    previousPath,
  };
};