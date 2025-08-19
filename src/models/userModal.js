import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please provide a name"], unique: true },
  email: { type: String, required: [true, "Please provide an email"], unique: true },
  password: { type: String, required: [true, "Please provide a password"] },
  isVerified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  forgotPasswordToken: { type: String, default: null },
  forgotPasswordExpiry: { type: Date, default: null },
  verifyPasswordToken: { type: String, default: null },
  verifyPasswordExpiry: { type: Date, default: null },
});

const User = mongoose.model("User", userSchema);

export default User;
