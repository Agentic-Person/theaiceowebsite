import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const outcomes = [
  {
    title: "20% Boost in Operational Efficiency",
    description: "Measured, not promised",
    metrics: [
      "Reduce manual processing time",
      "Eliminate data entry errors", 
      "Accelerate routine operations",
      "Focus on strategic work"
    ],
    icon: "📈"
  },
  {
    title: "Faster Decision Loops",
    description: "Real-time insights when you need them",
    metrics: [
      "Real-time data analysis",
      "Instant report generation",
      "Automated insights delivery",
      "Reduced decision latency"
    ],
    icon: "⚡"
  },
  {
    title: "Seamless Integration",
    description: "Works with your existing systems",
    metrics: [
      "No system overhauls needed",
      "Minimal learning curve",
      "Preserves existing workflows",
      "Enhances current processes"
    ],
    icon: "🔗"
  }
];

export default function OutcomesSection() {
  return (
    <section id="outcomes" className="py-24" style={{ backgroundColor: 'var(--background)' }}>
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Outcomes You&apos;ll See
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-body)' }}>
            Measurable improvements that directly impact your bottom line and operational performance. 
            These aren&apos;t promises - they&apos;re results our clients achieve.
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

        {/* Results Preview */}
        <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: 'var(--background)' }}>
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Ready to See These Results?
          </h3>
          <p className="mb-6 max-w-2xl mx-auto" style={{ color: 'var(--text-body)' }}>
            Our clients typically see meaningful improvements within 30-60 days of implementation. 
            Start with a free assessment to identify your biggest opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg">
              Get Your Free Assessment
            </Button>
            <Button variant="outline" size="lg">
              View Client Results
            </Button>
          </div>
          
          {/* Stats Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>85%</div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Average efficiency gain</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>45 days</div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Typical time to value</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>3.2x</div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Average ROI within 12 months</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}