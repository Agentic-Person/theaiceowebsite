'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';

interface StaggerRevealProps {
  children: ReactNode[];
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  duration?: number;
  distance?: number;
  className?: string;
  threshold?: number;
}

export default function StaggerReveal({
  children,
  staggerDelay = 0.1,
  direction = 'up',
  duration = 0.6,
  distance = 50,
  className = '',
  threshold = 0.1,
}: StaggerRevealProps) {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  });

  const getInitialState = () => {
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 };
      case 'down':
        return { y: -distance, opacity: 0 };
      case 'left':
        return { x: distance, opacity: 0 };
      case 'right':
        return { x: -distance, opacity: 0 };
      case 'fade':
        return { opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  const getAnimateState = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { y: 0, opacity: 1 };
      case 'left':
      case 'right':
        return { x: 0, opacity: 1 };
      case 'fade':
        return { opacity: 1 };
      default:
        return { y: 0, opacity: 1 };
    }
  };

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={getInitialState()}
          animate={inView ? getAnimateState() : getInitialState()}
          transition={{
            duration,
            delay: index * staggerDelay,
            ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuart
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}