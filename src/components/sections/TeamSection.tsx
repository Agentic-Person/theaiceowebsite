import Link from 'next/link';
import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

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
    <section id="team" className="py-24 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Who We Are
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Founder-led, expert-driven team dedicated to helping SMBs succeed with custom AI solutions.
          </p>
          <p className="text-lg text-gray-500 font-medium italic">
            &ldquo;We want to help as many people as we can&rdquo;
          </p>
        </div>

        {/* Team Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {teamHighlights.map((highlight, index) => (
            <Card key={index} className="text-center h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                </div>
                <CardTitle className="text-xl mb-3">{highlight.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {highlight.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Company Values Preview */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Philosophy</h3>
            <p className="text-gray-600">The principles that guide everything we do</p>
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
                <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                <span className="text-gray-700 font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Work Together?
          </h3>
          <p className="text-gray-600 mb-6">
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
      </Container>
    </section>
  );
}