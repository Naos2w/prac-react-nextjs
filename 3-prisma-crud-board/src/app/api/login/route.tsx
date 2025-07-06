import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// POST /api/login
export const POST = async (req: Request) => {
  const body = await req.json();
  const { username, password } = body;

  // 1. 檢查使用者是否存在
  const user = await prisma.user.findUnique({
    where: { username },
  });

  // 不存在則回傳錯誤
  if (!user) {
    return new NextResponse(JSON.stringify({ error: "User not found" }), {
      status: 401,
    });
  }

  // 2. 檢查密碼是否正確
  const isValid = user && (await bcrypt.compare(password, user.password));

  if (!isValid) {
    return new NextResponse(JSON.stringify({ error: "Invalid password" }), {
      status: 401,
    });
  }
  // 檢查 JWT_SECRET 是否存在
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return new NextResponse("JWT_SECRET is not defined", { status: 500 });
  }

  // 2. 登入成功：產生 token 或 cookie ，1小時候逾期
  const token = jwt.sign(
    { id: user.id, username: user.username, isAdmin: user.isAdmin },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    }
  );

  // 3. 回傳 cookie 或 token
  const oneHour = 60 * 60;

  return new NextResponse(
    JSON.stringify({
      message: "Login success",
      token,
      exp: Math.floor(Date.now() / 1000) + 3600, // 回傳過期時間（可選）
      userId: user.id,
    }),
    {
      status: 200,
      headers: {
        "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=${oneHour}`,
      },
    }
  );
};
