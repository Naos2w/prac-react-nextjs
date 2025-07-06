import MessageForm from "@/components/MessageForm";
import MessageList from "@/components/MessageList";
import { MessageProvider } from "@/context/MessageContext";
import { Box } from "@mui/material";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  console.log(`token: ${token}`);

  // 沒有 token → 轉到登入頁
  if (!token) {
    redirect("/login");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      // 如果資料庫中找不到該使用者，說明 token 雖然有效，但使用者不存在或已被刪除
      console.log(`User not found in database.`);
      redirect("/login?err=user_not_found");
    }
  } catch (error) {
    // 無效 token (簽名錯誤、過期等) → 轉到登入頁
    console.error("JWT verification failed:", error);
    redirect("/login?err=invalid_token");
  }

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <MessageProvider>
        <MessageForm />
        <MessageList />
      </MessageProvider>
    </Box>
  );
}
