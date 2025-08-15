#!/usr/bin/env node

/**
 * Test script for AI CEO Chatbot Webhook
 * Usage: node test-webhook.js [webhook-url]
 */

const axios = require('axios');

// Configuration
const WEBHOOK_URL = process.argv[2] || process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/ai-chat';

// Test cases
const testCases = [
  {
    name: 'Basic Text Chat',
    payload: {
      message: 'What AI solutions does The AI CEO offer?',
      sessionId: 'test-session-001',
      mode: 'text',
      timestamp: new Date().toISOString()
    }
  },
  {
    name: 'Lead Capture Request',
    payload: {
      message: 'I would like to download your AI strategy guide',
      sessionId: 'test-session-002',
      email: 'test@example.com',
      mode: 'text',
      timestamp: new Date().toISOString()
    }
  },
  {
    name: 'Voice Mode Request',
    payload: {
      message: 'Tell me about your voice AI capabilities',
      sessionId: 'test-session-003',
      mode: 'voice',
      timestamp: new Date().toISOString()
    }
  },
  {
    name: 'Returning User',
    payload: {
      message: 'What did we discuss earlier?',
      sessionId: 'test-session-001',
      mode: 'text',
      timestamp: new Date().toISOString()
    }
  },
  {
    name: 'Complex Business Query',
    payload: {
      message: 'We are a 50-person manufacturing company looking to automate our quality control with AI. What would you recommend?',
      sessionId: 'test-session-004',
      mode: 'text',
      company: 'Test Manufacturing Inc',
      timestamp: new Date().toISOString()
    }
  }
];

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Test runner
async function runTest(testCase) {
  console.log(`\n${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.bright}📝 Test: ${testCase.name}${colors.reset}`);
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  
  console.log(`\n${colors.yellow}Request:${colors.reset}`);
  console.log(JSON.stringify(testCase.payload, null, 2));
  
  const startTime = Date.now();
  
  try {
    const response = await axios.post(WEBHOOK_URL, testCase.payload, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });
    
    const responseTime = Date.now() - startTime;
    
    console.log(`\n${colors.green}✅ Success (${responseTime}ms)${colors.reset}`);
    console.log(`\n${colors.yellow}Response:${colors.reset}`);
    console.log(JSON.stringify(response.data, null, 2));
    
    // Validate response structure
    validateResponse(response.data);
    
    return { success: true, responseTime };
    
  } catch (error) {
    const responseTime = Date.now() - startTime;
    
    console.log(`\n${colors.red}❌ Failed (${responseTime}ms)${colors.reset}`);
    
    if (error.response) {
      console.log(`Status: ${error.response.status}`);
      console.log(`Error: ${JSON.stringify(error.response.data, null, 2)}`);
    } else if (error.request) {
      console.log('No response received. Is the webhook running?');
      console.log(`URL: ${WEBHOOK_URL}`);
    } else {
      console.log(`Error: ${error.message}`);
    }
    
    return { success: false, responseTime, error: error.message };
  }
}

// Response validation
function validateResponse(response) {
  const requiredFields = ['response', 'sessionId', 'timestamp', 'success'];
  const missingFields = requiredFields.filter(field => !(field in response));
  
  if (missingFields.length > 0) {
    console.log(`\n${colors.yellow}⚠️  Warning: Missing fields in response: ${missingFields.join(', ')}${colors.reset}`);
  }
  
  if (response.mode === 'voice' && !response.audio_url) {
    console.log(`\n${colors.yellow}⚠️  Warning: Voice mode but no audio_url in response${colors.reset}`);
  }
  
  console.log(`\n${colors.blue}📊 Response Analysis:${colors.reset}`);
  console.log(`• Response length: ${response.response?.length || 0} characters`);
  console.log(`• Mode: ${response.mode || 'text'}`);
  console.log(`• Has user context: ${!!response.user}`);
  console.log(`• Has analytics: ${!!response.analytics}`);
}

// Main execution
async function main() {
  console.log(`${colors.bright}${colors.blue}`);
  console.log('╔══════════════════════════════════════════════════════════════════════════╗');
  console.log('║                    AI CEO CHATBOT WEBHOOK TEST SUITE                     ║');
  console.log('╚══════════════════════════════════════════════════════════════════════════╝');
  console.log(`${colors.reset}`);
  
  console.log(`\n🔗 Webhook URL: ${colors.cyan}${WEBHOOK_URL}${colors.reset}`);
  console.log(`📅 Test Time: ${new Date().toLocaleString()}`);
  
  const results = [];
  
  // Run all tests
  for (const testCase of testCases) {
    const result = await runTest(testCase);
    results.push({ name: testCase.name, ...result });
    
    // Wait between tests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Summary
  console.log(`\n${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.bright}📊 TEST SUMMARY${colors.reset}`);
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  const avgResponseTime = results.reduce((acc, r) => acc + r.responseTime, 0) / results.length;
  
  results.forEach(result => {
    const icon = result.success ? `${colors.green}✅` : `${colors.red}❌`;
    const time = result.success ? `${colors.green}${result.responseTime}ms` : `${colors.red}${result.responseTime}ms`;
    console.log(`${icon} ${result.name}: ${time}${colors.reset}`);
  });
  
  console.log(`\n${colors.bright}Results:${colors.reset}`);
  console.log(`• Passed: ${colors.green}${successful}/${testCases.length}${colors.reset}`);
  console.log(`• Failed: ${failed > 0 ? colors.red : colors.green}${failed}/${testCases.length}${colors.reset}`);
  console.log(`• Avg Response Time: ${avgResponseTime < 2000 ? colors.green : colors.yellow}${Math.round(avgResponseTime)}ms${colors.reset}`);
  
  if (successful === testCases.length) {
    console.log(`\n${colors.green}${colors.bright}🎉 All tests passed! Your webhook is working correctly.${colors.reset}`);
  } else {
    console.log(`\n${colors.yellow}${colors.bright}⚠️  Some tests failed. Check the webhook configuration.${colors.reset}`);
  }
  
  console.log(`\n${colors.blue}💡 Tips:${colors.reset}`);
  console.log('• Ensure the n8n workflow is active');
  console.log('• Check all required credentials are configured');
  console.log('• Verify Supabase tables are created');
  console.log('• Monitor n8n execution logs for detailed errors');
}

// Run tests
main().catch(error => {
  console.error(`${colors.red}Fatal error: ${error.message}${colors.reset}`);
  process.exit(1);
});