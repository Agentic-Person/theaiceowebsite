import Link from 'next/link';
import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const successStories = [
  {
    company: "Bankruptcy Navigator (v1.101)",
    industry: "Legal Tech",
    result: "Your AI-Driven Paralegal Attorney",
    description: "Chapter 11 & 7 expertise with SMB-focused knowledge base and enterprise security.",
    metrics: ["Chapter 11 & 7 expertise", "SMB-focused knowledge base", "Enterprise security"]
  },
  {
    company: "Equipment Finance Helper", 
    industry: "Financial Services",
    result: "Mentor-Style AI Coach",
    description: "Reflective listening with hidden-risk mapping across three mastery levels.",
    metrics: ["Reflective listening", "Hidden-risk mapping", "Three mastery levels"]
  },
  {
    company: "AI Regulation Monitor",
    industry: "Compliance",
    result: "Enterprise-Grade Compliance",
    description: "24/7 regulatory tracking with plain-language briefs and 60% faster updates.",
    metrics: ["24/7 regulatory tracking", "Plain-language briefs", "60% faster updates"]
  },
  {
    company: "AI Gimmick Guard",
    industry: "Security",
    result: "Fraud-Detection Agent",
    description: "Risk reports with red flag detection built by Prompt Surgeon™.",
    metrics: ["Risk reports", "Red flag detection", "Built by Prompt Surgeon™"]
  },
  {
    company: "TValue Helper",
    industry: "Analytics",
    result: "Statistical Analysis Guide",
    description: "Step-by-step guidance with 24/7 availability and skill-level adaptation.",
    metrics: ["Step-by-step guidance", "24/7 availability", "Skill-level adaptation"]
  }
];

export default function SuccessStoriesSection() {
  return (
    <section id="success-stories" className="py-24" style={{ backgroundColor: 'var(--background)' }}>
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Live Solutions Driving Real Results
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-body)' }}>
            See how SMBs like yours are using custom AI to drive growth, 
            reduce costs, and gain competitive advantages.
          </p>
          <p className="text-lg italic mt-4" style={{ color: 'var(--text-secondary)' }}>
            &ldquo;Real businesses, real results, real fast&rdquo;
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