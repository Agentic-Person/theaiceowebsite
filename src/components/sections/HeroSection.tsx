'use client';

import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import ParticleSystem from '@/components/ui/ParticleSystem';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedButton from '@/components/animations/AnimatedButton';

export default function HeroSection() {
  return (
    <section 
      id="hero" 
      className="relative min-h-[calc(100vh-4rem)] pt-20 pb-10 flex items-center justify-center overflow-hidden"
      style={{ 
        backgroundColor: 'var(--background)',
        color: 'var(--text-primary)'
      }}
    >
      {/* Fullscreen Particle System Background */}
      <div className="absolute inset-0 z-0">
        <ParticleSystem className="w-full h-full" />
      </div>

      {/* Centered Content Layer */}
      <Container className="relative z-10 px-3 sm:px-5 lg:px-6">
        <div className="flex flex-col items-center text-center space-y-12">
          {/* Main Headlines */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-6 max-w-4xl"
          >
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <motion.span 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="block"
              >
                Why Most Businesses
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="block"
              >
                Struggle to Make AI Work
              </motion.span>
            </h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl lg:text-2xl xl:text-3xl max-w-3xl mx-auto" 
              style={{ color: 'var(--text-secondary)' }}
            >
              AI isn't magic. Without the right strategy, most implementations fail.
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 items-center justify-center"
          >
            <AnimatedButton 
              className="h-14 px-8 border-2"
              size="lg"
              style={{ backgroundColor: '#FFC44F', borderColor: '#FFFFFF' }}
            >
              Book your AI strategy session
            </AnimatedButton>
            <AnimatedButton 
              variant="outline"
              className="h-14 px-8 border-2"
              size="lg"
              style={{ borderColor: '#FFFFFF', color: '#FFC44F' }}
            >
              Download AI EDGE eBook
            </AnimatedButton>
          </motion.div>

          {/* Team Credibility Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="pt-8"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
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
                <p className="text-sm font-semibold text-center sm:text-left" style={{ color: 'var(--text-primary)' }}>
                  Powered by Prompt Surgeon™ | Enterprise-Grade Security | Version 1.101+
                </p>
              </motion.div>
            </div>
          </motion.div>
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