'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface AnimatedCardProps extends React.ComponentProps<typeof Card> {
  children: React.ReactNode;
  delay?: number;
  index?: number;
  staggerDelay?: number;
  className?: string;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  delay = 0,
  index = 0,
  staggerDelay = 0.1,
  className,
  ...props
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px',
  });

  const totalDelay = delay + (index * staggerDelay);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.5, 
        delay: totalDelay,
        ease: "easeOut"
      }}
    >
      <Card 
        className={cn(
          "hover:scale-[1.02] transition-all duration-300",
          "hover:shadow-2xl",
          className
        )}
        {...props}
      >
        {children}
      </Card>
    </motion.div>
  );
};