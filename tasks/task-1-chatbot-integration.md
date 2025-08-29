  Task 1: Chatbot Integration

## Objective
*0/-*

## Prerequisites
- Phase 2 completion (Dark Theme & Content Integration) ✅
- Existing ChatGPT-style interface in HeroSection component
- n8n instance accessible for webhook creation
- API endpoint planning and documentation

## Technical Requirements

### Dependencies to Install
```bash
npm install axios
npm install @types/node (if not already present)
npm install uuid @types/uuid
```

### Environment Variables Needed
```env
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://agenticpersonnel.app.n8n.cloud/
N8N_WEBHOOK_SECRET=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZDY5Nzg4ZC03YTAzLTQxNjEtYmJiMS03Njk3ODA3YTE4YjMiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzU2NDEyNzU3LCJleHAiOjE3NjQxMzY4MDB9.gbuqgx16uklNLS_BkLhEzcw2m1r1jWKGn4VUT30RS1Y
NEXT_PUBLIC_CHAT_API_ENDPOINT=/api/chat
```


eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZDY5Nzg4ZC03YTAzLTQxNjEtYmJiMS03Njk3ODA3YTE4YjMiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzU2NDEyNzU3LCJleHAiOjE3NjQxMzY4MDB9.gbuqgx16uklNLS_BkLhEzcw2m1r1jWKGn4VUT30RS1Y

## Implementation Steps

### Step 1: Create API Route Handler
**File**: `src/app/api/chat/route.ts`

### Step 2: Create Chat Hook
**File**: `src/hooks/useChat.ts`

### Step 3: Update HeroSection Component
**File**: `src/components/sections/HeroSection.tsx`

### Step 4: Create Message Components
**File**: `src/components/ui/ChatMessage.tsx`

### Step 5: Add Loading and Error States
**File**: `src/components/ui/ChatInterface.tsx`

## File Structure Changes

### New Files to Create:
```
src/
├── app/api/chat/route.ts           # API endpoint for chat
├── hooks/useChat.ts                # Chat functionality hook
├── components/ui/ChatMessage.tsx   # Individual message component
├── components/ui/ChatInterface.tsx # Complete chat interface
└── types/chat.ts                   # Chat-related TypeScript types
```

### Files to Modify:
```
src/components/sections/HeroSection.tsx  # Add real chat functionality
.env.local                               # Add environment variables
```

## n8n Webhook Configuration

### Required n8n Workflow Nodes:
1. **Webhook Node** - Method: POST, Path: `/webhook/chat`
2. **Function Node** - Message Processing
3. **HTTP Request Node** - Optional AI Service Integration  
4. **Response Node** - Return formatted JSON response

## Success Metrics
- ✅ Chat interface accepts user input
- ✅ Messages send to n8n webhook successfully
- ✅ AI responses display in chat interface
- ✅ Loading states provide visual feedback
- ✅ Error handling prevents interface breaking
- ✅ Session management maintains conversation context

## Handoff Notes
This task requires coordination with n8n setup and may involve multiple iterations to get the webhook configuration correct. Test thoroughly with curl/Postman before integrating with frontend.