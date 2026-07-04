import { NextResponse } from 'next/server';
import connectDB from '@/libs/mongodb';
import Review from '@/model/review';

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const review = await Review.create(body);
    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const foodId = searchParams.get('foodId');

    let query = { isApproved: true };
    if (foodId) query.food = foodId;

    const reviews = await Review.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
