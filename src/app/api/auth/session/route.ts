import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();

    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Error getting session:', error);
      return NextResponse.json(
        { error: 'Failed to get session' },
        { status: 500 }
      );
    }

    if (!session) {
      return NextResponse.json({
        user: null,
        isAuthenticated: false,
        isAdmin: false,
      });
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Error getting user profile:', profileError);
    }

    return NextResponse.json({
      user: session.user,
      profile: profile || null,
      isAuthenticated: true,
      isAdmin: profile?.role === 'admin',
    });
  } catch (error) {
    console.error('Session API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
