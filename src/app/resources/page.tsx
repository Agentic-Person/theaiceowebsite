import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Resource } from '@/types';

const featuredResources: Resource[] = [
  {
    title: "The SMB Owner's AI Playbook",
    description: "Complete guide to understanding, planning, and implementing AI in your business",
    type: "guide"
  },
  {
    title: "AI ROI Calculator", 
    description: "Calculate the potential return on investment for AI implementations",
    type: "calculator"
  },
  {
    title: "Implementation Timeline Template",
    description: "Plan your AI rollout with our proven timeline template",
    type: "template"
  },
  {
    title: "AI Security Checklist",
    description: "Ensure your AI implementation meets security and compliance requirements", 
    type: "guide"
  }
];

const resourceCategories = [
  {
    title: "Guides & eBooks",
    count: 12,
    description: "In-depth guides covering AI strategy, implementation, and best practices"
  },
  {
    title: "Templates & Tools", 
    count: 8,
    description: "Ready-to-use templates for planning and implementing AI solutions"
  },
  {
    title: "Calculators",
    count: 5,
    description: "Interactive tools to calculate ROI, costs, and potential savings"
  },
  {
    title: "Webinar Recordings",
    count: 15,
    description: "Expert sessions on AI trends, case studies, and implementation strategies"
  }
];

export default function ResourcesPage() {
  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Free AI Resources for SMBs
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Everything you need to make informed AI decisions for your business. 
              All resources are free and designed specifically for small and medium businesses.
            </p>
            <Button variant="primary" size="lg">
              Download AI Playbook
            </Button>
          </div>
        </Container>
      </section>

      {/* Featured Resources */}
      <section className="py-24">
        <Container>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Resources</h2>
            <p className="text-xl text-gray-600">Start with these essential resources to build your AI knowledge.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {featuredResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                    <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded-full uppercase">
                      {resource.type}
                    </span>
                  </div>
                  <CardTitle className="group-hover:text-gray-700 transition-colors">
                    {resource.title}
                  </CardTitle>
                  <CardDescription>
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="md" className="w-full">
                    Download Free
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Resource Categories */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-xl text-gray-600">Explore our comprehensive library of AI resources.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resourceCategories.map((category, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4"></div>
                  <CardTitle className="text-xl group-hover:text-gray-700 transition-colors">
                    {category.title}
                  </CardTitle>
                  <CardDescription>
                    {category.count} resources available
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    {category.description}
                  </p>
                  <Button variant="ghost" size="sm">
                    Browse →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get New Resources First
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Subscribe to get notified when we publish new guides, tools, and resources.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
              <Button variant="primary" size="md">
                Subscribe
              </Button>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}