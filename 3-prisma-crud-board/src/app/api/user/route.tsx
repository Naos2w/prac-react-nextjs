import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// POST /api/user
export const POST = async (req: Request) => {
  const body = await req.json();
  const { username, password } = body;

  // 驗證基本資料
  if (!username || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // 確認是否已有相同使用者
  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  // hash password
  const hashed = await bcrypt.hash(password, 10);

  // 建立使用者
  const user = await prisma.user.create({
    data: {
      username,
      password: hashed,
    },
  });

  return NextResponse.json({ message: "User created", user });
};
