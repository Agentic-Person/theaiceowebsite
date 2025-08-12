/**
 * Particle System Configuration
 * Central control for all particle systems in the application
 */

export interface ParticleSystemConfig {
  active: boolean;
  name: string;
  description: string;
}

export const PARTICLE_SYSTEMS = {
  SlowSpiral1: {
    active: true,
    name: "SlowSpiral1",
    description: "Continuous background spiral converging at flipbook center"
  } as ParticleSystemConfig,
  
  SlowSpiral2: {
    active: true, 
    name: "SlowSpiral2",
    description: "Continuous background spiral converging at right edge"
  } as ParticleSystemConfig,
  
  FastBurst: {
    active: false, // Set to dormant as requested
    name: "FastBurst", 
    description: "1000 particles, 5x speed, one-time burst at flipbook center"
  } as ParticleSystemConfig,
  
  FlipbookVortex: {
    active: false,
    name: "FlipbookVortex",
    description: "1000 particles spiraling into flipbook between image transitions"
  } as ParticleSystemConfig
} as const;

// Speed modes for dynamic particle systems
export type SpeedMode = 'fast' | 'normal';

export interface DynamicParticleConfig {
  speedMode: SpeedMode;
  maxDelay: number;
}

// Default configurations for each speed mode
export const SPEED_CONFIGS: Record<SpeedMode, DynamicParticleConfig> = {
  fast: {
    speedMode: 'fast',
    maxDelay: 3 // Quick buildup - particles start within 3 seconds
  },
  normal: {
    speedMode: 'normal', 
    maxDelay: 35 // Original spread - particles start within 35 seconds
  }
};

// Timer configuration
export const SPEED_TRANSITION_DELAY = 8000; // 8 seconds