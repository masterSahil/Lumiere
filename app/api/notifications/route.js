import { NextResponse } from 'next/server';
import connectDB from '@/libs/config';
import Notifications from '@/model/notification';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    let query = {};
    if (userId) {
      query = { $or: [{ userId: userId }, { isGlobal: true }] };
    }

    const notifications = await Notifications.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: notifications });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const notification = await Notifications.create(body);
    return NextResponse.json({ success: true, data: notification }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
