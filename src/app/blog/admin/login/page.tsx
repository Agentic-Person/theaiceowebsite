'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const { isAuthenticated, isAdmin, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState<{email?: string; password?: string; general?: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && isAuthenticated && isAdmin) {
      router.push('/blog/admin');
    }
  }, [loading, isAuthenticated, isAdmin, router]);

  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setErrors({ general: error.message });
        return;
      }

      if (data.user) {
        // Check if user is admin
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (profileError || profile?.role !== 'admin') {
          setErrors({ general: 'Access denied. Admin privileges required.' });
          await supabase.auth.signOut();
          return;
        }

        // Successful admin login
        router.push('/blog/admin');
      }
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (loading) {
    return (
      <main className="pt-24 min-h-screen" style={{ backgroundColor: '#001d39' }}>
        <Container>
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: '#36b0d9' }}></div>
            <p className="mt-4" style={{ color: '#9ab6e0' }}>Loading...</p>
          </div>
        </Container>
      </main>
    );
  }

  if (isAuthenticated && isAdmin) {
    return null; // Will redirect
  }

  return (
    <main className="pt-24 min-h-screen flex items-center justify-center" style={{ backgroundColor: '#001d39' }}>
      <Container>
        <div className="max-w-md mx-auto">
          <Card 
            className="shadow-2xl"
            style={{ 
              backgroundColor: '#002246',
              border: '1px solid rgba(89, 109, 140, 0.2)',
              borderTop: '3px solid #36b0d9'
            }}
          >
            <CardHeader className="text-center pb-6">
              <div className="mb-4">
                <div 
                  className="w-16 h-16 mx-auto rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: '#36b0d9' }}
                >
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                  </svg>
                </div>
                <CardTitle className="text-2xl font-bold" style={{ color: '#FFFFFF' }}>
                  Admin Login
                </CardTitle>
              </div>
              <p style={{ color: '#9ab6e0' }}>
                Access the blog administration panel
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* General Error */}
                {errors.general && (
                  <div 
                    className="p-4 rounded-lg text-center"
                    style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}
                  >
                    {errors.general}
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium mb-2"
                    style={{ color: '#FFFFFF' }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:border-transparent transition-colors"
                    style={{
                      backgroundColor: '#001d39',
                      borderColor: errors.email ? '#ef4444' : 'rgba(89, 109, 140, 0.3)',
                      color: '#FFFFFF',
                      focusRingColor: '#36b0d9'
                    }}
                    placeholder="Enter your email"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm" style={{ color: '#ef4444' }}>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label 
                    htmlFor="password" 
                    className="block text-sm font-medium mb-2"
                    style={{ color: '#FFFFFF' }}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:border-transparent transition-colors"
                    style={{
                      backgroundColor: '#001d39',
                      borderColor: errors.password ? '#ef4444' : 'rgba(89, 109, 140, 0.3)',
                      color: '#FFFFFF',
                      focusRingColor: '#36b0d9'
                    }}
                    placeholder="Enter your password"
                    disabled={isSubmitting}
                  />
                  {errors.password && (
                    <p className="mt-2 text-sm" style={{ color: '#ef4444' }}>
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2"
                    style={{ accentColor: '#36b0d9' }}
                    disabled={isSubmitting}
                  />
                  <label 
                    htmlFor="rememberMe" 
                    className="ml-2 text-sm"
                    style={{ color: '#9ab6e0' }}
                  >
                    Remember me for 30 days
                  </label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              {/* Back to Blog Link */}
              <div className="mt-6 text-center">
                <Link 
                  href="/blog"
                  className="text-sm hover:underline transition-colors"
                  style={{ color: '#36b0d9' }}
                >
                  ← Back to Blog
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="mt-6 text-center text-xs" style={{ color: '#596d8c' }}>
            <p>This is a secure admin area. All login attempts are logged.</p>
          </div>
        </div>
      </Container>
    </main>
  );
}