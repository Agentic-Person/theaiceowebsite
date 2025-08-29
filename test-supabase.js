// Test script to verify Supabase connection
// Run with: node test-supabase.js

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  console.log('Make sure you have:');
  console.log('- NEXT_PUBLIC_SUPABASE_URL');
  console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('🔍 Testing Supabase connection...');

  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .limit(1);

    if (error) {
      console.log('⚠️  Database tables not found yet - this is expected if you haven\'t run the schema');
      console.log('Error:', error.message);
      return false;
    }

    console.log('✅ Supabase connection successful!');
    console.log('📊 Found categories:', data?.length || 0);
    return true;

  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    return false;
  }
}

// Test user authentication (optional)
async function testAuth() {
  console.log('\n🔐 Testing authentication...');

  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.log('⚠️  No active session (this is normal)');
      return;
    }

    if (data.session) {
      console.log('✅ User authenticated:', data.session.user.email);
    } else {
      console.log('ℹ️  No active user session');
    }

  } catch (error) {
    console.log('⚠️  Auth test failed:', error.message);
  }
}

async function main() {
  console.log('🚀 Supabase Blog System Test\n');

  const connected = await testConnection();
  await testAuth();

  if (connected) {
    console.log('\n🎉 Everything looks good! Your blog system is ready.');
    console.log('Next steps:');
    console.log('1. Visit http://localhost:3003/blog');
    console.log('2. Try creating an account and making it admin');
    console.log('3. Visit http://localhost:3003/blog/admin to manage posts');
  } else {
    console.log('\n📋 To fix the connection:');
    console.log('1. Make sure your .env.local file has the correct Supabase credentials');
    console.log('2. Verify you ran the database-schema.sql in Supabase SQL Editor');
    console.log('3. Check that your Supabase project is active');
  }
}

main().catch(console.error);
