import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// In-memory store for rate limiting (for demonstration/simple usage)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000 * 15; // 15 minutes
const MAX_REQUESTS = 5;

// Basic HTML sanitizer to prevent XSS / malicious scripts
function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
}

export async function POST(request: Request) {
  try {
    // 1. Rate Limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (ip !== 'unknown') {
      const now = Date.now();
      const limitRecord = rateLimitMap.get(ip);
      
      if (limitRecord) {
        if (now - limitRecord.timestamp < RATE_LIMIT_WINDOW) {
          if (limitRecord.count >= MAX_REQUESTS) {
            return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
          }
          limitRecord.count += 1;
        } else {
          rateLimitMap.set(ip, { count: 1, timestamp: now });
        }
      } else {
        rateLimitMap.set(ip, { count: 1, timestamp: now });
      }
    }

    const data = await request.json();
    const { firstName, lastName, email, phone, service, message, recaptchaToken, website } = data;

    // 2. Honeypot Check
    if (website) {
      // If the honeypot field is filled, silently reject or return generic error
      console.warn(`Bot detected (honeypot filled) from IP: ${ip}`);
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 });
    }

    if (!firstName || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!recaptchaToken) {
      return NextResponse.json({ error: 'reCAPTCHA token missing' }, { status: 400 });
    }

    // 3. Sanitization
    const sFirstName = sanitizeInput(firstName);
    const sLastName = sanitizeInput(lastName);
    const sEmail = sanitizeInput(email);
    const sPhone = sanitizeInput(phone);
    const sService = sanitizeInput(service);
    const sMessage = sanitizeInput(message);

    // Verify reCAPTCHA token
    const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    });
    
    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      console.error('reCAPTCHA verification failed:', verifyData);
      return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 400 });
    }

    // Configure the transporter with environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'contact@nxgens.com',
      replyTo: sEmail,
      subject: `New Contact Form Submission from ${sFirstName} ${sLastName || ''}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sFirstName} ${sLastName || ''}</p>
        <p><strong>Email:</strong> ${sEmail}</p>
        <p><strong>Phone:</strong> ${sPhone || 'N/A'}</p>
        <p><strong>Service Requested:</strong> ${sService || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${sMessage ? sMessage.replace(/\n/g, '<br>') : 'N/A'}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
