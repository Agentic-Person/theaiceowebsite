'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ImageUpload from '@/components/ui/ImageUpload';
import { BlogPost } from '@/types';
import { useBlog } from '@/hooks/useBlog';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;
  const { isAuthenticated, isAdmin, loading: authLoading } = useAuth();
  const { updatePost, loading: blogLoading } = useBlog();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [featuredImage, setFeaturedImage] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [status, setStatus] = useState<'draft' | 'published' | 'scheduled'>('draft');

  const categories = [
    'Strategy',
    'Implementation', 
    'Industry Guide',
    'Security',
    'Education',
    'Case Studies',
    'Technology',
    'Business Growth'
  ];

  // Load the post data
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/blog/admin/login');
      return;
    }

    if (!authLoading && !isAdmin) {
      router.push('/blog');
      return;
    }

    if (isAuthenticated && isAdmin && postId) {
      loadPost();
    }
  }, [authLoading, isAuthenticated, isAdmin, router, postId]);

  const loadPost = async () => {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', postId)
        .single();

      if (error) throw error;

      if (data) {
        setPost(data);
        setTitle(data.title || '');
        setExcerpt(data.excerpt || '');
        setContent(data.content || '');
        setCategory(data.category || '');
        setFeaturedImage(data.featured_image || '');
        setTags(data.tags ? data.tags.join(', ') : '');
        setStatus(data.status || 'draft');
      }
    } catch (error) {
      console.error('Error loading post:', error);
      alert('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent, saveStatus: 'draft' | 'published') => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert('Please fill in title and content');
      return;
    }

    const postData = {
      id: postId,
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      category: category || 'Strategy',
      featured_image: featuredImage,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      status: saveStatus,
      published_at: saveStatus === 'published' ? new Date().toISOString() : null,
    };

    const result = await updatePost(postData);
    
    if (result.error) {
      alert(`Failed to update post: ${result.error}`);
    } else {
      alert(`Post ${saveStatus === 'published' ? 'published' : 'saved as draft'} successfully!`);
      router.push('/blog/admin');
    }
  };

  const handleImageUpload = (imageUrl: string) => {
    setFeaturedImage(imageUrl);
  };

  if (authLoading || loading) {
    return (
      <main className="pt-24">
        <Container>
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading post...</p>
          </div>
        </Container>
      </main>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null; // Will redirect
  }

  if (!post) {
    return (
      <main className="pt-24">
        <Container>
          <div className="text-center py-16">
            <p className="text-red-600 mb-4">Post not found</p>
            <Link href="/blog/admin">
              <Button>Back to Admin</Button>
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="pt-24">
      <Container>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
            <Link href="/blog/admin">
              <Button variant="outline">
                Back to Admin
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Edit Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter post title..."
                  required
                />
              </div>

              {/* Excerpt */}
              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt
                </label>
                <textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of the post..."
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image
                </label>
                <ImageUpload onImageUpload={handleImageUpload} />
                {featuredImage && (
                  <div className="mt-4">
                    <img
                      src={featuredImage}
                      alt="Featured image preview"
                      className="max-w-sm max-h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={12}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  placeholder="Write your post content here... (Markdown supported)"
                  required
                />
              </div>

              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="tag1, tag2, tag3"
                />
                <p className="text-sm text-gray-500 mt-1">Separate tags with commas</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="button"
                  onClick={(e) => handleSubmit(e, 'draft')}
                  variant="outline"
                  disabled={blogLoading}
                  className="flex-1"
                >
                  {blogLoading ? 'Saving...' : 'Save as Draft'}
                </Button>
                <Button
                  type="button"
                  onClick={(e) => handleSubmit(e, 'published')}
                  variant="primary"
                  disabled={blogLoading}
                  className="flex-1"
                >
                  {blogLoading ? 'Publishing...' : 'Publish'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}