'use client';

import { useState, useEffect } from 'react';
import NoSSR from '@/components/ui/NoSSR';
import { useRouter } from 'next/navigation';
import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import RichTextEditor from '@/components/ui/RichTextEditor';
import ImageUpload from '@/components/ui/ImageUpload';
import { CreateBlogPostData } from '@/types';
import { useBlog } from '@/hooks/useBlog';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';

export default function CreateBlogPostPage() {
  const router = useRouter();
  const { isAuthenticated, isAdmin, loading: authLoading } = useAuth();
  const { createPost, loading, categories, fetchCategories } = useBlog();

  const [formData, setFormData] = useState<CreateBlogPostData>({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    status: 'draft',
    featured_image: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadError, setUploadError] = useState<string>('');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/blog/admin/login');
      return;
    }

    if (!authLoading && !isAdmin) {
      router.push('/blog');
      return;
    }

    fetchCategories();
  }, [authLoading, isAuthenticated, isAdmin, router, fetchCategories]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (formData.excerpt && formData.excerpt.length > 300) {
      newErrors.excerpt = 'Excerpt must be less than 300 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await createPost(formData);

    if (result.data) {
      router.push('/blog/admin');
    } else {
      setErrors({ submit: result.error || 'Failed to create post' });
    }
  };

  const handlePublish = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const publishData = {
      ...formData,
      status: 'published' as const,
      published_at: new Date().toISOString()
    };

    const result = await createPost(publishData);

    if (result.data) {
      router.push('/blog/admin');
    } else {
      setErrors({ submit: result.error || 'Failed to publish post' });
    }
  };

  if (authLoading) {
    return (
      <main className="pt-24">
        <Container>
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Checking authentication...</p>
          </div>
        </Container>
      </main>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null; // Will redirect
  }

  return (
    <NoSSR
      fallback={
        <main className="pt-24">
          <Container>
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          </Container>
        </main>
      }
    >
      <main className="pt-24">
        <Container>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Create New Blog Post</h1>
            <Button
              variant="outline"
              onClick={() => router.push('/blog/admin')}
            >
              Back to Admin
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <Card>
            <CardHeader>
              <CardTitle>Title</CardTitle>
            </CardHeader>
            <CardContent>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter your blog post title..."
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </CardContent>
          </Card>

          {/* Excerpt */}
          <Card>
            <CardHeader>
              <CardTitle>Excerpt (Optional)</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief summary of your post (max 300 characters)..."
                rows={3}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.excerpt ? 'border-red-500' : 'border-gray-300'
                }`}
                maxLength={300}
              />
              <div className="mt-1 text-sm text-gray-500">
                {formData.excerpt.length}/300 characters
              </div>
              {errors.excerpt && (
                <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>
              )}
            </CardContent>
          </Card>

          {/* Category */}
          <Card>
            <CardHeader>
              <CardTitle>Category</CardTitle>
            </CardHeader>
            <CardContent>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </CardContent>
          </Card>

          {/* Featured Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.featured_image ? (
                <div className="space-y-4">
                  <div className="relative aspect-video w-full max-w-md mx-auto rounded-lg overflow-hidden">
                    <Image
                      src={formData.featured_image}
                      alt="Featured image preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setFormData({ ...formData, featured_image: '' })}
                    >
                      Remove Image
                    </Button>
                  </div>
                </div>
              ) : (
                <ImageUpload
                  onImageUploaded={(url) => {
                    setFormData({ ...formData, featured_image: url });
                    setUploadError('');
                  }}
                  onError={(error) => setUploadError(error)}
                />
              )}
              
              {uploadError && (
                <p className="text-sm text-red-600 mt-2">{uploadError}</p>
              )}
              
              {/* Manual URL input as fallback */}
              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-2" style={{ color: '#596d8c' }}>Or enter image URL manually:</p>
                <input
                  type="url"
                  value={formData.featured_image || ''}
                  onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
              <RichTextEditor
                value={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
                placeholder="Write your blog post content here..."
                minHeight="400px"
              />
              {errors.content && (
                <p className="mt-2 text-sm text-red-600">{errors.content}</p>
              )}
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags (Optional)</CardTitle>
            </CardHeader>
            <CardContent>
              <input
                type="text"
                value={formData.tags?.join(', ') || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                })}
                placeholder="ai, business, technology (comma-separated)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                Separate tags with commas
              </p>
            </CardContent>
          </Card>

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{errors.submit}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center pt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/blog/admin')}
            >
              Cancel
            </Button>

            <div className="flex gap-4">
              <Button
                type="submit"
                variant="outline"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save as Draft'}
              </Button>

              <Button
                type="button"
                variant="primary"
                onClick={handlePublish}
                disabled={loading || !formData.title || !formData.content || !formData.category}
              >
                {loading ? 'Publishing...' : 'Publish Now'}
              </Button>
            </div>
          </div>
        </form>
        </Container>
      </main>
    </NoSSR>
  );
}
