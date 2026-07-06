import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Users from '@/model/user';
import nodemailer from 'nodemailer';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI!);
};

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    // Check if user exists
    const user = await Users.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "No account found with this email. This email cannot receive an OTP." }, 
        { status: 404 }
      );
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set expiry to 15 minutes from now
    const expiry = new Date(Date.now() + 15 * 60 * 1000);

    // Save to database
    user.resetPasswordOtp = otp;
    user.resetPasswordOtpExpiry = expiry;
    await user.save();

    // Set up nodemailer transport
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: process.env.SMTP_FROM || '"Lumière" <noreply@lumiere.com>',
        to: user.email,
        subject: 'Lumière - Password Reset Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #101415; color: #ffffff; padding: 40px; border-radius: 8px;">
            <h1 style="color: #9EE939; text-transform: uppercase; letter-spacing: 2px; text-align: center;">Lumière</h1>
            <h2 style="text-align: center; font-weight: normal;">Password Reset Request</h2>
            <p>You recently requested to reset your password for your Lumière account. Use the code below to proceed.</p>
            <div style="background-color: #0c120e; border: 1px solid #9EE939; padding: 20px; text-align: center; margin: 30px 0; border-radius: 8px;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #9EE939;">${otp}</span>
            </div>
            <p style="font-size: 12px; color: #a0a0a0; text-align: center;">This code will expire in 15 minutes. If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log(`[DEVELOPMENT] Email successfully sent to ${email} via SMTP.`);
    } else {
      console.warn(`[WARNING] No SMTP configuration found in .env. Falling back to console logging.`);
      console.log(`[DEVELOPMENT] OTP for ${email} is ${otp}`);
    }

    return NextResponse.json({  
      success: true, 
      message: "OTP generated successfully"
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
