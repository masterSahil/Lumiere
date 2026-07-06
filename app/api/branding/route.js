import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Branding from "@/model/branding";

// Ensure DB is connected
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI);
};

export async function GET() {
  try {
    await connectDB();
    let branding = await Branding.findOne();
    if (!branding) {
      branding = await Branding.create({});
    }
    return NextResponse.json({ success: true, data: branding });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const body = await req.json();
    
    let branding = await Branding.findOne();
    if (!branding) {
      branding = await Branding.create(body);
    } else {
      branding = await Branding.findByIdAndUpdate(branding._id, body, { new: true });
    }
    
    return NextResponse.json({ success: true, data: branding, message: "Branding updated successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
