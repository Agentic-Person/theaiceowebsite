# n8n Chatbot Integration Setup Instructions

## ✅ Completed Frontend Integration
The chatbot frontend is now fully integrated:
- ✅ Environment variables fixed (`N8N_API_URL` set correctly)
- ✅ Chat API route created (`/api/chat/route.ts`)
- ✅ Chat hook implemented (`/hooks/useChat.ts`)
- ✅ Chat UI components created (`ChatMessage.tsx`, `ChatInterface.tsx`, `ChatModal.tsx`)
- ✅ AnimatedChatButton updated to open chat modal

## 🔧 Required n8n Setup

### Step 1: Import the Workflow
1. Open your n8n instance: https://agenticpersonnel.app.n8n.cloud/
2. Navigate to your specified folder: `qf58MsBNm6CypOe9`
3. Click "Import" and upload the file: `n8n-chatbot-workflow.json`
4. The workflow will be imported with these nodes:
   - **Chat Webhook** (receives messages from frontend)
   - **Process Message** (validates and cleans input)
   - **OpenAI Chat** (sends to OpenAI API)
   - **Format Response** (processes AI response)
   - **Send Response** (returns formatted response)

### Step 2: Configure OpenAI API Key
1. In the **OpenAI Chat** node, locate the Authorization header
2. Replace `YOUR_OPENAI_API_KEY_HERE` with your actual OpenAI API key
3. Format: `Bearer sk-your-actual-api-key-here`

### Step 3: Verify Webhook URL
The webhook will be available at:
```
https://agenticpersonnel.app.n8n.cloud/webhook/ai-chat
```

This URL is already configured in your `.env` file as:
```
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://agenticpersonnel.app.n8n.cloud/webhook/ai-chat
```

### Step 4: Activate the Workflow
1. Click the workflow toggle to activate it
2. The webhook will become live and ready to receive requests

## 🧪 Testing the Integration

### Test 1: Direct Webhook Test (using curl)
```bash
curl -X POST https://agenticpersonnel.app.n8n.cloud/webhook/ai-chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello, can you tell me about The AI CEO services?",
    "sessionId": "test-session-123",
    "timestamp": "2025-01-28T12:00:00Z"
  }'
```

Expected response:
```json
{
  "success": true,
  "response": "AI-generated response about The AI CEO services",
  "sessionId": "test-session-123",
  "timestamp": "2025-01-28T12:00:00Z",
  "metadata": {
    "model": "gpt-3.5-turbo",
    "tokensUsed": 150
  }
}
```

### Test 2: Frontend Integration Test
1. Visit your website: http://localhost:3002
2. Click the "Chat with Our AI" button
3. Type a message and press Enter
4. You should see:
   - Loading indicator while processing
   - AI response from Emily (your AI consultant)
   - Conversation history maintained

## 🔍 Troubleshooting

### Frontend Issues
- **Chat button doesn't open modal**: Check browser console for React errors
- **Messages not sending**: Check Network tab for API call failures
- **No response**: Verify n8n webhook URL in environment variables

### n8n Workflow Issues
- **Webhook not found (404)**: Ensure workflow is activated
- **OpenAI errors**: Verify API key is correctly set in the HTTP Request node
- **Invalid response**: Check Code nodes for JavaScript errors

### Environment Variables Check
Verify these are set in your `.env` file:
```env
N8N_API_URL=https://agenticpersonnel.app.n8n.cloud
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://agenticpersonnel.app.n8n.cloud/webhook/ai-chat
N8N_WEBHOOK_SECRET=your-webhook-secret-key
NEXT_PUBLIC_CHAT_API_ENDPOINT=/api/chat
```

## 🎯 Expected User Experience
1. User clicks "Chat with Our AI" button
2. Chat modal opens with welcome message from Emily
3. User types questions about AI services
4. AI responds with helpful information about The AI CEO
5. Conversation flows naturally with context maintained
6. Chat history persists during session

## 🔐 Security Notes
- OpenAI API key is stored securely in n8n (not in frontend)
- Webhook secret can be configured for additional security
- All communication encrypted via HTTPS
- No sensitive data exposed to client-side

## 📈 Next Steps
Once the basic integration is working:
1. Customize AI personality and knowledge base
2. Add more sophisticated context handling
3. Implement conversation analytics
4. Add voice mode functionality (already supported in UI)
5. Set up conversation logging for insights