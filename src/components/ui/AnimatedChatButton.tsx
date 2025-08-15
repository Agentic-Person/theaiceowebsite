'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedChatButtonProps {
  onClick?: () => void;
  className?: string;
  noAnimation?: boolean;
}

const sparklePositions = [
  { top: '-12px', left: '-12px', delay: '0s' },
  { top: '-12px', right: '-12px', delay: '0.3s' },
  { bottom: '-12px', left: '-12px', delay: '0.6s' },
  { bottom: '-12px', right: '-12px', delay: '0.9s' },
  { top: '50%', left: '-16px', transform: 'translateY(-50%)', delay: '1.2s' },
  { top: '50%', right: '-16px', transform: 'translateY(-50%)', delay: '1.5s' },
  { top: '-16px', left: '50%', transform: 'translateX(-50%)', delay: '0.2s' },
  { bottom: '-16px', left: '50%', transform: 'translateX(-50%)', delay: '0.8s' },
  { top: '-8px', left: '0', delay: '1.1s' },
  { bottom: '-8px', right: '0', delay: '1.4s' }
];

export default function AnimatedChatButton({ onClick, className = '', noAnimation = false }: AnimatedChatButtonProps) {
  const buttonContent = (
    <>
      <div className="relative w-6 h-6 flex items-center justify-center">
        {sparklePositions.map((pos, i) => (
          <div
            key={i}
            className="absolute text-yellow-400 text-xs pointer-events-none animate-sparkle"
            style={{
              ...pos,
              animationDelay: pos.delay,
              fontSize: '10px'
            }}
          >
            {i % 2 === 0 ? '✨' : '⭐'}
          </div>
        ))}
      </div>
      Chat with Our AI
    </>
  );

  if (noAnimation) {
    return (
      <div className="relative inline-block group">
        {/* Animated gradient border background */}
        <div 
          className="absolute -inset-[2px] rounded-[12px] opacity-75 blur-[0.5px] group-hover:opacity-100 transition-opacity"
          style={{
            background: 'linear-gradient(45deg, #FFD700, #4A69BD, #7B68EE, #6A5ACD, #FFC107, #FF8C00, #FFD700)',
            backgroundSize: '400% 400%',
            animation: 'shimmer 3s ease-in-out infinite'
          }}
        />
        
        {/* Main button */}
        <button
          onClick={onClick}
          className={`
            relative px-6 py-3
            bg-gradient-to-br from-[#1a1a3a] to-[#2d2d5a]
            text-yellow-400 text-sm font-semibold
            rounded-[10px] cursor-pointer
            inline-flex items-center gap-2
            transition-all duration-300
            hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-400/30
            ${className}
          `}
        >
          <span className="text-yellow-400 text-xs">✨</span>
          Chat with Our AI
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
      className="relative inline-block group"
    >
      {/* Animated gradient border background */}
      <div 
        className="absolute -inset-[2px] rounded-[14px] opacity-75 blur-[0.5px] group-hover:opacity-100 transition-opacity"
        style={{
          background: 'linear-gradient(45deg, #FFD700, #4A69BD, #7B68EE, #6A5ACD, #FFC107, #FF8C00, #FFD700)',
          backgroundSize: '400% 400%',
          animation: 'shimmer 3s ease-in-out infinite'
        }}
      />
      
      {/* Main button */}
      <button
        onClick={onClick}
        className={`
          relative px-8 py-4
          bg-gradient-to-br from-[#1a1a3a] to-[#2d2d5a]
          text-yellow-400 text-lg font-semibold
          rounded-xl cursor-pointer
          inline-flex items-center gap-3
          transition-all duration-300
          hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-400/30
          ${className}
        `}
      >
        {buttonContent}
      </button>
    </motion.div>
  );
}
