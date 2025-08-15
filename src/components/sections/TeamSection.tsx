import Link from 'next/link';
import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerReveal from '@/components/animations/StaggerReveal';
import VoiceAgentDemo from './VoiceAgentDemo';

const teamHighlights = [
  {
    title: "Founder-Led",
    description: "Direct access to decision makers who care about your success"
  },
  {
    title: "Expert-Driven", 
    description: "Deep AI expertise combined with real-world business experience"
  },
  {
    title: "SMB-Focused",
    description: "Everything we do is designed specifically for small and medium businesses"
  }
];

export default function TeamSection() {
  return (
    <section id="team" className="py-24" style={{ backgroundColor: 'var(--background)' }}>
      <Container>
        {/* Interactive Demo Section - Moved from Voice Agents */}
        <div id="about">
          <ScrollReveal className="mb-20">
            <VoiceAgentDemo />
          </ScrollReveal>
        </div>

        <ScrollReveal className="text-center mb-16">
          <h2 id="meet-team" className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Meet The Team
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-4" style={{ color: 'var(--text-body)' }}>
            Founder-led, expert-driven team dedicated to helping SMBs succeed with custom AI solutions.
          </p>
          <p className="text-lg font-medium italic" style={{ color: 'var(--text-secondary)' }}>
            &ldquo;We want to help as many people as we can&rdquo;
          </p>
        </ScrollReveal>

        {/* Team Highlights */}
        <StaggerReveal 
          staggerDelay={0.2}
          direction="up"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {teamHighlights.map((highlight, index) => (
            <Card key={index} className="text-center h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
                  <div className="w-8 h-8 rounded-full" style={{ backgroundColor: 'var(--border)' }}></div>
                </div>
                <CardTitle className="text-xl mb-3">{highlight.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed" style={{ color: 'var(--text-body)' }}>
                  {highlight.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </StaggerReveal>

        {/* Company Values Preview */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="rounded-2xl p-8 mb-12" style={{ backgroundColor: 'var(--background)' }}>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Our Philosophy</h3>
            <p style={{ color: 'var(--text-body)' }}>The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Generous Value First",
              "Transparent Results", 
              "Security First",
              "Human-Centered AI",
              "Long-term Partnership",
              "SMB-Focused Approach"
            ].map((value, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--text-primary)' }}></div>
                <span className="font-medium" style={{ color: 'var(--text-body)' }}>{value}</span>
              </div>
            ))}
          </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal direction="up" delay={0.5}>
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Ready to Work Together?
            </h3>
            <p className="mb-6" style={{ color: 'var(--text-body)' }}>
              Let&apos;s discuss how we can help your business succeed with custom AI solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Schedule a Call
              </Button>
              <Link href="/team">
                <Button variant="outline" size="lg">
                  Meet the Full Team
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}