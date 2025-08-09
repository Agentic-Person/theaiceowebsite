'use client';

import { useRef, useCallback } from 'react';
import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const problems = [
  {
    title: "Generic AI Doesn't Understand Your Business",
    tagline: "One-size-fits-all tools miss your edge",
    icon: "🎯",
    painPoints: [
      "Generic models can't learn your industry jargon or processes",
      "Cookie-cutter responses that don't match your brand voice", 
      "Wastes time training staff on irrelevant features",
      "Misses critical business context that drives decisions"
    ]
  },
  {
    title: "Data Privacy Is a Non-Negotiable",
    tagline: "You can't risk client data on public models",
    icon: "🔒",
    painPoints: [
      "Client confidentiality violations can destroy trust instantly",
      "Regulatory compliance failures lead to massive fines",
      "Public AI models store and potentially expose your data", 
      "One data breach can end careers and close businesses"
    ]
  },
  {
    title: "Disconnected from Your Systems",
    tagline: "AI that doesn't integrate = another silo",
    icon: "🔗",
    painPoints: [
      "Manual data entry defeats the purpose of automation",
      "Information gets lost between disconnected platforms",
      "Staff waste hours copying data between systems",
      "Creates more work instead of streamlining operations"
    ]
  },
  {
    title: "No Clear ROI",
    tagline: "If AI doesn't drive outcomes, it's just a cost",
    icon: "📈",
    painPoints: [
      "Expensive tools that don't measurably improve results",
      "No way to track actual time savings or revenue impact",
      "Executive teams lose confidence in AI investments",
      "Competitors gain advantage while you're stuck with costly experiments"
    ]
  }
];

export default function AIProblemsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const containerWidth = rect.width;
    const scrollWidth = container.scrollWidth;
    const maxScroll = scrollWidth - containerWidth;
    
    // Calculate scroll position based on mouse position (0 to 1)
    const scrollPercentage = mouseX / containerWidth;
    const targetScroll = scrollPercentage * maxScroll;
    
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  }, []);

  return (
    <section 
      id="ai-problems" 
      className="pt-10 pb-24" 
      style={{ backgroundColor: 'var(--background)' }}
    >
      <Container>
        <div className="text-center mb-6">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Why Most AI Implementations Fail
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8" style={{ color: 'var(--text-body)' }}>
            These are the real problems that make executives lose confidence in AI investments. 
            Sound familiar?
          </p>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Move your mouse left and right to explore each problem
          </p>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide cursor-pointer"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          {problems.map((problem, index) => (
            <Card 
              key={index} 
              className="flex-none w-80 lg:w-96 h-full text-center hover:shadow-xl transition-all duration-300 group hover:scale-105"
              style={{ minHeight: '500px', backgroundColor: '#001c38' }}
            >
              <CardHeader className="pb-6">
                {/* Icon */}
                <div 
                  className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center text-3xl group-hover:opacity-80 transition-opacity" 
                  style={{ backgroundColor: 'var(--background)' }}
                >
                  {problem.icon}
                </div>
                
                <CardTitle className="text-xl lg:text-2xl mb-4 leading-tight" style={{ color: 'var(--text-primary)' }}>
                  {problem.title}
                </CardTitle>
                
                <p className="text-lg font-medium mb-6" style={{ color: 'var(--primary)' }}>
                  {problem.tagline}
                </p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <ul className="space-y-4 text-left">
                    {problem.painPoints.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-2"></div>
                        <span className="text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom message */}
        <div className="text-center mt-12">
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