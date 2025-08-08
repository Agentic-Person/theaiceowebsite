# Task 2: Advanced Animations

## Objective
Implement sophisticated animations using Three.js particle system in the hero section and Framer Motion for scroll-triggered animations throughout the website. This will enhance the user experience with smooth, performant animations that maintain the professional aesthetic.

## Prerequisites
- Task 1 completion or parallel development
- Existing hero section with particle system container
- All page sections built and styled
- Performance baseline established

## Technical Requirements

### Dependencies to Install
```bash
npm install three @types/three
npm install @react-three/fiber @react-three/drei
npm install framer-motion
npm install react-intersection-observer
```

## Implementation Steps

### Step 1: Three.js Particle System
**File**: `src/components/ui/ParticleSystem.tsx`
- Create floating particle background for hero section
- Implement mouse interaction effects
- Ensure 60fps performance on all devices
- Make particles responsive to screen size

### Step 2: Framer Motion Setup
**File**: `src/components/animations/AnimationProvider.tsx`
- Set up Framer Motion provider
- Create reusable animation variants
- Configure reduced motion preferences

### Step 3: Scroll-Triggered Animations
**Files**: 
- `src/components/animations/ScrollReveal.tsx`
- `src/components/animations/StaggeredReveal.tsx`
- Update all section components with animations

### Step 4: Micro-Interactions
**Files**:
- Update button components with hover/click animations
- Add card hover effects
- Implement form input focus animations

### Step 5: Page Transitions
**File**: `src/components/animations/PageTransition.tsx`
- Smooth transitions between pages
- Loading states for navigation

## Animation Specifications

### Hero Particle System
- **Particle Count**: 50-100 based on device performance
- **Colors**: Match theme (#36b0d9, #002246, #9ab6e0)
- **Movement**: Slow floating with mouse interaction
- **Performance**: 60fps target, fallback for low-end devices

### Scroll Animations
- **Trigger Point**: 10% of element visible
- **Duration**: 0.6-0.8 seconds
- **Easing**: Custom cubic-bezier for professional feel
- **Stagger**: 0.1s delay between elements

### Micro-Interactions
- **Buttons**: Scale 0.98 on press, subtle glow on hover
- **Cards**: Lift effect on hover (translateY: -4px)
- **Form Inputs**: Border color transition, label float

## Performance Requirements
- **First Load**: No animation blocking initial render
- **60fps**: All animations maintain smooth frame rate
- **Mobile**: Reduced animation complexity on smaller screens
- **Accessibility**: Respect prefers-reduced-motion

## File Structure Changes

### New Files to Create:
```
src/
├── components/
│   ├── ui/ParticleSystem.tsx
│   └── animations/
│       ├── AnimationProvider.tsx
│       ├── ScrollReveal.tsx
│       ├── StaggeredReveal.tsx
│       └── PageTransition.tsx
├── hooks/
│   ├── useParticles.ts
│   └── useScrollAnimation.ts
└── lib/
    └── animations.ts  # Animation variants and utilities
```

### Files to Modify:
```
src/components/sections/HeroSection.tsx    # Add particle system
src/components/sections/ProblemSection.tsx # Add scroll animations
src/components/sections/SolutionSection.tsx # Add staggered reveals
src/components/ui/Button.tsx               # Add micro-interactions
src/components/ui/Card.tsx                 # Add hover effects
src/app/layout.tsx                         # Add animation providers
```

## Success Metrics
- ✅ Particle system runs at 60fps
- ✅ Scroll animations trigger smoothly
- ✅ Page transitions feel natural
- ✅ Animations respect accessibility preferences
- ✅ No performance degradation on mobile
- ✅ Build size impact < 50KB

## Performance Targets
- **Lighthouse Performance**: Maintain 90+ score
- **First Contentful Paint**: No increase > 100ms
- **Cumulative Layout Shift**: Remain at 0
- **Animation Frame Rate**: Consistent 60fps

## Handoff Notes
This task involves performance-critical code and should be tested across multiple devices and browsers. May require optimization iterations based on real-world performance metrics.