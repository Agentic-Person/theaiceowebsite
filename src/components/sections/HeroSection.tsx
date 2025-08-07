import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center py-20 pt-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left Column - 60% */}
          <div className="lg:col-span-3 space-y-8">
            {/* Main Headlines */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-gray-900">
                <span className="block">Stop Fighting</span>
                <span className="block">With Generic</span>
                <span className="block">AI Tools</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 max-w-2xl">
                Custom AI that actually understands your business - without the enterprise price tag
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg">
                Get Your Free AI Readiness Assessment
              </Button>
              <Button variant="outline" size="lg">
                Download Our AI Guide
              </Button>
            </div>

            {/* Team Credibility Bar */}
            <div className="pt-8">
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {/* Avatar Placeholders */}
                  <div className="w-12 h-12 rounded-full bg-gray-300 border-2 border-white"></div>
                  <div className="w-12 h-12 rounded-full bg-gray-400 border-2 border-white"></div>
                  <div className="w-12 h-12 rounded-full bg-gray-500 border-2 border-white"></div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Founder-Led, Expert-Driven AI Solutions
                  </p>
                  <p className="text-sm text-gray-600">
                    Trusted by 100+ SMBs nationwide
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - 40% */}
          <div className="lg:col-span-2">
            <div className="relative">
              {/* Particle System Container */}
              <div className="aspect-square w-full max-w-lg mx-auto bg-gray-100 rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto"></div>
                  <p className="text-gray-500 font-medium">
                    Particle System Placeholder
                  </p>
                  <p className="text-sm text-gray-400">
                    Three.js animation will be added here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Built With Section */}
        <div className="mt-20 pt-12 border-t border-gray-200">
          <div className="text-center space-y-8">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Built With
            </p>
            
            {/* Tech Stack Logos Container */}
            <div className="flex justify-center">
              <div className="flex items-center space-x-8 overflow-hidden">
                {/* Logo Placeholders - Will add ticker animation */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center"
                  >
                    <span className="text-xs font-medium text-gray-500">
                      Logo {i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll Hint */}
            <div className="flex flex-col items-center space-y-2 pt-8">
              <p className="text-sm text-gray-500">Scroll to learn more</p>
              <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}