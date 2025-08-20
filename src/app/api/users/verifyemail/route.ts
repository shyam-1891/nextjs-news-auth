import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/userModal";
import { NextRequest, NextResponse } from "next/server";

// Connect to the database
connectDB();

export async function POST(req: NextRequest) {
  try {
    const { email, token } = await req.json();
    console.log(token + " " + email);

    const user = await User.findOne({ email, verifyPasswordExpiry: { $gt: Date.now() } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    console.log(user);

    user.isVerified = true;
    user.verifyPasswordToken = undefined;
    user.verifyPasswordExpiry = undefined;
    await user.save();

    return NextResponse.json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}