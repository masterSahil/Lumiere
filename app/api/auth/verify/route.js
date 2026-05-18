import Users from "@/model/user";
import connectDB from "@/libs/config";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function GET(req){
    await connectDB();
    
    const token = req.headers.get("authorization")?.split(" ")[1];
    console.log(token);

    if (!token) {
        return NextResponse.json({
            success: false,
            message: "No token provided"
        }, {status: 401});
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        if (!decoded) {
            return NextResponse.json({
                success: false,
                message: "UnAuthorised User",
            }, {status: 401});
        }

        const user = await Users.findOne({email: decoded.email});
        return NextResponse.json({
            success: true,
            user,
            role: user.role,
        }, {status: 200}); 
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: error.message,
        }, {status: 500});
    }
}