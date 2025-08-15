# AI CEO Chatbot Setup Guide

## Quick Start

### 1. Import the Workflow
1. Open your n8n instance: https://agenticpersonnel.app.n8n.cloud/
2. Click "Workflows" → "Import"
3. Upload: `n8n/workflows/ai-ceo-simple-chatbot.json`

### 2. Configure Credentials
In n8n, add these credentials:
- **OpenAI**: Your OpenAI API key for GPT-4
- **ElevenLabs** (optional): For voice responses

### 3. Customize the System Prompt
Edit the "OpenAI Chat" node to update your business information:
- Company details
- Services offered
- Key benefits
- Discovery call link

### 4. Activate the Workflow
1. Save the workflow
2. Toggle the "Active" switch
3. Copy the webhook URL (should be: `https://agenticpersonnel.app.n8n.cloud/webhook/ai-ceo-chat`)

### 5. Update Your Website
Add to `.env.local`:
```env
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://agenticpersonnel.app.n8n.cloud/webhook/ai-ceo-chat
```

### 6. Test the Integration
```bash
# Test the webhook
node n8n/test-chatbot-webhook.js

# Start your website
npm run dev
```

## How It Works

### Text Chat Flow:
1. User types message → Website sends to n8n webhook
2. n8n passes to OpenAI with your business context
3. OpenAI responds intelligently about your services
4. Response sent back to website chat

### Voice Chat Flow:
1. User clicks voice → Records audio
2. Audio sent to n8n → Converted to text (Whisper)
3. Same AI processing as text
4. Response converted to speech → Played back

### Smart Features:
- Remembers conversation context
- Offers discovery calls when appropriate
- Handles both sales and support questions
- Professional, conversational tone

## Customization Options

### Update Business Info:
Edit the system prompt in the OpenAI node to include:
- Your specific services
- Pricing information
- Case studies
- FAQs

### Add More Intelligence:
- Connect to your CRM
- Add email capture
- Track conversations
- Integrate with calendar

## Troubleshooting

**Webhook not responding:**
- Check workflow is active
- Verify webhook URL matches
- Test with curl/test script

**No AI responses:**
- Verify OpenAI credentials
- Check API limits
- Review n8n execution logs

**Voice not working:**
- Check browser microphone permissions
- Verify audio format support
- Test with text mode first

## Support

Need help? The workflow is designed to be simple and reliable. If you need assistance:
1. Check n8n execution history
2. Review browser console logs
3. Test each component separately

Remember: Start with text chat, get it working perfectly, then add voice!
