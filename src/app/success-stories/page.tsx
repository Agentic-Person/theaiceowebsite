import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const successStories = [
  {
    company: "Legal Firm",
    industry: "Legal Services",
    result: "Cut case research time by 60%",
    description: "Implemented AI-powered legal research tool that automates case law analysis and document review.",
    metrics: ["60% faster research", "40% cost reduction", "95% accuracy rate"]
  },
  {
    company: "Equipment Finance Company", 
    industry: "Financial Services",
    result: "Increased close rate by 30%",
    description: "Custom AI coaching system that helps sales team identify and address client concerns more effectively.",
    metrics: ["30% higher close rate", "50% faster deal cycles", "85% team adoption"]
  },
  {
    company: "Professional Services Firm",
    industry: "Consulting",
    result: "Automated 40% of admin tasks",
    description: "AI workflow automation that handles client onboarding, scheduling, and routine communications.",
    metrics: ["40% admin reduction", "25% cost savings", "98% client satisfaction"]
  }
];

export default function SuccessStoriesPage() {
  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Real Results from Real Businesses
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              See how SMBs like yours are using custom AI to drive growth, 
              reduce costs, and gain competitive advantages.
            </p>
            <p className="text-lg text-gray-500 italic">
              &ldquo;Real businesses, real results, real fast&rdquo;
            </p>
          </div>
        </Container>
      </section>

      {/* Success Stories */}
      <section className="py-24">
        <Container>
          <div className="space-y-16">
            {successStories.map((story, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Story Content */}
                  <div className="lg:col-span-2">
                    <CardHeader>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded">
                          {story.industry}
                        </span>
                      </div>
                      <CardTitle className="text-2xl mb-2">{story.company}</CardTitle>
                      <CardDescription className="text-lg font-semibold text-green-600 mb-4">
                        {story.result}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {story.description}
                      </p>
                      <Button variant="outline" size="md">
                        Read Full Case Study
                      </Button>
                    </CardContent>
                  </div>

                  {/* Metrics */}
                  <div className="bg-gray-50 p-6 lg:p-8">
                    <h4 className="font-semibold text-gray-900 mb-6">Key Results</h4>
                    <div className="space-y-4">
                      {story.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-700 font-medium">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Calculate Your Potential ROI
            </h2>
            <p className="text-xl text-gray-600">
              See what results you could achieve with custom AI implementation.
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-white rounded-lg p-8 shadow-sm">
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-6">
              <span className="text-gray-500 font-medium">ROI Calculator Placeholder</span>
            </div>
            <div className="text-center">
              <Button variant="primary" size="lg">
                Calculate Your ROI
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready for Your Success Story?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join the growing number of SMBs achieving remarkable results with custom AI.
            </p>
            <Button variant="primary" size="lg">
              Schedule Your Free Assessment
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}