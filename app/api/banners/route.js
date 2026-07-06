import { NextResponse } from 'next/server';
import connectDB from '@/libs/config';
import Banners from '@/model/banner';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active') === 'true';
    
    let query = {};
    if (activeOnly) {
      query.isActive = true;
    }

    const banners = await Banners.find(query).sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, data: banners });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const banner = await Banners.create(body);
    return NextResponse.json({ success: true, data: banner }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
