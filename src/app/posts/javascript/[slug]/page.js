import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { notFound } from "next/navigation";

export default async function PostPage({ params }) {
  const slug = params.slug;
  const filePath = path.join(process.cwd(), "src/app/posts/javascript", `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-2">{data.title}</h1>
      <p className="text-gray-400 text-sm mb-6">{new Date(data.date).toLocaleDateString()}</p>

      <article className="prose prose-invert max-w-none">
        <Markdown rehypePlugins={[rehypeRaw]}>{content}</Markdown>
      </article>
    </main>
  );
}
