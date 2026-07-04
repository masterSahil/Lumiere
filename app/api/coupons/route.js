import { NextResponse } from 'next/server';
import connectDB from '@/libs/config';
import Coupon from '@/model/coupon';

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const coupon = await Coupon.create(body);
    return NextResponse.json({ success: true, coupon }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (code) {
      const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
      if (!coupon) {
        return NextResponse.json({ success: false, message: 'Invalid or expired coupon' }, { status: 404 });
      }
      if (new Date(coupon.validUntil) < new Date()) {
        return NextResponse.json({ success: false, message: 'Coupon expired' }, { status: 400 });
      }
      return NextResponse.json({ success: true, coupon });
    }

    const coupons = await Coupon.find();
    return NextResponse.json({ success: true, coupons });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
