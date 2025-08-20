import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getDataFromToken(req: NextRequest) {
  try {
    const tokenCookie = req.cookies.get("token");
    const token = tokenCookie?.value;

    if (!token) {
      return { error: "Unauthorized" };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded || typeof decoded === "string" || !("id" in decoded)) {
      return { error: "Unauthorized" };
    }

    return { id: (decoded as jwt.JwtPayload).id };
  } catch (error) {
    console.error("Error extracting token data:", error);
    return { error: "Internal Server Error" };
  }
}
