import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Users from '@/model/user';
import { hashPassword } from '@/libs/auth';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI!);
};

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, token, newPassword } = await req.json();

    if (!email || !token || !newPassword) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ success: false, message: "Password must be at least 8 characters" }, { status: 400 });
    }

    const user = await Users.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    if (!user.resetPasswordToken || user.resetPasswordToken !== token) {
      return NextResponse.json({ success: false, message: "Unauthorized or expired reset token" }, { status: 403 });
    }

    // Update password
    const hashed = await hashPassword(newPassword);
    user.password = hashed;
    user.resetPasswordToken = ""; // Clear token
    await user.save();

    return NextResponse.json({ 
      success: true, 
      message: "Password reset successfully"
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
