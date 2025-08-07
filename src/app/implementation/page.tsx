import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function ImplementationPage() {
  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              AI Implementation That Actually Works
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              From planning to deployment, we handle every aspect of your AI implementation 
              so you can focus on running your business.
            </p>
            <Button variant="primary" size="lg">
              Start Implementation
            </Button>
          </div>
        </Container>
      </section>

      {/* Implementation Phases */}
      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Phase cards */}
            {[
              'Planning & Strategy',
              'Development & Testing', 
              'Deployment & Training',
              'Integration & Automation',
              'Monitoring & Optimization',
              'Ongoing Support'
            ].map((phase, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <span className="font-bold text-gray-600">{index + 1}</span>
                  </div>
                  <CardTitle>{phase}</CardTitle>
                  <CardDescription>
                    Detailed description of this implementation phase and what to expect.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="text-gray-600">• Key deliverable one</li>
                    <li className="text-gray-600">• Key deliverable two</li>
                    <li className="text-gray-600">• Key deliverable three</li>
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Typical Implementation Timeline
            </h2>
            <p className="text-xl text-gray-600">
              Most SMB implementations are completed within 30-90 days.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 font-medium">Timeline Visualization Placeholder</span>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}