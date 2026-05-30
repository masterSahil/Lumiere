import { NextResponse } from "next/server";
import connectDB from "@/libs/config";
import Food from "@/model/food"

export async function POST(request) {
  try {
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

    const foods = await Food.find().sort({ createdAt: -1 });

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