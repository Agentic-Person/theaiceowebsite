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
    <section id="resources" className="py-24 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Free AI Education & Resources
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get the knowledge you need to make informed AI decisions for your business. 
            All resources are free and designed specifically for SMBs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Lead Magnet - Left Column */}
          <div className="space-y-6">
            <Card className="border-2 border-gray-900 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-gray-900 text-white text-sm font-semibold px-3 py-1 rounded-full">
                    FEATURED RESOURCE
                  </span>
                  <span className="text-2xl font-bold text-green-600">FREE</span>
                </div>
                <CardTitle className="text-3xl mb-3">
                  The SMB Owner&apos;s AI Playbook
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
                        <div className="flex-shrink-0 w-5 h-5 bg-gray-900 rounded-full mt-0.5 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="flex space-x-3">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    />
                  </div>
                  <Button variant="primary" size="lg" className="w-full">
                    Download Free Playbook
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    No spam. Unsubscribe anytime. We respect your privacy.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Free Resources - Right Column */}
          <div className="space-y-6">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Additional Free Resources
              </h3>
              <p className="text-gray-600">
                Access our library of free tools, templates, and guides designed to help SMBs succeed with AI.
              </p>
            </div>

            <div className="grid gap-4">
              {freeResources.map((resource, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-700">
                          {resource.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-3">
                          {resource.description}
                        </p>
                        <span className="inline-flex items-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                          {resource.type}
                        </span>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="pt-4">
              <Button variant="outline" size="md" className="w-full">
                Browse All Resources
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}