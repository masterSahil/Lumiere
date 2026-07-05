import { NextResponse } from 'next/server';
import connectDB from '@/libs/config';
import Users from '@/model/user';
import { hashPassword, comparePassword } from '@/libs/auth';

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ success: false, message: "Please provide both current and new passwords" }, { status: 400 });
    }

    // Retrieve user including the password field
    const user = await Users.findById(id);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const isMatch = await comparePassword(currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: "Incorrect current password" }, { status: 401 });
    }

    const hashedNewPassword = await hashPassword(newPassword);
    user.password = hashedNewPassword;
    await user.save();

    return NextResponse.json({ success: true, message: "Password updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Password Update Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
