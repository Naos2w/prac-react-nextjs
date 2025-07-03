import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.message.delete({ where: { id } });
  return NextResponse.json({ message: "Deleted" });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { content } = await req.json();

  if (content.trim() === "")
    return NextResponse.json({ error: "Missing content." }, { status: 400 });

  await prisma.message.update({
    where: { id },
    data: { content: content },
  });
  return NextResponse.json({ message: "Updated" });
}
