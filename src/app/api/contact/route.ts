import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App Password
      },
    });

    // 1. Email to the portfolio owner
    const mailToOwner = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER || 'nandanvadi@gmail.com',
      subject: `New Transmission from ${name}`,
      text: `You have received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
      html: `
        <h3>New Transmission Received</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // 2. Auto-reply confirmation to the sender
    const mailToSender = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Transmission Received - Nandan Vadi',
      text: `Hello ${name},\n\nThank you for reaching out. Your transmission has been successfully received.\nI will review your message and get back to you as soon as possible.\n\nBest regards,\nNandan Vadi\nnandanvadi@gmail.com`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2>Transmission Received</h2>
          <p>Hello ${name},</p>
          <p>Thank you for reaching out. Your transmission has been successfully received.</p>
          <p>I will review your message and get back to you as soon as possible.</p>
          <br>
          <p>Best regards,</p>
          <p><strong>Nandan Vadi</strong><br><a href="mailto:nandanvadi@gmail.com">nandanvadi@gmail.com</a></p>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(mailToOwner);
    await transporter.sendMail(mailToSender);

    return NextResponse.json(
      { message: 'Emails sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
