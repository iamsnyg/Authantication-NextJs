import { connectDB } from "@/dB/dbConfig";
import User from "@/Models/users.models";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const { token } = reqBody;

        if (!token) {
            return NextResponse.json({
                message: "Please enter all fields",
            },{status: 400});
        }

        const user= await User.findOne({verifyUserToken: token, verifyUserExpire: {$gt: Date.now()}});
        if(!user){
            return NextResponse.json({
                message: "Invalid or expired token",
            },{status: 400});
        }

        console.log(user);

        user.isVarified = true;
        user.verifyUserToken = undefined;
        user.verifyUserExpire = undefined;

        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true,
        },{status: 200});
        
        
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
        },{status: 500});
        
    }
}
    