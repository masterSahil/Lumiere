import { NextResponse } from "next/server";
import connectDB from "@/libs/config";
import Food from "@/model/food";
import { getTokenFromCookie, verifyToken } from "@/libs/auth";

export async function POST(request) {
  try {
    const token = await getTokenFromCookie();
    const decoded = verifyToken(token);
    
    if (!decoded || !['admin', 'superadmin'].includes(decoded.role)) {
      return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const food = await Food.create(body);

    return NextResponse.json({
        success: true,
        food,
    }, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({
        success: false,
        message: error.message,
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();

    const foods = await Food.find().populate("category").sort({ createdAt: -1 });

    return NextResponse.json({
        success: true,
        foods,
    }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({
        success: false,
        message: error.message,
    }, { status: 500 });
  }
}