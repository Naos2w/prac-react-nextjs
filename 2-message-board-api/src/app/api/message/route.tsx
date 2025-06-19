import { NextResponse } from "next/server";
import { getMessages, addMessage } from "@/lib/messages";
import type { Message } from "@/types/message";

export async function GET() {
  return NextResponse.json(getMessages());
}

export async function POST(req: Request) {
  const body = await req.json();
  const newMsg: Message = {
    id: crypto.randomUUID(),
    content: body.content,
    createdAt: new Date()
      .toISOString()
      .replace("T", " ")
      .replace(/-/g, "/")
      .substring(0, 19),
  };
  addMessage(newMsg);
  return NextResponse.json(newMsg);
}
