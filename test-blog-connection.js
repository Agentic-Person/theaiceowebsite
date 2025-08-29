// Quick test script to verify blog database connection
// Run with: node test-blog-connection.js

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '✅ Set' : '❌ Missing');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('🧪 Testing Supabase Blog Connection...\n');

  try {
    // Test 1: Check if tables exist
    console.log('1. Testing table existence...');
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .in('table_name', ['blog_posts', 'blog_categories', 'user_profiles']);

    if (tablesError) {
      console.error('❌ Error checking tables:', tablesError.message);
    } else {
      const tableNames = tables.map(t => t.table_name);
      console.log('✅ Tables found:', tableNames);
    }

    // Test 2: Check blog categories
    console.log('\n2. Testing blog categories...');
    const { data: categories, error: catError } = await supabase
      .from('blog_categories')
      .select('name, slug')
      .limit(5);

    if (catError) {
      console.error('❌ Error fetching categories:', catError.message);
    } else {
      console.log(`✅ Found ${categories.length} categories:`, categories.map(c => c.name));
    }

    // Test 3: Check blog posts
    console.log('\n3. Testing blog posts...');
    const { data: posts, error: postsError } = await supabase
      .from('blog_posts')
      .select('title, status, published_at')
      .limit(5);

    if (postsError) {
      console.error('❌ Error fetching posts:', postsError.message);
    } else {
      console.log(`✅ Found ${posts.length} blog posts:`);
      posts.forEach(post => {
        console.log(`  - ${post.title} (${post.status})`);
      });
    }

    // Test 4: Check published posts (what the blog page queries)
    console.log('\n4. Testing published posts query...');
    const { data: publishedPosts, error: pubError } = await supabase
      .from('blog_posts')
      .select('title, slug, excerpt, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (pubError) {
      console.error('❌ Error fetching published posts:', pubError.message);
    } else {
      console.log(`✅ Found ${publishedPosts.length} published posts ready for blog page`);
    }

    console.log('\n🎉 Database connection test complete!');

  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
  }
}

testConnection();