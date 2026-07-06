import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Users from '@/model/user';
import crypto from 'crypto';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI!);
};

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ success: false, message: "Email and OTP are required" }, { status: 400 });
    }

    const user = await Users.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    if (user.resetPasswordOtp !== otp) {
      return NextResponse.json({ success: false, message: "Invalid OTP" }, { status: 400 });
    }

    if (user.resetPasswordOtpExpiry < new Date()) {
      return NextResponse.json({ success: false, message: "OTP has expired" }, { status: 400 });
    }

    // OTP is valid. Generate a reset token to authorize the actual password change
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordOtp = ""; // Clear OTP so it can't be reused
    user.resetPasswordOtpExpiry = null;
    await user.save();

    return NextResponse.json({ 
      success: true, 
      message: "Identity verified",
      token: resetToken
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
