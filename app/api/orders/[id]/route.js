import { NextResponse } from 'next/server';
import connectDB from '@/libs/config';
import Order from '@/model/order';

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const body = await request.json();
    
    const order = await Order.findByIdAndUpdate(id, body, { new: true });
    
    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
