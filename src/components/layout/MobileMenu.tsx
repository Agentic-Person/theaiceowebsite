'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { NavigationItem } from '@/types';
import Button from '@/components/ui/Button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: NavigationItem[];
}

export default function MobileMenu({ isOpen, onClose, navigationItems }: MobileMenuProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 lg:hidden transition-all duration-300 ease-in-out',
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      )}
    >
      {/* Backdrop */}
      <div 
        className={cn(
          'fixed inset-0 bg-black transition-opacity duration-300',
          isOpen ? 'opacity-50' : 'opacity-0'
        )}
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div 
        className={cn(
          'fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl transition-transform duration-300 ease-in-out transform',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <Link href="/" className="flex items-center" onClick={onClose}>
              <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-gray-600">AI</span>
              </div>
              <span className="ml-2 text-lg font-bold text-gray-900">
                The AI CEO
              </span>
            </Link>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto py-6">
            <nav className="px-6">
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-medium transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* CTA Section */}
          <div className="p-6 border-t border-gray-200">
            <Button 
              variant="primary" 
              size="lg" 
              className="w-full"
              onClick={onClose}
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}