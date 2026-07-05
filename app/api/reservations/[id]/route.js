import { NextResponse } from 'next/server';
import connectDB from '@/libs/config';
import Reservation from '@/model/reservation';

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    
    // Use returnDocument: 'after' instead of new: true to fix deprecation warning
    const reservation = await Reservation.findByIdAndUpdate(id, body, { returnDocument: 'after' });
    
    if (!reservation) {
      return NextResponse.json({ success: false, message: "Reservation not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, reservation });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    
    const reservation = await Reservation.findByIdAndDelete(id);
    
    if (!reservation) {
      return NextResponse.json({ success: false, message: "Reservation not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: "Reservation deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
