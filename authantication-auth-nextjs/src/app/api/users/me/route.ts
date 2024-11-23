import { connectDB } from "@/dB/dbConfig";
import User from "@/Models/users.models";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataFromToken from "@/helpers/getDataFromToken";

connectDB();

export async function POST(request: NextRequest) {
    try {

        const userId = getDataFromToken(request);
        const user = await User.findOne(userId).select("-password");

        return NextResponse.json({
            message: "User Found",
            data: user,
        },{status: 200});
        
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
        },{status: 500});
        
    }
}