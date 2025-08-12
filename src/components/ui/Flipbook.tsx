'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Flipbook.module.css';
import '../../styles/spiral-particles.css';

interface FlipbookItem {
  title: string;
  image?: string;
}

interface FlipbookProps {
  images?: string[];
  interval?: number; // Time between flips in milliseconds
  className?: string;
}

export default function Flipbook({ images, interval = 4500, className = '' }: FlipbookProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // New titles and image paths (using actual filenames from public folder)
  const flipbookItems: FlipbookItem[] = [
    { title: 'Discover', image: '/01_discover_card_v2.webp' },
    { title: 'Design', image: '/02_design_solutions_card.webp' },
    { title: 'Develop', image: '/03_development_build_card.webp' },
    { title: 'Deploy', image: '/04_training_implementation_card.png' },
    { title: 'Deliver', image: '/05_customer_success_support_card.png' }
  ];

  useEffect(() => {
    if (flipbookItems.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % flipbookItems.length);
    }, interval);

    return () => clearInterval(timer);
  }, [flipbookItems.length, interval]);

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
          animate={{ opacity: 0.65, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
          transition={{ 
            duration: 1, // 1 second fade in to 65%
            ease: "easeInOut"
          }}
          className="w-full h-full flex items-center justify-center"
        >
          {/* Electric Holographic Card */}
          <div 
            className={`w-48 h-48 lg:w-64 lg:h-64 rounded-lg 
                      backdrop-blur-md flex items-center justify-center
                      relative overflow-hidden transition-all duration-300
                      hover:scale-105 ${styles.electricCard}`}
            style={{
              backgroundColor: 'rgba(0, 28, 56, 0.8)',
              border: '2px solid rgba(78, 138, 211, 0.6)',
              boxShadow: `
                0 0 0 1px rgba(78, 138, 211, 0.4),
                0 0 15px rgba(78, 138, 211, 0.6),
                0 0 25px rgba(78, 138, 211, 0.4),
                0 0 35px rgba(78, 138, 211, 0.3),
                0 0 50px rgba(78, 138, 211, 0.2),
                inset 0 0 20px rgba(78, 138, 211, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.2),
                inset 0 0 5px rgba(78, 138, 211, 0.1)
              `
            }}
          >
            {/* Background Image Layer - 65% opacity */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${flipbookItems[currentIndex].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.65
              }}
            ></div>
            
            {/* Animated Electric Shimmer */}
            <div 
              className={`absolute inset-0 ${styles.electricShimmer}`}
              style={{
                background: 'linear-gradient(45deg, transparent 20%, rgba(78, 138, 211, 0.3) 40%, rgba(78, 138, 211, 0.4) 50%, rgba(78, 138, 211, 0.3) 60%, transparent 80%)'
              }}
            ></div>
            
            {/* Electric Scan Lines */}
            <div 
              className={`absolute inset-0 ${styles.electricScanLines}`}
              style={{
                background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(78, 138, 211, 0.1) 2px, rgba(78, 138, 211, 0.1) 4px)'
              }}
            ></div>
            
            {/* Holographic Interference */}
            <div 
              className={`absolute inset-0 ${styles.electricInterference}`}
              style={{
                background: 'radial-gradient(circle at 30% 20%, rgba(78, 138, 211, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255, 0, 255, 0.03) 0%, transparent 50%)'
              }}
            ></div>
            
            {/* Enhanced Electric Title */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span 
                className={`text-2xl lg:text-3xl font-bold text-white text-center px-4 relative z-10 ${styles.electricText}`}
                style={{
                  textShadow: `
                    0 0 5px rgba(78, 138, 211, 0.8),
                    0 0 10px rgba(78, 138, 211, 0.6),
                    0 0 15px rgba(78, 138, 211, 0.4),
                    0 0 25px rgba(78, 138, 211, 0.3),
                    0 0 35px rgba(78, 138, 211, 0.2),
                    0 2px 4px rgba(0, 0, 0, 0.8)
                  `,
                  filter: 'drop-shadow(0 0 12px rgba(78, 138, 211, 0.6))'
                }}
              >
                {flipbookItems[currentIndex].title}
              </span>
            </div>
            
            {/* Electric Particles */}
            {[...Array(6)].map((_, i) => (
              <div key={i} className={styles.electricParticle}></div>
            ))}
            
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* SYSTEM 4: "FlipbookVortex" - COMMENTED OUT - 1000 particles spiraling into flipbook between image transitions
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
        {[...Array(1000)].map((_, i) => {
          const delay = (i / 1000) * 0.6; 
          
          return (
            <div 
              key={`spiral-${currentIndex}-${i}`} 
              style={{
                position: 'absolute',
                width: '3px',
                height: '3px', 
                background: 'rgba(78, 138, 211, 0.9)',
                borderRadius: '50%',
                boxShadow: '0 0 4px rgba(78, 138, 211, 0.8)',
                left: '50%',
                top: '50%',
                zIndex: 1000,
                transform: 'translate(-50%, -50%)',
                animation: `spiralBig 0.6s ease-in-out ${delay}s forwards`
              }}
            ></div>
          );
        })}
      </div>
      
      <style jsx>{\`
        @keyframes spiralBig {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(0deg) translateX(400px) scale(0.5);
          }
          30% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(216deg) translateX(280px) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(1800deg) translateX(0px) scale(0.2);
          }
        }
      \`}</style>
      END COMMENTED SECTION */}
      
      {/* Electric Page Indicators */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {flipbookItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                      ? 'bg-[#4e8ad3] w-6 shadow-lg' 
                      : 'bg-white/30 hover:bg-[#4e8ad3]/50'
            }`}
            style={{
              boxShadow: index === currentIndex 
                      ? '0 0 8px rgba(78, 138, 211, 0.6), 0 0 15px rgba(78, 138, 211, 0.4)'
                : undefined
            }}
            aria-label={`Go to slide ${index + 1}: ${flipbookItems[index].title}`}
          />
        ))}
      </div>
    </div>
  );
}