import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { parse } from "cookie";
import { User, Message } from "@prisma/client";
import { verifyToken } from "@/lib/auth";

type UserWithMessages = User & {
  messages: Message[];
};

export const GET = async (req: Request) => {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const cookies = parse(cookieHeader);
    const token = cookies.token;

    const user = token ? verifyToken(token) : null;
    if (!user) {
      return new NextResponse(JSON.stringify({ error: "Unauthenticated" }), {
        status: 401,
      });
    }
    if (!user.id || !user.isAdmin) {
      return new NextResponse(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
      });
    }
    const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
    if (!dbUser || !dbUser.isAdmin) {
      return new NextResponse(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
      });
    }
  } catch (ex) {
    return new NextResponse(
      JSON.stringify({ error: `Invalid token error: ${ex}` }),
      {
        status: 403,
      }
    );
  }

  try {
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

    const userStats = (messageDistribution as UserWithMessages[]).map(
      (user) => ({
        username: user.username,
        messageCount: user.messages.length,
        id: user.id,
        color: "",
      })
    );

    return NextResponse.json({
      totalUsers: userStats.length,
      totalMessages,
      messageDistribution: userStats,
    });
  } catch (ex) {
    return new NextResponse(
      JSON.stringify({
        error: `Get messageDistribution exception. exception: ${ex}`,
      }),
      {
        status: 500,
      }
    );
  }
};
