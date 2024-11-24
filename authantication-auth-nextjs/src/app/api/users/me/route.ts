import { connectDB } from "@/dB/dbConfig";
import User from "@/Models/users.models";
import { NextRequest, NextResponse } from "next/server";
import getDataFromToken from "@/helpers/getDataFromToken";

connectDB();

export async function POST(request: NextRequest) {
    try {

        const userId = getDataFromToken(request);
        
        const user = await User.findOne({
            _id: userId,
        }).select("-password");

        if (!user) {
            return NextResponse.json({
                message: "User not found",
            },{status: 404});
        }


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