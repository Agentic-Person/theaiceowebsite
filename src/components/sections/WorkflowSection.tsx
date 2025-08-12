import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Send } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Image from 'next/image';

const workflowSteps = [
  {
    number: 1,
    title: "Discover",
    subtitle: "Free assessment + strategy session",
    description: "We start by understanding your business, challenges, and goals through our comprehensive AI readiness assessment.",
    features: [
      "Free 15-minute consultation",
      "Custom opportunity analysis", 
      "Industry-specific recommendations",
      "ROI projections for your business"
    ]
  },
  {
    number: 2,
    title: "Design", 
    subtitle: "Custom solution blueprint",
    description: "Based on our findings, we create a detailed blueprint of your custom AI solution with clear specifications.",
    features: [
      "Tailored AI architecture",
      "Integration planning",
      "Security & compliance design",
      "Implementation roadmap"
    ]
  },
  {
    number: 3,
    title: "Develop",
    subtitle: "Build and test your tools", 
    description: "Our team develops your custom AI tools, rigorously testing them to ensure they meet your requirements.",
    features: [
      "Custom AI development",
      "Rigorous testing protocols",
      "Security implementation",
      "Performance optimization"
    ]
  },
  {
    number: 4,
    title: "Deploy",
    subtitle: "Launch and train your team",
    description: "We handle the deployment and provide comprehensive training to ensure your team can effectively use the new tools.",
    features: [
      "Seamless deployment",
      "Team training sessions",
      "Documentation & guides",
      "Go-live support"
    ]
  },
  {
    number: 5,
    title: "Deliver",
    subtitle: "Ongoing support and optimization",
    description: "Continuous monitoring and optimization to ensure your AI solutions deliver lasting value as your business grows.",
    features: [
      "Performance monitoring",
      "Continuous optimization",
      "Ongoing support",
      "Success measurement"
    ]
  }
];

export default function WorkflowSection() {
  const stepImages: string[] = [
    '/01_discover_card_v2.webp',
    '/02_design_solutions_card.webp',
    '/03_development_build_card.webp',
    '/04_training_implementation_card.png',
    '/05_customer_success_support_card.png',
  ];

  return (
    <section id="workflow" className="py-24" style={{ backgroundColor: 'var(--background)' }}>
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            How We Work
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-body)' }}>
            Our proven 5-step process ensures your AI implementation succeeds from day one. 
            From discovery to delivery, we&apos;re with you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          {workflowSteps.map((step, index) => (
            <Card key={index} className="h-full relative overflow-hidden group hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-32 h-32 rounded-lg overflow-hidden shadow-lg border-2" style={{ backgroundColor: 'var(--card-background)', borderColor: '#4e8ad3' }}>
                  <Image
                    src={stepImages[index]}
                    alt={step.title}
                    width={128}
                    height={128}
                    className="w-32 h-32 object-cover"
                    priority={index < 2}
                  />
                </div>
                <CardTitle className="text-xl mb-2">
                  {step.title}
                </CardTitle>
                <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                  {step.subtitle}
                </p>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-body)' }}>
                  {step.description}
                </p>
                
                <ul className="space-y-2">
                  {step.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full mt-1 flex items-center justify-center" style={{ backgroundColor: 'var(--card-background)' }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--text-secondary)' }}></div>
                      </div>
                      <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              {/* Step connector line */}
              {index < workflowSteps.length - 1 && (
                <div className="hidden lg:block absolute top-20 -right-4 w-8 h-0.5 z-10" style={{ backgroundColor: 'var(--border)' }}></div>
              )}
            </Card>
          ))}
        </div>

        {/* Chat Interface Section */}
        <ScrollReveal className="mt-16">
          <div className="max-w-4xl mx-auto">
            {/* Chat Header */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                Our custom AI chatbot can QUICKLY answer 100% of your questions...      80% of the time.
              </h3>
            </div>

            {/* Chat Interface */}
            <div 
              className="rounded-2xl p-8 shadow-xl"
              style={{ backgroundColor: 'var(--card-background)' }}
            >
              {/* Chat Input */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Ask about our AI solutions..."
                  className="w-full px-4 py-4 pr-12 rounded-xl border text-base focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'var(--background)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-primary)'
                  }}
                />
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg hover:brightness-110 transition-colors"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Suggestion Chips */}
              <div className="flex flex-wrap gap-2">
                {[
                  "Which AI specialist fits my business?",
                  "Show me Bankruptcy Navigator features",
                  "How does the free trial work?"
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    className="px-4 py-2 rounded-full text-sm border hover:brightness-110 transition-colors"
                    style={{
                      borderColor: 'var(--border)',
                      color: 'var(--text-body)',
                      backgroundColor: 'var(--background)'
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}