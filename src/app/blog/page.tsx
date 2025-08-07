import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { BlogPost } from '@/types';

const featuredPost: BlogPost = {
  title: "The SMB Owner's Guide to AI ROI: How to Calculate Real Value",
  excerpt: "Learn the exact framework we use to help SMBs calculate potential AI returns and make informed investment decisions.",
  slug: "smb-ai-roi-guide",
  publishedAt: "2024-01-15",
  readTime: 8,
  category: "Strategy"
};

const blogPosts: BlogPost[] = [
  {
    title: "10 AI Tasks Every Legal Firm Should Automate First",
    excerpt: "Starting your AI journey? These are the highest-impact automation opportunities for legal practices.",
    slug: "legal-ai-automation-priorities", 
    publishedAt: "2024-01-12",
    readTime: 6,
    category: "Industry Guide"
  },
  {
    title: "ChatGPT vs. Custom AI: When to Choose What",
    excerpt: "Understanding when generic AI tools work and when you need custom solutions for your business.",
    slug: "chatgpt-vs-custom-ai",
    publishedAt: "2024-01-10", 
    readTime: 5,
    category: "Strategy"
  },
  {
    title: "Small Business AI Security: What You Need to Know",
    excerpt: "Protecting your data while implementing AI solutions - a practical guide for SMBs.",
    slug: "small-business-ai-security",
    publishedAt: "2024-01-08",
    readTime: 7,
    category: "Security"
  },
  {
    title: "AI Implementation Timeline: What to Expect",
    excerpt: "Realistic timelines for AI implementation and what happens at each stage of the process.",
    slug: "ai-implementation-timeline",
    publishedAt: "2024-01-05",
    readTime: 4,
    category: "Implementation"
  },
  {
    title: "5 AI Myths That Are Costing SMBs Money",
    excerpt: "Debunking common misconceptions that prevent small businesses from AI success.",
    slug: "ai-myths-smb-costs", 
    publishedAt: "2024-01-03",
    readTime: 6,
    category: "Education"
  }
];

const categories = ["All", "Strategy", "Implementation", "Industry Guide", "Security", "Education"];

export default function BlogPage() {
  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              AI Insights for SMBs
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Practical advice, case studies, and strategies to help your business succeed with AI.
            </p>
            <Button variant="outline" size="lg">
              Subscribe to Updates
            </Button>
          </div>
        </Container>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <Container>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Article</h2>
          </div>

          <Card className="mb-16 overflow-hidden hover:shadow-xl transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 font-medium">Featured Article Image</span>
              </div>
              <div className="p-6 lg:p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-gray-900 text-white text-sm font-medium px-3 py-1 rounded-full">
                    {featuredPost.category}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {featuredPost.readTime} min read
                  </span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">
                    {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long', 
                      day: 'numeric'
                    })}
                  </span>
                  <Button variant="primary" size="md">
                    Read Article
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <Container>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button 
                key={category}
                variant={category === "All" ? "primary" : "ghost"}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </Container>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="aspect-video bg-gray-200 rounded-t-lg"></div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {post.readTime} min read
                    </span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-gray-700 transition-colors leading-tight">
                    {post.title}
                  </CardTitle>
                  <CardDescription>
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <Button variant="ghost" size="sm">
                      Read More →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Never Miss an Update
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get our latest AI insights and strategies delivered to your inbox weekly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
              <Button variant="primary" size="md">
                Subscribe
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}