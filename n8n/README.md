# The AI CEO - n8n Workflow Documentation

## 🚀 Enterprise Chatbot & Voice System

### Overview
This folder contains production-ready n8n workflows for The AI CEO's intelligent chatbot system with voice capabilities, CRM integration, and lead capture.

## 📁 Workflow Files

### 1. `ai-ceo-enterprise-chatbot.json` (RECOMMENDED)
**The complete enterprise solution** with:
- ✅ **Multi-modal Support**: Text and voice interactions
- ✅ **Supabase CRM**: Full user tracking and conversation history
- ✅ **Voice AI Integration**: ElevenLabs TTS & Wispr STT
- ✅ **Lead Capture**: Email collection with PDF delivery
- ✅ **Analytics Tracking**: Complete interaction metrics
- ✅ **Smart Routing**: Intent-based conversation flow
- ✅ **Error Handling**: Graceful fallbacks and logging

### 2. `n8n-chatbot-workflow-advanced.json`
Advanced workflow with AI Agent and memory management (simpler setup)

### 3. `n8n-chatbot-workflow.json`
Basic workflow for quick testing

## 🛠️ Setup Instructions

### Step 1: Database Setup (Supabase)
```sql
-- Create these tables in your Supabase instance

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  name TEXT,
  company TEXT,
  phone TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  last_seen TIMESTAMP DEFAULT NOW()
);

-- Conversations table
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  session_id TEXT NOT NULL,
  message TEXT NOT NULL,
  response TEXT,
  mode TEXT DEFAULT 'text',
  intent TEXT,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- Leads table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  company TEXT,
  pdf_downloaded BOOLEAN DEFAULT false,
  subscribed BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_conversations_session ON conversations(session_id);
CREATE INDEX idx_conversations_user ON conversations(user_id);
CREATE INDEX idx_users_email ON users(email);
```

### Step 2: Required Credentials
Configure these in n8n:

1. **Supabase** (`supabaseApi`)
   - URL: Your Supabase project URL
   - Service Key: Your Supabase service key

2. **OpenAI** (`openAiApi`)
   - API Key: Your OpenAI API key

3. **Gmail** (`gmailOAuth2`)
   - OAuth2 setup for sending emails

4. **ElevenLabs** (in HTTP Request headers)
   - API Key: Your ElevenLabs API key

5. **Wispr Flow** (optional, for STT)
   - API Key: Your Wispr API key

### Step 3: Import Workflow
1. Open n8n dashboard
2. Click **"Workflows"** → **"Import"**
3. Select `ai-ceo-enterprise-chatbot.json`
4. Configure all credentials
5. Update webhook URL in your `.env` file

### Step 4: Environment Variables
Update your `.env` file:
```env
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/ai-chat
N8N_WEBHOOK_SECRET=your-secret-key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

## 🎯 Features Breakdown

### Voice Processing Path
1. Audio received from frontend
2. Wispr/OpenAI Whisper converts speech-to-text
3. Text processed through GPT-4
4. Response converted to speech via ElevenLabs
5. Audio URL returned to frontend

### Lead Capture Flow
1. User mentions "download", "PDF", or "guide"
2. Email captured and stored in Supabase
3. Welcome email sent with PDF attachment
4. User added to CRM for follow-up

### Conversation Memory
- Last 10 messages retrieved from Supabase
- Context provided to GPT-4 for continuity
- Full history stored for analytics

### Analytics Tracking
- Response times
- Conversation lengths
- User intents
- Mode preferences (voice vs text)
- Lead conversion metrics

## 📊 Monitoring & Optimization

### Key Metrics to Track
- Average response time (target: <2s)
- Voice transcription accuracy
- Lead conversion rate
- User retention (returning users)
- Error rate (target: <1%)

### Performance Tips
1. Enable caching on Supabase queries
2. Use connection pooling for database
3. Implement rate limiting on webhook
4. Monitor OpenAI token usage
5. Set up error notifications

## 🔧 Customization Options

### Adding New Intents
Edit the **Intent Router** node to add patterns:
```javascript
// Example: Technical support intent
{
  "conditions": [{
    "leftValue": "={{ $json.message }}",
    "rightValue": "technical|support|help|issue",
    "operator": {
      "type": "string",
      "operation": "regex"
    }
  }],
  "outputKey": "support"
}
```

### Changing AI Personality
Modify the system prompt in **OpenAI GPT-4** node

### Adding Voice Providers
- **Google Cloud TTS**: Add Google Cloud Speech node
- **Amazon Polly**: Use AWS node with Polly service
- **Azure Speech**: Add HTTP Request to Azure API

## 🚨 Troubleshooting

### Common Issues

1. **"Webhook not found" error**
   - Ensure workflow is active
   - Check webhook path matches `.env`

2. **"Supabase connection failed"**
   - Verify credentials
   - Check table names match schema

3. **"Voice not working"**
   - Confirm ElevenLabs API key
   - Check audio format compatibility

4. **"Emails not sending"**
   - Complete Gmail OAuth2 setup
   - Verify sender email permissions

## 📈 Scaling Considerations

For high traffic (>1000 requests/hour):
1. Deploy n8n on dedicated server
2. Use Redis for session caching
3. Implement queue system for voice processing
4. Consider multiple OpenAI API keys
5. Use CDN for audio file delivery

## 🔐 Security Best Practices

1. **API Keys**: Store in n8n credentials, never in workflow
2. **Webhook Secret**: Implement signature verification
3. **Rate Limiting**: Add rate limit node after webhook
4. **Input Validation**: Sanitize all user inputs
5. **CORS**: Configure allowed origins properly

## 📞 Support

For setup assistance or custom modifications:
- Email: support@theaiceo.com
- Documentation: https://docs.theaiceo.com
- n8n Community: https://community.n8n.io

---

Built with ❤️ by The AI CEO Development Team