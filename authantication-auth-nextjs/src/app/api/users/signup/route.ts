import { connectDB } from "@/dB/dbConfig";
import User from "@/Models/users.models";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


connectDB();

export async function POST(request: NextRequest) {
    try{
    
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

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword,
            username,
        });


        const savedUser=await newUser.save();
        const mail=await sendEmail({email, emailType: "VERIFY", userId: savedUser._id});

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser,
        },{status: 201});
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
        },{status: 500});
    }

        
    
}
  