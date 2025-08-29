-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user_profiles table if it doesn't exist (for blog authors)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'editor')),
  bio TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create blog_categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#6B7280',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  category TEXT NOT NULL,
  tags TEXT[],
  read_time INTEGER,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author ON blog_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);

-- Insert default categories
INSERT INTO blog_categories (name, slug, description, color) VALUES
  ('AI Strategy', 'ai-strategy', 'Strategic insights on AI implementation for businesses', '#3B82F6'),
  ('Case Studies', 'case-studies', 'Real-world examples and success stories', '#10B981'),
  ('Technology', 'technology', 'Latest developments in AI and automation', '#8B5CF6'),
  ('Industry Insights', 'industry-insights', 'Market trends and industry analysis', '#F59E0B'),
  ('How-To Guides', 'how-to-guides', 'Step-by-step guides and tutorials', '#EF4444')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample blog posts
INSERT INTO blog_posts (
  title, 
  slug, 
  excerpt, 
  content, 
  category, 
  tags, 
  read_time, 
  status, 
  published_at,
  author_id
) VALUES
  (
    'Why 70% of AI Projects Fail - And How to Avoid the Pitfalls',
    'why-ai-projects-fail',
    'Most businesses rush into AI without proper strategy. Learn the common mistakes that lead to failure and how to set your AI initiative up for success.',
    '# Why 70% of AI Projects Fail - And How to Avoid the Pitfalls

According to recent industry research, approximately 70% of AI projects fail to deliver meaningful business value. This staggering statistic isn''t due to technological limitations—it''s because businesses approach AI with the wrong mindset.

## The Common Pitfalls

### 1. Solution Looking for a Problem
Many businesses start with "We need AI" instead of "We have this problem that AI might solve." This backward approach leads to expensive implementations that don''t address real business needs.

### 2. Lack of Data Strategy
AI is only as good as the data it''s trained on. Companies often discover too late that their data is incomplete, inconsistent, or biased.

### 3. Unrealistic Expectations
Hollywood and marketing hype have created unrealistic expectations. AI isn''t magic—it''s a powerful tool that requires proper implementation and management.

## How to Set Your AI Project Up for Success

### Start with Business Problems, Not Technology
Before considering AI, clearly define the business problem you''re trying to solve. Ask:
- What specific outcome do we want to achieve?
- How will we measure success?
- What would a 20% improvement look like?

### Audit Your Data
Good AI requires good data. Conduct a thorough data audit to understand:
- What data do you currently collect?
- How clean and consistent is it?
- What gaps exist in your data collection?

### Start Small and Scale
Begin with a focused pilot project that can demonstrate clear value. This allows you to:
- Learn how AI fits into your workflow
- Identify integration challenges early
- Build internal expertise
- Show ROI before major investment

## The AI CEO Approach

At The AI CEO, we''ve seen these patterns repeatedly. That''s why our consultation-first approach focuses on:

1. **Problem Definition**: We start every engagement by clearly defining the business problem
2. **Data Assessment**: We evaluate your data readiness before recommending solutions
3. **Phased Implementation**: We design implementations that show value quickly while building toward larger goals
4. **Change Management**: We help your team adapt to new AI-powered workflows

## Conclusion

AI failure isn''t inevitable. With the right strategy, realistic expectations, and proper implementation, AI can transform your business. The key is approaching it as a business initiative, not just a technology project.

Ready to ensure your AI project succeeds? [Contact us](/#contact) for a free consultation.',
    'ai-strategy',
    ARRAY['ai-strategy', 'business-transformation', 'project-management'],
    5,
    'published',
    NOW() - INTERVAL '7 days',
    (SELECT id FROM auth.users LIMIT 1)
  ),
  (
    'How a Small Manufacturing Company Increased Efficiency by 35% with Custom AI',
    'manufacturing-efficiency-ai-case-study',
    'Discover how Precision Parts Inc. used custom AI to streamline their quality control process and dramatically improve operational efficiency.',
    '# How a Small Manufacturing Company Increased Efficiency by 35% with Custom AI

**Client**: Precision Parts Inc. - A 50-employee manufacturing company specializing in automotive components
**Challenge**: Manual quality control was creating bottlenecks and inconsistencies
**Solution**: Custom AI vision system for automated quality inspection
**Result**: 35% efficiency increase and 60% reduction in defective parts

## The Challenge

Precision Parts Inc. was struggling with their manual quality control process. Their experienced inspector could only check about 200 parts per hour, creating a bottleneck in their production line. Worse, human fatigue led to inconsistent results, especially during long shifts.

The company was growing rapidly, but their quality control process couldn''t scale without hiring multiple expensive inspectors—a solution that would significantly impact their profit margins.

## Our Approach

### 1. Process Analysis
We spent a week on-site understanding their current workflow:
- Documented the inspection criteria
- Measured current throughput and error rates
- Identified the most common defect types
- Analyzed the cost of missed defects

### 2. Custom AI Development
Rather than a one-size-fits-all solution, we developed a custom AI vision system specifically for their parts and defect types:
- **Camera System**: High-resolution cameras positioned at optimal angles
- **Custom AI Model**: Trained on thousands of images of their specific parts
- **Integration**: Seamlessly integrated with their existing conveyor system
- **Quality Dashboard**: Real-time monitoring and reporting interface

### 3. Gradual Implementation
We implemented the system in phases:
- **Week 1**: Parallel testing alongside human inspector
- **Week 2-3**: AI-first with human verification
- **Week 4+**: Fully automated with spot-check audits

## The Results

After three months of operation:

### Efficiency Gains
- **Inspection Speed**: From 200 to 800 parts per hour (300% increase)
- **Overall Line Efficiency**: 35% improvement in total throughput
- **Labor Reallocation**: Inspector moved to higher-value tasks

### Quality Improvements
- **Defect Detection**: 60% reduction in defective parts reaching customers
- **Consistency**: 24/7 operation with no fatigue-related errors
- **Traceability**: Complete digital record of all inspections

### Financial Impact
- **ROI**: System paid for itself in 8 months
- **Cost Savings**: $120,000 annually in prevented recalls and rework
- **Revenue Growth**: Ability to take on 40% more orders with same staff

## Key Success Factors

### 1. Domain-Specific Training
Generic AI solutions wouldn''t have worked. The key was training the AI specifically on their parts and defect types.

### 2. Change Management
We worked closely with the inspection team to ensure they understood the technology and felt comfortable with the transition.

### 3. Continuous Improvement
The AI system continues to learn and improve, with regular model updates based on new data.

## Lessons for Other Manufacturers

### Start with Your Biggest Bottleneck
Don''t try to automate everything at once. Focus on the process that''s most constraining your growth.

### Invest in Quality Data
The success of this project depended on high-quality training data. We captured thousands of examples of both good and defective parts.

### Plan for Integration
The technical AI solution was only part of the project. Integrating with existing systems and processes was equally important.

## Conclusion

This case study demonstrates that custom AI solutions can deliver transformational results for small and medium businesses. The key is understanding your specific needs and implementing AI strategically, not just technologically.

Precision Parts Inc. is now exploring additional AI applications, including predictive maintenance and demand forecasting. Their success with this first project has built confidence and expertise for future AI initiatives.

**Ready to explore how custom AI could transform your operations?** [Schedule a consultation](/#contact) to discuss your specific challenges.',
    'case-studies',
    ARRAY['manufacturing', 'quality-control', 'case-study', 'roi'],
    7,
    'published',
    NOW() - INTERVAL '14 days',
    (SELECT id FROM auth.users LIMIT 1)
  ),
  (
    'The Complete Guide to AI Implementation for Small Businesses',
    'ai-implementation-guide-small-business',
    'A step-by-step roadmap for small businesses to successfully implement AI solutions without breaking the bank or overwhelming their team.',
    '# The Complete Guide to AI Implementation for Small Businesses

Artificial Intelligence isn''t just for tech giants anymore. Small and medium businesses are increasingly leveraging AI to compete more effectively, reduce costs, and improve customer experience. This comprehensive guide will walk you through everything you need to know to implement AI successfully in your business.

## Understanding AI for Small Business

### What AI Can Do for Your Business
- **Automate Repetitive Tasks**: Free up human resources for strategic work
- **Improve Decision Making**: Data-driven insights for better business decisions
- **Enhance Customer Experience**: Personalized interactions and faster service
- **Reduce Costs**: Eliminate inefficiencies and reduce manual labor
- **Scale Operations**: Handle increased volume without proportional staff increases

### Common AI Applications for SMBs
1. **Customer Service**: Chatbots and automated support
2. **Sales & Marketing**: Lead scoring and personalized campaigns
3. **Operations**: Inventory management and demand forecasting
4. **Finance**: Automated bookkeeping and expense categorization
5. **HR**: Resume screening and employee scheduling

## Phase 1: Assessment and Planning

### Step 1: Identify Business Problems
Before considering AI, clearly define what you''re trying to solve:
- List your biggest operational pain points
- Quantify the cost of these problems
- Prioritize based on business impact

**Example Questions:**
- Where do we spend the most time on repetitive tasks?
- What decisions do we make repeatedly with similar data?
- Where do human errors cost us money?

### Step 2: Evaluate Data Readiness
AI requires data to function effectively:
- **Data Audit**: What data do you currently collect?
- **Data Quality**: How clean and consistent is it?
- **Data Access**: Can you easily extract and use this data?
- **Data Gaps**: What additional data might you need?

### Step 3: Set Clear Objectives
Define specific, measurable goals:
- ❌ "Improve customer service with AI"
- ✅ "Reduce average response time from 4 hours to 30 minutes"
- ✅ "Increase first-contact resolution rate from 60% to 85%"

## Phase 2: Choosing the Right AI Solution

### Build vs. Buy vs. Partner
**Option 1: Off-the-shelf Solutions**
- **Pros**: Quick implementation, lower upfront cost
- **Cons**: Limited customization, may not fit exact needs
- **Best for**: Common use cases like basic chatbots or email automation

**Option 2: Custom Development**
- **Pros**: Perfect fit for your specific needs
- **Cons**: Higher cost and longer timeline
- **Best for**: Unique processes or competitive differentiators

**Option 3: AI Consulting Partnership**
- **Pros**: Expertise without hiring, customized approach
- **Cons**: Ongoing relationship required
- **Best for**: Complex implementations or lack of internal expertise

### Key Evaluation Criteria
1. **Problem Fit**: How well does the solution address your specific problem?
2. **Integration**: How easily will it work with your existing systems?
3. **Scalability**: Can it grow with your business?
4. **Support**: What level of ongoing support is provided?
5. **Cost**: What''s the total cost of ownership?

## Phase 3: Implementation

### Step 1: Start Small
Begin with a pilot project that:
- Addresses a clear business problem
- Has measurable success criteria
- Can be implemented relatively quickly
- Won''t disrupt core operations if it fails

### Step 2: Prepare Your Team
- **Communication**: Explain what''s changing and why
- **Training**: Ensure staff know how to use new tools
- **Support**: Provide ongoing help during transition
- **Feedback**: Create channels for team input

### Step 3: Monitor and Measure
Track both technical and business metrics:
- **Technical**: System uptime, accuracy rates, processing speed
- **Business**: ROI, efficiency gains, customer satisfaction
- **User Adoption**: How well is your team using the new system?

## Phase 4: Scaling and Optimization

### Expand Successful Projects
Once your pilot project is successful:
- Apply lessons learned to new areas
- Scale successful implementations
- Look for additional automation opportunities

### Continuous Improvement
AI systems improve over time:
- Regular model updates and retraining
- Incorporation of new data sources
- Optimization based on usage patterns

## Common Implementation Pitfalls to Avoid

### 1. Technology-First Thinking
❌ "We need AI" 
✅ "We need to solve X problem, and AI might help"

### 2. Unrealistic Expectations
❌ Expecting 100% accuracy from day one
✅ Planning for gradual improvement over time

### 3. Insufficient Change Management
❌ Implementing AI without preparing your team
✅ Including team training and support in your plan

### 4. Data Neglect
❌ Assuming your data is AI-ready
✅ Investing in data cleaning and organization

### 5. All-or-Nothing Approach
❌ Trying to automate everything at once
✅ Starting small and scaling gradually

## Budget Planning for AI Implementation

### Typical Cost Categories
1. **Initial Setup**: $5,000 - $50,000 depending on complexity
2. **Monthly Operations**: $500 - $5,000 for hosting and maintenance
3. **Training and Support**: $2,000 - $10,000 for team preparation
4. **Ongoing Optimization**: 10-20% of initial setup annually

### ROI Timeline
- **Simple Implementations**: 3-6 months
- **Complex Custom Solutions**: 6-18 months
- **Enterprise Integrations**: 12-24 months

## Getting Started: Your Next Steps

### Week 1-2: Assessment
- Identify top 3 business problems AI might solve
- Audit your current data and systems
- Research potential solutions

### Week 3-4: Planning
- Define specific objectives and success metrics
- Evaluate build vs. buy vs. partner options
- Create implementation timeline and budget

### Month 2-3: Pilot Implementation
- Start with smallest, lowest-risk project
- Focus on learning and gathering feedback
- Document lessons learned

### Month 4+: Scale and Optimize
- Apply successful patterns to new areas
- Continuously improve based on results
- Plan next phase of AI implementation

## Conclusion

AI implementation for small businesses doesn''t have to be overwhelming or expensive. The key is starting with clear business objectives, choosing the right approach for your situation, and implementing gradually.

Success comes from treating AI as a business initiative, not just a technology project. Focus on solving real problems, prepare your team for change, and measure results carefully.

**Ready to start your AI journey?** [Contact our team](/#contact) for a free consultation to discuss your specific needs and create a customized implementation plan.',
    'how-to-guides',
    ARRAY['implementation', 'small-business', 'strategy', 'planning'],
    12,
    'published',
    NOW() - INTERVAL '21 days',
    (SELECT id FROM auth.users LIMIT 1)
  )
ON CONFLICT (slug) DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- User profiles: Users can read all profiles, but only update their own
CREATE POLICY "Public profiles are viewable by everyone" ON user_profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Blog categories: Public read access
CREATE POLICY "Blog categories are viewable by everyone" ON blog_categories
  FOR SELECT USING (true);

CREATE POLICY "Only admins can manage blog categories" ON blog_categories
  FOR ALL USING (
    auth.uid() IN (
      SELECT id FROM user_profiles WHERE role = 'admin'
    )
  );

-- Blog posts: Public can read published posts, authors can manage their own posts, admins can manage all
CREATE POLICY "Published blog posts are viewable by everyone" ON blog_posts
  FOR SELECT USING (status = 'published' OR auth.uid() = author_id);

CREATE POLICY "Authors can insert their own posts" ON blog_posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own posts" ON blog_posts
  FOR UPDATE USING (auth.uid() = author_id OR auth.uid() IN (
    SELECT id FROM user_profiles WHERE role IN ('admin', 'editor')
  ));

CREATE POLICY "Authors can delete their own posts" ON blog_posts
  FOR DELETE USING (auth.uid() = author_id OR auth.uid() IN (
    SELECT id FROM user_profiles WHERE role = 'admin'
  ));

-- Create functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updating updated_at timestamps
CREATE TRIGGER update_user_profiles_updated_at 
  BEFORE UPDATE ON user_profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_categories_updated_at 
  BEFORE UPDATE ON blog_categories 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at 
  BEFORE UPDATE ON blog_posts 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();