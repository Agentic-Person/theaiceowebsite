'use client';

import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { NavigationItem } from '@/types';
import { handleSectionClick } from '@/lib/scroll';

const footerNavigation = {
  solutions: [
    { id: 'custom-ai-tools', label: 'Custom AI Tools', href: '#solutions', isScroll: true },
    { id: 'workflow-automation', label: 'Workflow Automation', href: '#solutions', isScroll: true },
    { id: 'ai-strategy', label: 'AI Strategy', href: '#solutions', isScroll: true },
    { id: 'implementation', label: 'Implementation', href: '#workflow', isScroll: true },
  ],
  company: [
    { id: 'about-us', label: 'About Us', href: '#team', isScroll: true },
    { id: 'our-process', label: 'Our Process', href: '#workflow', isScroll: true },
    { id: 'success-stories', label: 'Success Stories', href: '#success-stories', isScroll: true },
    { id: 'blog', label: 'Blog', href: '/blog', isScroll: false },
  ],
  resources: [
    { id: 'ai-playbook', label: 'AI Playbook', href: '#resources', isScroll: true },
    { id: 'roi-calculator', label: 'ROI Calculator', href: '#resources', isScroll: true },
    { id: 'templates', label: 'Templates', href: '#resources', isScroll: true },
    { id: 'webinars', label: 'Webinars', href: '#resources', isScroll: true },
  ],
};

const socialLinks = [
  { label: 'LinkedIn', href: '#', icon: 'linkedin' },
  { label: 'Twitter', href: '#', icon: 'twitter' },
  { label: 'GitHub', href: '#', icon: 'github' },
];

export default function Footer() {
  return (
    <footer 
      className="transition-colors duration-300"
      style={{ 
        backgroundColor: 'var(--card-background)',
        color: 'var(--text-primary)'
      }}
    >
      <Container>
        {/* Newsletter Section */}
        <div className="py-16 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Stay ahead with AI insights
              </h2>
              <p style={{ color: 'var(--text-body)' }}>
                Get weekly updates on AI trends, implementation strategies, and success stories from SMBs like yours.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:border-transparent"
                style={{
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)'
                }}
              />
              <Button variant="primary" size="md">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--primary)' }}>
                  <span className="text-sm font-bold text-white">AI</span>
                </div>
                <span className="ml-2 text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  The AI CEO
                </span>
              </Link>
              <p className="mb-4 max-w-md font-medium text-lg" style={{ color: 'var(--text-secondary)' }}>
                Lead with AI Strategy, Empowered by Human Insight
              </p>
              <p className="mb-6 max-w-md" style={{ color: 'var(--text-body)' }}>
                Custom AI solutions for small and medium businesses. 
                We build AI that actually understands your business - without the enterprise price tag.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors hover:brightness-110"
                    style={{ backgroundColor: 'var(--background)' }}
                    aria-label={link.label}
                  >
                    <div className="w-5 h-5 rounded" style={{ backgroundColor: 'var(--text-secondary)' }}></div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Solutions</h3>
              <ul className="space-y-2">
                {footerNavigation.solutions.map((link) => (
                  <li key={link.id}>
                    {link.isScroll ? (
                      <a
                        href={link.href}
                        onClick={(e) => handleSectionClick(e, link.href.substring(1))}
                        className="transition-colors hover:brightness-110 cursor-pointer"
                        style={{ color: 'var(--text-body)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'var(--primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--text-body)';
                        }}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="transition-colors hover:brightness-110"
                        style={{ color: 'var(--text-body)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'var(--primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--text-body)';
                        }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Company</h3>
              <ul className="space-y-2">
                {footerNavigation.company.map((link) => (
                  <li key={link.id}>
                    {link.isScroll ? (
                      <a
                        href={link.href}
                        onClick={(e) => handleSectionClick(e, link.href.substring(1))}
                        className="transition-colors hover:brightness-110 cursor-pointer"
                        style={{ color: 'var(--text-body)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'var(--primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--text-body)';
                        }}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="transition-colors hover:brightness-110"
                        style={{ color: 'var(--text-body)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'var(--primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--text-body)';
                        }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Resources</h3>
              <ul className="space-y-2">
                {footerNavigation.resources.map((link) => (
                  <li key={link.id}>
                    {link.isScroll ? (
                      <a
                        href={link.href}
                        onClick={(e) => handleSectionClick(e, link.href.substring(1))}
                        className="transition-colors hover:brightness-110 cursor-pointer"
                        style={{ color: 'var(--text-body)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'var(--primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--text-body)';
                        }}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="transition-colors hover:brightness-110"
                        style={{ color: 'var(--text-body)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'var(--primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--text-body)';
                        }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm" style={{ color: 'var(--text-body)' }}>
              © 2025 The AI CEO. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link 
                href="/privacy" 
                className="text-sm transition-colors hover:brightness-110"
                style={{ color: 'var(--text-body)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-body)';
                }}
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-sm transition-colors hover:brightness-110"
                style={{ color: 'var(--text-body)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-body)';
                }}
              >
                Terms of Service
              </Link>
              <Link 
                href="/cookies" 
                className="text-sm transition-colors hover:brightness-110"
                style={{ color: 'var(--text-body)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-body)';
                }}
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}