import { NextResponse } from "next/server";
import connectDB from "@/libs/config";
import Food from "@/model/food";
import Category from "@/model/category"; // to register category model

export async function GET(request, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const food = await Food.findById(resolvedParams.id).populate("category");
    if (!food) return NextResponse.json({ success: false, message: "Food not found" }, { status: 404 });
    return NextResponse.json({ success: true, food }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();
    const resolvedParams = await params;
    const food = await Food.findByIdAndUpdate(resolvedParams.id, body, { new: true, runValidators: true });
    if (!food) return NextResponse.json({ success: false, message: "Food not found" }, { status: 404 });
    return NextResponse.json({ success: true, food }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const food = await Food.findByIdAndDelete(resolvedParams.id);
    if (!food) return NextResponse.json({ success: false, message: "Food not found" }, { status: 404 });
    return NextResponse.json({ success: true, message: "Food deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
