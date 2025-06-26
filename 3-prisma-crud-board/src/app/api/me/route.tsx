import { NextResponse } from "next/server";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

export const GET = async (req: Request) => {
  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = parse(cookieHeader);
  const token = cookies.token;

  if (!token) {
    return NextResponse.json({ isLoggedIn: false }, { status: 200 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      username: string;
    };

    return NextResponse.json({
      isLoggedIn: true,
      userId: decoded.id,
      username: decoded.username,
    });
  } catch (err) {
    return NextResponse.json({ isLoggedIn: false }, { status: 200 });
  }
};
