import { NextResponse } from 'next/server';
import connectDB from '@/libs/config';
import Users from '@/model/user';

export async function POST(request, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    const { brand, last4, expiry, isDefault } = await request.json();

    if (!brand || !last4 || !expiry) {
      return NextResponse.json({ success: false, message: "Missing card details" }, { status: 400 });
    }

    const user = await Users.findById(id);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    // If this is set as default, unset others
    if (isDefault) {
      user.paymentMethods.forEach(pm => {
        pm.isDefault = false;
      });
    }

    user.paymentMethods.push({
      brand,
      last4,
      expiry,
      isDefault: isDefault || (user.paymentMethods.length === 0)
    });

    await user.save();

    return NextResponse.json({ success: true, paymentMethods: user.paymentMethods }, { status: 201 });
  } catch (error) {
    console.error("Payment Add Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
