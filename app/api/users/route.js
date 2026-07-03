import connectDB from "@/libs/config";
import Users from "@/model/user";
import { NextResponse } from "next/server";
import { hashPassword } from "@/libs/auth";

export async function GET(req){
    try {
        await connectDB();
        
        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status");

        let query = {};
        if (status === "active") {
            query.isDeleted = false;
        } else if (status === "deleted") {
            query.isDeleted = true;
        }

        const users = await Users.find(query);

        return NextResponse.json({
            success: true,
            users,
        }, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: error.message,
        }, {status: 500});
    }
}

export async function POST(req){
    try {
        await connectDB();

        const {username, email, password, role, restaurantId} = await req.json();
        
        // Hash password before creating user
        const hashedPassword = await hashPassword(password);
        
        const user = await Users.create({
            username, 
            email: email.toLowerCase(), 
            password: hashedPassword,
            role,
            restaurantId
        });

        // Don't send password back in response
        const userObj = user.toObject();
        delete userObj.password;

        return NextResponse.json({
            success: true,
            user: userObj,
        }, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: error.message,
        }, {status: 500});
    }
}