import connectDB from "@/libs/config";
import Users from "@/model/user";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        await connectDB();

        const users = await Users.find();

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