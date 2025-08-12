import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const outcomes = [
  {
    title: "40% Time Savings",
    description: "Bankruptcy Navigator users process cases 40% faster",
    metrics: [
      "Automated document review",
      "Instant precedent lookup", 
      "Streamlined case management",
      "Reduced research time"
    ],
    icon: "⏱️"
  },
  {
    title: "30% Higher Close Rates",
    description: "Equipment Finance Helper improves deal closure",
    metrics: [
      "Better buyer psychology insights",
      "Hidden risk detection",
      "Optimized deal progression",
      "Emotional intelligence coaching"
    ],
    icon: "📈"
  },
  {
    title: "60% Faster Compliance",
    description: "AI Regulation Monitor accelerates policy updates",
    metrics: [
      "Real-time regulatory tracking",
      "Automated policy alerts",
      "Multi-regulator monitoring",
      "Instant compliance reports"
    ],
    icon: "⚡"
  }
];

export default function OutcomesSection() {
  return (
    <section id="outcomes" className="py-24" style={{ backgroundColor: 'var(--background)' }}>
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Proven Results Across Industries
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-body)' }}>
            Real metrics from professionals using The AI CEO specialists in their daily operations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {outcomes.map((outcome, index) => (
            <Card key={index} className="h-full text-center hover:shadow-xl transition-shadow group">
              <CardHeader className="pb-6">
                {/* Icon */}
                <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center text-3xl group-hover:opacity-80 transition-colors" style={{ backgroundColor: 'var(--background)' }}>
                  {outcome.icon}
                </div>
                <CardTitle className="text-2xl mb-4" style={{ color: 'var(--text-primary)' }}>
                  {outcome.title}
                </CardTitle>
                <p className="leading-relaxed" style={{ color: 'var(--text-body)' }}>
                  {outcome.description}
                </p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>What This Means:</h4>
                  <ul className="space-y-3">
                    {outcome.metrics.map((metric, metricIndex) => (
                      <li key={metricIndex} className="flex items-center justify-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-sm" style={{ color: 'var(--text-body)' }}>{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </Container>
    </section>
  );
}