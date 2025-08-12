# Particle Systems Documentation

## Overview

The AI CEO website features a comprehensive particle system that creates dynamic visual effects throughout the hero section. This document provides complete reference for all particle systems, their configurations, and how to modify them.

## System Architecture

### Core Components

- **ParticleSystem.tsx** - Main particle component with dynamic speed control
- **particleSystems.ts** - Central configuration file for all systems
- **tailwind.config.ts** - CSS animation definitions
- **HeroSection.tsx** - Main implementation with timer logic

## Particle Systems Inventory

### SYSTEM 1: "SlowSpiral1"
- **Location**: `HeroSection.tsx:25-35`
- **Type**: Continuous background spiral
- **Particles**: ~150 (particleCount: 0.5)
- **Convergence**: 70% horizontal, 35% vertical (flipbook center)
- **Speed Mode**: Dynamic (fast → normal)
- **Status**: ✅ Active

**Configuration:**
```tsx
<ParticleSystem 
  className="w-full h-full absolute inset-0" 
  convergencePoint="70%" 
  convergenceVertical="35%" 
  particleCount={0.5}
  speedMode={speedMode}
/>
```

### SYSTEM 2: "SlowSpiral2"
- **Location**: `HeroSection.tsx:37-47`
- **Type**: Continuous background spiral
- **Particles**: ~150 (particleCount: 0.5)
- **Convergence**: 85% horizontal, 35% vertical (right side)
- **Speed Mode**: Dynamic (fast → normal)
- **Status**: ✅ Active

**Configuration:**
```tsx
<ParticleSystem 
  className="w-full h-full absolute inset-0" 
  convergencePoint="85%" 
  convergenceVertical="35%" 
  particleCount={0.5}
  speedMode={speedMode}
/>
```

### SYSTEM 3: "FastBurst"
- **Location**: `HeroSection.tsx:50-112`
- **Type**: One-time dramatic burst
- **Particles**: 1000 (500 from top, 500 from bottom)
- **Speed**: 5x faster (0.8 seconds)
- **Convergence**: 70% horizontal, 35% vertical (flipbook center)
- **Status**: 💤 Dormant (controlled by `PARTICLE_SYSTEMS.FastBurst.active`)

**Key Features:**
- Red particles for visibility during testing
- Inline CSS animations (`fastSpiralFromTop`, `fastSpiralFromBottom`)
- Variable particle sizes (1px, 2px, 3px)
- Staggered timing over 0.6 seconds

### SYSTEM 4: "FlipbookVortex"
- **Location**: `Flipbook.tsx:140-182` (commented out)
- **Type**: Between-image transition effect
- **Particles**: 1000 spiraling into flipbook
- **Speed**: 5x faster (0.6 seconds)
- **Convergence**: Flipbook card center
- **Status**: 💤 Dormant (commented out, saved for future use)

## Dynamic Speed System

### Timeline Behavior
- **0-10 seconds**: **BURST PHASE**
  - Uses `-rapid` animation variants (3x faster)
  - Quick particle buildup (3-second delay spread)
  - Creates immediate visual impact

- **10+ seconds**: **SETTLE PHASE**
  - Transitions to normal animations
  - Original ambient flow (35-second delay spread)
  - Maintains continuous background atmosphere

### Implementation
```tsx
// Timer logic in HeroSection.tsx
const [speedMode, setSpeedMode] = useState<'fast' | 'normal'>('fast');

useEffect(() => {
  const timer = setTimeout(() => {
    setSpeedMode('normal');
  }, SPEED_TRANSITION_DELAY); // 10 seconds
  
  return () => clearTimeout(timer);
}, []);
```

## Configuration Files

### `/src/config/particleSystems.ts`
Central control for all particle systems:

```typescript
export const PARTICLE_SYSTEMS = {
  SlowSpiral1: { active: true, name: "SlowSpiral1", description: "..." },
  SlowSpiral2: { active: true, name: "SlowSpiral2", description: "..." },
  FastBurst: { active: false, name: "FastBurst", description: "..." },
  FlipbookVortex: { active: false, name: "FlipbookVortex", description: "..." }
};

export const SPEED_TRANSITION_DELAY = 10000; // 10 seconds
```

### Animation Variants in `tailwind.config.ts`

**Normal Speed (36-46 seconds):**
- `spiral-from-top: 38s`
- `spiral-from-bottom: 41s` 
- `spiral-from-top-tight: 36s`
- etc.

**Rapid Speed (12-15 seconds, 3x faster):**
- `spiral-from-top-rapid: 12.5s`
- `spiral-from-bottom-rapid: 13.5s`
- `spiral-from-top-tight-rapid: 12s`
- etc.

