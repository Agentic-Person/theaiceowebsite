'use client';

import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import ParticleSystem from '@/components/ui/ParticleSystem';
import { Send } from 'lucide-react';

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
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="block">Why Most Businesses</span>
              <span className="block">Struggle to Make AI Work</span>
            </h1>
            <p className="text-xl lg:text-2xl xl:text-3xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              AI isn't magic. Without the right strategy, most implementations fail.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
            <Button 
              variant="primary" 
              size="lg"
              style={{ backgroundColor: '#10B981' }}
            >
              Start free 7-day trial
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              style={{ borderColor: '#10B981', color: '#10B981' }}
            >
              Download free eBook
            </Button>
          </div>

          {/* Team Credibility Bar */}
          <div className="pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex -space-x-2">
                {/* Avatar Placeholders */}
                <div className="w-12 h-12 rounded-full border-2" style={{ backgroundColor: 'var(--primary)', borderColor: 'var(--text-primary)' }}></div>
                <div className="w-12 h-12 rounded-full border-2" style={{ backgroundColor: 'var(--card-background)', borderColor: 'var(--text-primary)' }}></div>
                <div className="w-12 h-12 rounded-full border-2" style={{ backgroundColor: 'var(--text-secondary)', borderColor: 'var(--text-primary)' }}></div>
              </div>
              <div>
                <p className="text-sm font-semibold text-center sm:text-left" style={{ color: 'var(--text-primary)' }}>
                  Powered by Prompt Surgeon™ | Enterprise-Grade Security | Version 1.101+
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom border line */}
        <div className="mt-32 pt-10 border-t" style={{ borderColor: 'var(--border)' }}></div>

        {/* Scroll indicator */}
        <div className="mt-6 flex flex-col items-center text-center">
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Scroll to learn more
          </span>
          <div
            className="mt-3 w-7 h-11 rounded-full flex items-start justify-center"
            aria-hidden
            style={{ border: '1.5px solid var(--text-secondary)' }}
          >
            <div
              className="w-1 h-3 rounded-full animate-bounce"
              style={{ backgroundColor: 'var(--text-secondary)', marginTop: '6px' }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}