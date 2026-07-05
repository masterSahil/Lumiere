import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';
import connectDB from '@/libs/config';
import Order from '@/model/order';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummykey', 
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummysecret'
});

export async function POST(request) {
  try {
    await connectDB();
    const { orderData } = await request.json();

    // 1. Create order in database (Pending)
    const dbOrder = await Order.create({
      ...orderData,
      paymentStatus: 'Pending',
      orderStatus: 'Pending',
      paymentInfo: { method: 'Razorpay' }
    });

    // 2. Create Razorpay order
    const amountInPaise = Math.round(orderData.totalAmount * 100); 
    
    const options = {
      amount: amountInPaise,
      currency: "USD",
      receipt: dbOrder._id.toString(),
    };

    const rzpOrder = await razorpay.orders.create(options);

    // Save transaction ID
    dbOrder.transactionId = rzpOrder.id;
    await dbOrder.save();

    return NextResponse.json({ 
      success: true, 
      id: rzpOrder.id, 
      currency: rzpOrder.currency, 
      amount: rzpOrder.amount, 
      dbOrderId: dbOrder._id 
    });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
