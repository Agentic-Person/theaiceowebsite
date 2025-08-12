'use client';

import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Flipbook from '@/components/ui/Flipbook';
import ParticleSystem from '@/components/ui/ParticleSystem_02';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedButton from '@/components/animations/AnimatedButton';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  // Burst mode state management - keeping it always true for continuous burst
  const [burstMode, setBurstMode] = useState(true);

  return (
    <section 
      id="hero" 
      className="relative min-h-[calc(100vh-4rem)] pt-20 pb-10 flex items-center overflow-hidden"
      style={{ 
        backgroundColor: 'var(--background)',
        color: 'var(--text-primary)'
      }}
    >
      {/* PARTICLE SYSTEMS */}
      <div className="absolute inset-0 hidden lg:block z-0">
        <div className="relative w-full h-full">
          {/* SYSTEM 1: "SlowSpiral1" - Flipbook center convergence */}
          <ParticleSystem 
            className="w-full h-full absolute inset-0" 
            convergencePoint="70%" 
            convergenceVertical="35%" 
            particleCount={0.5}
            burstMode={burstMode}
          />
          
          {/* SYSTEM 2: "SlowSpiral2" - Right side convergence */}
          <ParticleSystem 
            className="w-full h-full absolute inset-0" 
            convergencePoint="85%" 
            convergenceVertical="35%" 
            particleCount={0.5}
            burstMode={burstMode}
          />
        </div>
      </div>

      {/* Flipbook positioned at the perfect convergence point (adjusted left for better balance) */}
      <div className="absolute hidden lg:block z-20" 
           style={{ 
             left: '70%', 
             top: '35%', 
             transform: 'translate(-50%, -50%)'
           }}>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 1.2, 
            delay: 1.5,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <Flipbook 
            interval={4500} // 1s fade in + 2.5s hold + 1s fade out
            className="relative"
          />
        </motion.div>
      </div>

      {/* Content Container with 60/40 split */}
      <Container className="relative z-10 px-3 sm:px-5 lg:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 lg:gap-12 items-center">
          
          {/* Left Column - Content (60%) */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-12">
            {/* Main Headlines */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="space-y-6 max-w-2xl"
            >
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <motion.span 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="block"
              >
Intelligent Systems, Built for Humans.
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="block"
              >
                Powered by AI.
              </motion.span>
            </h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl lg:text-2xl xl:text-3xl" 
                style={{ color: 'var(--text-secondary)' }}
              >
                We build smart systems that remove repetitive tasks, and lighten the load for SMBs.
              </motion.p>
            </motion.div>

            {/* CTA Button */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center justify-center w-full px-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                style={{
                  backgroundColor: '#4e8ad3',
                  borderColor: '#FFFFFF',
                  color: '#FFFFFF',
                  border: '2px solid #FFFFFF',
                  padding: '12px 32px',
                  fontSize: '18px',
                  fontWeight: '500',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontFamily: 'inherit'
                }}
              >
                Book a quick discovery call
              </motion.button>
            </motion.div>

            {/* Team Credibility Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="pt-8"
            >
              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex -space-x-2">
                {/* Avatar Placeholders */}
                {[0, 1, 2].map((index) => (
                  <motion.div 
                    key={index}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 1.2 + index * 0.1,
                      type: 'spring',
                      stiffness: 150 
                    }}
                    className="w-12 h-12 rounded-full border-2" 
                    style={{ 
                      backgroundColor: index === 0 ? 'var(--primary)' : index === 1 ? 'var(--card-background)' : 'var(--text-secondary)', 
                      borderColor: 'var(--text-primary)' 
                    }}
                  />
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
              >
                  <p className="text-sm font-semibold text-center lg:text-left" style={{ color: 'var(--text-primary)' }}>
                    Powered by Prompt Surgeon™ | Enterprise-Grade Security | Version 1.101+
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Empty space for visual balance (40%) */}
          <div className="hidden lg:block">
            {/* This empty column maintains the 60/40 layout balance */}
          </div>
        </div>

        {/* Bottom border line with scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-32 pt-10 border-t" 
          style={{ borderColor: 'var(--border)' }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center space-y-2"
          >
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Scroll to learn more
            </span>
            <motion.div 
              className="w-6 h-10 border-2 rounded-full flex justify-center" 
              style={{ borderColor: 'var(--text-secondary)' }}
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-3 rounded-full mt-2"
                style={{ backgroundColor: 'var(--text-secondary)' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}