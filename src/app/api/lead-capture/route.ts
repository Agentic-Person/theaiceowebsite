import { NextRequest, NextResponse } from 'next/server';

const N8N_LEAD_WEBHOOK_URL = process.env.N8N_LEAD_WEBHOOK_URL || 'https://agenticpersonnel.app.n8n.cloud/webhook/lead-capture';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.email || !body.name) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Prepare webhook payload
    const webhookPayload = {
      name: body.name,
      email: body.email,
      businessType: body.businessType || 'Not specified',
      source: body.source || 'ebook-download',
      ebookRequested: body.ebookRequested || 'AI EDGE eBook',
      timestamp: new Date().toISOString(),
      metadata: {
        userAgent: request.headers.get('user-agent') || undefined,
        referrer: request.headers.get('referer') || undefined,
      }
    };

    // Send to n8n webhook
    const webhookResponse = await fetch(N8N_LEAD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    });

    if (!webhookResponse.ok) {
      console.error('n8n webhook failed:', webhookResponse.status);
      throw new Error('Failed to process lead');
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
    });

  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
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
