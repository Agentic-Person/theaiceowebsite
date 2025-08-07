import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { TeamMember } from '@/types';

const teamMembers: TeamMember[] = [
  {
    name: "Founder & CEO",
    role: "AI Strategy & Implementation",
    bio: "Expertise in custom AI solutions for SMBs with focus on practical, measurable results."
  },
  {
    name: "Lead AI Engineer", 
    role: "Technical Development",
    bio: "Specializes in building secure, scalable AI systems that integrate seamlessly with existing business processes."
  },
  {
    name: "Implementation Manager",
    role: "Project Management & Training", 
    bio: "Ensures smooth deployments and comprehensive team training for maximum AI adoption and success."
  }
];

export default function TeamPage() {
  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Meet The AI CEO Team
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Founder-led, expert-driven team dedicated to helping SMBs succeed with custom AI solutions.
            </p>
            <p className="text-lg text-gray-500 font-medium">
              &ldquo;We want to help as many people as we can&rdquo;
            </p>
          </div>
        </Container>
      </section>

      {/* Team Members */}
      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-base font-medium text-gray-600">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Company Values */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Philosophy</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Generous Value First",
                description: "We provide more free value than anyone else because we believe knowledge should be accessible."
              },
              {
                title: "SMB-Focused Approach", 
                description: "Everything we build is designed specifically for small and medium businesses, not adapted from enterprise solutions."
              },
              {
                title: "Transparent Results",
                description: "We measure success by your business outcomes, not by impressive technology demos."
              },
              {
                title: "Security First",
                description: "Your data and IP are protected with enterprise-grade security without the enterprise complexity."
              },
              {
                title: "Human-Centered AI",
                description: "AI should augment human capabilities, not replace them. We build tools that empower your team."
              },
              {
                title: "Long-term Partnership",
                description: "We&apos;re not just vendors - we&apos;re your AI success partners, invested in your long-term growth."
              }
            ].map((value, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-gray-900 rounded-lg mb-4 flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Work Together?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Let&apos;s discuss how we can help your business succeed with custom AI solutions.
            </p>
            <Button variant="primary" size="lg">
              Schedule a Call
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}