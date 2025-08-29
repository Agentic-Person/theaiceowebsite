'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NavigationItem } from '@/types';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import AnimatedChatButton from '@/components/ui/AnimatedChatButton';
import { ThemeToggle } from '@/components/ThemeToggle';
import { handleSectionClick } from '@/lib/scroll';
import { useActiveSection } from '@/hooks/useActiveSection';

const navigationItems: NavigationItem[] = [
  { label: 'Why', href: '#why' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'AI Voice', href: '#ai-voice' },
  { label: 'About', href: '#about' },
  { label: 'Team', href: '#meet-team' },
  { label: 'Blog', href: '/blog' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  
  // Active section tracking (only for hash anchors)
  const sectionIds = navigationItems
    .filter(item => item.href.startsWith('#'))
    .map(item => item.href.substring(1));
  const activeSection = useActiveSection(sectionIds, 100);

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
            <div className="w-10 h-10 relative">
              <Image
                src="/aiceoicon.jpg"
                alt="The AI CEO"
                width={40}
                height={40}
                className="rounded-lg object-cover"
              />
            </div>
            <span className="ml-2 text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              The AI CEO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              // Handle different types of navigation items
              if (item.href.startsWith('#')) {
                // Hash anchor - same page navigation
                const sectionId = item.href.substring(1);
                const isActive = activeSection === sectionId;
                
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleSectionClick(e, sectionId)}
                    className={cn(
                      "relative font-medium transition-all duration-300 cursor-pointer",
                      "hover:text-[var(--primary)]",
                      isActive ? "text-[var(--primary)]" : "text-[var(--text-secondary)]"
                    )}
                    style={{
                      color: isActive ? 'var(--primary)' : undefined,
                    }}
                  >
                    {item.label}
                    {/* Active indicator */}
                    <span 
                      className={cn(
                        "absolute -bottom-1 left-0 h-0.5 bg-[var(--primary)] transition-all duration-300",
                        isActive ? "w-full" : "w-0"
                      )}
                    />
                    {/* Hover underline */}
                    <span 
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-[var(--primary)] scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"
                    />
                  </a>
                );
              } else {
                // Regular route - different page navigation
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative font-medium transition-all duration-300 cursor-pointer",
                      "hover:text-[var(--primary)]",
                      isActive ? "text-[var(--primary)]" : "text-[var(--text-secondary)]"
                    )}
                    style={{
                      color: isActive ? 'var(--primary)' : undefined,
                    }}
                  >
                    {item.label}
                    {/* Active indicator */}
                    <span 
                      className={cn(
                        "absolute -bottom-1 left-0 h-0.5 bg-[var(--primary)] transition-all duration-300",
                        isActive ? "w-full" : "w-0"
                      )}
                    />
                    {/* Hover underline */}
                    <span 
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-[var(--primary)] scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"
                    />
                  </Link>
                );
              }
            })}
          </div>

          {/* CTA Button and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <AnimatedChatButton 
              noAnimation
              onClick={() => {
                // Scroll to the voice agent demo section
                const demoSection = document.getElementById('team');
                if (demoSection) {
                  demoSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />
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