import Link from 'next/link';
import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const successStories = [
  {
    company: "Bankruptcy Law Firm",
    industry: "Legal Services",
    result: "40% Faster Case Processing",
    description: "Law firms using Bankruptcy Navigator report dramatic improvements in case management efficiency.",
    metrics: ["Reduced research time", "Automated document review", "Audit trail compliance"]
  },
  {
    company: "Equipment Finance Company", 
    industry: "Financial Services",
    result: "30% Higher Deal Closure",
    description: "Finance professionals using Equipment Finance Helper achieve significantly better close rates.",
    metrics: ["Better buyer insights", "Risk detection", "Deal progression coaching"]
  },
  {
    company: "Regional Bank",
    industry: "Banking & Compliance",
    result: "60% Faster Policy Updates",
    description: "Banking compliance teams using AI Regulation Monitor accelerate their regulatory response times.",
    metrics: ["Real-time monitoring", "Automated alerts", "Multi-regulator tracking"]
  },
  {
    company: "SMB Portfolio Manager",
    industry: "Security & Risk",
    result: "95% Scam Detection Rate",
    description: "Portfolio managers using AI Gimmick Guard protect their firms from vendor fraud.",
    metrics: ["5-point risk assessment", "Plain English reports", "Red flag detection"]
  },
  {
    company: "Analytics Consulting Firm",
    industry: "Data Analytics",
    result: "50% Faster Analysis",
    description: "Analytics teams using TValue Helper complete statistical analysis projects much faster.",
    metrics: ["Step-by-step guidance", "Skill-level adaptation", "24/7 availability"]
  }
];

export default function SuccessStoriesSection() {
  return (
    <section id="success-stories" className="py-24" style={{ backgroundColor: 'var(--background)' }}>
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-body)' }}>
            Join 200+ firms already using The AI CEO specialists
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {successStories.map((story, index) => (
            <Card key={index} className="h-full hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 rounded-lg mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--card-background)' }}>
                  <span className="text-2xl font-bold" style={{ color: 'var(--text-secondary)' }}>
                    {index + 1}
                  </span>
                </div>
                <div className="mb-3">
                  <span className="px-3 py-1 text-sm font-medium rounded-full" style={{ backgroundColor: 'var(--background)', color: 'var(--text-secondary)' }}>
                    {story.industry}
                  </span>
                </div>
                <CardTitle className="text-xl mb-2">{story.company}</CardTitle>
                <div className="text-lg font-semibold text-green-600">
                  {story.result}
                </div>
              </CardHeader>
              
              <CardContent className="text-center">
                <p className="mb-6 leading-relaxed text-sm" style={{ color: 'var(--text-body)' }}>
                  {story.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  {story.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium" style={{ color: 'var(--text-body)' }}>{metric}</span>
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
        <div className="text-center rounded-2xl p-8 shadow-sm" style={{ backgroundColor: 'var(--card-background)' }}>
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Ready for Your Success Story?
          </h3>
          <p className="mb-6" style={{ color: 'var(--text-body)' }}>
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