'use client';

import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { Send } from 'lucide-react';

export default function HeroSection() {
  return (
    <section 
      id="hero" 
      className="min-h-screen flex flex-col justify-center py-20 pt-32"
      style={{ 
        backgroundColor: 'var(--background)',
        color: 'var(--text-primary)'
      }}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left Column - 60% */}
          <div className="lg:col-span-3 space-y-8">
            {/* Main Headlines */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="block">AI Strategy and</span>
                <span className="block">Custom Tools</span>
                <span className="block">Aligned to Your</span>
                <span className="block">Unique Workflows</span>
              </h1>
              <p className="text-xl lg:text-2xl max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                Generic solutions overlook your edge. We design tools that embed our expertise, mirror your processes, and uphold your security and compliance.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="primary" 
                size="lg"
                style={{ backgroundColor: '#10B981' }}
              >
                Book Your AI Strategy Session
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                style={{ borderColor: '#10B981', color: '#10B981' }}
              >
                Download AI EDGE eBook
              </Button>
            </div>

            {/* Team Credibility Bar */}
            <div className="pt-8">
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {/* Avatar Placeholders */}
                  <div className="w-12 h-12 rounded-full border-2" style={{ backgroundColor: 'var(--primary)', borderColor: 'var(--text-primary)' }}></div>
                  <div className="w-12 h-12 rounded-full border-2" style={{ backgroundColor: 'var(--card-background)', borderColor: 'var(--text-primary)' }}></div>
                  <div className="w-12 h-12 rounded-full border-2" style={{ backgroundColor: 'var(--text-secondary)', borderColor: 'var(--text-primary)' }}></div>
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    Founder-Led, Expert-Driven AI Solutions
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Ready to Build Your Success Story
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

        {/* Chat Interface Section */}
        <div className="mt-20 pt-12" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="max-w-2xl mx-auto">
            {/* Chat Header */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                Get answers now
              </h3>
            </div>

            {/* Chat Interface */}
            <div 
              className="rounded-2xl p-6 shadow-xl"
              style={{ backgroundColor: 'var(--card-background)' }}
            >
              {/* Chat Input */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Ask about our AI solutions..."
                  className="w-full px-4 py-3 pr-12 rounded-xl border text-base focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'var(--background)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-primary)'
                  }}
                />
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg hover:brightness-110 transition-colors"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Suggestion Chips */}
              <div className="flex flex-wrap gap-2">
                {[
                  "What's in the AI EDGE eBook?",
                  "How do you customize AI for my business?",
                  "Tell me about your toolkit"
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    className="px-4 py-2 rounded-full text-sm border hover:brightness-110 transition-colors"
                    style={{
                      borderColor: 'var(--border)',
                      color: 'var(--text-body)',
                      backgroundColor: 'var(--background)'
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Scroll Hint */}
            <div className="flex flex-col items-center space-y-2 pt-8">
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Scroll to learn more</p>
              <div className="w-6 h-10 border-2 rounded-full flex justify-center" style={{ borderColor: 'var(--border)' }}>
                <div className="w-1 h-3 rounded-full mt-2 animate-bounce" style={{ backgroundColor: 'var(--text-secondary)' }}></div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}