import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { validateEmail, validatePhone, validateRequired } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, projectDetails, companyName, serviceRequired, projectBudget } = body;

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

    if (!validateRequired(projectDetails || '')) {
      return NextResponse.json({ success: false, message: 'Project details are required.' }, { status: 400 });
    }

    const recipient = process.env.CONTACT_RECEIVER || process.env.EMAIL_TO || process.env.MAIL_TO || 'info@amfuturetech.com';

    await sendEmail({
      to: recipient,
      replyTo: email,
      subject: `New enquiry from ${fullName}`,
      html: `
        <h2>New A&M FutureTech enquiry</h2>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${companyName || 'Not provided'}</p>
        <p><strong>Service Required:</strong> ${serviceRequired || 'Not provided'}</p>
        <p><strong>Project Budget:</strong> ${projectBudget || 'Not provided'}</p>
        <p><strong>Project Details:</strong></p>
        <p>${projectDetails}</p>
      `,
      text: [
        'New A&M FutureTech enquiry',
        `Full Name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${phone || 'Not provided'}`,
        `Company: ${companyName || 'Not provided'}`,
        `Service Required: ${serviceRequired || 'Not provided'}`,
        `Project Budget: ${projectBudget || 'Not provided'}`,
        '',
        'Project Details:',
        projectDetails,
      ].join('\n'),
    });

    console.log('Contact enquiry received', {
      fullName,
      companyName,
      email,
      phone,
      serviceRequired,
      projectBudget,
      projectDetails,
    });

    return NextResponse.json({
      success: true,
      message: 'Your enquiry has been submitted successfully. Our team will contact you shortly.',
    });
  } catch (error) {
    console.error('[api/contact] Contact route error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json({ success: false, message: 'Something went wrong while sending your enquiry.' }, { status: 500 });
  }
}
