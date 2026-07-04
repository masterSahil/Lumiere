import connectDB from "@/libs/config";
import Order from "@/model/order";
import { NextResponse } from "next/server";
import { getTokenFromCookie, verifyToken } from "@/libs/auth";

export async function POST(request) {
  try {
    // Orders can be created by authenticated customers (or guests if you allow it, but we'll enforce auth for premium system)
    const token = await getTokenFromCookie();
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ success: false, message: "Authentication required to place order" }, { status: 401 });
    }

    await connectDB();
    const data = await request.json();
    
    // Ensure the order is tied to the logged in user
    data.user = decoded.userId;

    // Create new order
    const order = await Order.create(data);
    
    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Order Creation Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const token = await getTokenFromCookie();
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
    }

    await connectDB();
    const { searchParams } = new URL(request.url);
    const requestedUserId = searchParams.get('userId');
    
    let query = {};
    if (['admin', 'superadmin'].includes(decoded.role)) {
       // Admin can view all, or filter by requestedUserId
       query = requestedUserId ? { user: requestedUserId } : {};
    } else {
       // Customers can ONLY view their own orders
       query = { user: decoded.userId };
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
