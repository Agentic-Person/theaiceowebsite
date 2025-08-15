'use client';

import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$297/month",
    description: "Perfect for individual professionals or small teams",
    features: [
      "1 AI Specialist",
      "5 users included",
      "Email support",
      "Basic integrations",
      "14-day free trial"
    ],
    ctaText: "Start Free Trial"
  },
  {
    name: "Professional",
    price: "$697/month", 
    description: "Ideal for growing teams and departments",
    features: [
      "3 AI Specialists",
      "25 users included",
      "Priority support",
      "API access",
      "Advanced integrations",
      "14-day free trial"
    ],
    isPopular: true,
    ctaText: "Start Free Trial"
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations requiring full-scale deployment",
    features: [
      "All 5 Specialists",
      "Unlimited users",
      "White-label options",
      "Dedicated success manager",
      "Custom integrations",
      "SLA guarantee"
    ],
    ctaText: "Contact Sales"
  }
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24" style={{ backgroundColor: 'var(--card-background)' }}>
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Transparent Pricing, Immediate Value
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-body)' }}>
            Choose the plan that fits your needs. All plans include enterprise security and white-glove onboarding.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {pricingTiers.map((tier, index) => (
            <Card 
              key={index} 
              className={`h-full relative overflow-hidden hover:shadow-xl transition-shadow ${
                tier.isPopular ? 'ring-2 ring-green-500 ring-opacity-60' : ''
              }`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="px-4 py-1 text-xs font-bold text-white rounded-full" style={{ backgroundColor: '#10B981' }}>
                    MOST POPULAR
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-2xl mb-2">
                  {tier.name}
                </CardTitle>
                <div className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {tier.price}
                </div>
                <p className="text-sm mb-6" style={{ color: 'var(--text-body)' }}>
                  {tier.description}
                </p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full mt-0.5 flex items-center justify-center" style={{ backgroundColor: '#10B981' }}>
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                      <span style={{ color: 'var(--text-body)' }}>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={tier.isPopular ? "primary" : "outline"} 
                  className="w-full"
                  style={tier.isPopular ? { backgroundColor: '#10B981' } : { borderColor: '#10B981', color: '#10B981' }}
                >
                  {tier.ctaText}
                </Button>
              </CardContent>
              
              {/* Popular tier highlight */}
              {tier.isPopular && (
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundColor: '#10B981' }}></div>
              )}
            </Card>
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center">
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            All plans include 14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </Container>
    </section>
  );
}