import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await prisma.message.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Deleted" });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string; content: string } }
) {
  const { text } = await req.json();
  await prisma.message.update({
    where: { id: params.id },
    data: { content: params.content },
  });
  return NextResponse.json({ message: "Updated" });
}
