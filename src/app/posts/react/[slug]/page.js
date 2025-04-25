import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { notFound } from "next/navigation";
import GiscusComment from "../../../../components/GiscusComment"; // ✅ 댓글 컴포넌트 재사용

// 📌 react 전용 경로로 변경
const POSTS_DIR = path.join(process.cwd(), "src/app/posts/react");

export async function generateStaticParams() {
  const files = fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith(".md"));

  return files.map((filename) => ({
    slug: filename.replace(/\.md$/, ""),
  }));
}

export async function generateMetadata({ params }) {
  const filePath = path.join(POSTS_DIR, `${params.slug}.md`);
  if (!fs.existsSync(filePath)) return { title: "404 Not Found" };

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(fileContent);

  return {
    title: data.title || "블로그 글",
    description: data.description || "기술 블로그 글",
  };
}

export default async function PostPage({ params }) {
  const filePath = path.join(POSTS_DIR, `${params.slug}.md`);
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-2">{data.title}</h1>
      <p className="text-gray-400 text-sm mb-6">{new Date(data.date).toLocaleDateString()}</p>
      <article className="prose prose-invert max-w-none mb-12">
        <Markdown rehypePlugins={[rehypeRaw, rehypeHighlight]}>{content}</Markdown>
      </article>
      <GiscusComment />
    </main>
  );
}
