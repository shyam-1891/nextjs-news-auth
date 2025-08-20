import nodemailer from "nodemailer";
import User from "../models/userModal";

interface SendEmailParams {
  email: string;
  emailType: "VERIFY" | "RESET";
  userID: string;
}

function generateRandomString(length = 15) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

export const sendEmail = async ({
  email,
  emailType,
  userID,
}: SendEmailParams) => {
  const token = generateRandomString(15);

  if (emailType === "VERIFY") {
    // Verification email logic
    await User.findByIdAndUpdate(userID, { verifyPasswordToken: token, verifyPasswordExpiry: Date.now() + 3600000 });
  } else if (emailType === "RESET") {
    // Password reset email logic
    await User.findByIdAndUpdate(userID, { forgotPasswordToken: token, forgotPasswordExpiry: Date.now() + 3600000 });
  }

  const transporter = nodemailer.createTransport({
    service: "smtp",
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject:
      emailType === "VERIFY" ? "Verify your email" : "Reset yur password",
    html:
      "<p>Please verify your email by clicking on the following link: <a href='" + process.env.DOMAIN + "/verifyemail?token=" + token + "'>here</a></p>",
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error sending email: ${error.message}`);
    } else {
      console.error("Error sending email:", error);
    }
  }
};
