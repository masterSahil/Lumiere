import { NextResponse } from 'next/server';
import connectDB from '@/libs/config';
import Galleries from '@/model/gallery';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active') === 'true';
    const category = searchParams.get('category');
    
    let query = {};
    if (activeOnly) {
      query.isActive = true;
    }
    if (category && category !== 'all') {
      query.category = category;
    }

    const gallery = await Galleries.find(query).sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, data: gallery });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const galleryItem = await Galleries.create(body);
    return NextResponse.json({ success: true, data: galleryItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
