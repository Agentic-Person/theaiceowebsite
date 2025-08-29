// Supabase connection verification script
// This will help you verify your setup is working

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

console.log('🔍 Verifying Supabase Blog System Setup...\n');

// Check environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('📋 Environment Check:');
console.log(`✅ URL: ${supabaseUrl ? 'Found' : '❌ Missing'}`);
console.log(`✅ Anon Key: ${supabaseKey ? 'Found' : '❌ Missing'}`);
console.log(`✅ Service Key: ${serviceKey ? 'Found' : '❌ Missing'}`);

if (!supabaseUrl || !supabaseKey) {
  console.log('\n❌ Missing required Supabase credentials!');
  console.log('\n📝 Please update your .env.local file with:');
  console.log('- NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co');
  console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key');
  console.log('- SUPABASE_SERVICE_ROLE_KEY=your-service-key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifySetup() {
  console.log('\n🔗 Testing Supabase Connection...');

  try {
    // Test 1: Basic connection
    const { data: categories, error: catError } = await supabase
      .from('blog_categories')
      .select('*')
      .limit(1);

    if (catError) {
      if (catError.code === 'PGRST116') {
        console.log('⚠️  Blog categories table not found');
        console.log('   Did you run database-schema.sql in Supabase?');
      } else {
        console.log('❌ Database error:', catError.message);
      }
    } else {
      console.log('✅ Blog categories table found');
      console.log(`   Categories count: ${categories?.length || 0}`);
    }

    // Test 2: Check if we can access auth
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError) {
      console.log('⚠️  Auth not configured yet (this is normal)');
    } else {
      console.log('✅ Auth system accessible');
    }

    console.log('\n🎯 Next Steps:');
    console.log('1. Visit http://localhost:3003/blog');
    console.log('2. Create a user account on your site');
    console.log('3. Make yourself admin in Supabase SQL Editor');
    console.log('4. Visit http://localhost:3003/blog/admin');

    if (!catError) {
      console.log('\n🎉 Your blog system is ready!');
    }

  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your Supabase project is active');
    console.log('2. Verify the URL and keys are correct');
    console.log('3. Make sure you ran the database schema');
  }
}

verifySetup().catch(console.error);
