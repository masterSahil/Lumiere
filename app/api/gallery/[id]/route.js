import { NextResponse } from 'next/server';
import connectDB from '@/libs/config';
import Galleries from '@/model/gallery';

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const body = await request.json();

    const galleryItem = await Galleries.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!galleryItem) {
      return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: galleryItem });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const { id } = resolvedParams;
    await Galleries.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
