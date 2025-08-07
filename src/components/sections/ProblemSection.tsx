import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ProblemCard } from '@/types';

const problems: ProblemCard[] = [
  {
    title: "ChatGPT Doesn&apos;t Know Your Business",
    description: "Generic tools miss your competitive edge and unique processes. They give broad answers when you need specific solutions tailored to your industry and workflow.",
  },
  {
    title: "Security Keeps You Up at Night",
    description: "Can&apos;t risk client data on public platforms. Your business requires enterprise-grade security without the enterprise complexity and cost.",
  },
  {
    title: "Nothing Connects",
    description: "AI tools that don&apos;t talk to your existing systems create more work, not less. You need integration that actually works with your current tech stack.",
  },
  {
    title: "ROI is a Mystery",
    description: "Spending money with no clear business impact. You need measurable results and transparent value, not vague promises of &lsquo;efficiency gains.&rsquo;",
  },
];

export default function ProblemSection() {
  return (
    <section id="problems" className="py-24 bg-gray-50">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Most SMBs Struggle With AI
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            You&apos;re not alone in feeling frustrated with AI implementations. 
            These are the four biggest challenges we help businesses overcome.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {problems.map((problem, index) => (
            <Card key={index} className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-600">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-3">
                      {problem.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {problem.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Transition */}
        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-900 mb-4">
            There&apos;s a better way...
          </p>
          <div className="w-16 h-1 bg-gray-300 mx-auto"></div>
        </div>
      </Container>
    </section>
  );
}