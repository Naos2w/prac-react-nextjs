import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

export const GET = async (req: Request) => {
  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = parse(cookieHeader);
  const token = cookies.token;

  if (!token) {
    return new NextResponse(JSON.stringify({ error: "Unauthenticated" }), {
      status: 401,
    });
  }

  let userId = "";
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    userId = decoded.id;
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: "Invalid token" }), {
      status: 403,
    });
  }

  // 解析 query string
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") || "10");
  const offset = parseInt(searchParams.get("offset") || "0");

  // 查詢該使用者的留言（含分頁）
  const messages = await prisma.message.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    skip: offset, // 從第幾筆開始
    // take: limit, // 要幾筆資料
  });
  const totalCount = messages.length;

  return NextResponse.json({ messages, totalCount });
};

export const POST = async (req: Request) => {
  // 1. 取得 JWT Token
  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = parse(cookieHeader);
  const token = cookies.token;

  if (!token) {
    return new NextResponse(JSON.stringify({ error: "Unauthenticated" }), {
      status: 401,
    });
  }

  // 2. 驗證 JWT 並取得使用者 ID
  let userId = "";
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    userId = decoded.id;
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Invalid token" }), {
      status: 403,
    });
  }

  // 3. 取得留言內容
  const body = await req.json();
  const content = body.message?.trim();

  if (!content) {
    return new NextResponse(JSON.stringify({ error: "message is required" }), {
      status: 400,
    });
  }

  // 4. 寫入資料庫
  const newMessage = await prisma.message.create({
    data: {
      content,
      userId,
    },
  });

  return NextResponse.json(newMessage);
};
