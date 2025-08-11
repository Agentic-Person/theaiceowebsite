'use client';

import { useEffect, useState } from 'react';

interface ParticleSystemProps {
  className?: string;
}

export default function ParticleSystem({ className = '' }: ParticleSystemProps) {
  const [particles, setParticles] = useState<Array<{ id: number; delay: number; animation: string; color: string; size: string; randomX: number; randomY: number; randomRotation: number }>>([]);

  useEffect(() => {
    // Generate particles with varied properties
    const particleConfigs = [
      // Top spiral emitter - full journey particles (varied radii)
      { animation: 'animate-spiral-from-top', count: 25, colors: ['#001c38', '#001c38', '#001d39', '#001d39', '#36b0d9', '#596d8c', '#9ab6e0'] },
      { animation: 'animate-spiral-from-top-delayed', count: 20, colors: ['#001c38', '#001c38', '#001d39', '#596d8c', '#9ab6e0'] },
      { animation: 'animate-spiral-from-top-tight', count: 25, colors: ['#001c38', '#001d39', '#36b0d9', '#596d8c', '#9ab6e0'] },
      { animation: 'animate-spiral-from-top-wide', count: 20, colors: ['#001c38', '#001d39', '#596d8c', '#9ab6e0'] },
      
      // Top spiral emitter - half journey particles (varied radii)
      { animation: 'animate-spiral-from-top-half', count: 25, colors: ['#001c38', '#001c38', '#001d39', '#001d39', '#36b0d9', '#596d8c', '#9ab6e0'] },
      { animation: 'animate-spiral-from-top-delayed-half', count: 20, colors: ['#001c38', '#001c38', '#001d39', '#9ab6e0', '#36b0d9'] },
      { animation: 'animate-spiral-from-top-tight-half', count: 25, colors: ['#001c38', '#001d39', '#36b0d9', '#596d8c'] },
      { animation: 'animate-spiral-from-top-wide-half', count: 20, colors: ['#001c38', '#001d39', '#9ab6e0', '#36b0d9'] },
      
      // Bottom spiral emitter - full journey particles (varied radii)
      { animation: 'animate-spiral-from-bottom', count: 25, colors: ['#001c38', '#001c38', '#001d39', '#001d39', '#596d8c', '#9ab6e0'] },
      { animation: 'animate-spiral-from-bottom-delayed', count: 20, colors: ['#001c38', '#001c38', '#001d39', '#36b0d9', '#596d8c', '#9ab6e0'] },
      { animation: 'animate-spiral-from-bottom-tight', count: 25, colors: ['#001c38', '#001d39', '#596d8c', '#9ab6e0'] },
      { animation: 'animate-spiral-from-bottom-wide', count: 20, colors: ['#001c38', '#001d39', '#36b0d9', '#596d8c'] },
      
      // Bottom spiral emitter - half journey particles (varied radii)
      { animation: 'animate-spiral-from-bottom-half', count: 25, colors: ['#001c38', '#001c38', '#001d39', '#001d39', '#596d8c', '#36b0d9'] },
      { animation: 'animate-spiral-from-bottom-delayed-half', count: 20, colors: ['#001c38', '#001c38', '#001d39', '#9ab6e0', '#36b0d9', '#596d8c'] },
      { animation: 'animate-spiral-from-bottom-tight-half', count: 25, colors: ['#001c38', '#001d39', '#596d8c', '#36b0d9'] },
      { animation: 'animate-spiral-from-bottom-wide-half', count: 20, colors: ['#001c38', '#001d39', '#9ab6e0', '#36b0d9'] }
    ];

    const generatedParticles: Array<{ id: number; delay: number; animation: string; color: string; size: string }> = [];
    let particleId = 0;

    particleConfigs.forEach(config => {
      for (let i = 0; i < config.count; i++) {
        generatedParticles.push({
          id: particleId++,
          delay: Math.random() * 35, // Random delay up to 35 seconds - spreads particles across full cycle
          animation: config.animation,
          color: config.colors[Math.floor(Math.random() * config.colors.length)],
          size: ['w-1 h-1', 'w-1.5 h-1.5', 'w-2 h-2', 'w-3 h-3'][Math.floor(Math.random() * 4)],
          // Add enhanced randomness for organic movement
          randomX: (Math.random() - 0.5) * 100, // ±50px horizontal offset
          randomY: (Math.random() - 0.5) * 100, // ±50px vertical offset  
          randomRotation: (Math.random() - 0.5) * 180, // ±90 degree rotation offset
        });
      }
    });

    setParticles(generatedParticles);
  }, []);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Animated Particles */}
      {particles.map((particle) => {
        // Clean positioning: top-center for top spirals, bottom-center for bottom spirals
        const isTopSpiral = particle.animation.includes('spiral-from-top');
        const isBottomSpiral = particle.animation.includes('spiral-from-bottom');
        
        // Move both emitters to center of hero page
        let positionClasses = 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
        
        return (
          <div
            key={particle.id}
            className={`absolute rounded-full ${particle.size} ${particle.animation} ${positionClasses}`}
            style={{
              animationDelay: `${particle.delay}s`,
              opacity: 0,
              backgroundColor: particle.color,
              // Apply subtle random offsets for organic movement
              transform: `translate(${particle.randomX}px, ${particle.randomY}px) rotate(${particle.randomRotation}deg)`,
            }}
          />
        );
      })}
    </div>
  );
}