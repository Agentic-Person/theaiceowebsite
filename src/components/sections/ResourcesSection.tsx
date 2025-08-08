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
            See The AI CEO Platform in Action
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-body)' }}>
            Watch how our AI specialists work or calculate your potential ROI before starting your free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Watch Demo - Left Column */}
          <div className="space-y-6">
            <Card className="border-2 shadow-lg" style={{ borderColor: '#10B981' }}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white text-sm font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: '#10B981' }}>
                    WATCH DEMO
                  </span>
                  <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>2 Minutes</span>
                </div>
                <CardTitle className="text-3xl mb-3">
                  Platform Demo
                </CardTitle>
                <CardDescription className="text-lg">
                  See all 5 AI specialists in action and understand how they integrate with your workflow.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {/* Video placeholder */}
                <div className="aspect-video rounded-lg mb-6 flex items-center justify-center" style={{ backgroundColor: 'var(--card-background)' }}>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#10B981' }}>
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      2-Minute Platform Overview
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <ul className="space-y-2">
                    {[
                      "See Bankruptcy Navigator handle a real case",
                      "Watch Equipment Finance Helper coach a deal",
                      "Experience the AI Regulation Monitor in action",
                      "View enterprise security features"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full mt-0.5 flex items-center justify-center" style={{ backgroundColor: '#10B981' }}>
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        </div>
                        <span style={{ color: 'var(--text-body)' }}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button variant="primary" size="lg" className="w-full" style={{ backgroundColor: '#10B981' }}>
                    Watch Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ROI Calculator - Right Column */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl mb-4" style={{ color: 'var(--text-primary)' }}>
                  ROI Calculator
                </CardTitle>
                <CardDescription className="text-lg">
                  Calculate your potential savings before starting your free trial.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>See Your Potential Savings:</h4>
                    <ul className="space-y-3">
                      {[
                        "Time savings across 5 specialists",
                        "Productivity improvement calculations",
                        "Risk reduction value estimates",
                        "12-month ROI projections",
                        "Implementation cost breakdown"
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
                    variant="outline" 
                    size="lg" 
                    className="w-full"
                    style={{ borderColor: '#10B981', color: '#10B981' }}
                  >
                    Download ROI Calculator
                  </Button>
                  
                  <p className="text-xs text-center" style={{ color: 'var(--text-secondary)' }}>
                    Excel template • Industry-specific formulas • No email required
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