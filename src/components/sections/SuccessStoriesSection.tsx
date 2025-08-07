import Link from 'next/link';
import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
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

export default function SuccessStoriesSection() {
  return (
    <section id="success-stories" className="py-24 bg-gray-50">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Proof It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how SMBs like yours are using custom AI to drive growth, 
            reduce costs, and gain competitive advantages.
          </p>
          <p className="text-lg text-gray-500 italic mt-4">
            &ldquo;Real businesses, real results, real fast&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {successStories.map((story, index) => (
            <Card key={index} className="h-full hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">
                    {index + 1}
                  </span>
                </div>
                <div className="mb-3">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
                    {story.industry}
                  </span>
                </div>
                <CardTitle className="text-xl mb-2">{story.company}</CardTitle>
                <div className="text-lg font-semibold text-green-600">
                  {story.result}
                </div>
              </CardHeader>
              
              <CardContent className="text-center">
                <p className="text-gray-700 mb-6 leading-relaxed text-sm">
                  {story.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  {story.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700 font-medium">{metric}</span>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" size="sm" className="w-full">
                  Read Full Case Study
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready for Your Success Story?
          </h3>
          <p className="text-gray-600 mb-6">
            Join the growing number of SMBs achieving remarkable results with custom AI solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg">
              Start Your Free Assessment
            </Button>
            <Link href="/success-stories">
              <Button variant="outline" size="lg">
                View All Success Stories
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}