**Fast Speed (7-8 seconds, 5x faster):**
- `spiral-from-top-fast: 7.6s`
- `spiral-from-bottom-fast: 8.2s`
- Used for one-time burst effects

## Particle Properties

### Animation Types
Each system uses 16 different animation types:
- **Top emitters**: `spiral-from-top`, `spiral-from-top-delayed`, `spiral-from-top-tight`, `spiral-from-top-wide`
- **Top half-journey**: `spiral-from-top-half`, `spiral-from-top-delayed-half`, etc.
- **Bottom emitters**: `spiral-from-bottom`, `spiral-from-bottom-delayed`, etc.
- **Bottom half-journey**: `spiral-from-bottom-half`, etc.

### Colors
Standard particle color palette:
- `#001c38` (dark blue)
- `#001d39` (dark blue variant)
- `#4e8ad3` (medium blue)
- `#596d8c` (blue-gray)
- `#9ab6e0` (light blue)

### Sizes
- `w-1 h-1` (4px)
- `w-1.5 h-1.5` (6px) 
- `w-2 h-2` (8px)
- `w-3 h-3` (12px)

## How to Modify Systems

### Toggle Systems On/Off
Edit `/src/config/particleSystems.ts`:
```typescript
FastBurst: { active: true, ... } // Enable FastBurst
SlowSpiral1: { active: false, ... } // Disable SlowSpiral1
```

### Change Speed Transition Timing
```typescript
export const SPEED_TRANSITION_DELAY = 15000; // 15 seconds instead of 10
```

### Adjust Particle Counts
In HeroSection.tsx:
```tsx
particleCount={1.0} // Double particles (was 0.5)
particleCount={0.25} // Quarter particles
```

### Modify Convergence Points
```tsx
convergencePoint="60%" // Move left (was 70%)
convergenceVertical="50%" // Move down (was 35%)
```

### Change FastBurst Particle Count
In HeroSection.tsx, line 32:
```tsx
{[...Array(2000)].map((_, i) => ( // 2000 instead of 500
```

## Performance Considerations

### Current Load
- **SlowSpiral1**: ~150 particles
- **SlowSpiral2**: ~150 particles  
- **FastBurst**: 1000 particles (when active)
- **Total**: ~300 continuous + 1000 burst = ~1300 max particles

### Optimization Tips
1. **Reduce particle counts** by adjusting `particleCount` prop
2. **Disable unused systems** in configuration
3. **Adjust animation durations** for performance vs visual quality
4. **Monitor frame rates** on lower-end devices

## Troubleshooting

### Common Issues

**Particles not showing:**
1. Check system is active in `particleSystems.ts`
2. Verify Tailwind animations are compiled
3. Check z-index conflicts
4. Ensure CSS animations are properly defined

**Performance problems:**
1. Reduce `particleCount` values
2. Disable FastBurst if not needed
3. Increase animation durations
4. Check for CSS animation conflicts

**Speed transitions not working:**
1. Verify `speedMode` state is updating
2. Check `SPEED_TRANSITION_DELAY` value
3. Ensure `-rapid` animations exist in Tailwind config
4. Check useEffect dependencies

### Debug Mode
To debug particles, temporarily make them visible:
```tsx
// In FastBurst system, change colors to:
backgroundColor: 'red' // Makes particles clearly visible
width: '8px', height: '8px' // Makes particles larger
```

## Future Enhancements

### Possible Additions
1. **Mouse interaction** - particles react to cursor position
2. **Scroll-based triggers** - activate systems based on scroll position  
3. **Theme-based colors** - different particle colors for light/dark themes
4. **Mobile optimizations** - reduced particle counts for mobile devices
5. **Audio synchronization** - particles react to background music/sounds

### System Extensions
1. **FlipbookVortex activation** - enable the between-image transition effect
2. **Multiple convergence points** - particles converging at multiple locations
3. **Seasonal themes** - different particle colors/behaviors for holidays
4. **User preferences** - allow users to control particle density

## File Locations

```
src/
├── components/
│   ├── ui/
│   │   ├── ParticleSystem.tsx (main component)
│   │   └── Flipbook.tsx (FlipbookVortex system)
│   └── sections/
│       └── HeroSection.tsx (implementation)
├── config/
│   └── particleSystems.ts (central configuration)
└── styles/ (if needed)

tailwind.config.ts (animation definitions)
docs/
└── particles.md (this file)
```

---

*Last updated: August 2025*  
*Systems: SlowSpiral1 ✅, SlowSpiral2 ✅, FastBurst 💤, FlipbookVortex 💤*