import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function SolutionsPage() {
  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              AI Solutions Built for Your Business
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Custom AI implementations that understand your unique challenges and deliver measurable results.
            </p>
            <Button variant="primary" size="lg">
              Schedule Free Consultation
            </Button>
          </div>
        </Container>
      </section>

      {/* Solutions Grid */}
      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder cards for different solutions */}
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>
                  <CardTitle>Solution {index + 1}</CardTitle>
                  <CardDescription>
                    Description of AI solution and its benefits for SMBs.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    <li className="text-gray-600">• Feature one</li>
                    <li className="text-gray-600">• Feature two</li>
                    <li className="text-gray-600">• Feature three</li>
                  </ul>
                  <Button variant="outline" size="md" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}