import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/userModal";
import { NextRequest, NextResponse } from "next/server";

// Connect to the database
connectDB();

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const response = NextResponse.json({ message: "Logout successful" });

    // Clear cookies
    response.cookies.set("token", "", { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: -1 });

    return response;
  } catch (error) {
    console.error("Error logging out:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}