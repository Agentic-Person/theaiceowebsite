import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerSupabaseClient();
    const postId = params.id;

    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:user_profiles(*),
        category_info:blog_categories(*)
      `)
      .eq('id', postId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // Not found
        return NextResponse.json(
          { error: 'Blog post not found' },
          { status: 404 }
        );
      }
      console.error('Error fetching blog post:', error);
      return NextResponse.json(
        { error: 'Failed to fetch blog post' },
        { status: 500 }
      );
    }

    return NextResponse.json({ post: data });
  } catch (error) {
    console.error('Blog post API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerSupabaseClient();
    const postId = params.id;

    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid authentication' },
        { status: 401 }
      );
    }

    // Check if user is admin
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileError || profile?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();

    // If updating title, regenerate slug
    let slug = body.slug;
    if (body.title && !body.slug) {
      slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    // If updating content, recalculate read time
    let readTime = body.read_time;
    if (body.content) {
      const wordCount = body.content.split(/\s+/).length;
      readTime = Math.ceil(wordCount / 200);
    }

    const updateData = {
      ...body,
      ...(slug && { slug }),
      ...(readTime && { read_time: readTime }),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', postId)
      .select(`
        *,
        author:user_profiles(*),
        category_info:blog_categories(*)
      `)
      .single();

    if (error) {
      console.error('Error updating blog post:', error);
      return NextResponse.json(
        { error: 'Failed to update blog post' },
        { status: 500 }
      );
    }

    return NextResponse.json({ post: data });
  } catch (error) {
    console.error('Blog update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerSupabaseClient();
    const postId = params.id;

    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid authentication' },
        { status: 401 }
      );
    }

    // Check if user is admin
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileError || profile?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', postId);

    if (error) {
      console.error('Error deleting blog post:', error);
      return NextResponse.json(
        { error: 'Failed to delete blog post' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Blog deletion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
