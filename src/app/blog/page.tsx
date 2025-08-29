'use client';

import { useState, useEffect } from 'react';
import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { BlogPost } from '@/types';
import { useBlog } from '@/hooks/useBlog';
import { getBlogPosts, getBlogCategories, StaticBlogPost } from '@/data/blogPosts';
import { formatDate, formatDateShort } from '@/lib/dateUtils';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { posts: dynamicPosts, categories: dynamicCategories, loading, error, fetchPosts, fetchCategories } = useBlog();
  const [displayPosts, setDisplayPosts] = useState<(BlogPost | StaticBlogPost)[]>([]);
  const [displayCategories, setDisplayCategories] = useState<string[]>([]);
  const [usingDynamicData, setUsingDynamicData] = useState(false);

  useEffect(() => {
    // First try to load dynamic data from Supabase
    const loadData = async () => {
      try {
        await fetchPosts();
        await fetchCategories();
      } catch (err) {
        console.log('Dynamic data not available, falling back to static data');
      }
    };
    
    loadData();
  }, [fetchPosts, fetchCategories]);

  useEffect(() => {
    // Determine which data to use and set display data
    if (dynamicPosts && dynamicPosts.length > 0) {
      setDisplayPosts(dynamicPosts);
      setDisplayCategories(dynamicCategories || []);
      setUsingDynamicData(true);
    } else {
      // Fall back to static data
      const staticPosts = getBlogPosts({ status: 'published' });
      const staticCategories = getBlogCategories();
      setDisplayPosts(staticPosts);
      setDisplayCategories(staticCategories);
      setUsingDynamicData(false);
    }
  }, [dynamicPosts, dynamicCategories]);

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    
    if (usingDynamicData) {
      // Use dynamic data filtering
      fetchPosts({
        category: category === 'all' ? undefined : category,
        search: searchQuery || undefined
      });
    } else {
      // Use static data filtering
      const filteredPosts = getBlogPosts({
        category: category === 'all' ? undefined : category,
        status: 'published'
      });
      setDisplayPosts(filteredPosts);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (usingDynamicData) {
      // Use dynamic data search
      fetchPosts({
        category: selectedCategory === 'all' ? undefined : selectedCategory,
        search: query || undefined
      });
    } else {
      // Use static data search
      const allPosts = getBlogPosts({ status: 'published' });
      const filteredPosts = allPosts.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.category.toLowerCase().includes(query.toLowerCase())
      );
      setDisplayPosts(filteredPosts);
    }
  };

  if (loading) {
    return (
      <main className="pt-24">
        <Container>
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blog posts...</p>
          </div>
        </Container>
      </main>
    );
  }

  if (error) {
    return (
      <main className="pt-24">
        <Container>
          <div className="text-center py-16">
            <p className="text-red-600 mb-4">Error loading blog posts: {error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </Container>
      </main>
    );
  }

  // Show up to 6 posts
  const postsToShow = displayPosts.slice(0, 6);

  return (
    <main className="pt-24 min-h-screen" style={{ backgroundColor: '#001d39' }}>
      <Container>
        {/* Simple Blog Title */}
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold" style={{ color: '#FFFFFF' }}>
            AI Insights for SMBs
          </h1>
        </div>

        {/* 6-Card Grid */}
        <div className="pb-24">
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: '#36b0d9' }}></div>
              <p className="mt-4" style={{ color: '#9ab6e0' }}>Loading blog posts...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="mb-4" style={{ color: '#FF6B6B' }}>Error loading blog posts: {error}</p>
              <Button onClick={() => fetchPosts()}>
                Try Again
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {postsToShow.map((post) => (
                <Card 
                  key={post.id} 
                  className="h-full transition-all duration-300 cursor-pointer group relative overflow-hidden"
                  style={{ 
                    backgroundColor: '#002246',
                    border: '1px solid rgba(89, 109, 140, 0.2)',
                    borderTop: '2px solid #36b0d9',
                    boxShadow: `
                      0 4px 16px rgba(0, 0, 0, 0.4),
                      0 8px 32px rgba(0, 0, 0, 0.2),
                      0 2px 8px rgba(54, 176, 217, 0.1),
                      inset 0 1px 0 rgba(255, 255, 255, 0.05)
                    `,
                    transform: 'translateY(-2px)',
                    background: `linear-gradient(145deg, #002246 0%, #001a35 100%)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = `
                      0 8px 32px rgba(0, 0, 0, 0.5),
                      0 16px 48px rgba(0, 0, 0, 0.3),
                      0 4px 16px rgba(54, 176, 217, 0.2),
                      0 0 24px rgba(54, 176, 217, 0.1),
                      inset 0 1px 0 rgba(255, 255, 255, 0.1)
                    `;
                    e.currentTarget.style.borderColor = 'rgba(54, 176, 217, 0.4)';
                    e.currentTarget.style.borderTop = '2px solid #36b0d9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `
                      0 4px 16px rgba(0, 0, 0, 0.4),
                      0 8px 32px rgba(0, 0, 0, 0.2),
                      0 2px 8px rgba(54, 176, 217, 0.1),
                      inset 0 1px 0 rgba(255, 255, 255, 0.05)
                    `;
                    e.currentTarget.style.borderColor = 'rgba(89, 109, 140, 0.2)';
                    e.currentTarget.style.borderTop = '2px solid #36b0d9';
                  }}
                >
                  {/* Corner highlight */}
                  <div 
                    className="absolute top-0 left-0 w-16 h-16 opacity-30"
                    style={{
                      background: 'radial-gradient(circle at top left, rgba(54, 176, 217, 0.3) 0%, transparent 50%)'
                    }}
                  />

                  {/* Top accent gradient */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{
                      background: 'linear-gradient(90deg, #36b0d9 0%, rgba(54, 176, 217, 0.5) 50%, transparent 100%)'
                    }}
                  />
                  {/* Blog Post Image */}
                  <div className="aspect-video rounded-lg overflow-hidden mb-4 relative">
                    <Image
                      src={usingDynamicData ? (post as BlogPost).featured_image || '/placeholder-blog.jpg' : (post as StaticBlogPost).image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>

                  <CardHeader className="pb-4">
                    {/* Category and Read Time */}
                    <div className="flex items-center justify-between mb-3">
                      <span 
                        className="text-xs font-medium px-2 py-1 rounded-full"
                        style={{ backgroundColor: '#36b0d9', color: '#FFFFFF' }}
                      >
                        {post.category}
                      </span>
                      {(usingDynamicData ? (post as BlogPost).read_time : (post as StaticBlogPost).read_time) && (
                        <span className="text-sm" style={{ color: '#9ab6e0' }}>
                          {usingDynamicData ? (post as BlogPost).read_time : (post as StaticBlogPost).read_time} min read
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <CardTitle className="text-lg leading-tight mb-3" style={{ color: '#FFFFFF' }}>
                      {post.title}
                    </CardTitle>

                    {/* Excerpt */}
                    <CardDescription className="text-sm leading-relaxed" style={{ color: '#596d8c' }}>
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: '#9ab6e0' }}>
                        {formatDateShort(usingDynamicData ? (post as BlogPost).published_at : (post as StaticBlogPost).published_at)}
                      </span>
                      <Link 
                        href={`/blog/${usingDynamicData ? (post as BlogPost).slug : (post as StaticBlogPost).slug}`}
                        className="text-sm font-medium hover:underline transition-colors"
                        style={{ color: '#36b0d9' }}
                      >
                        Read More →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}