'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import NoSSR from '@/components/ui/NoSSR';
import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { BlogPost } from '@/types';
import { useBlog } from '@/hooks/useBlog';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function BlogAdminPage() {
  const router = useRouter();
  const { isAuthenticated, isAdmin, loading: authLoading } = useAuth();
  const {
    posts,
    loading: blogLoading,
    error,
    fetchAdminPosts,
    deletePost
  } = useBlog();

  const [selectedStatus, setSelectedStatus] = useState<'all' | 'draft' | 'published' | 'scheduled'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  // Fix hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/blog/admin/login');
      return;
    }

    if (!authLoading && !isAdmin) {
      router.push('/blog');
      return;
    }

    if (isAuthenticated && isAdmin) {
      fetchAdminPosts();
    }
  }, [authLoading, isAuthenticated, isAdmin, router, fetchAdminPosts]);

  const handleStatusFilter = (status: 'all' | 'draft' | 'published' | 'scheduled') => {
    setSelectedStatus(status);
    fetchAdminPosts({
      status: status === 'all' ? undefined : status,
      search: searchQuery || undefined
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchAdminPosts({
      status: selectedStatus === 'all' ? undefined : selectedStatus,
      search: query || undefined
    });
  };

  const handleDeletePost = async (postId: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      const result = await deletePost(postId);
      if (!result.error) {
        fetchAdminPosts({
          status: selectedStatus === 'all' ? undefined : selectedStatus,
          search: searchQuery || undefined
        });
      }
    }
  };

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <main className="pt-24">
        <Container>
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </Container>
      </main>
    );
  }

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
              <p className="mt-4 text-gray-600">Loading admin panel...</p>
            </div>
          </Container>
        </main>
      }
    >
      <main className="pt-24">
        <Container>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Blog Admin</h1>
            <div className="flex gap-4">
              <Link href="/blog">
                <Button variant="outline">
                  View Public Blog
                </Button>
              </Link>
              <Link href="/blog/admin/create">
                <Button variant="primary">
                  Create New Post
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-gray-900">
                  {posts.filter(p => p.status === 'published').length}
                </div>
                <div className="text-sm text-gray-600">Published</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-gray-900">
                  {posts.filter(p => p.status === 'draft').length}
                </div>
                <div className="text-sm text-gray-600">Drafts</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-gray-900">
                  {posts.filter(p => p.status === 'scheduled').length}
                </div>
                <div className="text-sm text-gray-600">Scheduled</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-gray-900">
                  {posts.length}
                </div>
                <div className="text-sm text-gray-600">Total Posts</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <div className="flex gap-2">
            {(['all', 'published', 'draft', 'scheduled'] as const).map((status) => (
              <Button
                key={status}
                variant={selectedStatus === status ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => handleStatusFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Posts Table */}
        {blogLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading posts...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-600 mb-4">Error: {error}</p>
            <Button onClick={() => fetchAdminPosts()}>
              Try Again
            </Button>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 mb-4">No blog posts found.</p>
            <Link href="/blog/admin/create">
              <Button variant="primary">
                Create Your First Post
              </Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {post.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {post.excerpt?.substring(0, 100)}...
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        post.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : post.status === 'draft'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {post.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium space-x-2">
                      {post.status === 'published' && (
                        <a
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </a>
                      )}
                      <Link
                        href={`/blog/admin/edit/${post.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeletePost(post.id, post.title)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        </Container>
      </main>
    </NoSSR>
  );
}
