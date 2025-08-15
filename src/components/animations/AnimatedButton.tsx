'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  style?: React.CSSProperties;
}

export default function AnimatedButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  style,
}: AnimatedButtonProps) {
  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'text-white focus:ring-blue-500',
    secondary: 'text-white bg-gray-600 hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border-2 hover:bg-opacity-10 focus:ring-blue-500',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <motion.button
      whileHover={{ 
        scale: disabled ? 1 : 1.05,
        y: disabled ? 0 : -2,
      }}
      whileTap={{ 
        scale: disabled ? 1 : 0.95 
      }}
      transition={{
        duration: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuart
      }}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      style={style}
    >
      <motion.span
        initial={{ opacity: 1 }}
        whileHover={disabled ? {} : { scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}