'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { getBlogPost, StaticBlogPost } from '@/data/blogPosts';
import { useBlog } from '@/hooks/useBlog';
import { BlogPost } from '@/types';
import { formatDate } from '@/lib/dateUtils';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { fetchPost } = useBlog();
  const [post, setPost] = useState<BlogPost | StaticBlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingDynamicData, setUsingDynamicData] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      setError(null);

      try {
        // First try to load from Supabase
        const dynamicResult = await fetchPost(slug);
        
        if (dynamicResult.data) {
          setPost(dynamicResult.data);
          setUsingDynamicData(true);
        } else {
          // Fall back to static data
          const staticPost = getBlogPost(slug);
          if (staticPost) {
            setPost(staticPost);
            setUsingDynamicData(false);
          } else {
            setError('Post not found');
          }
        }
      } catch (err) {
        // Fall back to static data on error
        const staticPost = getBlogPost(slug);
        if (staticPost) {
          setPost(staticPost);
          setUsingDynamicData(false);
        } else {
          setError('Failed to load post');
        }
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadPost();
    }
  }, [slug, fetchPost]);

  if (loading) {
    return (
      <main className="pt-24 min-h-screen" style={{ backgroundColor: '#001d39' }}>
        <Container>
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: '#36b0d9' }}></div>
            <p className="mt-4" style={{ color: '#9ab6e0' }}>Loading post...</p>
          </div>
        </Container>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="pt-24 min-h-screen" style={{ backgroundColor: '#001d39' }}>
        <Container>
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4" style={{ color: '#FFFFFF' }}>Post Not Found</h1>
            <p className="mb-6" style={{ color: '#9ab6e0' }}>{error || 'The requested blog post could not be found.'}</p>
            <Link href="/blog">
              <Button>
                Back to Blog
              </Button>
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  // Simple function to render markdown-like content
  const renderContent = (content: string) => {
    if (content === 'Coming soon...') {
      return (
        <div 
          className="rounded-lg p-8 text-center"
          style={{ 
            backgroundColor: '#002246',
            border: '1px solid rgba(89, 109, 140, 0.2)'
          }}
        >
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#FFFFFF' }}>Full Article Coming Soon</h2>
          <p className="mb-6" style={{ color: '#9ab6e0' }}>
            This blog post is being prepared with detailed content. Check back soon!
          </p>
          <Link href="/blog">
            <Button>
              Browse Other Posts
            </Button>
          </Link>
        </div>
      );
    }

    // Convert markdown to JSX elements
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let currentList: JSX.Element[] = [];
    let listOpen = false;

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      if (trimmedLine === '') {
        if (listOpen) {
          elements.push(<ul key={`list-${index}`} className="space-y-2 mb-6" style={{ color: '#DDDDDD' }}>{currentList}</ul>);
          currentList = [];
          listOpen = false;
        }
        return;
      }

      // Headers
      if (trimmedLine.startsWith('# ')) {
        if (listOpen) {
          elements.push(<ul key={`list-${index}`} className="space-y-2 mb-6" style={{ color: '#DDDDDD' }}>{currentList}</ul>);
          currentList = [];
          listOpen = false;
        }
        elements.push(
          <h1 key={index} className="text-3xl font-bold mt-8 mb-4" style={{ color: '#FFFFFF' }}>
            {trimmedLine.substring(2)}
          </h1>
        );
      } else if (trimmedLine.startsWith('## ')) {
        if (listOpen) {
          elements.push(<ul key={`list-${index}`} className="space-y-2 mb-6" style={{ color: '#DDDDDD' }}>{currentList}</ul>);
          currentList = [];
          listOpen = false;
        }
        elements.push(
          <h2 key={index} className="text-2xl font-bold mt-6 mb-3" style={{ color: '#FFFFFF' }}>
            {trimmedLine.substring(3)}
          </h2>
        );
      } else if (trimmedLine.startsWith('### ')) {
        if (listOpen) {
          elements.push(<ul key={`list-${index}`} className="space-y-2 mb-6" style={{ color: '#DDDDDD' }}>{currentList}</ul>);
          currentList = [];
          listOpen = false;
        }
        elements.push(
          <h3 key={index} className="text-xl font-bold mt-4 mb-2" style={{ color: '#36b0d9' }}>
            {trimmedLine.substring(4)}
          </h3>
        );
      } else if (trimmedLine.startsWith('#### ')) {
        if (listOpen) {
          elements.push(<ul key={`list-${index}`} className="space-y-2 mb-6" style={{ color: '#DDDDDD' }}>{currentList}</ul>);
          currentList = [];
          listOpen = false;
        }
        elements.push(
          <h4 key={index} className="text-lg font-bold mt-3 mb-2" style={{ color: '#36b0d9' }}>
            {trimmedLine.substring(5)}
          </h4>
        );
      } else if (trimmedLine.startsWith('- ')) {
        // List item
        const content = formatInlineMarkdown(trimmedLine.substring(2));
        currentList.push(
          <li key={index} className="flex items-start">
            <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2 mr-3" style={{ backgroundColor: '#36b0d9' }}></div>
            <span dangerouslySetInnerHTML={{ __html: content }} />
          </li>
        );
        listOpen = true;
      } else if (trimmedLine.startsWith('```')) {
        // Code block - simplified handling
        if (listOpen) {
          elements.push(<ul key={`list-${index}`} className="space-y-2 mb-6" style={{ color: '#DDDDDD' }}>{currentList}</ul>);
          currentList = [];
          listOpen = false;
        }
        // This is a simplified version - in a real implementation you'd properly parse code blocks
      } else {
        // Regular paragraph
        if (listOpen) {
          elements.push(<ul key={`list-${index}`} className="space-y-2 mb-6" style={{ color: '#DDDDDD' }}>{currentList}</ul>);
          currentList = [];
          listOpen = false;
        }
        const formattedContent = formatInlineMarkdown(trimmedLine);
        if (formattedContent.trim()) {
          elements.push(
            <p key={index} className="mb-4 leading-relaxed" style={{ color: '#DDDDDD', lineHeight: '1.8' }} 
               dangerouslySetInnerHTML={{ __html: formattedContent }} 
            />
          );
        }
      }
    });

    // Close any remaining list
    if (listOpen) {
      elements.push(<ul key="final-list" className="space-y-2 mb-6" style={{ color: '#DDDDDD' }}>{currentList}</ul>);
    }

    return elements;
  };

  const formatInlineMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #FFFFFF;">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em style="color: #9ab6e0;">$1</em>')
      .replace(/`([^`]+)`/g, '<code style="background: #002246; padding: 0.25rem 0.5rem; border-radius: 0.25rem; color: #36b0d9; font-size: 0.875rem;">$1</code>');
  };

  return (
    <main className="pt-24 min-h-screen" style={{ backgroundColor: '#001d39' }}>
      <Container>
        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="mb-6">
              <Link 
                href="/blog" 
                className="inline-flex items-center transition-colors hover:underline"
                style={{ color: '#36b0d9' }}
              >
                ← Back to Blog
              </Link>
            </div>
            
            {/* Hero Image */}
            <div className="aspect-video rounded-lg overflow-hidden mb-6">
              <Image
                src={usingDynamicData ? (post as BlogPost).featured_image || '/placeholder-blog.jpg' : (post as StaticBlogPost).image}
                alt={post.title}
                width={800}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="mb-4">
              <span 
                className="inline-block px-3 py-1 text-sm font-medium rounded-full"
                style={{ color: '#FFFFFF', backgroundColor: '#36b0d9' }}
              >
                {post.category}
              </span>
            </div>
            
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
              {post.title}
            </h1>
            
            <div className="flex items-center text-sm space-x-4 mb-6" style={{ color: '#9ab6e0' }}>
              <div className="flex items-center space-x-2">
                <Image
                  src={usingDynamicData ? 
                    (post as BlogPost).author?.avatar_url || '/aiceoicon.jpg' : 
                    (post as StaticBlogPost).author.avatar
                  }
                  alt={usingDynamicData ? 
                    (post as BlogPost).author?.full_name || 'Author' : 
                    (post as StaticBlogPost).author.name
                  }
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span>
                  {usingDynamicData ? 
                    (post as BlogPost).author?.full_name || 'The AI CEO Team' : 
                    (post as StaticBlogPost).author.name
                  }
                </span>
              </div>
              <span>•</span>
              <span>{formatDate(usingDynamicData ? (post as BlogPost).published_at : (post as StaticBlogPost).published_at)}</span>
              <span>•</span>
              <span>{usingDynamicData ? (post as BlogPost).read_time : (post as StaticBlogPost).read_time} min read</span>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-8">
            {renderContent(post.content)}
          </div>

          {/* Tags */}
          {((usingDynamicData && (post as BlogPost).tags) || (!usingDynamicData && (post as StaticBlogPost).tags)) && 
           ((usingDynamicData ? (post as BlogPost).tags : (post as StaticBlogPost).tags) || []).length > 0 && (
            <div className="mt-8 pt-8" style={{ borderTop: '1px solid rgba(89, 109, 140, 0.2)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#FFFFFF' }}>Tags</h3>
              <div className="flex flex-wrap gap-2">
                {(usingDynamicData ? (post as BlogPost).tags : (post as StaticBlogPost).tags)?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm rounded-full"
                    style={{ 
                      backgroundColor: 'rgba(54, 176, 217, 0.1)', 
                      color: '#36b0d9',
                      border: '1px solid rgba(54, 176, 217, 0.2)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-12 pt-8 text-center" style={{ borderTop: '1px solid rgba(89, 109, 140, 0.2)' }}>
            <Link href="/blog">
              <Button>
                Back to Blog
              </Button>
            </Link>
          </div>
        </article>
      </Container>
    </main>
  );
}