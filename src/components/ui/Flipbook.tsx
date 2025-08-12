'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FlipbookProps {
  images: string[];
  interval?: number; // Time between flips in milliseconds
  className?: string;
}

export default function Flipbook({ images, interval = 3000, className = '' }: FlipbookProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  // For now, using placeholder divs - replace with actual images
  const placeholderImages = images.length > 0 ? images : [
    'AI Strategy',
    'Custom Solutions',
    'SMB Focus',
    'Enterprise Security',
    'Proven Results'
  ];

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
          exit={{ opacity: 0, rotateY: 90, scale: 0.8 }}
          transition={{ 
            duration: 0.6,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
          className="w-full h-full flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Placeholder for images - replace with actual img tags when you have images */}
          <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-lg border-2 border-white/20 
                        backdrop-blur-sm flex items-center justify-center
                        shadow-2xl"
               style={{
                 backgroundColor: 'rgba(0, 28, 56, 0.1)', // #001c38 with 10% opacity
                 backgroundImage: 'linear-gradient(135deg, rgba(0, 28, 56, 0.1), rgba(0, 29, 57, 0.1))' // Subtle gradient with dark blues
               }}>
            <span className="text-xl lg:text-2xl font-bold text-white/80">
              {placeholderImages[currentIndex]}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Page indicators */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {placeholderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-white w-6' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}