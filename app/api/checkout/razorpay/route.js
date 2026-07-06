import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';
import connectDB from '@/libs/config';
import Order from '@/model/order';
import User from '@/model/user';
import { getTokenFromCookie, verifyToken } from "@/libs/auth";
import { errorResponse } from "@/libs/api-utils";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummykey', 
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummysecret'
});

export async function POST(request) {
  try {
    await connectDB();

    let token = await getTokenFromCookie();
    if (!token) {
      const authHeader = request.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      return errorResponse("Unauthorized - Please log in to place an order", 401);
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return errorResponse("Unauthorized - Invalid or expired session", 401);
    }

    const userId = decoded.userId || decoded.id;
    const user = await User.findById(userId).select("-password");
    
    if (!user) {
      return errorResponse("User not found", 404);
    }

    if (!user.isActive || user.isDeleted) {
      return errorResponse("Your account is deactivated or deleted. Please contact support.", 403);
    }

    const { orderData } = await request.json();

    // 1. Create order in database (Pending)
    const dbOrder = await Order.create({
      ...orderData,
      user: userId,
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

    // Save transaction ID properly inside paymentInfo
    dbOrder.paymentInfo.transactionId = rzpOrder.id;
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
    return errorResponse(error.message || "Razorpay Order Error", 500);
  }
}
