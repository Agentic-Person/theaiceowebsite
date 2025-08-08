'use client';

import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface TechFeature {
  title: string;
  description: string;
}

const techFeatures: TechFeature[] = [
  {
    title: "ABLE Framework",
    description: "Analyze, Build, Leverage, Execute - Structured reasoning at scale"
  },
  {
    title: "IP Protection", 
    description: "Zero prompt leakage • Audit-compliant logging • Enterprise security"
  },
  {
    title: "Multi-Modal AI",
    description: "GPT-4.1 optimization • Long-context retention • API integrations"
  }
];

export default function TechnologySection() {
  return (
    <section id="technology" className="py-24" style={{ backgroundColor: 'var(--card-background)' }}>
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Powered by Prompt Surgeon™
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-body)' }}>
            Our proprietary AI infrastructure that makes it all possible
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {techFeatures.map((feature, index) => (
            <Card key={index} className="h-full text-center relative overflow-hidden group hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#10B981' }}>
                  <div className="w-8 h-8 rounded-lg bg-white"></div>
                </div>
                <CardTitle className="text-xl mb-4">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed" style={{ color: 'var(--text-body)' }}>
                  {feature.description}
                </p>
              </CardContent>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(to bottom, #10B981/5, #10B981/10)' }}></div>
            </Card>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Available for white-label licensing and enterprise deployments
          </p>
        </div>
      </Container>
    </section>
  );
}