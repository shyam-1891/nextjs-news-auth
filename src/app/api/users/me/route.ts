import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/userModal";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

// Connect to the database
connectDB();

export async function POST(req: NextRequest) {
  try {
    const { id, error } = getDataFromToken(req);
    if (error) {
      return NextResponse.json({ message: error }, { status: 401 });
    }

    const user = await User.findById(id).select("-password -verifyPasswordToken -verifyPasswordExpiry -forgotPasswordToken -forgotPasswordExpiry");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}