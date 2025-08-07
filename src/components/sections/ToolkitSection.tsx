import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const toolkitItems = [
  {
    title: "Custom LLMs & GPT Agents",
    description: "Purpose-built AI agents trained on your specific industry knowledge, processes, and workflows. These aren't generic chatbots - they're specialized tools that understand your business context.",
    features: [
      "Industry-specific training data",
      "Custom knowledge bases",
      "Role-based agent personalities",
      "Multi-modal capabilities"
    ]
  },
  {
    title: "Workflow Automations", 
    description: "Intelligent automation that connects your existing systems, eliminates repetitive tasks, and orchestrates complex business processes with human oversight where needed.",
    features: [
      "API integrations & data sync",
      "Process orchestration",
      "Smart routing & approvals",
      "Exception handling"
    ]
  },
  {
    title: "Conversational Interfaces",
    description: "Natural language interfaces that let your team interact with data, systems, and processes through simple conversations - no complex dashboards or training required.",
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
    <section id="toolkit" className="py-24 bg-gray-50">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Toolkit
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The technologies and methodologies we use to build custom AI solutions 
            that integrate seamlessly with your business operations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {toolkitItems.map((item, index) => (
            <Card key={index} className="h-full hover:shadow-xl transition-shadow group">
              <CardHeader className="text-center pb-6">
                {/* Icon Placeholder */}
                <div className="w-20 h-20 bg-gray-200 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:bg-gray-300 transition-colors">
                  <div className="w-10 h-10 bg-gray-400 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {index + 1}
                    </span>
                  </div>
                </div>
                <CardTitle className="text-xl mb-4">
                  {item.title}
                </CardTitle>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {item.description}
                </p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 text-sm mb-3">Key Capabilities:</h4>
                  <ul className="space-y-2">
                    {item.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-5 h-5 bg-gray-900 rounded-full mt-0.5 flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm">{feature}</span>
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
          <p className="text-lg text-gray-600 mb-4">
            Every tool is customized to your specific business needs and integrated with your existing systems.
          </p>
          <div className="w-24 h-1 bg-gray-300 mx-auto"></div>
        </div>
      </Container>
    </section>
  );
}