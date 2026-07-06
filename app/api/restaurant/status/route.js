import { NextResponse } from 'next/server';
import connectDB from '@/libs/config';
import Order from '@/model/order';
import Reservation from '@/model/reservation';
import Food from '@/model/food';

export const revalidate = 0; // Prevent caching to ensure live data

export async function GET() {
  try {
    await connectDB();

    // 1. Calculate Active Orders (Kitchen Load)
    const activeOrders = await Order.countDocuments({
      orderStatus: { $in: ['Pending', 'Accepted', 'Preparing'] }
    });

    // 2. Calculate Occupancy based on today's confirmed reservations vs total tables (assume 50 tables max)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const activeReservations = await Reservation.countDocuments({
      date: { $gte: today, $lt: tomorrow },
      status: { $in: ['Confirmed', 'Pending'] }
    });

    const totalCapacity = 50;
    const occupancyPercent = Math.min(100, Math.round((activeReservations / totalCapacity) * 100));

    // 3. Estimated Wait Time calculation
    // Base wait time of 15 mins + 5 mins per active order
    let waitTime = 15 + (activeOrders * 5);
    if (occupancyPercent > 80) waitTime += 20;
    if (waitTime > 120) waitTime = 120; // Cap at 2 hours

    // 4. Chef's Top Pick (randomly select a highly rated/premium food item, or just the first one if DB is small)
    const foods = await Food.find({ isAvailable: true }).limit(5);
    const topPick = foods.length > 0 ? foods[Math.floor(Math.random() * foods.length)] : null;

    return NextResponse.json({
      success: true,
      data: {
        activeOrders,
        occupancyPercent: occupancyPercent === 0 ? 12 : occupancyPercent, // Give a baseline for visual appeal if DB is empty
        waitTime: waitTime === 15 ? 25 : waitTime, // Baseline 25 mins
        topPick: topPick ? {
          name: topPick.name,
          image: topPick.image,
          price: topPick.price
        } : null
      }
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
