## 🎯 專案目標

建立一個可以送出留言並顯示所有留言的簡單留言板系統。透過 Next.js App Router 的 **API Routes** 提供伺服器端資料處理，同時在前端以 `useEffect` 抓取資料並渲染。留言資料先暫存於記憶體（不使用資料庫），以理解請求流程為主。

---

## 📘 學習主題

- `app/api/` 路由建立（POST/GET）
- Next.js 的 Request/Response 處理
- 在前端使用 `useEffect` + `fetch` 撈取 API 資料
- 使用 `useState` 控制留言內容與表單提交
- 初步前後端串接概念

---

## 🗂 專案結構（App Router）

```less
2-message-board-api/
├── src/
│   ├── app/
│   │   ├── page.tsx                // 頁面 + 表單 + 顯示留言
│   │   └── api/
│   │       └── messages/
│   │           └── route.ts        // API Routes：支援 GET / POST
│   ├── types/
│   │   └── message.ts              // 定義 Message 型別
│   ├── lib/
│   │   └── messages.ts             // 暫存資料（用 array 暫存）
│   └── styles/
│       └── globals.css

```

---

## 📝 專案說明

這是一個基本的留言板系統：

- 使用 `app/api/messages/route.ts` 處理：
  - `GET`：回傳所有留言（格式為 JSON）
  - `POST`：接收留言內容並加入暫存陣列
- 前端在 `page.tsx` 中：
  - 提供一個文字輸入框 + 按鈕可新增留言
  - 使用 `useEffect` 抓留言，顯示於頁面
- 使用 `useState` 控制表單與回應

---

## 💡 開發提示

### 1. 型別設計 `types/message.ts`

```ts
export interface Message {
  id: string;
  content: string;
  createdAt: string;
}
```

### 2. 暫存資料（lib/messages.ts）

```ts
let messages: Message[] = [];

export function getMessages() {
  return messages;
}

export function addMessage(msg: Message) {
  messages.unshift(msg);
}
```

> ⚠️ 注意：這些資料會在部署後重置（不會永久儲存）

---

### 3. 建立 API Routes

在 `app/api/messages/route.ts` 中加入：

```ts
import { NextResponse } from "next/server";
import { getMessages, addMessage } from "@/lib/messages";

export async function GET() {
  return NextResponse.json(getMessages());
}

export async function POST(req: Request) {
  const body = await req.json();
  const newMsg = {
    id: crypto.randomUUID(),
    content: body.content,
    createdAt: new Date().toISOString(),
  };
  addMessage(newMsg);
  return NextResponse.json(newMsg);
}
```

---

### 4. 前端表單與撈資料

- 用 `useEffect` 來撈留言資料（GET）
- 使用 `fetch('/api/messages')` 串接
- 表單提交時送出 POST，送成功再重新撈留言

---

## ✅ 完成目標檢查

1. 可新增留言、留言會立即顯示
2. F5 重整後留言仍在（記憶體暫存狀態）
3. 沒有跳錯、資料格式正確
4. 前後端串接流程順暢（無使用外部 DB）
