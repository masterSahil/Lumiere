import { NextResponse } from 'next/server';
import connectDB from '@/libs/config';
import Users from '@/model/user';

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const { id, cardId } = resolvedParams;

    const user = await Users.findById(id);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    user.paymentMethods = user.paymentMethods.filter(pm => pm._id.toString() !== cardId);
    
    // Ensure there is at least one default if there are still cards
    if (user.paymentMethods.length > 0 && !user.paymentMethods.some(pm => pm.isDefault)) {
        user.paymentMethods[0].isDefault = true;
    }

    await user.save();

    return NextResponse.json({ success: true, paymentMethods: user.paymentMethods }, { status: 200 });
  } catch (error) {
    console.error("Payment Delete Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
