'use client';

import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const steps = [
  {
    number: "1",
    title: "Choose Your Specialist",
    description: "Select from our 5 industry experts",
    detail: "Each pre-trained on decades of domain knowledge"
  },
  {
    number: "2", 
    title: "Start Your Free Trial",
    description: "14 days full access",
    detail: "White-glove onboarding included • No credit card required"
  },
  {
    number: "3",
    title: "Scale With Confidence",
    description: "Add users as you grow",
    detail: "API access available • White-label options for agencies"
  }
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24" style={{ backgroundColor: 'var(--card-background)' }}>
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Enterprise AI in 3 Simple Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="h-full text-center hover:shadow-xl transition-shadow group">
              <CardHeader className="pb-6">
                {/* Step Number */}
                <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform" style={{ backgroundColor: '#10B981' }}>
                  {step.number}
                </div>
                <CardTitle className="text-2xl mb-4">
                  {step.title}
                </CardTitle>
                <p className="text-lg font-medium mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {step.description}
                </p>
              </CardHeader>
              
              <CardContent>
                <p className="leading-relaxed" style={{ color: 'var(--text-body)' }}>
                  {step.detail}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Connection Lines for Desktop */}
        <div className="hidden lg:block relative -mt-32 mb-16">
          <div className="absolute top-10 left-1/3 w-1/3 h-0.5" style={{ backgroundColor: 'var(--border)' }}></div>
          <div className="absolute top-10 right-1/3 w-1/3 h-0.5" style={{ backgroundColor: 'var(--border)' }}></div>
        </div>
      </Container>
    </section>
  );
}