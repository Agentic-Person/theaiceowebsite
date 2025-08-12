'use client';

import { useEffect, useState } from 'react';

interface ParticleSystemProps {
  className?: string;
  convergencePoint?: string; // Custom horizontal position for particle convergence
  convergenceVertical?: string; // Custom vertical position for particle convergence
  particleCount?: number; // Multiplier for particle count (0-1)
  burstMode?: boolean; // Use rapid animations and increased particle count
}

export default function ParticleSystem({ className = '', convergencePoint = '70%', convergenceVertical = '50%', particleCount = 1, burstMode = false }: ParticleSystemProps) {
  const [particles, setParticles] = useState<Array<{ id: number; delay: number; animation: string; color: string; size: string; randomX: number; randomY: number; randomRotation: number }>>([]);

  useEffect(() => {
    // Determine effective particle count based on burst mode
    const effectiveParticleCount = burstMode ? particleCount * 2 : particleCount;
    
    // Generate particles with varied properties - using explicit class names for Tailwind
    const particleConfigs = burstMode ? [
      // BURST MODE - Rapid animations (3x faster)
      // Top spiral emitter - full journey particles (varied radii)
      { animation: 'animate-spiral-from-top-rapid', count: Math.floor(25 * effectiveParticleCount), colors: ['#001c38', '#001c38', '#001d39', '#001d39', '#36b0d9', '#596d8c', '#9ab6e0'] },
      { animation: 'animate-spiral-from-top-delayed-rapid', count: Math.floor(20 * effectiveParticleCount), colors: ['#001c38', '#001c38', '#001d39', '#596d8c', '#9ab6e0'] },
      { animation: 'animate-spiral-from-top-tight-rapid', count: Math.floor(25 * effectiveParticleCount), colors: ['#001c38', '#001d39', '#36b0d9', '#596d8c', '#9ab6e0'] },
      { animation: 'animate-spiral-from-top-wide-rapid', count: Math.floor(20 * effectiveParticleCount), colors: ['#001c38', '#001d39', '#596d8c', '#9ab6e0'] },
      
      // Top spiral emitter - half journey particles (varied radii)
      { animation: 'animate-spiral-from-top-half-rapid', count: Math.floor(25 * effectiveParticleCount), colors: ['#001c38', '#001c38', '#001d39', '#001d39', '#36b0d9', '#596d8c', '#9ab6e0'] },
      { animation: 'animate-spiral-from-top-delayed-half-rapid', count: Math.floor(20 * effectiveParticleCount), colors: ['#001c38', '#001c38', '#001d39', '#9ab6e0', '#36b0d9'] },
      { animation: 'animate-spiral-from-top-tight-half-rapid', count: Math.floor(25 * effectiveParticleCount), colors: ['#001c38', '#001d39', '#36b0d9', '#596d8c'] },
      { animation: 'animate-spiral-from-top-wide-half-rapid', count: Math.floor(20 * effectiveParticleCount), colors: ['#001c38', '#001d39', '#9ab6e0', '#36b0d9'] },
      
      // Bottom spiral emitter - full journey particles (varied radii)
      { animation: 'animate-spiral-from-bottom-rapid', count: Math.floor(25 * effectiveParticleCount), colors: ['#001c38', '#001c38', '#001d39', '#001d39', '#596d8c', '#9ab6e0'] },
      { animation: 'animate-spiral-from-bottom-delayed-rapid', count: Math.floor(20 * effectiveParticleCount), colors: ['#001c38', '#001c38', '#001d39', '#36b0d9', '#596d8c', '#9ab6e0'] },
      { animation: 'animate-spiral-from-bottom-tight-rapid', count: Math.floor(25 * effectiveParticleCount), colors: ['#001c38', '#001d39', '#596d8c', '#9ab6e0'] },
      { animation: 'animate-spiral-from-bottom-wide-rapid', count: Math.floor(20 * effectiveParticleCount), colors: ['#001c38', '#001d39', '#36b0d9', '#596d8c'] },
      
      // Bottom spiral emitter - half journey particles (varied radii)
      { animation: 'animate-spiral-from-bottom-half-rapid', count: Math.floor(25 * effectiveParticleCount), colors: ['#001c38', '#001c38', '#001d39', '#001d39', '#596d8c', '#36b0d9'] },
      { animation: 'animate-spiral-from-bottom-delayed-half-rapid', count: Math.floor(20 * effectiveParticleCount), colors: ['#001c38', '#001c38', '#001d39', '#9ab6e0', '#36b0d9', '#596d8c'] },
      { animation: 'animate-spiral-from-bottom-tight-half-rapid', count: Math.floor(25 * effectiveParticleCount), colors: ['#001c38', '#001d39', '#596d8c', '#36b0d9'] },
      { animation: 'animate-spiral-from-bottom-wide-half-rapid', count: Math.floor(20 * effectiveParticleCount), colors: ['#001c38', '#001d39', '#9ab6e0', '#36b0d9'] }
    ] : [
      // NORMAL MODE - Regular speed animations
      // Top spiral emitter - full journey particles (varied radii)
      { animation: 'animate-spiral-from-top', count: Math.floor(25 * effectiveParticleCount), colors: ['#001c38', '#001c38', '#001d39', '#001d39', '#36b0d9', '#596d8c', '#9ab6e0'] },
      { animation: 'animate-spiral-from-top-delayed', count: Math.floor(20 * effectiveParticleCount), colors: ['#001c38', '#001c38', '#001d39', '#596d8c', '#9ab6e0'] },
      { animation: 'animate-spiral-from-top-tight', count: Math.floor(25 * effectiveParticleCount), colors: ['#001c38', '#001d39', '#36b0d9', '#596d8c', '#9ab6e0'] },
      { animation: 'animate-spiral-from-top-wide', count: Math.floor(20 * effectiveParticleCount), colors: ['#001c38', '#001d39', '#596d8c', '#9ab6e0'] },
      
      // Top spiral emitter - half journey particles (varied radii)
      { animation: 'animate-spiral-from-top-half', count: Math.floor(25 * effectiveParticleCount), colors: ['#001c38', '#001c38', '#001d39', '#001d39', '#36b0d9', '#596d8c', '#9ab6e0'] },
      { animation: 'animate-spiral-from-top-delayed-half', count: Math.floor(20 * effectiveParticleCount), colors: ['#001c38', '#001c38', '#001d39', '#9ab6e0', '#36b0d9'] },
      { animation: 'animate-spiral-from-top-tight-half', count: Math.floor(25 * effectiveParticleCount), colors: ['#001c38', '#001d39', '#36b0d9', '#596d8c'] },
      { animation: 'animate-spiral-from-top-wide-half', count: Math.floor(20 * effectiveParticleCount), colors: ['#001c38', '#001d39', '#9ab6e0', '#36b0d9'] },
      
      // Bottom spiral emitter - full journey particles (varied radii)
      { animation: 'animate-spiral-from-bottom', count: Math.floor(25 * effectiveParticleCount), colors: ['#001c38', '#001c38', '#001d39', '#001d39', '#596d8c', '#9ab6e0'] },
      { animation: 'animate-spiral-from-bottom-delayed', count: Math.floor(20 * effectiveParticleCount), colors: ['#001c38', '#001c38', '#001d39', '#36b0d9', '#596d8c', '#9ab6e0'] },
      { animation: 'animate-spiral-from-bottom-tight', count: Math.floor(25 * effectiveParticleCount), colors: ['#001c38', '#001d39', '#596d8c', '#9ab6e0'] },
      { animation: 'animate-spiral-from-bottom-wide', count: Math.floor(20 * effectiveParticleCount), colors: ['#001c38', '#001d39', '#36b0d9', '#596d8c'] },
      
      // Bottom spiral emitter - half journey particles (varied radii)
      { animation: 'animate-spiral-from-bottom-half', count: Math.floor(25 * effectiveParticleCount), colors: ['#001c38', '#001c38', '#001d39', '#001d39', '#596d8c', '#36b0d9'] },
      { animation: 'animate-spiral-from-bottom-delayed-half', count: Math.floor(20 * effectiveParticleCount), colors: ['#001c38', '#001c38', '#001d39', '#9ab6e0', '#36b0d9', '#596d8c'] },
      { animation: 'animate-spiral-from-bottom-tight-half', count: Math.floor(25 * effectiveParticleCount), colors: ['#001c38', '#001d39', '#596d8c', '#36b0d9'] },
      { animation: 'animate-spiral-from-bottom-wide-half', count: Math.floor(20 * effectiveParticleCount), colors: ['#001c38', '#001d39', '#9ab6e0', '#36b0d9'] }
    ];

    const generatedParticles: Array<{ id: number; delay: number; animation: string; color: string; size: string }> = [];
    let particleId = 0;

    particleConfigs.forEach((config, emitterIndex) => {
      // Add a random offset for each emitter group (0-0.5s variance)
      const emitterOffset = Math.random() * 0.5;
      
      for (let i = 0; i < config.count; i++) {
        generatedParticles.push({
          id: particleId++,
          delay: burstMode 
            ? emitterOffset + (Math.random() * 15) // Each emitter has its own offset + spread
            : Math.random() * 35, // Normal mode: 0-35s delay
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
  }, [particleCount, burstMode]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Animated Particles - key includes burstMode to force re-render */}
      {particles.map((particle) => {
        // Position particles to converge at the specified convergence point
        // The animations handle the movement from top/bottom to this convergence point
        // This creates the effect of emitters at top/bottom converging at the specified position
        const positionStyle = {
          top: convergenceVertical,
          left: convergencePoint,
          transform: 'translate(-50%, -50%)'
        };
        
        return (
          <div
            key={`${particle.id}-${burstMode}`}
            className={`absolute rounded-full ${particle.size} ${particle.animation}`}
            style={{
              ...positionStyle,
              animationDelay: `${particle.delay}s`,
              opacity: 0,
              backgroundColor: particle.color,
            }}
          />
        );
      })}
    </div>
  );
}