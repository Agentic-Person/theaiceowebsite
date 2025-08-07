import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const workflowSteps = [
  {
    number: 1,
    title: "Discover",
    subtitle: "Free assessment + strategy session",
    description: "We start by understanding your business, challenges, and goals through our comprehensive AI readiness assessment."
  },
  {
    number: 2,
    title: "Design", 
    subtitle: "Custom solution blueprint",
    description: "Based on our findings, we create a detailed blueprint of your custom AI solution with clear specifications and timelines."
  },
  {
    number: 3,
    title: "Develop",
    subtitle: "Build and test your tools", 
    description: "Our team develops your custom AI tools, rigorously testing them to ensure they meet your specific requirements."
  },
  {
    number: 4,
    title: "Deploy",
    subtitle: "Launch and train your team",
    description: "We handle the deployment and provide comprehensive training to ensure your team can effectively use the new AI tools."
  },
  {
    number: 5,
    title: "Deliver",
    subtitle: "Ongoing support and optimization",
    description: "Continuous monitoring, optimization, and support to ensure your AI solutions deliver lasting value as your business grows."
  }
];

export default function WorkflowPage() {
  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              From Consultation to Celebration
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Our proven 5-step process ensures your AI implementation succeeds from day one.
            </p>
            <Button variant="primary" size="lg">
              Start Your Journey
            </Button>
          </div>
        </Container>
      </section>

      {/* Workflow Steps */}
      <section className="py-24">
        <Container>
          <div className="space-y-16">
            {workflowSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                        {step.number}
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900">{step.title}</h2>
                        <p className="text-gray-600 font-medium">{step.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Visual Placeholder */}
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 font-medium">Step {step.number} Visual</span>
                    </div>
                  </div>
                </div>

                {/* Connection Line */}
                {index < workflowSteps.length - 1 && (
                  <div className="flex justify-center mt-16">
                    <div className="w-1 h-16 bg-gray-300"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Book your free assessment and take the first step toward AI success.
            </p>
            <Button variant="primary" size="lg">
              Schedule Free Assessment
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}