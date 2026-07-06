import { NextResponse } from 'next/server';
import connectDB from '@/libs/config';
import Users from '@/model/user';

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const { id, addressId } = resolvedParams;
    const updateData = await request.json();

    const user = await Users.findById(id);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const address = user.addresses.id(addressId);
    if (!address) {
      return NextResponse.json({ success: false, message: "Address not found" }, { status: 404 });
    }

    if (updateData.isDefault) {
      user.addresses.forEach(addr => {
        addr.isDefault = false;
      });
    }

    address.name = updateData.name !== undefined ? updateData.name : address.name;
    address.street = updateData.street !== undefined ? updateData.street : address.street;
    address.city = updateData.city !== undefined ? updateData.city : address.city;
    address.state = updateData.state !== undefined ? updateData.state : address.state;
    address.zip = updateData.zip !== undefined ? updateData.zip : address.zip;
    address.isDefault = updateData.isDefault !== undefined ? updateData.isDefault : address.isDefault;

    await user.save();

    return NextResponse.json({ success: true, addresses: user.addresses }, { status: 200 });
  } catch (error) {
    console.error("Address Update Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const { id, addressId } = resolvedParams;

    const user = await Users.findById(id);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    user.addresses = user.addresses.filter(addr => addr._id.toString() !== addressId);
    
    // Ensure there is at least one default if there are still addresses
    if (user.addresses.length > 0 && !user.addresses.some(addr => addr.isDefault)) {
        user.addresses[0].isDefault = true;
    }

    await user.save();

    return NextResponse.json({ success: true, addresses: user.addresses }, { status: 200 });
  } catch (error) {
    console.error("Address Delete Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
