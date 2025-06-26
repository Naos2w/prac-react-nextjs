import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

export const GET = async (req: Request) => {
  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = parse(cookieHeader);
  const token = cookies.token;

  if (!token) return new NextResponse("Unauthenticated", { status: 401 });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user?.isAdmin) return new NextResponse("Forbidden", { status: 403 });

    const usersWithMessages = await prisma.user.findMany({
      where: { messages: { some: {} } },
      select: {
        id: true,
        username: true,
        messages: {
          select: {
            id: true,
            text: true,
            createdAt: true,
          },
        },
      },
    });

    return NextResponse.json(usersWithMessages);
  } catch {
    return new NextResponse("Invalid token", { status: 403 });
  }
};
