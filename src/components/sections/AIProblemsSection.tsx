'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface ProblemCard {
  title: string;
  tagline: string;
  icon: string;
  painPoints: string[];
}

const problems: ProblemCard[] = [
  {
    title: "Generic AI Doesn't Understand Your Business",
    tagline: 'One-size-fits-all tools miss your edge',
    icon: '🎯',
    painPoints: [
      "Generic models can't learn your industry jargon or processes",
      "Cookie-cutter responses that don't match your brand voice",
      'Wastes time training staff on irrelevant features',
      'Misses critical business context that drives decisions',
    ],
  },
  {
    title: 'Data Privacy Is a Non-Negotiable',
    tagline: "You can't risk client data on public models",
    icon: '🔒',
    painPoints: [
      'Client confidentiality violations can destroy trust instantly',
      'Regulatory compliance failures lead to massive fines',
      'Public AI models store and potentially expose your data',
      'One data breach can end careers and close businesses',
    ],
  },
  {
    title: 'Disconnected from Your Systems',
    tagline: "AI that doesn't integrate = another silo",
    icon: '🔗',
    painPoints: [
      'Manual data entry defeats the purpose of automation',
      'Information gets lost between disconnected platforms',
      'Staff waste hours copying data between systems',
      'Creates more work instead of streamlining operations',
    ],
  },
  {
    title: 'No Clear ROI',
    tagline: "If AI doesn't drive outcomes, it's just a cost",
    icon: '📈',
    painPoints: [
      "Expensive tools that don't measurably improve results",
      'No way to track actual time savings or revenue impact',
      'Executive teams lose confidence in AI investments',
      "Competitors gain advantage while you're stuck with costly experiments",
    ],
  },
];

export default function AIProblemsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Compute which card is closest to the center on scroll
  const updateActiveIndex = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;

    let closest = 0;
    let closestDist = Number.POSITIVE_INFINITY;
    cardRefs.current.forEach((el, idx) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const dist = Math.abs(cardCenter - centerX);
      if (dist < closestDist) {
        closest = idx;
        closestDist = dist;
      }
    });
    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveIndex();
          ticking = false;
        });
        ticking = true;
      }
    };
    container.addEventListener('scroll', onScroll, { passive: true });
    updateActiveIndex();
    return () => container.removeEventListener('scroll', onScroll);
  }, [updateActiveIndex]);

  const onCardClick = (index: number) => {
    if (index !== activeIndex) {
      // Snap to the clicked card by scrolling it into view
      cardRefs.current[index]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      return;
    }
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const cardBaseClasses = useMemo(
    () =>
      'snap-center shrink-0 w-[280px] sm:w-[340px] md:w-[380px] lg:w-[420px] transition-transform duration-300',
    []
  );

  return (
    <section id="ai-problems" className="py-24" style={{ backgroundColor: 'var(--background)' }}>
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Why Most AI Implementations Fail
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-body)' }}>
            These are the real problems that make executives lose confidence in AI investments. Sound familiar?
          </p>
        </div>

        {/* Horizontal snapping carousel */}
        <div
          ref={containerRef}
          className="overflow-x-auto overflow-y-visible no-scrollbar snap-x snap-mandatory"
        >
          <div className="flex items-stretch gap-6 px-4 md:px-8 py-2">
            {problems.map((problem, index) => {
              const isActive = index === activeIndex;
              const isExpanded = index === expandedIndex;
              const scale = isExpanded ? 'scale-[1.6]' : isActive ? 'scale-[1.08]' : 'scale-[0.96]';
              const z = isExpanded ? 'z-30' : isActive ? 'z-20' : 'z-10';

              return (
                <div
                  key={index}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className={`${cardBaseClasses} ${scale} ${z}`}
                  style={{ transformOrigin: 'center' }}
                  onClick={() => onCardClick(index)}
                >
                  <Card className="h-full cursor-pointer">
                    <CardHeader className="pb-6">
                      <div
                        className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-3xl"
                        style={{ backgroundColor: 'var(--background)' }}
                      >
                        {problem.icon}
                      </div>
                      <CardTitle className="text-xl lg:text-2xl mb-3" style={{ color: 'var(--text-primary)' }}>
                        {problem.title}
                      </CardTitle>
                      <p className="text-lg font-medium" style={{ color: 'var(--primary)' }}>
                        {problem.tagline}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {problem.painPoints.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-2" aria-hidden="true" />
                            <span className="text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-6 text-sm" style={{ color: 'var(--text-body)' }}>
          Move your mouse or scroll horizontally. Cards snap to center. Click the centered card to expand.
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-16">
          <p className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
            If these problems sound familiar, you're not alone.
          </p>
          <p className="text-base mt-2" style={{ color: 'var(--text-body)' }}>
            Most businesses struggle with these exact issues. But there's a better way.
          </p>
        </div>
      </Container>
    </section>
  );
}