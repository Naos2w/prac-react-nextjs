import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { parse } from "cookie";
import { verifyToken } from "@/lib/auth";

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
    const usersWithMessages = await prisma.user.findMany({
      where: { messages: { some: {} } },
      select: {
        id: true,
        username: true,
        messages: {
          orderBy: {
            updatedAt: "desc",
          },
          select: {
            id: true,
            content: true,
            createdAt: true,
            userId: true,
            updatedAt: true,
          },
        },
      },
    });

    const totalMessages = usersWithMessages.reduce(
      (sum, user) => sum + user.messages.length,
      0
    );

    const userStats = usersWithMessages.map((user) => ({
      id: user.id,
      username: user.username,
      messageCount: user.messages.length,
      color: "",
    }));

    return NextResponse.json({
      totalUsers: usersWithMessages.length,
      totalMessages,
      messageDistribution: userStats,
      usersWithMessages,
    });
  } catch (ex) {
    return new NextResponse(
      JSON.stringify({
        error: `Get admin summary failed. exception: ${ex}`,
      }),
      {
        status: 500,
      }
    );
  }
};
