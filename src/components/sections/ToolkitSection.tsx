import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const toolkitItems = [
  {
    title: "Custom LLMs & GPT Agents",
    description: "AI that speaks your industry language",
    features: [
      "Industry-specific training data",
      "Custom knowledge bases",
      "Role-based agent personalities",
      "Multi-modal capabilities"
    ]
  },
  {
    title: "Workflow Automations", 
    description: "Eliminate repetitive tasks, focus on growth",
    features: [
      "API integrations & data sync",
      "Process orchestration",
      "Smart routing & approvals",
      "Exception handling"
    ]
  },
  {
    title: "Conversational Interfaces",
    description: "Natural interactions your team will actually use",
    features: [
      "Natural language queries",
      "Voice & text interfaces",
      "Multi-channel deployment",
      "Context-aware responses"
    ]
  }
];

export default function ToolkitSection() {
  return (
    <section id="toolkit" className="py-24" style={{ backgroundColor: 'var(--background)' }}>
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Our Toolkit
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-body)' }}>
            The technologies and methodologies we use to build custom AI solutions 
            that integrate seamlessly with your business operations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {toolkitItems.map((item, index) => (
            <Card key={index} className="h-full hover:shadow-xl transition-shadow group">
              <CardHeader className="text-center pb-6">
                {/* Icon Placeholder */}
                <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:opacity-80 transition-colors" style={{ backgroundColor: 'var(--card-background)' }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--text-secondary)' }}>
                    <span className="text-white font-bold text-lg">
                      {index + 1}
                    </span>
                  </div>
                </div>
                <CardTitle className="text-xl mb-4">
                  {item.title}
                </CardTitle>
                <p className="leading-relaxed text-sm" style={{ color: 'var(--text-body)' }}>
                  {item.description}
                </p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>Key Capabilities:</h4>
                  <ul className="space-y-2">
                    {item.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full mt-0.5 flex items-center justify-center" style={{ backgroundColor: 'var(--text-primary)' }}>
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span className="text-sm" style={{ color: 'var(--text-body)' }}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg mb-4" style={{ color: 'var(--text-body)' }}>
            Every tool is customized to your specific business needs and integrated with your existing systems.
          </p>
          <div className="w-24 h-1 mx-auto" style={{ backgroundColor: 'var(--border)' }}></div>
        </div>
      </Container>
    </section>
  );
}