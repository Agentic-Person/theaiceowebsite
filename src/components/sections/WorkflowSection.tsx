import Link from 'next/link';
import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

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
  return (
    <section id="workflow" className="py-24 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How We Work
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our proven 5-step process ensures your AI implementation succeeds from day one. 
            From discovery to delivery, we&apos;re with you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          {workflowSteps.map((step, index) => (
            <Card key={index} className="h-full relative overflow-hidden group hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gray-900 text-white rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                  {step.number}
                </div>
                <CardTitle className="text-xl mb-2">
                  {step.title}
                </CardTitle>
                <p className="text-sm text-gray-600 font-medium">
                  {step.subtitle}
                </p>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  {step.description}
                </p>
                
                <ul className="space-y-2">
                  {step.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2">
                      <div className="flex-shrink-0 w-4 h-4 bg-gray-300 rounded-full mt-1 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                      </div>
                      <span className="text-xs text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              {/* Step connector line */}
              {index < workflowSteps.length - 1 && (
                <div className="hidden lg:block absolute top-20 -right-4 w-8 h-0.5 bg-gray-300 z-10"></div>
              )}
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-gray-600 mb-6">
            Begin with our free assessment and discover how AI can transform your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg">
              Start with Free Assessment
            </Button>
            <Link href="/workflow">
              <Button variant="outline" size="lg">
                Learn More About Our Process
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}