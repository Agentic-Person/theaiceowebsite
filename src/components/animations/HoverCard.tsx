'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  rotate?: number;
  duration?: number;
}

export default function HoverCard({
  children,
  className = '',
  scale = 1.05,
  rotate = 0,
  duration = 0.3,
}: HoverCardProps) {
  return (
    <motion.div
      whileHover={{
        scale,
        rotate,
        y: -5,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        duration,
        ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuart
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}