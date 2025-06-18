## 🎯 專案目標

使用 Next.js 的 **App Router 架構** 實作一個靜態產生的部落格，包含首頁、關於、聯絡頁，以及 Blog 列表與單篇文章動態路由頁面，並使用 `getStaticProps` 對應的功能（App Router 中為 `generateStaticParams` + `fetch`）。

---

## 📘 學習主題

- App Router 架構與目錄設計
- Route Segments（巢狀目錄自動產頁）
- `Link` 導頁
- 靜態產頁（SSG）：
  - `generateStaticParams`
  - `fetch` with `next/cache`
- Dynamic route: `[slug]/page.tsx`
- Layout reusability（使用 `layout.tsx`）

---

## 🗂 專案結構

```less
1-my-nextjs-blog/
├── public/
│   └── images/...
├── src/
│   ├── app/
│   │   ├── layout.tsx            // 全站 Layout
│   │   ├── page.tsx              // 首頁
│   │   ├── about/
│   │   │   └── page.tsx          // 關於我
│   │   ├── contact/
│   │   │   └── page.tsx          // 聯絡我
│   │   ├── blog/
│   │   │   ├── page.tsx          // Blog 列表
│   │   │   └── [slug]/
│   │   │       └── page.tsx      // 單篇文章頁
│   ├── components/
│   │   ├── PostCard.tsx
│   │   └── Header.tsx
│   ├── data/
│   │   └── posts.ts              // 假資料
│   └── styles/
│       └── globals.css
├── next.config.ts
└── tsconfig.json

```

---

## 📝 專案說明

這是一個基於 **App Router 架構的靜態部落格網站** ，實作內容包括：

- 首頁導覽（`src/app/page.tsx`），連結到 About、Contact、Blog
- Blog 文章來自 `data/posts.ts` 中的靜態資料
- 使用 `[slug]/page.tsx` 動態產生每一篇文章
- 使用 `generateStaticParams()` 建立 SSG 路由
- 使用 `notFound()` 處理不存在的文章
- 用 `layout.tsx` 做 header/footer 共用
- 文章內容格式：`slug`, `title`, `content`, `date`

---

## 💡 開發提示

### 1. 創建假資料 `data/posts.ts`

```ts
export const posts = [
  {
    slug: 'first-post',
    title: 'My First Post',
    date: '2025-06-13',
    content: 'Hello, this is my first blog post!',
  },
  ...
];

```

### 2. Blog 列表頁 `blog/page.tsx`

- 用 `fetch` 模擬抓取 `posts`（可以在 `data` 中 export function）
- 將文章用 `.map()` 渲染成卡片
- 每個卡片加上 `<Link href={`/blog/${slug}`}>`

### 3. 單篇文章頁 `[slug]/page.tsx`

- 使用 `generateStaticParams()` 回傳所有 slug
- 在 `page.tsx` 中根據 slug 撈資料
- 若文章不存在，呼叫 `notFound()`

```ts
export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}
```

### 4. 使用共用 `layout.tsx`

- 在 `app/layout.tsx` 中建立簡單的 header / footer
- 可導入全站 CSS 和 `<nav>`
