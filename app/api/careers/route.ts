import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { validateEmail, validatePhone, validateRequired } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const fullName = String(formData.get('fullName') || '');
    const email = String(formData.get('email') || '');
    const phone = String(formData.get('phone') || '');
    const position = String(formData.get('position') || '');
    const experience = String(formData.get('experience') || '');
    const message = String(formData.get('message') || '');
    const resume = formData.get('resume');

    if (!validateRequired(fullName)) {
      return NextResponse.json({ success: false, message: 'Full name is required.' }, { status: 400 });
    }

    if (!validateRequired(email)) {
      return NextResponse.json({ success: false, message: 'Email is required.' }, { status: 400 });
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ success: false, message: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!validateRequired(phone)) {
      return NextResponse.json({ success: false, message: 'Phone number is required.' }, { status: 400 });
    }

    if (!validatePhone(phone)) {
      return NextResponse.json({ success: false, message: 'Phone number is too short.' }, { status: 400 });
    }

    if (!validateRequired(position)) {
      return NextResponse.json({ success: false, message: 'Position is required.' }, { status: 400 });
    }

    if (!validateRequired(experience)) {
      return NextResponse.json({ success: false, message: 'Experience is required.' }, { status: 400 });
    }

    const recipient = process.env.CONTACT_RECEIVER || process.env.EMAIL_TO || 'info@amfuturetech.com';
    const resumeFile = resume instanceof File ? resume : null;
    const resumeFileName = resumeFile ? resumeFile.name : null;

    const attachments = resumeFile
      ? [{
          filename: resumeFile.name,
          content: Buffer.from(await resumeFile.arrayBuffer()),
          contentType: resumeFile.type || 'application/octet-stream',
        }]
      : undefined;

    await sendEmail({
      to: recipient,
      replyTo: email,
      subject: `Career application: ${position}`,
      html: `
        <h2>New A&M FutureTech job application</h2>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Position:</strong> ${position}</p>
        <p><strong>Experience:</strong> ${experience}</p>
        <p><strong>Resume:</strong> ${resumeFileName || 'Not uploaded'}</p>
        <p><strong>Message:</strong></p>
        <p>${message || 'No additional message.'}</p>
      `,
      text: [
        'New A&M FutureTech job application',
        `Full Name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Position: ${position}`,
        `Experience: ${experience}`,
        `Resume: ${resumeFileName || 'Not uploaded'}`,
        '',
        'Message:',
        message || 'No additional message.',
      ].join('\n'),
      attachments,
    });

    console.log('Career application received', { fullName, email, phone, position, experience, message, resumeFileName });

    return NextResponse.json({
      success: true,
      message: 'Your application has been submitted successfully.',
    });
  } catch (error) {
    console.error('Career route error', error);
    return NextResponse.json({ success: false, message: 'Unable to submit your application right now.' }, { status: 500 });
  }
}
