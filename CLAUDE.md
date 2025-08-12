# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is The AI CEO website project (aiceo_website_02), a Next.js website for The AI CEO company. The company specializes in custom AI solutions for small and medium-sized businesses (SMBs), offering consultation-first approach with AI tools and automation.

## Project Structure

This is a Next.js website project with the following structure:

```
src/
├── components/
│   ├── ui/
│   │   ├── ParticleSystem_02.tsx - Main particle system component
│   │   ├── Flipbook.tsx - Image flipbook component
│   │   └── [other UI components]
│   ├── sections/
│   │   ├── HeroSection.tsx - Main hero section with particle systems
│   │   └── [other sections]
│   └── animations/ - Animation components
├── app/ - Next.js app router pages
└── styles/ - CSS styling

docs/
├── ParticleSystem.md - Particle system documentation
├── About The AI CEO.md - Company overview and current AI products
├── ai_ceo_website_strategy.md - Complete website strategy and messaging
└── [other strategic documents]

tailwind.config.ts - Animation definitions and keyframes
```

## Key Company Information

**Core Business**: Custom AI solutions for SMBs
- Target: Small and medium-sized businesses
- Approach: Consultation-first with generous free value
- Philosophy: "Lead with AI Strategy, Empowered by Human Insight"

**Current AI Products**:
- Bankruptcy Navigator (v1.101) - AI paralegal for portfolio managers
- AI Gimmick Guard - Fraud detection agent
- TValue Helper - Statistical analysis guide
- Equipment Finance Helper - Sales coaching AI
- AI Regulation Monitor GPT - Banking compliance agent

**Core Positioning**: 
- "Stop Fighting With Generic AI Tools"
- "Custom AI that actually understands your business - without the enterprise price tag"

## Development Notes

**No Build System**: This repository contains only documentation files and does not have:
- package.json or other dependency files
- Build, test, or lint commands
- Source code requiring compilation

**Content Strategy**: The documentation focuses on:
- SMB-specific AI solutions
- Trust-building through education
- Consultation-first business model
- Security and compliance emphasis

## Working with This Repository

This is a Next.js website project with:
- **Development server**: `npm run dev` (runs on port 3001)
- **Build process**: Standard Next.js build system
- **Key components**: ParticleSystem_02.tsx (hero animations), HeroSection.tsx (main layout)
- **Documentation**: See `docs/ParticleSystem.md` for particle system reference
- **Styling**: Tailwind CSS with custom animations defined in `tailwind.config.ts`

### Important Development Notes:
- **Particle System**: Uses ParticleSystem_02.tsx with 16 animation variants (working version)
- **Hero Section**: Dual particle systems converging at flipbook center (70%, 35%) and right side (85%, 35%)
- **Animations**: All keyframes defined in tailwind.config.ts - do not modify without checking ParticleSystem.md
- **Testing**: Dev server at http://localhost:3001

## Key Documents

### Technical Documentation
- `docs/ParticleSystem.md` - Complete particle system reference and troubleshooting guide

### Strategic Documents
- `docs/ai_ceo_website_strategy.md` - Complete website flow, messaging, and conversion strategy
- `docs/About The AI CEO.md` - Product descriptions and current offerings
- `docs/Strategic Positioning of The AI CEO Agentic System.md` - Technical architecture and market analysis

When making changes, ensure alignment with the core SMB-focused, consultation-first positioning and the company's security-first approach to AI implementation.