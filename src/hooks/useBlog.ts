'use client';

import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { BlogPost, BlogCategory, CreateBlogPostData, UpdateBlogPostData } from '@/types';

interface BlogState {
  posts: BlogPost[];
  categories: BlogCategory[];
  loading: boolean;
  error: string | null;
  totalPosts: number;
  currentPage: number;
  hasMore: boolean;
}

interface BlogFilters {
  category?: string;
  status?: 'draft' | 'published' | 'scheduled';
  search?: string;
  limit?: number;
  page?: number;
}

export function useBlog() {
  const [state, setState] = useState<BlogState>({
    posts: [],
    categories: [],
    loading: false,
    error: null,
    totalPosts: 0,
    currentPage: 1,
    hasMore: false,
  });

  // Fetch published blog posts
  const fetchPosts = useCallback(async (filters: BlogFilters = {}) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      let query = supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      // Apply filters
      if (filters.category && filters.category !== 'all') {
        query = query.eq('category', filters.category);
      }

      if (filters.search) {
        query = query.ilike('title', `%${filters.search}%`);
      }

      const limit = filters.limit || 12;
      const page = filters.page || 1;
      const offset = (page - 1) * limit;

      query = query.range(offset, offset + limit - 1);

      const { data, error, count } = await query;

      if (error) throw error;

      setState(prev => ({
        ...prev,
        posts: page === 1 ? (data || []) : [...prev.posts, ...(data || [])],
        totalPosts: count || 0,
        currentPage: page,
        hasMore: (count || 0) > (page * limit),
        loading: false,
      }));

      return { data, error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch posts';
      console.error('Failed to fetch blog posts:', error);
      
      // Provide helpful error message for missing tables
      const friendlyMessage = errorMessage.includes('relation "blog_posts" does not exist') 
        ? 'Blog database not set up yet. Please run the Supabase migration script.'
        : errorMessage.includes('JWT expired')
        ? 'Authentication expired. Please check your Supabase configuration.'
        : errorMessage;
        
      setState(prev => ({ ...prev, error: friendlyMessage, loading: false }));
      return { data: null, error: friendlyMessage };
    }
  }, []);

  // Fetch single blog post by slug
  const fetchPost = useCallback(async (slug: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) throw error;

      setState(prev => ({ ...prev, loading: false }));
      return { data, error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch post';
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
      return { data: null, error: errorMessage };
    }
  }, []);

  // Fetch blog categories
  const fetchCategories = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name');

      if (error) throw error;

      setState(prev => ({ ...prev, categories: data || [] }));
      return { data, error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch categories';
      return { data: null, error: errorMessage };
    }
  }, []);

  // Create new blog post (admin only)
  const createPost = useCallback(async (postData: CreateBlogPostData) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Get current user
      console.log('Checking user authentication...');
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error('User error:', userError);
        throw new Error(`Authentication error: ${userError.message}`);
      }
      
      if (!user) {
        console.error('No user found');
        throw new Error('User not authenticated - please log in again');
      }
      
      console.log('User authenticated:', user.email);

      // Generate unique slug from title
      let baseSlug = postData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      // Check for existing slugs and make unique
      let slug = baseSlug;
      let counter = 1;
      
      while (true) {
        const { data: existingPost } = await supabase
          .from('blog_posts')
          .select('slug')
          .eq('slug', slug)
          .single();
        
        if (!existingPost) break;
        
        slug = `${baseSlug}-${counter}`;
        counter++;
      }

      // Calculate read time (rough estimate: 200 words per minute)
      const wordCount = postData.content.split(/\s+/).length;
      const readTime = Math.ceil(wordCount / 200);

      const postPayload = {
        ...postData,
        slug,
        read_time: readTime,
        author_id: user.id,
        status: postData.status || 'draft',
        published_at: postData.status === 'published' ? new Date().toISOString() : postData.published_at,
      };

      console.log('Creating post with payload:', postPayload);

      const { data, error } = await supabase
        .from('blog_posts')
        .insert(postPayload)
        .select('*')
        .single();

      if (error) {
        console.error('Database error:', error);
        throw new Error(`Database error: ${error.message} (Code: ${error.code})`);
      }

      console.log('Post created successfully:', data);

      setState(prev => ({ ...prev, loading: false }));
      return { data, error: null };
    } catch (error: any) {
      console.error('Full error object:', error);
      const errorMessage = error?.message || error?.error?.message || 'Failed to create post';
      console.error('Final error message:', errorMessage);
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
      return { data: null, error: errorMessage };
    }
  }, []);

  // Update blog post (admin only)
  const updatePost = useCallback(async (postData: UpdateBlogPostData) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .update({
          ...postData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', postData.id)
        .select(`
          *,
          author:user_profiles(*),
          category_info:blog_categories(*)
        `)
        .single();

      if (error) throw error;

      setState(prev => ({ ...prev, loading: false }));
      return { data, error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update post';
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
      return { data: null, error: errorMessage };
    }
  }, []);

  // Delete blog post (admin only)
  const deletePost = useCallback(async (postId: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      setState(prev => ({ ...prev, loading: false }));
      return { error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete post';
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
      return { error: errorMessage };
    }
  }, []);

  // Fetch admin posts (all posts for admin)
  const fetchAdminPosts = useCallback(async (filters: BlogFilters = {}) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      let query = supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      if (filters.category && filters.category !== 'all') {
        query = query.eq('category', filters.category);
      }

      if (filters.search) {
        query = query.ilike('title', `%${filters.search}%`);
      }

      const limit = filters.limit || 20;
      const page = filters.page || 1;
      const offset = (page - 1) * limit;

      query = query.range(offset, offset + limit - 1);

      const { data, error, count } = await query;

      if (error) throw error;

      setState(prev => ({
        ...prev,
        posts: page === 1 ? (data || []) : [...prev.posts, ...(data || [])],
        totalPosts: count || 0,
        currentPage: page,
        hasMore: (count || 0) > (page * limit),
        loading: false,
      }));

      return { data, error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch posts';
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
      return { data: null, error: errorMessage };
    }
  }, []);

  return {
    ...state,
    fetchPosts,
    fetchPost,
    fetchCategories,
    createPost,
    updatePost,
    deletePost,
    fetchAdminPosts,
  };
}
