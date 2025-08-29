'use client';

import { useState, useEffect, useCallback } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { UserProfile } from '@/types';

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    session: null,
    loading: true,
    isAuthenticated: false,
    isAdmin: false,
  });

  // Initialize auth state
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Error getting session:', error);
          return;
        }

        if (mounted) {
          if (session?.user) {
            await loadUserProfile(session.user);
          } else {
            setState(prev => ({
              ...prev,
              loading: false,
              isAuthenticated: false,
              isAdmin: false,
            }));
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (mounted) {
          setState(prev => ({ ...prev, loading: false }));
        }
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        if (session?.user) {
          await loadUserProfile(session.user);
        } else {
          setState({
            user: null,
            profile: null,
            session: null,
            loading: false,
            isAuthenticated: false,
            isAdmin: false,
          });
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const loadUserProfile = async (user: User) => {
    try {
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      // Only log actual errors, not "not found" cases
      if (error && error.code !== 'PGRST116') {
        console.error('Database error loading profile:', error.message);
      }

      const userProfile = profile || null;
      const isAdmin = userProfile?.role === 'admin';

      setState({
        user,
        profile: userProfile,
        session: { user, access_token: '', refresh_token: '', expires_in: 0, expires_at: 0, token_type: 'bearer' } as Session,
        loading: false,
        isAuthenticated: true,
        isAdmin: !!isAdmin,
      });
    } catch (error: any) {
      // Only log unexpected errors
      if (error?.code !== 'PGRST116') {
        console.error('Unexpected error loading profile:', error?.message || 'Unknown error');
      }
      
      // Still set user as authenticated even if no profile
      setState({
        user,
        profile: null,
        session: { user, access_token: '', refresh_token: '', expires_in: 0, expires_at: 0, token_type: 'bearer' } as Session,
        loading: false,
        isAuthenticated: true,
        isAdmin: false,
      });
    }
  };

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as AuthError };
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string, fullName?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as AuthError };
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: error as AuthError };
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: error as AuthError };
    }
  }, []);

  return {
    ...state,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };
}
