import connectDB from "@/libs/mongodb";
import Order from "@/model/order";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    
    // Create new order (e.g. for Cash on Delivery or bypassing gateway)
    const order = await Order.create(data);
    
    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Order Creation Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const query = userId ? { user: userId } : {};

    const orders = await Order.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
