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
  } catch (error: any) {
    console.error("Order Creation Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
