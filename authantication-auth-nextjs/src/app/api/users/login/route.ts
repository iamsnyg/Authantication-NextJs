import { connectDB } from "@/dB/dbConfig";
import User from "@/Models/users.models";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const { email, password } = reqBody;

        if (!email || !password) {
            return NextResponse.json({
                message: "Please enter all fields",
            },{status: 400});
        }

        const user= await User.findOne({email});

        if(!user){
            return NextResponse.json({
                message: "User does not exist",
            },{status: 400});
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json({
                message: "Invalid credentials",
            },{status: 400});
        }

        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET!, {
            expiresIn: "1d",
        });

        const response=NextResponse.json({
            message: "Login successful",
            success: true,

        })

        response.cookies.set("token", token, {
            httpOnly: true,
        });


        return response;
    }catch (error: any) {
        return NextResponse.json({
            message: error.message,
        },{status: 500});
    }
}