import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';
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
  controls: ReturnType<typeof useAnimation>;
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
  
  // Create a fixed number of animation controls - max 20 items for performance
  const maxItems = Math.min(itemCount, 20);
  
  // Create hooks unconditionally (React hooks rules)
  const control1 = useAnimation();
  const control2 = useAnimation();
  const control3 = useAnimation();
  const control4 = useAnimation();
  const control5 = useAnimation();
  const control6 = useAnimation();
  const control7 = useAnimation();
  const control8 = useAnimation();
  const control9 = useAnimation();
  const control10 = useAnimation();
  const control11 = useAnimation();
  const control12 = useAnimation();
  const control13 = useAnimation();
  const control14 = useAnimation();
  const control15 = useAnimation();
  const control16 = useAnimation();
  const control17 = useAnimation();
  const control18 = useAnimation();
  const control19 = useAnimation();
  const control20 = useAnimation();
  
  // Store in array, using only the needed ones
  const allControls = [
    control1, control2, control3, control4, control5,
    control6, control7, control8, control9, control10,
    control11, control12, control13, control14, control15,
    control16, control17, control18, control19, control20
  ];
  
  const itemControls = allControls.slice(0, maxItems);

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