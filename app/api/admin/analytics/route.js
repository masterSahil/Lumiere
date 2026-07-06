import { NextResponse } from 'next/server';
import connectDB from '@/libs/config';
import Order from '@/model/order';
import User from '@/model/user';
import Food from '@/model/food';
import { getTokenFromCookie, verifyToken } from "@/libs/auth";

export async function GET(request) {
  try {
    await connectDB();

    const token = await getTokenFromCookie();
    if (!token) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const decoded = verifyToken(token);
    if (!decoded) return NextResponse.json({ success: false, message: "Invalid session" }, { status: 401 });

    const userId = decoded.userId || decoded.id;
    const adminUser = await User.findById(userId);
    
    // STRICT Super Admin Check
    if (!adminUser || adminUser.role !== 'superadmin') {
      return NextResponse.json({ success: false, message: "Forbidden - Super Admin Access Required" }, { status: 403 });
    }

    // Aggregate Data
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [totalOrders, totalRevenue, todayRevenue, totalUsers, foods] = await Promise.all([
      Order.countDocuments(),
      Order.aggregate([{ $match: { orderStatus: { $ne: 'Cancelled' } } }, { $group: { _id: null, total: { $sum: "$totalAmount" } } }]),
      Order.aggregate([{ $match: { createdAt: { $gte: today }, orderStatus: { $ne: 'Cancelled' } } }, { $group: { _id: null, total: { $sum: "$totalAmount" } } }]),
      User.countDocuments({ role: 'customer' }),
      Food.countDocuments()
    ]);

    // Daily revenue chart data (Last 7 days mock or real)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0,0,0,0);

    const dailyStats = await Order.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo }, orderStatus: { $ne: 'Cancelled' } } },
      { 
        $group: { 
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, 
          revenue: { $sum: "$totalAmount" } 
        } 
      },
      { $sort: { "_id": 1 } }
    ]);

    // Ensure 7 days are represented even if 0
    const chartData = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(sevenDaysAgo);
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const found = dailyStats.find(s => s._id === dateStr);
      chartData.push({
        date: d.toLocaleDateString('en-US', { weekday: 'short' }),
        revenue: found ? found.revenue : 0
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
        todayRevenue: todayRevenue.length > 0 ? todayRevenue[0].total : 0,
        totalOrders,
        totalUsers,
        totalFoods: foods,
        chartData
      }
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
