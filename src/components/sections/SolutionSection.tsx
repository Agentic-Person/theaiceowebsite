'use client';

import React from 'react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

interface AISpecialist {
  title: string;
  badge: string;
  tagline: string;
  description: string;
  keyPoints: string[];
  price: string;
  imageAlt: string;
}

const aiSpecialists: AISpecialist[] = [
  {
    title: "Bankruptcy Navigator v1.101",
    badge: "LEGAL AI",
    tagline: "AI Paralegal for Chapter 7 & 11 Cases",
    description: "Your AI-driven paralegal attorney designed to empower portfolio managers with end-to-end bankruptcy case management.",
    keyPoints: [
      "Chapter 11 & 7 expertise with step-by-step guidance",
      "SMB-focused knowledge base with industry precedents",
      "Audit-compliant with full logging and traceability",
      "Quick-reference guides for critical assessments",
      "Enterprise-grade security & compliance built-in"
    ],
    price: "From $497/month",
    imageAlt: "Bankruptcy Navigator AI Interface"
  },
  {
    title: "Equipment Finance Helper",
    badge: "FINANCE AI",
    tagline: "Deal Progression Coach with EQ",
    description: "A mentor-style AI coach built exclusively for equipment finance professionals. Sharpen your instincts and close more deals.",
    keyPoints: [
      "30% higher close rates with emotional intelligence",
      "Hidden risk detection and mapping",
      "Three mastery levels: Signal Noticer to Trust Whisperer",
      "Reflective listening techniques",
      "Deal progression clarity with VP-level guidance"
    ],
    price: "From $397/month",
    imageAlt: "Equipment Finance Helper Dashboard"
  },
  {
    title: "AI Regulation Monitor",
    badge: "COMPLIANCE AI",
    tagline: "24/7 Banking Compliance Tracking",
    description: "Enterprise-grade AI compliance agent keeping banking AI within every regulator's guardrails.",
    keyPoints: [
      "Multi-regulator monitoring (FDIC, OCC, FRB, CFPB, FinCEN)",
      "60% faster policy updates and board reporting",
      "Real-time alerts via Slack, Teams, or email",
      "Automated gap analysis against your policies",
      "Audit-ready dashboard with full compliance logs"
    ],
    price: "From $797/month",
    imageAlt: "AI Regulation Monitor Dashboard"
  },
  {
    title: "AI Gimmick Guard",
    badge: "SECURITY AI",
    tagline: "Vendor Fraud Detection System",
    description: "A fraud-detection agent that helps you sift real AI value from overhyped claims and scams.",
    keyPoints: [
      "5-point risk assessment for any AI product",
      "Plain English risk reports with clear verdicts",
      "Red flag detection for common scam patterns",
      "Public risk check for misuse potential",
      "Actionable questions to verify legitimacy"
    ],
    price: "From $297/month",
    imageAlt: "AI Gimmick Guard Analysis"
  },
  {
    title: "TValue Helper",
    badge: "ANALYTICS AI",
    tagline: "Statistical Analysis Assistant",
    description: "Your dedicated guide to mastering t-value calculations and statistical insights.",
    keyPoints: [
      "Platform documentation fully integrated",
      "Adapts to your skill level automatically",
      "24/7 availability right where you work",
      "Speed up hypothesis testing with built-in wizards",
      "Secure & trustworthy with audit trails"
    ],
    price: "From $297/month",
    imageAlt: "TValue Helper Interface"
  }
];

export default function SolutionSection() {
  return (
    <div id="solutions" className="py-24" style={{ backgroundColor: 'var(--background)' }}>
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            5 Industry AI Specialists Ready to Deploy
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-body)' }}>
            Each powered by Prompt Surgeon™ technology with enterprise security built-in
          </p>
        </div>

        <div className="space-y-24">
          {aiSpecialists.map((specialist, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-32 xl:gap-40 items-center`}
            >
              {/* Image Section */}
              <div className="w-full lg:w-2/5 flex-shrink-0">
                <div className="relative w-full h-[400px] bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg shadow-xl overflow-hidden group">
                  {/* Placeholder image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4 opacity-50">
                        {index === 0 && "⚖️"}
                        {index === 1 && "💼"}
                        {index === 2 && "📊"}
                        {index === 3 && "🛡️"}
                        {index === 4 && "📈"}
                      </div>
                      <p className="text-gray-400 text-sm px-4">{specialist.imageAlt}</p>
                    </div>
                  </div>
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full lg:w-3/5">
                <div className="space-y-6">
                  {/* Title and Tagline */}
                  <div>
                    <h3 className="text-3xl lg:text-4xl font-bold mb-3" style={{ color: '#FFFFFF' }}>
                      {specialist.title}
                    </h3>
                    <p className="text-xl font-medium mb-3" style={{ color: 'var(--primary)' }}>
                      {specialist.tagline}
                    </p>
                    <p className="text-lg leading-relaxed" style={{ color: '#FFFFFF' }}>
                      {specialist.description}
                    </p>
                  </div>

                  {/* Key Points */}
                  <ul className="space-y-3">
                    {specialist.keyPoints.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start space-x-3">
                        <div 
                          className="flex-shrink-0 w-6 h-6 rounded-full mt-0.5 flex items-center justify-center border border-white" 
                          style={{ backgroundColor: '#10B981' }}
                        >
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path 
                              fillRule="evenodd" 
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                              clipRule="evenodd" 
                            />
                          </svg>
                        </div>
                        <span className="text-base" style={{ color: '#FFFFFF' }}>
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <Button 
                      variant="primary" 
                      className="px-8 py-3 text-lg font-semibold border border-white"
                      style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}
                    >
                      Start Free Trial →
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note about trials */}
        <div className="text-center mt-20">
          <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
            All solutions include: 14-day free trial • Cancel anytime • White-glove onboarding
          </p>
        </div>
      </Container>
    </div>
  );
}