import getData from "@/data/posts";
import { notFound } from "next/navigation";

// 1. 靜態產生路由用的函式
export const generateStaticParams = async () => {
  const posts = await getData(); // 直接呼叫，因為是同步函式
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

const BlogPostPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const posts = await getData();
  const slug = (await params).slug;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound(); // 若找不到對應文章，自動導向 404 頁面
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      <article>{post.content}</article>
    </main>
  );
};

export default BlogPostPage;
