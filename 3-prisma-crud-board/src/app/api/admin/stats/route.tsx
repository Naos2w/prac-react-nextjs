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
  } catch {
    return new NextResponse(JSON.stringify({ error: "Invalid token" }), {
      status: 403,
    });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || !user.isAdmin) {
    return new NextResponse(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
    });
  }

  const totalMessages = await prisma.message.count();
  const messageDistribution = await prisma.user.findMany({
    where: {
      messages: {
        some: {}, // 至少有一則留言
      },
    },
    select: {
      id: true,
      username: true,
      messages: {
        select: { id: true },
      },
    },
  });

  const userStats = messageDistribution.map((user: any) => ({
    username: user.username,
    messageCount: user.messages.length,
    id: user.id,
    color: "",
  }));

  return NextResponse.json({
    totalUsers: userStats.length,
    totalMessages,
    messageDistribution: userStats,
  });
};
