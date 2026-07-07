import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectDB from "@/libs/config";
import Branding from "@/model/branding";

export const dynamic = 'force-dynamic';


export async function PUT(req, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const body = await req.json();
    
    if (body.isActiveTheme) {
      await Branding.updateMany({}, { isActiveTheme: false });
    }
    
    const theme = await Branding.findByIdAndUpdate(id, body, { returnDocument: 'after' });
    
    // Purge cache so layout updates instantly
    revalidatePath('/', 'layout');
    
    return NextResponse.json({ success: true, data: theme, message: "Theme updated successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    const theme = await Branding.findById(id);
    if (theme && theme.isActiveTheme) {
      return NextResponse.json({ success: false, message: "Cannot delete the active theme." }, { status: 400 });
    }
    
    await Branding.findByIdAndDelete(id);
    
    revalidatePath('/', 'layout');
    
    return NextResponse.json({ success: true, message: "Theme deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
