// Test script for AI CEO Chatbot Webhook
// Run with: node test-chatbot-webhook.js

const axios = require('axios');

// Update this to your n8n webhook URL
const WEBHOOK_URL = 'https://agenticpersonnel.app.n8n.cloud/webhook/ai-ceo-chat';

async function testTextMessage() {
  console.log('Testing text message...');
  try {
    const response = await axios.post(WEBHOOK_URL, {
      message: "What services does The AI CEO offer?",
      sessionId: "test-session-123",
      mode: "text",
      timestamp: new Date().toISOString()
    });
    
    console.log('✅ Text Response:', response.data);
  } catch (error) {
    console.error('❌ Text test failed:', error.response?.data || error.message);
  }
}

async function testVoiceMessage() {
  console.log('\nTesting voice message (simulated)...');
  try {
    const response = await axios.post(WEBHOOK_URL, {
      message: "Tell me about your voice agents", // In real app, this would be base64 audio
      sessionId: "test-session-456",
      mode: "voice",
      timestamp: new Date().toISOString()
    });
    
    console.log('✅ Voice Response:', response.data);
  } catch (error) {
    console.error('❌ Voice test failed:', error.response?.data || error.message);
  }
}

async function testSchedulingIntent() {
  console.log('\nTesting scheduling intent...');
  try {
    const response = await axios.post(WEBHOOK_URL, {
      message: "I'm interested in implementing AI for my business. How do we get started?",
      sessionId: "test-session-789",
      mode: "text",
      timestamp: new Date().toISOString()
    });
    
    console.log('✅ Scheduling Response:', response.data);
  } catch (error) {
    console.error('❌ Scheduling test failed:', error.response?.data || error.message);
  }
}

async function runTests() {
  console.log('🚀 Starting AI CEO Chatbot Tests\n');
  console.log('Webhook URL:', WEBHOOK_URL);
  console.log('----------------------------\n');
  
  await testTextMessage();
  await testVoiceMessage();
  await testSchedulingIntent();
  
  console.log('\n✨ Tests completed!');
  console.log('\nNext steps:');
  console.log('1. Import the workflow JSON into your n8n instance');
  console.log('2. Configure OpenAI credentials in n8n');
  console.log('3. Activate the workflow');
  console.log('4. Update NEXT_PUBLIC_N8N_WEBHOOK_URL in your .env.local');
}

runTests();
