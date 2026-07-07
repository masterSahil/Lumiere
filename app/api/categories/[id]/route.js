import { NextResponse } from "next/server";
import connectDB from "@/libs/config";
import Category from "@/model/category";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const category = await Category.findById(resolvedParams.id);
    if (!category) return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 });
    return NextResponse.json({ success: true, category }, { status: 200 });
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
    const category = await Category.findByIdAndUpdate(resolvedParams.id, body, { new: true, runValidators: true });
    if (!category) return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 });
    return NextResponse.json({ success: true, category }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const category = await Category.findByIdAndDelete(resolvedParams.id);
    if (!category) return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 });
    return NextResponse.json({ success: true, message: "Category deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
