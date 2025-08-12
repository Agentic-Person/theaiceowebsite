'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { MotionConfig, LazyMotion, domAnimation } from 'framer-motion';
import { shouldReduceMotion } from '@/lib/animations';

interface AnimationContextValue {
  reduceMotion: boolean;
  animationsEnabled: boolean;
  setAnimationsEnabled: (enabled: boolean) => void;
  performanceMode: 'high' | 'low' | 'auto';
  setPerformanceMode: (mode: 'high' | 'low' | 'auto') => void;
}

const AnimationContext = createContext<AnimationContextValue | undefined>(undefined);

export const useAnimationContext = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimationContext must be used within AnimationProvider');
  }
  return context;
};

interface AnimationProviderProps {
  children: React.ReactNode;
  config?: {
    defaultEnabled?: boolean;
    defaultPerformanceMode?: 'high' | 'low' | 'auto';
    reducedMotionStrategy?: 'respect' | 'ignore' | 'force';
  };
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({ 
  children, 
  config = {} 
}) => {
  const {
    defaultEnabled = true,
    defaultPerformanceMode = 'auto',
    reducedMotionStrategy = 'respect',
  } = config;

  const [animationsEnabled, setAnimationsEnabled] = useState(defaultEnabled);
  const [performanceMode, setPerformanceMode] = useState<'high' | 'low' | 'auto'>(defaultPerformanceMode);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [devicePerformance, setDevicePerformance] = useState<'high' | 'low'>('high');

  // Check for reduced motion preference
  useEffect(() => {
    const checkReducedMotion = () => {
      if (reducedMotionStrategy === 'force') {
        setReduceMotion(true);
      } else if (reducedMotionStrategy === 'ignore') {
        setReduceMotion(false);
      } else {
        setReduceMotion(shouldReduceMotion());
      }
    };

    checkReducedMotion();

    // Listen for changes in motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => checkReducedMotion();
    
    // Check if addEventListener is supported (older browsers use addListener)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [reducedMotionStrategy]);

  // Detect device performance
  useEffect(() => {
    const detectPerformance = () => {
      // Check for various performance indicators
      const factors = {
        memory: (navigator as any).deviceMemory || 4,
        cores: navigator.hardwareConcurrency || 4,
        connection: (navigator as any).connection?.effectiveType || '4g',
      };

      // Simple performance scoring
      let score = 0;
      if (factors.memory >= 4) score++;
      if (factors.cores >= 4) score++;
      if (factors.connection === '4g' || factors.connection === 'wifi') score++;

      setDevicePerformance(score >= 2 ? 'high' : 'low');
    };

    detectPerformance();
  }, []);

  // Determine actual animations state based on settings
  useEffect(() => {
    if (reduceMotion) {
      setAnimationsEnabled(false);
    } else if (performanceMode === 'auto') {
      setAnimationsEnabled(devicePerformance === 'high');
    } else {
      setAnimationsEnabled(performanceMode === 'high');
    }
  }, [reduceMotion, performanceMode, devicePerformance]);

  const contextValue: AnimationContextValue = {
    reduceMotion,
    animationsEnabled,
    setAnimationsEnabled,
    performanceMode,
    setPerformanceMode,
  };

  return (
    <AnimationContext.Provider value={contextValue}>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig 
          reducedMotion={reduceMotion ? 'always' : 'never'}
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 100,
          }}
        >
          {children}
        </MotionConfig>
      </LazyMotion>
    </AnimationContext.Provider>
  );
};

// HOC for conditionally applying animations
export const withAnimation = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  return (props: P) => {
    const { animationsEnabled } = useAnimationContext();
    
    if (!animationsEnabled) {
      return <Component {...props} />;
    }
    
    return <Component {...props} />;
  };
};