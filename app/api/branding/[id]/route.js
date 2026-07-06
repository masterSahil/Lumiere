import { NextResponse } from "next/server";
import connectDB from "@/libs/config";
import Branding from "@/model/branding";

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const body = await req.json();
    
    if (body.isActiveTheme) {
      await Branding.updateMany({}, { isActiveTheme: false });
    }
    
    const theme = await Branding.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, data: theme, message: "Theme updated successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    
    const theme = await Branding.findById(id);
    if (theme && theme.isActiveTheme) {
      return NextResponse.json({ success: false, message: "Cannot delete the active theme." }, { status: 400 });
    }
    
    await Branding.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Theme deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
