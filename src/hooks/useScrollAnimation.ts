import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimation, AnimationControls } from 'framer-motion';
import { scrollTriggerConfig, shouldReduceMotion } from '@/lib/animations';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  disabled?: boolean;
}

interface UseScrollAnimationReturn {
  ref: (node?: Element | null) => void;
  controls: AnimationControls;
  inView: boolean;
  hasAnimated: boolean;
}

export const useScrollAnimation = (
  options: UseScrollAnimationOptions = {}
): UseScrollAnimationReturn => {
  const {
    threshold = scrollTriggerConfig.threshold,
    rootMargin = scrollTriggerConfig.rootMargin,
    triggerOnce = scrollTriggerConfig.triggerOnce,
    delay = 0,
    disabled = false,
  } = options;

  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check for reduced motion preference
  const reduceMotion = shouldReduceMotion();

  const { ref, inView } = useInView({
    threshold: reduceMotion ? 0 : threshold,
    rootMargin,
    triggerOnce: reduceMotion ? true : triggerOnce,
    skip: disabled,
  });

  useEffect(() => {
    // Cleanup previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (disabled) return;

    if (inView && !hasAnimated) {
      // Apply delay if specified
      if (delay > 0 && !reduceMotion) {
        timeoutRef.current = setTimeout(() => {
          controls.start('visible');
          setHasAnimated(true);
        }, delay * 1000);
      } else {
        controls.start('visible');
        setHasAnimated(true);
      }
    } else if (!inView && !triggerOnce && hasAnimated) {
      controls.start('hidden');
      setHasAnimated(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [inView, controls, hasAnimated, triggerOnce, delay, disabled, reduceMotion]);

  // Initialize with hidden state
  useEffect(() => {
    if (!disabled) {
      controls.start('hidden');
    }
  }, [controls, disabled]);

  return {
    ref,
    controls,
    inView,
    hasAnimated,
  };
};

// Hook for staggered animations on multiple elements
interface UseStaggeredScrollOptions extends UseScrollAnimationOptions {
  staggerDelay?: number;
  staggerDirection?: 'normal' | 'reverse';
}

export const useStaggeredScroll = (
  itemCount: number,
  options: UseStaggeredScrollOptions = {}
) => {
  const {
    staggerDelay = 0.1,
    staggerDirection = 'normal',
    ...scrollOptions
  } = options;

  const { ref, inView, hasAnimated } = useScrollAnimation(scrollOptions);
  const itemControls = Array.from({ length: itemCount }, () => useAnimation());

  useEffect(() => {
    if (inView && !hasAnimated) {
      const sequence = staggerDirection === 'reverse' 
        ? [...itemControls].reverse() 
        : itemControls;

      sequence.forEach((control, index) => {
        setTimeout(() => {
          control.start('visible');
        }, index * staggerDelay * 1000);
      });
    } else if (!inView && !scrollOptions.triggerOnce) {
      itemControls.forEach(control => control.start('hidden'));
    }
  }, [inView, hasAnimated, itemControls, staggerDelay, staggerDirection, scrollOptions.triggerOnce]);

  return {
    containerRef: ref,
    itemControls,
    inView,
    hasAnimated,
  };
};

// Hook for parallax scroll effects
interface UseParallaxOptions {
  speed?: number;
  offset?: number;
  disabled?: boolean;
}

export const useParallax = (options: UseParallaxOptions = {}) => {
  const { speed = 0.5, offset = 0, disabled = false } = options;
  const [scrollY, setScrollY] = useState(0);
  const elementRef = useRef<HTMLElement | null>(null);
  const [transform, setTransform] = useState('translateY(0px)');

  useEffect(() => {
    if (disabled || shouldReduceMotion()) return;

    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const elementTop = rect.top;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;

        // Calculate if element is in viewport
        if (elementTop < windowHeight && elementTop + elementHeight > 0) {
          const scrollProgress = (windowHeight - elementTop) / (windowHeight + elementHeight);
          const parallaxOffset = (scrollProgress - 0.5) * speed * 100 + offset;
          setTransform(`translateY(${parallaxOffset}px)`);
        }
      }
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, offset, disabled]);

  return {
    ref: (node: HTMLElement | null) => {
      elementRef.current = node;
    },
    transform,
    scrollY,
  };
};