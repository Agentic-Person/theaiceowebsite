'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { NavigationItem } from '@/types';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';

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

    // Entrance animation trigger
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
        'transform',
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0',
        isScrolled ? 'backdrop-blur-md bg-white/80 shadow-sm' : 'bg-transparent'
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-gray-600">AI</span>
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900">
              The AI CEO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="primary" size="md">
              Get in Touch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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
      </Container>
    </nav>
  );
}