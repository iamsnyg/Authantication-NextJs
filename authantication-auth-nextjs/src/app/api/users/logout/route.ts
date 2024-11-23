import { connectDB } from "@/dB/dbConfig";
import User from "@/Models/users.models";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function GET(request: NextRequest) {
    try {

        const response= NextResponse.json({
            message: "Logout successfully",
            success: true,
        },{status: 200});

        response.cookies.set("token", "",{
            httpOnly: true,
            expires: new Date(0),
            
        })

        return response;
        
        
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
        },{status: 500});
        
    }
}