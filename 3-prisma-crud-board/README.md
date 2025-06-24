## 🎯 專案目標

建置一個使用 Prisma + SQLite 的留言板，實作完整的 CRUD 功能，並增加簡易的使用者登入系統。透過此專案學習如何將 Next.js API Routes 與資料庫整合，讓資料持久化且更符合商業應用需求。

---

## 📘 學習主題

- Prisma ORM 基礎
- 建立 SQLite 資料庫與 Prisma Schema
- CRUD API 路由設計（GET, POST, PUT, DELETE）
- 後台管理與使用者驗證（JWT / cookie-based）
- 資料分頁與排序
- 前端串接 API，表單驗證與錯誤處理
- Next.js App Router 與 API Route 結合
- 使用環境變數與安全性考量

---

## 🗂 專案結構（示意）

```less
3-prisma-crud-board/
├── prisma/
│   └── schema.prisma          # Prisma 資料庫 schema
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── messages/      # API Route 實作 CRUD
│   │   │       └── route.ts
│   │   ├── admin/             # 管理後台頁面（需登入）
│   │   ├── login/             # 登入頁面
│   │   └── page.tsx           # 前台留言板頁面
│   ├── lib/
│   │   └── prisma.ts          # Prisma client 初始化
│   ├── middleware.ts          # JWT 認證中介層
│   └── styles/
│       └── globals.css
├── .env                       # 環境變數（資料庫連線字串、JWT 秘鑰）
├── next.config.js
└── tsconfig.json

```

---

## 📝 專案說明

- 使用 Prisma 連接 SQLite，建立 `Message` 與 `User` 等資料表
- 提供 API 支援留言的增刪改查功能
- 透過 JWT 進行簡易使用者登入保護後台 API
- 前台使用者可新增留言並瀏覽列表
- 後台管理員登入後可編輯刪除留言
- 使用環境變數管理安全資訊
- 支持前端表單驗證與錯誤提示

---

## 💡 開發提示

- 先用 `npx prisma init` 建立 Prisma 設定
- 設計資料表 schema，執行 `prisma migrate dev`
- Prisma Client 實例可放 `lib/prisma.ts`
- API Route 用 Prisma Client 操作資料庫
- JWT 可用 `jsonwebtoken` 套件實作
- 後台頁面需檢查登入狀態，非登入者重導向登入頁
- 前台頁面表單輸入後呼叫 API 新增留言

---

## 📅 建議週期

- 第 1 週：Prisma 基礎與資料庫建置，完成留言表
- 第 2 週：API CRUD 路由實作
- 第 3 週：使用者登入與權限控管
- 第 4 週：前台後台 UI 以及表單驗證
