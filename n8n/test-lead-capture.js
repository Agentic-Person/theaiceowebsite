// Test script for Lead Capture Email Automation
// Run with: node test-lead-capture.js

const axios = require('axios');

// Update this to your n8n webhook URL
const WEBHOOK_URL = 'https://agenticpersonnel.app.n8n.cloud/webhook/lead-capture';

async function testLeadCapture() {
  console.log('🧪 Testing Lead Capture Webhook\n');
  console.log('Webhook URL:', WEBHOOK_URL);
  console.log('----------------------------\n');

  const testData = {
    name: "John Smith",
    email: "john.smith@example.com",
    businessType: "getting-started",
    source: "ebook-download",
    ebookRequested: "AI EDGE eBook",
    timestamp: new Date().toISOString()
  };

  console.log('📤 Sending test lead data:');
  console.log(JSON.stringify(testData, null, 2));
  console.log('\n');

  try {
    const response = await axios.post(WEBHOOK_URL, testData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Success! Response:');
    console.log('Status:', response.status);
    console.log('Data:', JSON.stringify(response.data, null, 2));
    console.log('\n');
    console.log('📧 Check the email address for the automated email');
    console.log('📊 Check Supabase leads table for the stored record');
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    console.log('\n');
    console.log('Troubleshooting tips:');
    console.log('1. Is the n8n workflow active?');
    console.log('2. Are Supabase credentials configured?');
    console.log('3. Are SMTP credentials configured?');
    console.log('4. Check n8n execution logs for details');
  }
}

// Test with different scenarios
async function runAllTests() {
  console.log('🚀 Running Lead Capture Tests\n');

  // Test 1: Basic lead
  await testLeadCapture();

  // Test 2: Different business type
  console.log('\n----------------------------\n');
  console.log('📤 Test 2: Different business type\n');
  
  await axios.post(WEBHOOK_URL, {
    name: "Jane Doe",
    email: "jane.doe@company.com",
    businessType: "scaling",
    source: "ebook-download",
    ebookRequested: "AI Implementation Guide"
  }).then(() => {
    console.log('✅ Test 2 passed');
  }).catch(error => {
    console.error('❌ Test 2 failed:', error.message);
  });

  console.log('\n✨ All tests completed!');
}

runAllTests();
