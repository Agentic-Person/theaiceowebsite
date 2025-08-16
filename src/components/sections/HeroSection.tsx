'use client';

import { useState } from 'react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import ParticleSystem from '@/components/ui/ParticleSystem';
import LeadCaptureModal from '@/components/ui/LeadCaptureModal';
import AnimatedChatButton from '@/components/ui/AnimatedChatButton';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedButton from '@/components/animations/AnimatedButton';

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const teamImages = [
    { src: '/jimmy.png', alt: 'Jimmy Davidson' },
    { src: '/mattsnow.png', alt: 'Matthew Snow' },
    { src: '/rj.jpg', alt: 'RJ Grimshaw' }
  ];
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
          {/* Main Headlines - Fade in from bottom with 0.2s delay */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="space-y-6 max-w-4xl"
          >
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="block">
                Why Most Businesses
              </span>
              <span className="block">
                Struggle to Make AI Work
              </span>
            </h1>
            {/* Subheadline - Fade in from bottom with 0.4s delay */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              className="text-xl lg:text-2xl xl:text-3xl max-w-3xl mx-auto" 
              style={{ color: 'var(--text-secondary)' }}
            >
              AI isn&apos;t magic. Without the right strategy, most implementations fail.
            </motion.p>
          </motion.div>

          {/* CTA Buttons - Fade in from bottom with 0.6s delay */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6 items-center justify-center"
          >
            <AnimatedChatButton 
              onClick={() => {
                // Scroll to the voice agent demo section
                const demoSection = document.getElementById('team');
                if (demoSection) {
                  demoSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />
            <AnimatedButton 
              variant="outline"
              className="h-14 px-8 border-2"
              size="lg"
              style={{ borderColor: '#FFFFFF', color: '#FFC44F' }}
              onClick={() => setIsModalOpen(true)}
            >
              Download AI EDGE eBook
            </AnimatedButton>
          </motion.div>

          {/* Team Credibility Bar - Fade in with 0.8s delay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
            className="pt-8"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex -space-x-2">
                {/* Team Member Avatars */}
                {teamImages.map((member, index) => (
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
                    className="relative w-12 h-12 rounded-full border-2 overflow-hidden" 
                    style={{ 
                      borderColor: 'var(--text-primary)' 
                    }}
                  >
                    <Image
                      src={member.src}
                      alt={member.alt}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </motion.div>
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

      {/* Lead Capture Modal */}
      <LeadCaptureModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ebookTitle="AI EDGE eBook"
        ebookDescription="The Complete Guide to AI Implementation for SMBs"
      />
    </section>
  );
}