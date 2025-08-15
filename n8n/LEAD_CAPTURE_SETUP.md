# Lead Capture & Email Automation Setup Guide

## Overview
This system captures leads from your website's ebook download form, stores them in Supabase, and automatically sends an email with the PDF download link.

## Quick Setup Steps

### 1. Supabase Database Setup

First, create the leads table in your Supabase project:

```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  business_type TEXT,
  source TEXT,
  ebook_requested TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  email_sent BOOLEAN DEFAULT FALSE,
  email_opened BOOLEAN DEFAULT FALSE,
  pdf_downloaded BOOLEAN DEFAULT FALSE
);

-- Create index for performance
CREATE INDEX idx_leads_email ON leads(email);

-- Enable RLS (Row Level Security)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policy for n8n to insert/update
CREATE POLICY "Enable insert for API" ON leads FOR INSERT USING (true);
CREATE POLICY "Enable update for API" ON leads FOR UPDATE USING (true);
```

### 2. Upload Your PDF

**Option A: Supabase Storage**
1. Go to Supabase Dashboard → Storage
2. Create bucket: `ebooks`
3. Upload your PDF: `ai-edge-ebook.pdf`
4. Get public URL or create signed URL

**Option B: Your Website**
1. Create folder: `public/downloads/`
2. Add your PDF: `ai-edge-ebook.pdf`
3. URL will be: `https://yourdomain.com/downloads/ai-edge-ebook.pdf`

**Option C: Cloud Storage**
- Use S3, Google Drive, Dropbox
- Make sure link is publicly accessible
- Consider using expiring links for security

### 3. Import n8n Workflow

1. Open n8n: https://agenticpersonnel.app.n8n.cloud/
2. Click "Workflows" → "Import"
3. Upload: `n8n/workflows/lead-capture-email-automation.json`

### 4. Configure n8n Credentials

**Supabase Credentials:**
- Name: `Supabase Account`
- URL: Your Supabase project URL
- Service Role Key: From Supabase settings

**SMTP Credentials (Choose one):**

**Gmail:**
- Host: `smtp.gmail.com`
- Port: `587`
- User: Your Gmail address
- Password: App-specific password (not regular password)
- Enable: SSL/TLS

**SendGrid:**
- Host: `smtp.sendgrid.net`
- Port: `587`
- User: `apikey`
- Password: Your SendGrid API key

### 5. Update Workflow Settings

In the n8n workflow:
1. Edit "Prepare Email Data" node
2. Update `downloadLink` to your actual PDF URL
3. Update `fromEmail` in "Send Email" node
4. Customize email template if desired

### 6. Activate Workflow

1. Save the workflow
2. Toggle the "Active" switch
3. Copy webhook URL: `https://your-n8n.com/webhook/lead-capture`

### 7. Update Website Environment

Add to `.env.local`:
```env
N8N_LEAD_WEBHOOK_URL=https://agenticpersonnel.app.n8n.cloud/webhook/lead-capture
```

### 8. Test the System

```bash
# Test the complete flow
node n8n/test-lead-capture.js

# Or test manually with curl
curl -X POST https://your-n8n.com/webhook/lead-capture \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "your-email@example.com",
    "businessType": "getting-started"
  }'
```

## How It Works

### User Flow:
1. User clicks "Download AI EDGE eBook" button
2. Modal appears with lead capture form
3. User enters name, email, and optional business challenge
4. Form submits to `/api/lead-capture`
5. API forwards to n8n webhook
6. n8n stores lead in Supabase
7. n8n sends email with PDF link
8. User receives email instantly

### Data Flow:
```
Website Form → API Route → n8n Webhook → Supabase → Email Service → User Inbox
```

## Customization Options

### Email Template
Edit the HTML in the "Send Email" node to match your branding:
- Logo
- Colors
- Content
- Footer links

### Form Fields
Add more fields in `LeadCaptureModal.tsx`:
- Company name
- Phone number
- Industry
- Company size

### Multiple eBooks
Support different PDFs by:
1. Pass ebook ID in form data
2. Map ID to PDF URL in n8n
3. Customize email content per ebook

## Analytics & Tracking

### Basic Metrics (in Supabase):
```sql
-- Total leads
SELECT COUNT(*) FROM leads;

-- Conversion rate
SELECT 
  COUNT(*) as total_leads,
  SUM(CASE WHEN email_sent THEN 1 ELSE 0 END) as emails_sent,
  AVG(CASE WHEN email_sent THEN 1 ELSE 0 END) * 100 as success_rate
FROM leads;

-- Leads by source
SELECT business_type, COUNT(*) 
FROM leads 
GROUP BY business_type;
```

### Advanced Tracking:
- Add UTM parameters
- Track PDF downloads
- Email open rates
- Link click tracking
- Conversion to customers

## Troubleshooting

**Form not submitting:**
- Check browser console for errors
- Verify API endpoint is correct
- Check CORS settings

**Email not sending:**
- Verify SMTP credentials
- Check spam folder
- Review n8n execution logs
- Test SMTP connection

**Lead not in database:**
- Check Supabase credentials
- Verify table exists
- Check RLS policies
- Review n8n logs

## Security Best Practices

1. **Validate emails** - Use proper email validation
2. **Rate limiting** - Prevent spam submissions
3. **Honeypot fields** - Add hidden fields to catch bots
4. **CAPTCHA** - Consider adding for high traffic
5. **Secure PDFs** - Use signed URLs that expire
6. **GDPR compliance** - Add privacy policy acceptance

## Next Steps

1. **Email Sequences**: Set up follow-up email campaigns
2. **Lead Scoring**: Rate leads based on engagement
3. **CRM Integration**: Sync with HubSpot, Salesforce
4. **A/B Testing**: Test different form layouts
5. **Personalization**: Dynamic content based on business type

---

Need help? Check the n8n execution history for detailed logs of each workflow run.
