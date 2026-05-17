import connectDB from "@/libs/config";
import Users from "@/model/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req){
    try {
        await connectDB();

        const {email, password} = await req.json();

        const user = await Users.findOne({email});
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User Not Found! Register Instead."
            }, {status: 404});
        }

        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            return NextResponse.json({
                success: false,
                message: "Password is Invalid",
            })
        }

        const username = user.username, userId = user._id;
        const hash = await bcrypt.hash(password, 10);
        const token = await jwt.sign({email, username, userId}, process.env.SECRET);

        return NextResponse.json({
            success: true,
            user, 
            token
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: error.message,
        })
    }
}