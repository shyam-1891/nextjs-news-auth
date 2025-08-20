import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/userModal";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailHelper";
import bcrypt from 'bcryptjs';

// Connect to the database
connectDB();

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  // Validate user input
  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "Name, email, and password are required" },
      { status: 400 }
    );
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 409 }
    );
  }

  // Create a new user
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

  // Send verification email
  await sendEmail({
    email,
    emailType: "VERIFY",
    userID: newUser._id.toString(),
  });

  return NextResponse.json(
    { message: "User created successfully",
      newUser
     },
    { status: 201 }
  );
}
