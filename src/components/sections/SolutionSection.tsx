'use client';

import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface AISpecialist {
  title: string;
  badge: string;
  tagline: string;
  keyPoints: string[];
  price: string;
}

const aiSpecialists: AISpecialist[] = [
  {
    title: "Bankruptcy Navigator v1.101",
    badge: "LEGAL AI",
    tagline: "AI Paralegal for Chapter 7 & 11 Cases",
    keyPoints: [
      "Manages entire bankruptcy workflow",
      "SMB-focused knowledge base",
      "Audit-compliant with full logging"
    ],
    price: "From $497/month"
  },
  {
    title: "Equipment Finance Helper",
    badge: "FINANCE AI",
    tagline: "Deal Progression Coach with EQ",
    keyPoints: [
      "30% higher close rates",
      "Hidden risk detection",
      "Three mastery levels"
    ],
    price: "From $397/month"
  },
  {
    title: "AI Regulation Monitor",
    badge: "COMPLIANCE AI",
    tagline: "24/7 Banking Compliance Tracking",
    keyPoints: [
      "Multi-regulator monitoring",
      "60% faster policy updates",
      "Real-time alerts"
    ],
    price: "From $797/month"
  },
  {
    title: "AI Gimmick Guard",
    badge: "SECURITY AI",
    tagline: "Vendor Fraud Detection System",
    keyPoints: [
      "5-point risk assessment",
      "Plain English reports",
      "Scam protection"
    ],
    price: "From $297/month"
  },
  {
    title: "TValue Helper",
    badge: "ANALYTICS AI",
    tagline: "Statistical Analysis Assistant",
    keyPoints: [
      "Platform documentation integrated",
      "Adaptive to skill level",
      "24/7 availability"
    ],
    price: "From $297/month"
  }
];

const SpecialistCard = ({ specialist }: { specialist: AISpecialist }) => (
  <Card className="h-full hover:shadow-xl transition-all duration-300">
    <CardHeader>
      <div className="flex items-center justify-between mb-4">
        <span 
          className="px-3 py-1 text-xs font-bold rounded-full text-white"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          {specialist.badge}
        </span>
        <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
          {specialist.price}
        </span>
      </div>
      <CardTitle className="text-2xl mb-2">
        {specialist.title}
      </CardTitle>
      <p className="text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>
        {specialist.tagline}
      </p>
    </CardHeader>
    <CardContent>
      <ul className="space-y-3 mb-6">
        {specialist.keyPoints.map((point, pointIndex) => (
          <li key={pointIndex} className="flex items-start space-x-3">
            <div 
              className="flex-shrink-0 w-5 h-5 rounded-full mt-0.5 flex items-center justify-center"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
            <span style={{ color: 'var(--text-body)' }}>{point}</span>
          </li>
        ))}
      </ul>
      <Button 
        variant="primary" 
        className="w-full"
        style={{ backgroundColor: 'var(--primary)' }}
      >
        Start Free Trial
      </Button>
    </CardContent>
  </Card>
);

export default function SolutionSection() {
  return (
    <section 
      id="solutions" 
      className="py-24" 
      style={{ backgroundColor: 'var(--background)' }}
    >
      <Container>
        <div className="text-center mb-16">
          <h2 
            className="text-4xl lg:text-5xl font-bold mb-6" 
            style={{ color: 'var(--text-primary)' }}
          >
            5 Industry AI Specialists Ready to Deploy
          </h2>
          <p 
            className="text-xl max-w-3xl mx-auto" 
            style={{ color: 'var(--text-body)' }}
          >
            Each powered by Prompt Surgeon™ technology with enterprise security built-in
          </p>
        </div>

        {/* 2-2-1 Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* First 4 cards in 2x2 grid */}
          {aiSpecialists.slice(0, 4).map((specialist, index) => (
            <SpecialistCard key={index} specialist={specialist} />
          ))}
        </div>

        {/* Last card centered */}
        <div className="flex justify-center mb-16">
          <div className="w-full lg:w-1/2">
            <SpecialistCard specialist={aiSpecialists[4]} />
          </div>
        </div>

        {/* Note about trials */}
        <div className="text-center">
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            All solutions include: 14-day free trial • Cancel anytime • White-glove onboarding
          </p>
        </div>
      </Container>
    </section>
  );
}