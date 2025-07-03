// /api/logout/route.ts
import { NextResponse } from "next/server";

export const POST = async () => {
  return new NextResponse(JSON.stringify({ message: "Logout success" }), {
    status: 200,
    headers: {
      // 清除 cookie：Max-Age=0 就會被瀏覽器移除
      "Set-Cookie": "token=; Path=/; Max-Age=0; HttpOnly",
    },
  });
};
