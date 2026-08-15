import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { validateEmail, validatePhone, validateRequired } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, serviceRequired, projectDetails } = body;

    if (!validateRequired(fullName || '')) {
      return NextResponse.json({ success: false, message: 'Full name is required.' }, { status: 400 });
    }

    if (!validateRequired(email || '')) {
      return NextResponse.json({ success: false, message: 'Email is required.' }, { status: 400 });
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ success: false, message: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (phone && !validatePhone(phone)) {
      return NextResponse.json({ success: false, message: 'Phone number is too short.' }, { status: 400 });
    }

    if (!validateRequired(serviceRequired || '')) {
      return NextResponse.json({ success: false, message: 'Service is required.' }, { status: 400 });
    }

    if (!validateRequired(projectDetails || '')) {
      return NextResponse.json({ success: false, message: 'Project details are required.' }, { status: 400 });
    }

    const recipient = process.env.CONTACT_RECEIVER || process.env.EMAIL_TO || 'info@amfuturetech.com';

    await sendEmail({
      to: recipient,
      replyTo: email,
      subject: `Quote request from ${fullName}`,
      html: `
        <h2>New A&M FutureTech quote request</h2>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Service Required:</strong> ${serviceRequired}</p>
        <p><strong>Project Details:</strong></p>
        <p>${projectDetails}</p>
      `,
      text: [
        'New A&M FutureTech quote request',
        `Full Name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${phone || 'Not provided'}`,
        `Service Required: ${serviceRequired}`,
        '',
        'Project Details:',
        projectDetails,
      ].join('\n'),
    });

    console.log('Quote request received', { fullName, email, phone, serviceRequired, projectDetails });

    return NextResponse.json({
      success: true,
      message: 'Your quote request has been submitted successfully.',
    });
  } catch (error) {
    console.error('Quote route error', error);
    return NextResponse.json({ success: false, message: 'Unable to submit quote request right now.' }, { status: 500 });
  }
}
