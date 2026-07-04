import { NextResponse } from 'next/server';
import connectDB from '@/libs/config';
import Reservation from '@/model/reservation';

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const reservation = await Reservation.create(body);
    return NextResponse.json({ success: true, reservation }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');

    let query = {};
    if (userId) query.user = userId;
    if (status) query.status = status;

    const reservations = await Reservation.find(query).sort({ date: 1, time: 1 });
    return NextResponse.json({ success: true, reservations });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
