'use client';

import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { Send } from 'lucide-react';

export default function HeroSection() {
  return (
    <section 
      id="hero" 
      className="min-h-[calc(100vh-4rem)] pt-20 pb-10 flex items-center"
      style={{ 
        backgroundColor: 'var(--background)',
        color: 'var(--text-primary)'
      }}
    >
      <Container className="px-3 sm:px-5 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left Column - 60% */}
          <div className="lg:col-span-3 space-y-14">
            {/* Main Headlines */}
            <div className="space-y-7">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-snug">
                <span className="block">Why Most Businesses</span>
                <span className="block">Struggle to Make AI Work</span>
              </h1>
              <p className="text-xl lg:text-2xl max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                AI isn't magic. Without the right strategy, most implementations fail.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-7">
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
            <div className="pt-14">
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {/* Avatar Placeholders */}
                  <div className="w-12 h-12 rounded-full border-2" style={{ backgroundColor: 'var(--primary)', borderColor: 'var(--text-primary)' }}></div>
                  <div className="w-12 h-12 rounded-full border-2" style={{ backgroundColor: 'var(--card-background)', borderColor: 'var(--text-primary)' }}></div>
                  <div className="w-12 h-12 rounded-full border-2" style={{ backgroundColor: 'var(--text-secondary)', borderColor: 'var(--text-primary)' }}></div>
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    Powered by Prompt Surgeon™ | Enterprise-Grade Security | Version 1.101+
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - 40% */}
          <div className="lg:col-span-2">
            <div className="relative">
              {/* Particle System Container */}
              <div 
                className="aspect-square w-full max-w-lg mx-auto rounded-2xl flex items-center justify-center shadow-2xl"
                style={{ backgroundColor: 'var(--card-background)' }}
              >
                <div className="text-center space-y-4">
                  <div 
                    className="w-24 h-24 rounded-full mx-auto"
                    style={{ backgroundColor: 'var(--primary)' }}
                  ></div>
                  <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    Particle System Placeholder
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-body)' }}>
                    Three.js animation will be added here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom border line */}
        <div className="mt-40 pt-10 border-t" style={{ borderColor: 'var(--border)' }}></div>

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