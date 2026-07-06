import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Users from '@/model/user';

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

    // In a real application, you would send an email here using nodemailer/SendGrid
    // await sendEmail(user.email, 'Your OTP is: ' + otp);
    
    // For development/demo purposes, we are returning the OTP in the response
    // so the user knows what to type in without actually sending an email.
    console.log(`[DEVELOPMENT] OTP for ${email} is ${otp}`);

    return NextResponse.json({ 
      success: true, 
      message: "OTP generated successfully"
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
