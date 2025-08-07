'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { NavigationItem } from '@/types';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { ThemeToggle } from '@/components/ThemeToggle';
import { handleSectionClick } from '@/lib/scroll';

const navigationItems: NavigationItem[] = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Toolkit', href: '#toolkit' },
  { label: 'Outcomes', href: '#outcomes' },
  { label: 'Success Stories', href: '#success-stories' },
  { label: 'Resources', href: '#resources' },
  { label: 'Team', href: '#team' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // Entrance animation trigger - more dramatic
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ease-out',
        'transform',
        isVisible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-full opacity-0 scale-95',
        isScrolled ? 'backdrop-blur-md shadow-lg' : 'bg-transparent'
      )}
      style={{
        backgroundColor: isScrolled ? 'rgba(0, 29, 57, 0.95)' : 'transparent',
      }}
    >
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-10 h-10 bg-[var(--primary)] rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-white">AI</span>
            </div>
            <span className="ml-2 text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              The AI CEO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleSectionClick(e, item.href.substring(1))}
                className="font-medium transition-colors duration-300 hover:brightness-110 cursor-pointer"
                style={{ 
                  color: 'var(--text-secondary)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Button and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="primary" size="md">
              Get in Touch
            </Button>
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              className="p-2 rounded-md transition-colors duration-300"
              style={{ 
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--card-background)'
              }}
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </nav>
  );
}