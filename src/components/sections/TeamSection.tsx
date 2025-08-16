import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerReveal from '@/components/animations/StaggerReveal';
import VoiceAgentDemo from './VoiceAgentDemo';

const teamMembers = [
  {
    name: "RJ Grimshaw",
    title: "Founder & CEO of ABLE Leadership and The AI CEO",
    description: "RJ empowers executives to adopt owner-mindsets, harness AI ethically, and drive transformative growth. As the growth architect behind UniFi Equipment Finance's meteoric rise—from $14 million to $250 million in revenue—RJ has partnered with everyone from Fortune 100 giants to high-velocity startups. An Upstart-certified AI Financial strategist and seasoned intrapreneurship mentor, he blends hands-on expertise with a clear, values-driven voice across keynotes, workshops, and digital programs, helping leaders scale what truly matters.",
    image: "/rj.jpg"
  },
  {
    name: "Matthew Snow",
    title: "AI Engineer, Automation Architect", 
    description: "Founder of Me, Myself Plus AI, Matthew transforms ideas into intelligent systems. With deep expertise in agentic workflows, LLM integrations, and voice-driven automation, Matthew brings a sharp, hands-on approach to solving complex business challenges. His portfolio spans everything from n8n-powered orchestration to real-time data tools for marketing, healthcare, and automotive performance. Equal parts technical strategist and creative builder, Matthew isn't just chasing the future of AI—he's engineering it one agent at a time.",
    image: "/mattsnow.png"
  },
  {
    name: "Jimmy Davidson",
    title: "Full-Stack Solutions Developer",
    description: "Jimmy thrives on solving complex problems with creativity and code. With decades of experience as a game designer, he blends technical precision with imaginative problem-solving to build real-world systems that scale. As founder of Agentic Personnel, Jimmy is passionate about delivering innovative solutions that bring creativity and technology together.",
    image: "/jimmy.png"
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

        {/* Team Members */}
        <StaggerReveal 
          staggerDelay={0.2}
          direction="up"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {teamMembers.map((member, index) => (
            <Card key={index} className="text-center h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover border-2"
                    style={{ borderColor: 'var(--border)' }}
                    sizes="(max-width: 768px) 128px, 128px"
                  />
                </div>
                <CardTitle className="text-2xl mb-2">{member.name}</CardTitle>
                <p className="text-lg font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
                  {member.title}
                </p>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed" style={{ color: 'var(--text-body)' }}>
                  {member.description}
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