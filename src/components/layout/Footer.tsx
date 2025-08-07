import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { NavigationItem } from '@/types';

const footerNavigation = {
  solutions: [
    { label: 'Custom AI Tools', href: '/solutions#custom-tools' },
    { label: 'Workflow Automation', href: '/solutions#automation' },
    { label: 'AI Strategy', href: '/solutions#strategy' },
    { label: 'Implementation', href: '/implementation' },
  ],
  company: [
    { label: 'About Us', href: '/team' },
    { label: 'Our Process', href: '/workflow' },
    { label: 'Success Stories', href: '/success-stories' },
    { label: 'Blog', href: '/blog' },
  ],
  resources: [
    { label: 'AI Playbook', href: '/resources#playbook' },
    { label: 'ROI Calculator', href: '/resources#calculator' },
    { label: 'Templates', href: '/resources#templates' },
    { label: 'Webinars', href: '/resources#webinars' },
  ],
};

const socialLinks = [
  { label: 'LinkedIn', href: '#', icon: 'linkedin' },
  { label: 'Twitter', href: '#', icon: 'twitter' },
  { label: 'GitHub', href: '#', icon: 'github' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <Container>
        {/* Newsletter Section */}
        <div className="py-16 border-b border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Stay ahead with AI insights
              </h2>
              <p className="text-gray-400">
                Get weekly updates on AI trends, implementation strategies, and success stories from SMBs like yours.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
              <Button variant="primary" size="md">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-white">AI</span>
                </div>
                <span className="ml-2 text-xl font-bold">
                  The AI CEO
                </span>
              </Link>
              <p className="text-gray-400 mb-6 max-w-md">
                Custom AI solutions for small and medium businesses. 
                We build AI that actually understands your business - without the enterprise price tag.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                    aria-label={link.label}
                  >
                    <div className="w-5 h-5 bg-gray-400 rounded"></div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="font-semibold mb-4">Solutions</h3>
              <ul className="space-y-2">
                {footerNavigation.solutions.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {footerNavigation.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                {footerNavigation.resources.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} The AI CEO. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}