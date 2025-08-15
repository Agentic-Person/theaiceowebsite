'use client';

import { useEffect } from 'react';

export default function ScrollPreventionOnLoad() {
  useEffect(() => {
    // Prevent browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Force scroll to top on page load
    window.scrollTo(0, 0);
    
    // Remove any hash from URL without triggering scroll
    if (window.location.hash) {
      const newUrl = window.location.pathname + window.location.search;
      window.history.replaceState(null, '', newUrl);
    }
    
    // Prevent any automatic scrolling for the first second
    const preventScroll = (e: Event) => {
      if (e.type === 'scroll') {
        window.scrollTo(0, 0);
      }
    };
    
    // Add temporary scroll prevention
    const timer = setTimeout(() => {
      // After 1 second, remove the prevention
      window.removeEventListener('scroll', preventScroll);
    }, 1000);
    
    // Cleanup
    return () => {
      clearTimeout(timer);
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto';
      }
    };
  }, []);
  
  return null;
}