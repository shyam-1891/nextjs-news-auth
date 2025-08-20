import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/userModal";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

// Connect to the database
connectDB();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = await User.findOne({ email, isVerified: true });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
    };

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET environment variable is not defined");
    }
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1h" });

    const response = NextResponse.json({ message: "Login successful", token });

    // set cookies
    response.cookies.set("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

    return response
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}