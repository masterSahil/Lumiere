import { NextResponse } from 'next/server';
import connectDB from '@/libs/config';
import Users from '@/model/user';

export async function POST(request, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    const addressData = await request.json();

    const user = await Users.findById(id);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    if (addressData.isDefault) {
      user.addresses.forEach(addr => {
        addr.isDefault = false;
      });
    }

    // Set a name if not provided (Wait, the user schema uses 'street', not 'name'. Let's ensure name is handled or we use street. The UI sends name, street, city, state, zip. I need to make sure the schema supports 'name' or I just don't save it. Wait, the schema in user.js: `street, city, state, zip, isDefault`!)
    // Wait, let's look at addressSchema.
    
    user.addresses.push({
      name: addressData.name,
      street: addressData.street,
      city: addressData.city,
      state: addressData.state,
      zip: addressData.zip,
      isDefault: addressData.isDefault || (user.addresses.length === 0)
    });

    await user.save();

    return NextResponse.json({ success: true, addresses: user.addresses }, { status: 201 });
  } catch (error) {
    console.error("Address Add Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
