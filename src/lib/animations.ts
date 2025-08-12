import { Variants } from 'framer-motion';

// Easing functions
export const easings = {
  easeInOut: [0.4, 0, 0.2, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  spring: { type: 'spring', damping: 20, stiffness: 100 },
  smooth: [0.43, 0.13, 0.23, 0.96],
} as const;

// Animation durations
export const durations = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.6,
  verySlow: 0.8,
} as const;

// Fade animations
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: durations.slow, ease: easings.easeOut }
  },
  exit: { 
    opacity: 0,
    transition: { duration: durations.normal, ease: easings.easeIn }
  },
};

// Slide animations
export const slideVariants = {
  up: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: durations.slow, ease: easings.easeOut }
    },
  },
  down: {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: durations.slow, ease: easings.easeOut }
    },
  },
  left: {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: durations.slow, ease: easings.easeOut }
    },
  },
  right: {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: durations.slow, ease: easings.easeOut }
    },
  },
} as const;

// Scale animations
export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: durations.slow, ease: easings.easeOut }
  },
  tap: { scale: 0.98 },
  hover: { scale: 1.02 },
};

// Stagger animations for lists
export const staggerVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: durations.slow, ease: easings.easeOut },
    },
  },
} as const;

// Page transition variants
export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: durations.slow, ease: easings.smooth }
  },
  exit: { 
    opacity: 0, 
    x: 20,
    transition: { duration: durations.normal, ease: easings.smooth }
  },
};

// Button animations
export const buttonVariants: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: durations.fast, ease: easings.easeOut }
  },
  tap: { 
    scale: 0.95,
    transition: { duration: durations.fast, ease: easings.easeOut }
  },
};

// Card animations
export const cardVariants: Variants = {
  initial: { y: 0, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
  hover: { 
    y: -4,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    transition: { duration: durations.normal, ease: easings.easeOut }
  },
};

// Floating animation for decorative elements
export const floatingVariants: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Scroll trigger configuration
export const scrollTriggerConfig = {
  triggerOnce: true,
  threshold: 0.1,
  rootMargin: '-50px',
};

// Reduced motion variants (for accessibility)
export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
  exit: { opacity: 0, transition: { duration: 0.01 } },
};

// Check for reduced motion preference
export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get appropriate variants based on motion preference
export const getMotionVariants = (variants: Variants): Variants => {
  return shouldReduceMotion() ? reducedMotionVariants : variants;
};