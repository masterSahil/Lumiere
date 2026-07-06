import { NextResponse } from "next/server";
import connectDB from "@/libs/config";
import Branding from "@/model/branding";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all');

    if (all === 'true') {
      const themes = await Branding.find().sort({ createdAt: -1 });
      return NextResponse.json({ success: true, data: themes });
    }

    let branding = await Branding.findOne({ isActiveTheme: true });
    if (!branding) {
      branding = await Branding.findOne(); // Fallback
      if (!branding) {
        branding = await Branding.create({ themeName: "Default Theme", isActiveTheme: true });
      } else {
        branding.isActiveTheme = true;
        await branding.save();
      }
    }
    return NextResponse.json({ success: true, data: branding });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    
    // If setting as active, deactivate others
    if (body.isActiveTheme) {
      await Branding.updateMany({}, { isActiveTheme: false });
    }
    
    const theme = await Branding.create(body);
    return NextResponse.json({ success: true, data: theme, message: "Theme created successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
