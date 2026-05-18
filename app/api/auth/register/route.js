import connectDB from "@/libs/config";
import Users from "@/model/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req){
    try {
        await connectDB();

        const {username, email, password} = await req.json();
        const user = await Users.findOne({ email });

        if (user) {
            return NextResponse.json({
                success: false,
                message: "User already Exist with Same Email",
            }, {status: 501});
        }

        const hash = await bcrypt.hash(password, 10);
        const registeredUser = await Users.create({username, email, password: hash});
        const registeredUserId = registeredUser._id;

        const token = await jwt.sign({username, email, registeredUserId, role: registeredUser.role}, process.env.SECRET)

        return NextResponse.json({
            success: true,
            registeredUser,
            token
        }, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: error.message,
        }, {status: 500});
    }
}