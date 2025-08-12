'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const technologies = [
  { name: 'Anthropic', logo: '🤖' },
  { name: 'Python', logo: '🐍' },
  { name: 'Docker', logo: '🐳' },
  { name: 'n8n', logo: '⚡' },
  { name: 'OpenAI', logo: '🧠' },
  { name: 'Vercel', logo: '▲' },
];

export const TechTicker: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate the array for seamless loop
  const duplicatedTechs = [...technologies, ...technologies];

  return (
    <div className="w-full overflow-hidden py-8">
      {/* Header */}
      <h3 className="text-2xl font-bold text-center mb-8" style={{ color: 'var(--text-primary)' }}>
        Built With Industry-Leading Technology
      </h3>
      
      {/* Ticker Container */}
      <div 
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient masks for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--background)] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--background)] to-transparent z-10" />
        
        {/* Scrolling content */}
        <motion.div
          className="flex items-center space-x-12"
          animate={{
            x: isPaused ? 0 : '-50%',
          }}
          transition={{
            x: {
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            },
          }}
          style={{
            width: 'fit-content',
          }}
        >
          {duplicatedTechs.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex items-center space-x-3 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-110"
              style={{
                backgroundColor: 'var(--card-background)',
                border: '1px solid var(--border)',
              }}
            >
              <span className="text-3xl">{tech.logo}</span>
              <span 
                className="text-lg font-semibold whitespace-nowrap"
                style={{ color: 'var(--text-primary)' }}
              >
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};