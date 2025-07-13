import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const token = req.cookies.get("token")?.value;
  const user = token ? verifyToken(token) : null;
  if (!user) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  await prisma.message.delete({ where: { id } });
  return NextResponse.json({ message: "Deleted" });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { content } = await req.json();

  const token = req.cookies.get("token")?.value;
  const user = token ? verifyToken(token) : null;
  if (!user) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  if (content.trim() === "")
    return NextResponse.json({ error: "Missing content." }, { status: 400 });

  await prisma.message.update({
    where: { id },
    data: { content: content },
  });
  return NextResponse.json({ message: "Updated" });
}
