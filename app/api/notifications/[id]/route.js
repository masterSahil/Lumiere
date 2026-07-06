import { NextResponse } from 'next/server';
import connectDB from '@/libs/config';
import Notifications from '@/model/notification';

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const { action, userId } = await request.json(); // action can be 'read'

    const notification = await Notifications.findById(id);
    if (!notification) {
      return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    }

    if (action === 'read') {
      if (notification.isGlobal) {
        if (userId && !notification.readBy.includes(userId)) {
          notification.readBy.push(userId);
        }
      } else {
        notification.isRead = true;
      }
      await notification.save();
    }

    return NextResponse.json({ success: true, data: notification });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const { id } = resolvedParams;
    await Notifications.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
