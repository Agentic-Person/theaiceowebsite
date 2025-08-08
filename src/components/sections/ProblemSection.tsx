'use client';

import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ProblemCard } from '@/types';

const problems: ProblemCard[] = [
  {
    title: "ChatGPT Doesn't Know Bankruptcy Law",
    description: "Missing case precedents and filing requirements",
  },
  {
    title: "Claude Can't Coach Deal Psychology",
    description: "No understanding of buyer hesitation patterns",
  },
  {
    title: "Gemini Won't Track Compliance Changes",
    description: "Can't monitor multiple regulators 24/7",
  },
  {
    title: "Perplexity Can't Verify AI Vendors",
    description: "No framework for detecting scams",
  },
];

export default function ProblemSection() {
  return (
    <section id="problems" className="py-24" style={{ backgroundColor: 'var(--background)' }}>
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Why Generic AI Falls Short for Professionals
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-body)' }}>
            Popular AI tools lack the deep domain expertise that professionals need 
            to handle complex, industry-specific challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {problems.map((problem, index) => (
            <Card key={index} className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--card-background)' }}>
                    <span className="text-lg font-bold" style={{ color: 'var(--text-secondary)' }}>
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-3">
                      {problem.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed" style={{ color: 'var(--text-body)' }}>
                  {problem.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Transition */}
        <div className="text-center">
          <p className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            There&apos;s a better way...
          </p>
          <div className="w-16 h-1 mx-auto" style={{ backgroundColor: 'var(--border)' }}></div>
        </div>
      </Container>
    </section>
  );
}