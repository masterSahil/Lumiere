import { NextResponse } from 'next/server';
import connectDB from '@/libs/config';
import Banners from '@/model/banner';

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const body = await request.json();

    const banner = await Banners.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!banner) {
      return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: banner });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const { id } = resolvedParams;
    await Banners.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
