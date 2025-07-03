export const runtime = "nodejs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  console.log(`middleware token: ${token}`);
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    console.log(`middleware JWT_SECRET: ${process.env.JWT_SECRET}`);
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      isAdmin?: boolean;
    };
    console.log(`middleware isAdmin: ${decoded.isAdmin}`);
    if (!decoded.isAdmin) {
      // 非 admin 用戶也導回登入或首頁
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("JWT verification error:", err);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
