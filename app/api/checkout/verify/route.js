import { NextResponse } from 'next/server';
import crypto from 'crypto';
import connectDB from '@/libs/config';
import Order from '@/model/order';

export async function POST(request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, dbOrderId } = await request.json();

    const key_secret = process.env.RAZORPAY_KEY_SECRET || 'dummysecret';

    const generated_signature = crypto
      .createHmac('sha256', key_secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest('hex');

    if (generated_signature === razorpay_signature) {
      // Payment is successful
      await connectDB();
      await Order.findByIdAndUpdate(dbOrderId, {
        paymentStatus: 'Paid',
        orderStatus: 'Preparing'
      });
      return NextResponse.json({ success: true, message: "Payment verified successfully" });
    } else {
      return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
    }
  } catch (error) {
    console.error("Payment Verification Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
