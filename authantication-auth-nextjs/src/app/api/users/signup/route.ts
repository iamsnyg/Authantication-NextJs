import { connectDB } from "@/dB/dbConfig";
import User from "@/Models/users.models";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password, username } = reqBody;

        if (!email || !password || !username) {
            return NextResponse.json({
                message: "Please enter all fields",
            },{status: 400});
        }

        const user= await User.findOne({email});

        if(user){
            return NextResponse.json({
                message: "User already exists",
            },{status: 400});
        }

        
        
    } catch (error: any) {
        console.log("Error signing up user: ", error);
        return NextResponse.json({
            
            message: "Error signing up user",
        },{status: 500});
        
    }
}
  