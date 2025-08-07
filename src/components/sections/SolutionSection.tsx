'use client';

import Link from 'next/link';
import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { SolutionPillar } from '@/types';

const solutionPillars: SolutionPillar[] = [
  {
    title: "Understand First",
    description: "We start with a deep dive into YOUR processes, challenges, and goals. No cookie-cutter solutions.",
    features: [
      "Free 15-minute assessment",
      "Custom opportunity analysis",
      "Industry-specific recommendations",
      "ROI projections for your business"
    ]
  },
  {
    title: "Build Custom", 
    description: "Every solution is built specifically for your business, integrating seamlessly with your existing workflows.",
    features: [
      "Tailored AI tools and agents",
      "Secure, private implementations",
      "Integration with your current systems",
      "Scalable architecture for growth"
    ]
  },
  {
    title: "Support Always",
    description: "We're your AI success partners, providing ongoing optimization and support as your business grows.",
    features: [
      "Dedicated success manager",
      "Regular performance reviews",
      "Continuous optimization",
      "24/7 technical support"
    ]
  }
];

export default function SolutionSection() {
  return (
    <section id="solutions" className="py-24" style={{ backgroundColor: 'var(--background)' }}>
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Custom AI Solutions That Work
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-body)' }}>
            Our proven three-pillar approach ensures your AI implementation delivers 
            real results, not just impressive demos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {solutionPillars.map((pillar, index) => (
            <Card key={index} className="h-full relative overflow-hidden group hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 text-white rounded-lg flex items-center justify-center font-bold" style={{ backgroundColor: 'var(--text-primary)' }}>
                    {index + 1}
                  </div>
                  <CardTitle className="text-2xl">
                    {pillar.title}
                  </CardTitle>
                </div>
                <p className="leading-relaxed" style={{ color: 'var(--text-body)' }}>
                  {pillar.description}
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {pillar.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full mt-0.5 flex items-center justify-center" style={{ backgroundColor: 'var(--card-background)' }}>
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--text-secondary)' }}></div>
                      </div>
                      <span style={{ color: 'var(--text-body)' }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(to right, var(--text-primary)/5, var(--text-secondary)/5)' }}></div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a href="#workflow" onClick={(e) => {
            e.preventDefault();
            document.getElementById('workflow')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            <Button variant="outline" size="lg">
              See How We Do It
            </Button>
          </a>
        </div>
      </Container>
    </section>
  );
}