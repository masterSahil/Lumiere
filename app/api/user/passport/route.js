import { NextResponse } from "next/server";
import connectDB from "@/libs/config";
import Order from "@/model/order";
import User from "@/model/user";
import { getTokenFromCookie, verifyToken } from "@/libs/auth";

export async function GET(request) {
  try {
    await connectDB();

    const token = await getTokenFromCookie();
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ success: false, message: "Invalid session" }, { status: 401 });
    }

    const userId = decoded.userId || decoded.id;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    // Aggregate User Orders
    const orders = await Order.find({ user: userId, orderStatus: { $ne: 'Cancelled' } }).populate('items.food');
    
    let lifetimeSpending = 0;
    const foodFrequency = {};

    orders.forEach(order => {
      lifetimeSpending += order.totalAmount;
      order.items.forEach(item => {
        if (item.food) {
          const foodId = item.food._id.toString();
          if (!foodFrequency[foodId]) {
            foodFrequency[foodId] = {
              count: 0,
              name: item.name,
              image: item.image,
              price: item.price
            };
          }
          foodFrequency[foodId].count += item.quantity;
        }
      });
    });

    const totalVisits = orders.length;

    // Sort favorite dishes by count
    const favoriteDishes = Object.values(foodFrequency)
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    // Calculate Loyalty Level
    let loyaltyLevel = "Silver Member";
    let nextTier = 500;
    let progress = 0;

    if (lifetimeSpending >= 2000) {
      loyaltyLevel = "Diamond Member";
      nextTier = 5000;
      progress = (lifetimeSpending / nextTier) * 100;
    } else if (lifetimeSpending >= 500) {
      loyaltyLevel = "Gold Member";
      nextTier = 2000;
      progress = ((lifetimeSpending - 500) / 1500) * 100;
    } else {
      progress = (lifetimeSpending / 500) * 100;
    }

    return NextResponse.json({
      success: true,
      data: {
        lifetimeSpending,
        totalVisits,
        favoriteDishes,
        loyaltyLevel,
        progress: Math.min(100, Math.round(progress)),
        nextTier,
        memberSince: user.createdAt
      }
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
