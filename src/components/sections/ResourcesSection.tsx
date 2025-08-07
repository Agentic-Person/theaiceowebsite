import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Resource } from '@/types';

const leadMagnetFeatures = [
  "20+ real AI use cases for your industry",
  "ROI calculator worksheet",
  "Implementation timeline template", 
  "Security checklist",
  "Questions to ask any AI vendor",
  "Budget planning framework"
];

const freeResources: Resource[] = [
  {
    title: "Industry AI Use Cases",
    description: "Specific examples of AI implementations in your sector",
    type: "guide"
  },
  {
    title: "ROI Calculators", 
    description: "Calculate the potential return on AI investments",
    type: "calculator"
  },
  {
    title: "Implementation Templates",
    description: "Ready-to-use templates for planning your AI rollout",
    type: "template"
  },
  {
    title: "AI Security Best Practices",
    description: "Protect your business while implementing AI solutions",
    type: "guide"
  }
];

export default function ResourcesSection() {
  return (
    <section id="resources" className="py-24" style={{ backgroundColor: 'var(--background)' }}>
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Start Your AI Journey
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-body)' }}>
            Get the knowledge you need to make informed AI decisions for your business. 
            All resources are free and designed specifically for SMBs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Lead Magnet - Left Column */}
          <div className="space-y-6">
            <Card className="border-2 shadow-lg" style={{ borderColor: 'var(--text-primary)' }}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white text-sm font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--text-primary)' }}>
                    FEATURED RESOURCE
                  </span>
                  <span className="text-2xl font-bold text-green-600">FREE</span>
                </div>
                <CardTitle className="text-3xl mb-3">
                  AI EDGE eBook
                </CardTitle>
                <CardDescription className="text-lg">
                  Your complete guide to understanding, planning, and implementing AI in your business. 
                  No fluff, just actionable insights.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-gray-900 mb-3">What&apos;s Inside:</h4>
                  <ul className="space-y-2">
                    {leadMagnetFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full mt-0.5 flex items-center justify-center" style={{ backgroundColor: 'var(--text-primary)' }}>
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span style={{ color: 'var(--text-body)' }}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="flex space-x-3">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <Button variant="primary" size="lg" className="w-full">
                    Download Free Playbook
                  </Button>
                  <p className="text-xs text-center" style={{ color: 'var(--text-secondary)' }}>
                    No spam. Unsubscribe anytime. We respect your privacy.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Assessment - Right Column */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl mb-4" style={{ color: 'var(--text-primary)' }}>
                  Free AI Assessment
                </CardTitle>
                <CardDescription className="text-lg">
                  Discover your biggest AI opportunities with our comprehensive business assessment.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>What You&apos;ll Get:</h4>
                    <ul className="space-y-3">
                      {[
                        "Custom AI opportunity analysis",
                        "ROI projections for your business",
                        "Implementation roadmap",
                        "Priority recommendations",
                        "No-obligation consultation"
                      ].map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full mt-0.5 flex items-center justify-center" style={{ backgroundColor: '#10B981' }}>
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span style={{ color: 'var(--text-body)' }}>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="w-full"
                    style={{ backgroundColor: '#10B981' }}
                  >
                    Book Your Free Assessment
                  </Button>
                  
                  <p className="text-xs text-center" style={{ color: 'var(--text-secondary)' }}>
                    15-minute call • No sales pitch • Immediate value
                  </p>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </Container>
    </section>
  );
}