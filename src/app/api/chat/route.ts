import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { ChatRequest, ChatResponse, WebhookPayload, WebhookResponse } from '@/types/chat';

const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
const WEBHOOK_SECRET = process.env.N8N_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    
    if (!body.message || !body.sessionId) {
      return NextResponse.json(
        { error: 'Message and sessionId are required' },
        { status: 400 }
      );
    }

    if (!N8N_WEBHOOK_URL) {
      console.error('N8N_WEBHOOK_URL is not configured');
      return NextResponse.json(
        { error: 'Chat service is not configured' },
        { status: 500 }
      );
    }

    const webhookPayload: WebhookPayload = {
      message: body.message,
      sessionId: body.sessionId,
      timestamp: new Date().toISOString(),
      mode: body.mode || 'text',
      metadata: {
        userAgent: request.headers.get('user-agent') || undefined,
        referrer: request.headers.get('referer') || undefined,
      }
    };

    const webhookHeaders: any = {
      'Content-Type': 'application/json',
    };

    if (WEBHOOK_SECRET) {
      webhookHeaders['X-Webhook-Secret'] = WEBHOOK_SECRET;
    }

    const webhookResponse = await axios.post<WebhookResponse>(
      N8N_WEBHOOK_URL,
      webhookPayload,
      {
        headers: webhookHeaders,
        timeout: 30000,
      }
    );

    if (!webhookResponse.data || !webhookResponse.data.response) {
      throw new Error('Invalid response from n8n webhook');
    }

    const response: ChatResponse = {
      message: webhookResponse.data.message || webhookResponse.data.response,
      sessionId: body.sessionId,
      timestamp: new Date(),
      audioData: webhookResponse.data.audioData, // Base64 audio for voice mode
      mode: webhookResponse.data.mode || body.mode
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Chat API error:', error);
    
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        return NextResponse.json(
          { error: 'Request timeout - please try again' },
          { status: 408 }
        );
      }
      if (error.response?.status === 404) {
        return NextResponse.json(
          { error: 'Chat service not found - please check configuration' },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { 
        error: 'Failed to process chat message',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}