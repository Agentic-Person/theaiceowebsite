import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    console.log('🧪 Starting blog debug...');
    
    // Test 1: Basic connection
    const { data: connectionTest, error: connectionError } = await supabase
      .from('blog_posts')
      .select('count')
      .limit(1);
    
    if (connectionError) {
      return NextResponse.json({
        success: false,
        step: 'connection_test',
        error: connectionError.message,
        details: connectionError
      }, { status: 500 });
    }
    
    // Test 2: Check if tables exist
    const { data: posts, error: postsError } = await supabase
      .from('blog_posts')
      .select('id, title, status, published_at')
      .limit(3);
    
    if (postsError) {
      return NextResponse.json({
        success: false,
        step: 'posts_query',
        error: postsError.message,
        details: postsError,
        suggestion: postsError.message.includes('does not exist') 
          ? 'Tables not created yet. Run the Supabase migration script.' 
          : 'Database connection or permissions issue.'
      }, { status: 500 });
    }
    
    // Test 3: Check categories
    const { data: categories, error: catError } = await supabase
      .from('blog_categories')
      .select('id, name, slug')
      .limit(5);
    
    if (catError) {
      return NextResponse.json({
        success: false,
        step: 'categories_query',
        error: catError.message,
        details: catError
      }, { status: 500 });
    }
    
    // Test 4: Check published posts specifically
    const { data: publishedPosts, error: pubError } = await supabase
      .from('blog_posts')
      .select('id, title, status, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });
    
    if (pubError) {
      return NextResponse.json({
        success: false,
        step: 'published_posts_query',
        error: pubError.message,
        details: pubError
      }, { status: 500 });
    }
    
    return NextResponse.json({
      success: true,
      results: {
        totalPosts: posts?.length || 0,
        totalCategories: categories?.length || 0,
        publishedPosts: publishedPosts?.length || 0,
        posts: posts || [],
        categories: categories || [],
        publishedPosts: publishedPosts || []
      },
      environment: {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing',
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'
      }
    });
    
  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json({
      success: false,
      step: 'api_error',
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error
    }, { status: 500 });
  }
}