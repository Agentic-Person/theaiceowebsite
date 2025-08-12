'use client';

import { useEffect, useState } from 'react';

interface FastParticleSystemProps {
  className?: string;
  convergencePoint?: string;
  convergenceVertical?: string;
  onComplete?: () => void;
}

export default function FastParticleSystem({ 
  className = '', 
  convergencePoint = '70%', 
  convergenceVertical = '35%',
  onComplete
}: FastParticleSystemProps) {
  const [particles, setParticles] = useState<Array<{ 
    id: number; 
    delay: number; 
    animationType: string;
    color: string; 
    size: number;
  }>>([]);

  useEffect(() => {
    // Generate 1000 particles matching original ParticleSystem patterns
    const particleConfigs = [
      // Test with fewer, red particles to see if it works
      { animationType: 'spiral-from-top', count: 50, colors: ['red'] },
      { animationType: 'spiral-from-bottom', count: 50, colors: ['red'] }
    ];

    const generatedParticles: Array<{ 
      id: number; 
      delay: number; 
      animationType: string;
      color: string; 
      size: number;
    }> = [];
    let particleId = 0;

    particleConfigs.forEach(config => {
      for (let i = 0; i < config.count; i++) {
        generatedParticles.push({
          id: particleId++,
          delay: Math.random() * 2, // Spread over 2 seconds
          animationType: config.animationType,
          color: config.colors[Math.floor(Math.random() * config.colors.length)],
          size: 8, // Large red particles for testing
        });
      }
    });

    setParticles(generatedParticles);

    // Call onComplete after animation finishes
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 10000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Animation keyframes for different spiral types
  const getAnimationKeyframes = (type: string) => {
    const isFromTop = type.includes('top');
    const isTight = type.includes('tight');
    const isWide = type.includes('wide');
    
    let startY = isFromTop ? '-40vh' : '40vh';
    if (isTight) startY = isFromTop ? '-32vh' : '32vh';
    if (isWide) startY = isFromTop ? '-48vh' : '48vh';

    return `
      0% { 
        transform: translate(-50%, -50%) rotate(0deg) translateY(${startY}) rotate(0deg);
        opacity: 0;
        transform: scale(1.0);
      }
      10% { 
        opacity: 0.8;
      }
      90% { 
        opacity: 0.8;
      }
      100% { 
        transform: translate(-50%, -50%) rotate(720deg) translateY(0vh) rotate(-720deg);
        opacity: 0;
        transform: scale(0.1);
      }
    `;
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* DEBUG: Static red dot to see if component loads */}
      <div 
        className="absolute w-4 h-4 bg-red-500 rounded-full"
        style={{
          left: convergencePoint,
          top: convergenceVertical,
          transform: 'translate(-50%, -50%)',
          zIndex: 999
        }}
      />
      
      {/* DEBUG: Simple working particles like the hero test */}
      {[...Array(10)].map((_, i) => (
        <div 
          key={`debug-${i}`}
          className="absolute w-3 h-3 bg-red-500 rounded-full"
          style={{
            left: convergencePoint,
            top: convergenceVertical,
            transform: 'translate(-50%, -50%)',
            zIndex: 998,
            animation: `debugSpiral 2s ease-in-out ${i * 0.2}s forwards`
          }}
        />
      ))}
      
      {/* Original complex particles (might not be working) */}
      {particles.map((particle) => {
        const animationDuration = 1.6;
        
        return (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: convergencePoint,
              top: convergenceVertical,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: 0,
              animation: `${particle.animationType.includes('top') ? 'fastSpiralTop' : 'fastSpiralBottom'} ${animationDuration}s ease-in-out ${particle.delay}s forwards`,
              zIndex: 1
            }}
          />
        );
      })}
      
      {/* Generate inline keyframes for each particle */}
      <style jsx>{`
        @keyframes debugSpiral {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(0deg) translateY(-300px);
          }
          30% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(216deg) translateY(-150px);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(720deg) translateY(0px) scale(0.2);
          }
        }
        @keyframes fastSpiralTop {
          0% { 
            transform: translate(-50%, -50%) rotate(0deg) translateY(-40vh) rotate(0deg);
            opacity: 0;
            scale: 1.0;
          }
          10% { 
            opacity: 0.8;
          }
          90% { 
            opacity: 0.8;
          }
          100% { 
            transform: translate(-50%, -50%) rotate(720deg) translateY(0vh) rotate(-720deg);
            opacity: 0;
            scale: 0.1;
          }
        }
        @keyframes fastSpiralBottom {
          0% { 
            transform: translate(-50%, -50%) rotate(0deg) translateY(40vh) rotate(0deg);
            opacity: 0;
            scale: 1.0;
          }
          10% { 
            opacity: 0.8;
          }
          90% { 
            opacity: 0.8;
          }
          100% { 
            transform: translate(-50%, -50%) rotate(720deg) translateY(0vh) rotate(-720deg);
            opacity: 0;
            scale: 0.1;
          }
        }
      `}</style>
    </div>
  );
}